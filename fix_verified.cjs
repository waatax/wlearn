const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));

// All corrections found via 博客來 verification
const fixes = {
        'book_68': {
                author: '郝旭烈',
                description_cn: '《致富覺察：培養點石成金的財富腦》由財務專家郝旭烈撰寫，幫助讀者培養財富思維與覺察能力。透過實用的理財觀念與案例分析，引導讀者建立正確的金錢觀，培養點石成金的財富腦。'
        },
        'book_18': {
                author: 'Cass R. Sunstein',
                description_cn: '《淤泥效應：解開制度的束縛，重新找回組織執行力》由哈佛法學教授凱斯·桑思汀撰寫，揭示繁瑣的行政程序和制度障礙（即「淤泥」）如何阻礙人們完成重要事項。提出簡化制度、消除不必要阻力的方法，重新找回組織執行力。'
        },
        'book_15': {
                author: '金度潤',
                description_cn: '《創運思維：滿手爛牌打到贏，解鎖致富、覆盤人生的七堂強運課》由韓國作家金度潤撰寫。透過七堂課揭示如何在不利條件下創造好運，翻轉人生。教導讀者運氣並非偶然，而是可以透過正確的思維和行動來創造。'
        },
        'book_156': {
                author: '希米恩·布朗',
                description_cn: '《底層網紅：時尚、金錢、性、暴力……社群慾望建構的最強龐氏騙局！》由英國第四頻道新聞記者希米恩·布朗撰寫，透過八篇專題故事揭示歐美網紅市場的黑暗面，涵蓋網紅產業背後的詐騙與剝削。'
        },
        'book_61': {
                author: '萬維鋼',
                description_cn: '《學習究竟是什麼》由「得到」App專欄作家萬維鋼撰寫，結合最新的心理學及腦科學研究成果，探討科學高效的學習方法。幫助讀者成為更有智慧的學習者，掌握學習的底層邏輯。'
        },
        'book_269': {
                author: 'Daniel Levitin',
                description_cn: '《過載：洞察大腦決策的運作，重整過度負荷的心智和人生》由麥基爾大學心理學教授丹尼爾·列維廷撰寫。從神經科學和認知心理學角度，揭示資訊爆炸時代大腦負荷過重的問題，提供整理心智、優化決策的方法。'
        },
        'book_144': {
                author: '周辰飛, 江竹兵',
                description_cn: '《激活增長：劇變時代快速增長四步法》由周辰飛和江竹兵合著，系統性地分析企業如何在劇變時代找到增長引擎。提供快速增長的四步法，幫助企業在不確定環境中實現穩定成長。'
        },
        'book_128': {
                author: '達瑞爾·布瑞克, 約翰·伊比森',
                description_cn: '《無人地球：全面改寫經濟、政治、國際局勢的人口崩潰之戰》探討全球人口下降的趨勢及其深遠影響。從經濟、政治到社會結構，分析人口崩潰將如何徹底改變世界的面貌。'
        },
        'book_104': {
                author: '范冰',
                description_cn: '《成長駭客：未來十年最被需要的新型人才》由范冰撰寫，探討如何用低成本的創意思考和數據分析技術，讓創業公司的用戶、流量與營收成長翻倍。揭示矽谷最熱門的新型人才——成長駭客的思維與方法。'
        },
        'book_35': {
                author: 'Michael McQueen',
                description_cn: '《慣性思維：為何我們總是無法跳脫舊有的想法》由麥可·乾昆撰寫，探討人類大腦為何容易陷入思維慣性。揭示慣性思維如何影響決策和創新，提供突破固有思維模式的實用方法。'
        },
        'book_108': {
                author: '張邁可',
                description_cn: '《業務學：突破傳統銷售框架的實戰策略》分享專業業務人員的銷售心法與實戰技巧。從客戶關係經營到成交策略，提供系統性的業務能力提升方法，幫助業務人員提升績效。'
        },
        'book_142': {
                author: '褚君浩',
                description_cn: '《重新丈量世界：從測量到科學革命的故事》探討人類如何透過測量來理解和改造世界。從古代的度量衡到現代的精密測量技術，揭示測量如何推動科學進步和文明發展。'
        },
        'book_163': {
                author: '趙彥春',
                description_cn: '《譯者即叛徒：翻譯的藝術與困境》探討翻譯過程中不可避免的「創造性背叛」。分析譯者如何在忠實原文與流暢表達之間取得平衡，揭示翻譯作為一門藝術的複雜性與魅力。'
        },
        'book_157': {
                author: '李軒洋',
                description_cn: '《假面社交》由李軒洋撰寫，揭示現代社交中的虛偽與面具現象。分析人們在社交場合中的心理動機與行為模式，提供更真誠、有效的人際互動方法，幫助讀者建立更真實的關係。'
        },
        'book_468': {
                author: '朱光潛',
                description_cn: '朱光潛先生的美學經典著作，以通俗優美的語言探討人的心靈世界與美感體驗。從生活中的美學出發，幫助讀者培養審美能力，理解藝術與人生的深層連結。'
        },
        'book_475': {
                author: 'Daniel Coyle',
                description_cn: '《天才密碼》由Daniel Coyle撰寫，揭示世界頂尖人才培養機構的共同秘密。從深度練習到大師級教練的指導方法，探討「髓鞘質」如何加速技能習得，提供加速進步的科學方法。'
        }
};

let count = 0;
for (const [id, fix] of Object.entries(fixes)) {
        const book = data.find(b => b.id === id);
        if (book) {
                if (fix.author) book.author = fix.author;
                if (fix.description_cn) book.description_cn = fix.description_cn;
                count++;
                console.log(`Fixed: ${id} (${book.title_cn}) -> ${fix.author || 'desc only'}`);
        }
}

fs.writeFileSync('public/books.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`\nTotal fixed: ${count}`);
console.log('Books with author:', data.filter(b => b.author).length);
