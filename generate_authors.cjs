// Generate authors.json from books.json
// Creates author entries with IDs, bios, and linked books
const fs = require('fs');
const books = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));

// Gather unique authors and their books
const authorMap = {};
books.forEach(book => {
        if (!book.author || book.title_cn === '[Private video]') return;
        // Handle multi-author books (split by common delimiters)
        const authorName = book.author.trim();
        if (!authorMap[authorName]) {
                authorMap[authorName] = { books: [] };
        }
        authorMap[authorName].books.push({
                id: book.id,
                title_cn: book.title_cn,
                title_en: book.title_en,
                code: book.code,
                video_id: book.video_id,
                tags: book.tags,
        });
});

// Create slug from author name
function createSlug(name) {
        return name
                .toLowerCase()
                .replace(/[^a-z0-9\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]+/g, '-')
                .replace(/(^-|-$)/g, '')
                || 'author-' + Math.random().toString(36).substring(7);
}

// Known author bios (curated for top authors)
const knownBios = {
        'Tony Robbins': {
                name_en: 'Tony Robbins',
                name_zh: '東尼·羅賓斯',
                bio: '全球知名的生活策略師、企業家、暢銷書作家及慈善家。被《財富》雜誌列為「全球50大最具影響力商業人物」之一。他的TED演講累計觀看超過數千萬次，著有《喚醒心中的巨人》、《金錢：掌握遊戲》等暢銷書。30多年來，他透過演講、書籍和教練課程，幫助超過5,000萬人改變人生。',
                career: '企業家 / 暢銷書作家 / 生活策略師 / 慈善家',
                achievements: ['《財富》全球50大商業人物', 'TED演講數千萬觀看', '幫助超過5000萬人', '六本紐約時報暢銷書'],
        },
        'John C. Maxwell': {
                name_en: 'John C. Maxwell',
                name_zh: '約翰·C·麥克斯韋爾',
                bio: '國際領導力大師，被美國管理協會評為「全球第一領導力專家」，連續25年入選「全球最具影響力領導力導師」。已出版超過100本書籍，全球銷量超過3,400萬冊，作品翻譯為50種語言。曾受邀為多國總統、世界500強企業CEO進行領導力培訓。',
                career: '領導力專家 / 演說家 / 暢銷書作家 / 牧師',
                achievements: ['全球第一領導力專家', '100+著作', '3400萬冊全球銷量', '50種語言翻譯'],
        },
        'Simon Sinek': {
                name_en: 'Simon Sinek',
                name_zh: '賽門·西乃克',
                bio: '英裔美國作家、激勵演說家和組織顧問。以「黃金圈」理論聞名全球，其TED演講「偉大的領袖如何啟發行動」是TED史上觀看次數最多的演講之一，超過6,000萬次觀看。著有《先問為什麼》、《無限賽局》、《最後吃的人才是領袖》等暢銷書。',
                career: '作家 / 激勵演說家 / 組織顧問',
                achievements: ['TED演講6000萬+觀看', '「黃金圈」理論創始人', '多本紐約時報暢銷書', '蘭德公司顧問'],
        },
        '劉潤': {
                name_en: 'Liu Run',
                name_zh: '劉潤',
                bio: '中國知名商業顧問、暢銷書作家。曾任微軟戰略合作總監，現為潤米諮詢創始人。在中國商業教育領域享有盛譽，其「5分鐘商學院」課程在「得到」App上訂閱量超過50萬。著有《底層邏輯》、《商業洞察力》等暢銷書，擅長用通俗語言解釋複雜商業概念。',
                career: '商業顧問 / 暢銷書作家 / 前微軟戰略合作總監',
                achievements: ['「5分鐘商學院」50萬+訂閱', '前微軟戰略合作總監', '潤米諮詢創始人', '多本商業暢銷書'],
        },
        '樊登': {
                name_en: 'Fan Deng',
                name_zh: '樊登',
                bio: '中國知名閱讀推廣人，樊登讀書會創始人。畢業於西安交通大學，曾任中央電視台主持人。2013年創辦樊登讀書會，致力於將優秀書籍以說書方式推廣，會員超過6,000萬。每年精讀50本書並錄製講書影片，被譽為「中國最有影響力的讀書人」之一。',
                career: '閱讀推廣人 / 樊登讀書 創始人 / 前央視主持人',
                achievements: ['樊登讀書6000萬+會員', '每年精讀50本書', '前央視主持人', '西安交通大學校友'],
        },
        'Adam Grant': {
                name_en: 'Adam Grant',
                name_zh: '亞當·格蘭特',
                bio: '美國組織心理學家，賓夕法尼亞大學沃頓商學院教授。31歲時成為沃頓商學院最年輕的終身教授，連續七年被評為沃頓最受歡迎教授。著有《逆思維》、《給予》、《隱性潛能》等暢銷書，其TED演講觀看次數超過3,000萬。世界經濟論壇青年全球領袖。',
                career: '組織心理學家 / 沃頓商學院教授 / 暢銷書作家',
                achievements: ['沃頓最年輕終身教授', 'TED演講3000萬+觀看', '世界經濟論壇青年領袖', '紐約時報暢銷書作家'],
        },
        'Jim Kwik': {
                name_en: 'Jim Kwik',
                name_zh: '吉姆·乐維克',
                bio: '全球頂尖腦力教練和記憶力專家，被譽為「大腦教練」。童年時因腦部受傷導致學習障礙，後自學腦科學，開發出獨創的速讀和記憶技術。曾為Google、維珍集團、Nike等企業及哈佛大學等名校提供腦力訓練。著有《無限可能》等暢銷書。',
                career: '腦力教練 / 記憶力專家 / 企業培訓師',
                achievements: ['全球頂尖腦力教練', 'Google、Nike等企業培訓', '《無限可能》暢銷書作家', '超過200集播客節目'],
        },
        'Daniel Goleman': {
                name_en: 'Daniel Goleman',
                name_zh: '丹尼爾·高爾曼',
                bio: '美國心理學家、科學記者，「情商」(EQ)概念的普及者。哈佛大學心理學博士，曾任《紐約時報》科學專欄記者12年。1995年出版的《EQ》一書全球銷量超過500萬冊，翻譯40種語言，徹底改變了人們對智力和情感的理解。',
                career: '心理學家 / 科學記者 / 暢銷書作家',
                achievements: ['「情商」概念普及者', '《EQ》全球500萬冊', '哈佛大學心理學博士', '前紐約時報記者'],
        },
        'Carol S. Dweck': {
                name_en: 'Carol S. Dweck',
                name_zh: '乙乙乙·乙威乙',
                bio: '美國心理學家，史丹佛大學心理學教授。「成長型思維」理論的創始人，其研究從根本上改變了教育界和企業界對能力與潛力的理解。著有《心態致勝》等暢銷書，影響了全球數百萬教師、家長和企業領導者。',
                career: '心理學家 / 史丹佛大學教授 / 研究學者',
                achievements: ['「成長型思維」理論創始人', '史丹佛大學教授', '《心態致勝》暢銷書', '影響全球教育界'],
        },
        'Yuval Noah Harari': {
                name_en: 'Yuval Noah Harari',
                name_zh: '哈拉瑞',
                bio: '以色列歷史學家，耶路撒冷希伯來大學歷史系教授。其著作《人類大歷史》、《人類大命運》、《21世紀的21堂課》全球銷量超過4,500萬冊，翻譯65種語言。被《時代》雜誌評為全球最具影響力的100人之一，經常受邀在世界經濟論壇等場合演講。',
                career: '歷史學家 / 希伯來大學教授 / 暢銷書作家',
                achievements: ['全球4500萬冊銷量', '65種語言翻譯', '《時代》100人', '世界經濟論壇常客'],
        },
        '萬維鋼': {
                name_en: 'Wan Weigang',
                name_zh: '萬維鋼',
                bio: '中國科普作家，筆名「同人于野」。美國科羅拉多大學物理學博士，曾在美國從事科學研究。現為「得到」App「精英日課」專欄作者，以深入淺出的方式介紹前沿科學和思維方法。著有《學習究竟是什麼》、《萬萬沒想到》等暢銷書。',
                career: '科普作家 / 前物理學研究員 / 專欄作者',
                achievements: ['科羅拉多大學物理學博士', '「精英日課」專欄作者', '多本科普暢銷書', '中國知名科普KOL'],
        },
        'Daniel Kahneman': {
                name_en: 'Daniel Kahneman',
                name_zh: '丹尼爾·康納曼',
                bio: '以色列裔美國心理學家，2002年諾貝爾經濟學獎得主。普林斯頓大學榮譽教授，行為經濟學的創始人之一。其著作《快思慢想》被譽為21世紀最重要的非虛構類書籍之一，全球銷量超過1,000萬冊。',
                career: '心理學家 / 普林斯頓大學教授 / 諾貝爾獎得主',
                achievements: ['2002年諾貝爾經濟學獎', '行為經濟學創始人', '《快思慢想》1000萬冊', '普林斯頓大學教授'],
        },
        'Stephen R. Covey': {
                name_en: 'Stephen R. Covey',
                name_zh: '史蒂芬·柯維',
                bio: '美國管理學大師、教育家，被《時代》雜誌評為「全球最具影響力的25人」之一。著有《與成功有約：高效能人士的七個習慣》，全球銷量超過4,000萬冊，翻譯40種語言，被譽為20世紀最具影響力的商業書籍之一。',
                career: '管理學大師 / 教育家 / FranklinCovey 共同創辦人',
                achievements: ['《七個習慣》4000萬冊', '《時代》25大影響力人物', '40種語言翻譯', 'FranklinCovey共同創辦'],
        },
        'Annie Duke': {
                name_en: 'Annie Duke',
                name_zh: '乙乙·乙克',
                bio: '前職業撲克選手，決策科學專家。賓夕法尼亞大學認知心理學碩士。曾贏得世界撲克大賽冠軍，生涯累積獎金超過400萬美元。退役後專注於決策科學研究和企業顧問，著有《高勝算決策》、《別讓直覺騙了你》等暢銷書。',
                career: '決策科學專家 / 前職業撲克冠軍 / 作家',
                achievements: ['世界撲克大賽冠軍', '400萬美元生涯獎金', '決策科學暢銷書作家', '企業決策顧問'],
        },
        'Nir Eyal': {
                name_en: 'Nir Eyal',
                name_zh: '尼爾·艾乙',
                bio: '以色列裔美國作家、講師和投資者。史丹佛大學商學院講師，專注於科技、心理學和商業交叉領域。著有《鉤癮效應》和《專注力協定》等暢銷書，在產品設計和行為設計領域享有盛譽。',
                career: '作家 / 史丹佛大學講師 / 投資者',
                achievements: ['《鉤癮效應》暢銷書', '史丹佛大學講師', '行為設計專家', '多間科技公司顧問'],
        },
        'Dale Carnegie': {
                name_en: 'Dale Carnegie',
                name_zh: '戴爾·卡内基',
                bio: '美國作家、演說家、人際關係學大師。其1936年著作《人性的弱點》（How to Win Friends and Influence People）至今仍是全球最暢銷的自我提升書籍之一，全球銷量超過3,000萬冊。創辦的卡內基訓練機構遍佈全球86個國家。',
                career: '作家 / 演說家 / 人際關係學大師',
                achievements: ['《人性的弱點》3000萬冊', '卡內基訓練遍佈86國', '人際關係學先驅', '20世紀最具影響力作家'],
        },
        'Greg McKeown': {
                name_en: 'Greg McKeown',
                name_zh: '乙瑞格·麥基翁',
                bio: '英國作家、公共演說家和領導力顧問。著有《少，但是更好》和《努力卻不費力》等暢銷書，提倡「精準主義」(Essentialism)的生活和工作哲學。曾為Apple、Google、Facebook等企業提供諮詢服務。',
                career: '作家 / 領導力顧問 / 演說家',
                achievements: ['「精準主義」提倡者', '紐約時報暢銷書作家', 'Apple/Google顧問', '史丹佛大學講師'],
        },
        'Lisa Feldman Barrett': {
                name_en: 'Lisa Feldman Barrett',
                name_zh: '莉莎·乙爾德曼·巴瑞特',
                bio: '美國心理學家和神經科學家，東北大學傑出教授。情緒建構理論的創始人，其研究徹底改變了科學界對情緒的理解。著有《情緒跟你以為的不一樣》等暢銷書，被Clarivate列為全球引用次數最多的科學家之一。',
                career: '心理學家 / 神經科學家 / 東北大學教授',
                achievements: ['情緒建構理論創始人', '全球最多引用科學家', '古根漢獎得主', 'TED演講百萬觀看'],
        },
};

// Generate author entries
const authors = Object.entries(authorMap).map(([name, data]) => {
        const slug = createSlug(name);
        const known = knownBios[name];

        return {
                id: slug,
                name: name,
                name_en: known?.name_en || name,
                name_zh: known?.name_zh || name,
                bio: known?.bio || `${name} 是本站收錄書籍的作者，共有 ${data.books.length} 本書籍收錄於本站。`,
                career: known?.career || '作家',
                achievements: known?.achievements || [],
                book_count: data.books.length,
                books: data.books,
                has_detailed_bio: !!known,
                avatar_initial: name.charAt(0).toUpperCase(),
        };
}).sort((a, b) => b.book_count - a.book_count);

fs.writeFileSync('public/authors.json', JSON.stringify(authors, null, 2), 'utf8');
console.log(`Generated ${authors.length} authors`);
console.log(`With detailed bios: ${authors.filter(a => a.has_detailed_bio).length}`);
console.log(`Top 10:`);
authors.slice(0, 10).forEach(a => console.log(`  ${a.book_count}x ${a.name} (${a.id})`));
