const fs = require('fs');

const booksPath = 'public/books.json';
const authorsPath = 'public/authors.json';

const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

// 1. Correct "Unknown" authors in books.json
const bookFixes = {
    "book_487": "Barbara Oakley & Olav Schewe",
    "book_493": "Ozan Varol",
    "book_494": "Dan Roam",
    "book_495": "Shane Parrish",
    "book_496": "Jocko Willink & Leif Babin",
    "book_491": "David A. Kessler",
    "book_492": "OSS (Office of Strategic Services)",
    "book_488": "曾國棟, 黃文鴻, 李知昂",
    "book_489": "陳恆霖",
    "book_490": "陳恆霖",
    "book_12": "舒婭" // double checking
};

// Also fix the compound author name in books.json
books.forEach(b => {
    if (bookFixes[b.id]) {
        b.author = bookFixes[b.id];
    }
    if (b.author === "劉潤、李笑來、萬維綱、吳軍 等30位菁英高手") {
        b.author = "MISA 智享會 (曾國棟 等)";
    }
});

fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));

// 2. Add rich bios for the identified authors
const bioUpdates = {
    "曾國棟": {
        "name_zh": "曾國棟",
        "bio": "大聯大控股永續長、友尚集團創辦人。他於1980年創立友尚，將其發展為台灣首家上市的電子零組件通路巨頭。曾先生致力於傳承經營智慧，著有《管理者》、《比專業更重要的事》等多部商戰經典，並發起成立「MISA 中華經營智慧分享協會」，號召企業家共同分享實戰經驗，提攜後進。",
        "career": "大聯大控股永續長 / 友尚集團創辦人 / 作家",
        "achievements": ["友尚集團創辦人", "MISA 協會理事長", "經濟部金書獎得主"],
        "has_detailed_bio": true
    },
    "巨人傑": {
        "name_zh": "巨人傑",
        "bio": "台灣股市傳奇交易員，以驚人的交易量與精準的市場直覺聞名，被譽為「億級交易員」。他從17歲進入股市，憑藉著數學與統計背景，以及每天超過17小時的極致投入，將50萬本金操作至年交易量破五千億的驚人規模。其著作《巨人思維》深度分享了其風險控管、心理素質與交易哲學，是台股市場的現象級作品。",
        "career": "資深交易員 / 暢銷作家 / 投資導師",
        "achievements": ["年交易量五千億記錄保持者", "《巨人思維》作者"],
        "has_detailed_bio": true
    },
    "樺澤紫苑": {
        "name_zh": "樺澤紫苑",
        "bio": "日本著名的精神科醫師、作家及其受歡迎的知識型 YouTuber。他畢業於札幌醫科大學，曾赴美國芝加哥大學專攻憂鬱症研究。他主張「輸出的重要性」，致力於將腦科學與心理學應用於日常生產力。著有《輸出大全》、《輸入大全》等超百萬冊暢銷作，透過網路平台幫助現代人緩解焦慮、提升大腦效能。",
        "career": "精神科醫師 / 腦科學專家 / 作家",
        "achievements": ["日本高產精神科醫師代表", "《輸出大全》作者"],
        "has_detailed_bio": true
    },
    "鎌田實": {
        "name_zh": "鎌田實",
        "bio": "日本長野縣諏訪中央病院名譽院長，著名醫生與作家。他長期致力於地域醫療與「不努力」健康法，強調身心放鬆對抗病與長壽的重要性。他曾深入切爾諾貝利（車諾比）與伊拉克進行醫療援助，榮獲多項社會貢獻獎。其溫暖且充滿智慧的著作如《不努力：鎌田實的長壽秘方》，深刻影響了東亞的高齡社會健康觀。",
        "career": "醫師 / 作家 / 社會活動家",
        "achievements": ["諏訪中央病院名譽院長", "日本放送文化獎得主"],
        "has_detailed_bio": true
    },
    "佐佐木俊尚": {
        "name_zh": "佐佐木俊尚",
        "bio": "日本知名的科技媒體記者、評論家與作家。曾任職於每日新聞社，經歷豐富。他對網路社會、電子媒體與資訊策展（Curation）有著深刻的研究。其著作《策展的時代》、《電子書的衝擊》精準預言了數位時代的資訊流動規律。他在 X (Twitter) 等社群平台上擁有極高影響力，引領大眾思考數位生活的新秩序。",
        "career": "自由記者 / 科技評論家 / 作家",
        "achievements": ["大川出版獎得主", "資訊策展概念推廣者"],
        "has_detailed_bio": true
    },
    "陳立飛": {
        "name_zh": "陳立飛 (Spenser)",
        "bio": "知名自媒體人、寫作專家及創業者。以「Spenser」之名活躍於華語網路空間。他倡導「寫作是最好的自我投資」，將普通人的寫作轉化為品牌與財富。其著作《寫作是最好的投資》、《高手策略》等將職場進階、人脈經營與寫作表達深度結合，是現代青年在零工經濟時代尋找突破口的實戰指南。",
        "career": "個人品牌專家 / 暢銷作家 / 創業者",
        "achievements": ["個人品牌經營大師", "《寫作是最好的投資》作者"],
        "has_detailed_bio": true
    },
    "鄭緯筌": {
        "name_zh": "鄭緯筌 (Vista)",
        "bio": "台灣資深媒體人、內容行銷專家。曾任《數位時代》主編。他長期致力於推廣文案寫作、內容策展與數位行銷。透過「Vista 寫作實驗室」幫助企業與個人提升表達力。其著作《內容感動行銷》、《圖解內容行銷》等以實務導向著稱，是許多大學與企業指名的行銷導師。",
        "career": "內容行銷專家 / 講師 / 作家",
        "achievements": ["Vista 寫作實驗室創辦人", "資深媒體轉型教練"],
        "has_detailed_bio": true
    },
    "中野．詹姆士．修一": {
        "name_zh": "中野．詹姆士．修一",
        "bio": "日本頂尖的身體機能訓練師、體能教練。他是多位世界級運動員（如福原愛、神野大地）的私人教練，也是 adidas 的諮詢顧問。他強調科學化的身體對齊與防傷訓練，擅長將專業的體能訓練理論轉化為一般大眾也能執行的健康計畫。著有《跑步教科書》、《正確的深呼吸》等極具實用價值的運動書籍。",
        "career": "體能訓練師 / 運動專家 / 作家",
        "achievements": ["頂尖運動員指定教練", "日本跑步健身權威"],
        "has_detailed_bio": true
    },
    "張磊": {
        "name_zh": "張磊 (Zhang Lei)",
        "bio": "高瓴資本（Hillhouse Capital）創始人。他是當代中國投資界的領軍人物，堅持「長線思考」與「重倉中國」。他畢業於中國人民大學與耶魯大學，是巴菲特價值投資哲學的實踐者。其著作《價值》不僅詳述了他的投資體系，更分享了他對科技創新、產業變遷與企業文化的深刻洞見。",
        "career": "高瓴資本創辦人 / 投資家 / 慈善家",
        "achievements": ["高瓴資本創辦人", "耶魯大學校務委員會成員"],
        "has_detailed_bio": true
    },
    "Juliet Funt": {
        "name_zh": "朱麗葉·福恩特",
        "bio": "全球知名的效率專家、Juliet Funt Group 執行長，長期擔任財富 500 強企業的諮詢顧問。她提出了「留白」（White Space）的概念，倡導透過有意識的暫停與休息來提升工作的創造力與投入度。其著作《留白力》（A Minute to Think）為深陷瞎忙循環的現代職場提供了可執行的減法策略，深獲管理界好評。",
        "career": "效率專家 / 企業顧問 / 演說家",
        "achievements": ["White Space at Work 創辦人", "全球熱門管理演說家"],
        "has_detailed_bio": true
    },
    "Susan David": {
        "name_zh": "蘇珊·戴維",
        "bio": "哈佛醫學院心理學教授、著名管理思想家。她致力於研究情緒智慧、適應力與自我領導。其著作《情緒靈敏力》（Emotional Agility）榮登《華爾街日報》暢銷榜首。她的 TED 演講「情緒勇氣的力量」觀看量突破百萬。她曾入選 Thinkers50 全球最具影響力管理思想家，是當前情緒研究領域的權威。",
        "career": "哈佛心理學教授 / 管理思想家 / 作家",
        "achievements": ["《情緒靈敏力》作者", "Thinkers50 榜上名家"],
        "has_detailed_bio": true
    },
    "Ozan Varol": {
        "name_zh": "歐贊·瓦羅",
        "bio": "火箭科學家、著名法學教授與演說家。他出生於土耳其，曾參與美國太空總署（NASA）的「火星探測漫遊者」任務。他擅長將航太工程的精密邏輯應用於日常決策與創新思考。其著作《像火箭科學家一樣思考》教導讀者如何突破思維框架、解決艱難問題，已成為矽谷與創業圈的熱門讀物。",
        "career": "火箭科學家 / 思想領袖 / 法學教授",
        "achievements": ["NASA 火星計畫參與者", "《像火箭科學家一樣思考》作者"],
        "has_detailed_bio": true
    },
    "Shane Parrish": {
        "name_zh": "夏恩·帕里什",
        "bio": "知名知識社群 Farnam Street (FS) 創辦人。他曾為加拿大情報機構工作，現致力於研究成功的決策者與大師如何思考。其部落格與電子報深受華爾街投資者與全球 CEO 推崇。他擅長提煉「心智模型」（Mental Models），其著作《清晰思考》（Clear Thinking）深入淺出地講解了如何避免情緒干擾、做出更理性決策的實務方法。",
        "career": "決策分析專家 / Farnam Street 創辦人 / 作家",
        "achievements": ["心智模型研究領軍人物", "《清晰思考》作者"],
        "has_detailed_bio": true
  }
};

// Update authors.json
const updatedAuthors = authors.map(a => {
    if (bioUpdates[a.name]) {
        return { ...a, ...bioUpdates[a.name] };
    }
    return a;
});

fs.writeFileSync(authorsPath, JSON.stringify(updatedAuthors, null, 2));

console.log('Book and Author Verification/Cleanup Success.');
