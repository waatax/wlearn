const fs = require('fs');
const booksPath = 'public/books.json';
const authorsPath = 'public/authors.json';
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

const bookUpdates = {
    "book_494": { title_en: "The Back of the Napkin", author: "Dan Roam" },
    "book_492": { author: "OSS (Office of Strategic Services)" },
    "book_483": { title_cn: "燃燒：揭開大腦、演化與身體代謝之謎", author: "Herman Pontzer" },
    "book_462": { title_cn: "自我控管的藝術", author: "Kelly McGonigal" }, // Based on topic
    "book_441": { title_cn: "控制力", author: "Kelly McGonigal" },
    "book_423": { title_cn: "自律力", author: "Marshall Goldsmith" },
    "book_421": { title_cn: "高產出的本事", author: "劉奕酉" },
    "book_417": { author: "樊登" }
};

const processedBooks = books.map(b => {
    if (bookUpdates[b.id]) {
        return { ...b, ...bookUpdates[b.id] };
    }
    return b;
});

// Author Bio Updates for new authors discovered
const newAuthorBios = {
    "Dan Roam": {
        "name_zh": "丹·羅姆",
        "bio": "視覺思考專家、暢銷作家。他創辦了視覺思考經營學院，致力於教導企業領袖如何利用簡單的繪畫來解決複雜問題、推動創新與有效溝通。其著作《餐巾紙的背後》被《商業週刊》、《Fast Company》評為年度最佳商管書，翻譯超過 25 種語言。",
        "career": "視覺思考專家 / 企業顧問 / 作家",
        "achievements": ["《餐巾紙的背後》作者", "視覺思考學院創辦人"],
        "has_detailed_bio": true
    },
    "Herman Pontzer": {
        "name_zh": "赫爾曼·龐澤",
        "bio": "杜克大學演化人類學副教授，全球人類代謝與演化研究的核心權威。他透過對哈扎狩獵採集部落（Hadza）的實地研究，推翻了傳統對運動耗能的認知，提出「代謝能量限制」模型，深刻改寫了當代對肥胖、演化與大腦耗能的理解。",
        "career": "演化人類學家 / 杜克大學教授 / 研究員",
        "achievements": ["《燃燒》作者", "人類代謝研究權威"],
        "has_detailed_bio": true
    },
    "Kelly McGonigal": {
        "name_zh": "凱莉·麥高尼格",
        "bio": "史丹佛大學健康心理學家。她致力於將神經科學與心理學的最新發現轉化為實用的生活策略。其著作《輕鬆駕馭意志力》（The Willpower Instinct）被譽為行為改變領域的現代經典。她的 TED 演講「如何讓壓力成為你的朋友」觀看量突破千萬，影響了全球無數人對壓力的認知。",
        "career": "健康心理學家 / 史丹佛講師 / 作家",
        "achievements": ["《輕鬆駕馭意志力》作者", "TED 點擊千萬級演說家"],
        "has_detailed_bio": true
    },
    "Marshall Goldsmith": {
        "name_zh": "馬歇爾·古德史密斯",
        "bio": "世界頂尖的高階主管教練、管理思想家。曾連續多年獲選 Thinkers50 全球最具影響力思想家第一名。他專長於協助企業領袖克服「成功的盲點」，建立持久的行為改變。其著作《自律力》、《下一步，會更好》是全球管理者的床頭書。",
        "career": "高階教練 / 管理思想大師 / 作家",
        "achievements": ["Thinkers50 冠軍作者", "哈佛大學高階管理導師"],
        "has_detailed_bio": true
    },
    "劉奕酉": {
        "name_zh": "劉奕酉",
        "bio": "台灣知名的知識轉譯者、高產出表達專家。曾任職於高科技產業與管理顧問業。他擅長將複雜資訊結構化、圖解化，幫助職場人士提升溝通效率。其著作《高產出的本事》、《我用圖解辦公室問題》等深受好評，是眾多企業指名的內訓講師。",
        "career": "表達溝通顧問 / 暢銷作家 / 講師",
        "achievements": ["《高產出的本事》作者", "圖解表達力大師"],
        "has_detailed_bio": true
    }
};

const updatedAuthors = authors.map(a => {
    if (newAuthorBios[a.name]) {
        return { ...a, ...newAuthorBios[a.name] };
    }
    return a;
});

fs.writeFileSync(booksPath, JSON.stringify(processedBooks, null, 2));
fs.writeFileSync(authorsPath, JSON.stringify(updatedAuthors, null, 2));
console.log('Processed Fixes for Batch 1-4 (80 books).');
