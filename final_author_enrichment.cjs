const fs = require('fs');
const authorsPath = 'public/authors.json';
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

const richBios = {
"曾國棟": { bio: "大聯大控股永續長、友尚集團創辦人。他於1980年創立友尚，將其發展為台灣首家上市的電子零組件通路巨頭。曾先生致力於傳承經營智慧，著有《管理者》、《比專業更重要的事》等多部商戰經典，並發起成立「MISA 中華經營智慧分享協會」。", career: "大聯大控股永續長 / 作家", achievements: ["友尚集團創辦人", "MISA 協會理事長"] },
"巨人傑": { bio: "台灣股市傳奇交易員，以驚人的交易量與精準的市場直覺聞名。從17歲進入股市，將50萬本金操作至年交易量破五千億。其著作《巨人思維》深度分享了其風險控管與交易哲學。", career: "資深交易員 / 暢銷作家", achievements: ["年交易量五千億記錄保持者", "《巨人思維》作者"] },
"樺澤紫苑": { bio: "日本著名的精神科醫師、作家及其受歡迎的知識型 YouTuber。他畢業於札幌醫科大學，專攻憂鬱症研究。著有《輸出大全》、《輸入大全》等超百萬冊暢銷作。", career: "精神科醫師 / 腦科學專家 / 作家", achievements: ["日本高產精神科醫師代表", "《輸出大全》作者"] },
"鎌田實": { bio: "日本長野縣諏訪中央病院名譽院長，著名醫生與作家。他長期致力於地域醫療與「不努力」健康法，強調身心放鬆對抗病與長壽的重要性。", career: "醫師 / 作家 / 社會活動家", achievements: ["諏訪中央病院名譽院長", "日本放送文化獎得主"] },
"佐佐木俊尚": { bio: "日本知名的科技媒體記者、評論家與作家。對網路社會、電子媒體與資訊策展（Curation）有著深刻的研究。其著作《策展的時代》引領大眾思考數位生活的新秩序。", career: "自由記者 / 科技評論家 / 作家", achievements: ["大川出版獎得主", "資訊策展概念推廣者"] },
"陳立飛": { bio: "知名自媒體人、寫作專家。以「Spenser」之名活躍。他倡導「寫作是最好的自我投資」，將普通人的寫作轉化為品牌與財富。著有《寫作是最好的投資》。", career: "個人品牌專家 / 暢銷作家", achievements: ["個人品牌經營大師", "《寫作是最好的投資》作者"] },
"鄭緯筌": { bio: "台灣資深媒體人、內容行銷專家。曾任《數位時代》主編。透過「Vista 寫作實驗室」幫助企業與個人提升表達力。其著作《內容感動行銷》是許多行銷人的必讀書。", career: "內容行銷專家 / 講師", achievements: ["Vista 寫作實驗室創辦人", "資深媒體轉型教練"] },
"中野．詹姆士．修一": { bio: "日本頂尖的身體機能訓練師、體能教練。他是多位世界級運動員（如福原愛）的私人教練。強調科學化的身體對齊與防傷訓練。著有《跑步教科書》。", career: "體能訓練師 / 運動專家", achievements: ["頂尖運動員指定教練", "日本跑步健身權威"] },
"張磊": { bio: "高瓴資本（Hillhouse Capital）創始人。他是當代中國投資界的領軍人物，堅持「長線思考」與「重倉中國」。著有《價值》，分享投資體系與企業文化洞見。", career: "高瓴資本創辦人 / 投資家", achievements: ["高瓴資本創辦人", "耶魯大學校務委員會成員"] },
"Juliet Funt": { bio: "全球知名的效率專家、Juliet Funt Group 執行長。她提出了「留白」（White Space）的概念，倡導透過有意識的暫停提升創造力。著有《留白力》。", career: "效率專家 / 企業顧問", achievements: ["White Space at Work 創辦人", "全球熱門管理演說家"] },
"Susan David": { bio: "哈佛醫學院心理學教授、著名管理思想家。其著作《情緒靈敏力》（Emotional Agility）榮登暢銷榜首。曾入選 Thinkers50 全球最具影響力管理思想家。", career: "哈佛心理學教授 / 管理思想家", achievements: ["《情緒靈敏力》作者", "Thinkers50 榜上名家"] },
"Ozan Varol": { bio: "火箭科學家、法學教授。曾參與 NASA 的「火星探測漫遊者」任務。其著作《像火箭科學家一樣思考》教導讀者如何突破思維框架、解決艱難問題。", career: "火箭科學家 / 思想領袖", achievements: ["NASA 火星計畫參與者", "《像火箭科學家一樣思考》作者"] },
"Shane Parrish": { bio: "知名知識社群 Farnam Street (FS) 創辦人。致力於研究決策者如何思考。其著作《清晰思考》（Clear Thinking）講解了如何避免情緒干擾、做出理性決策。", career: "決策分析專家 / 作家", achievements: ["Farnam Street 創辦人", "《清晰思考》作者"] },
"Jocko Willink": { bio: "前美國海軍海豹部隊指揮官，著有《極端統御》（Extreme Ownership）。他將戰場領導力轉化為商業管理原則，深受全球企業精英推崇。", career: "海豹部隊指揮官 / 領導力顧問", achievements: ["《極端統御》作者", "Echelon Front 聯合創辦人"] },
"Barbara Oakley": { bio: "奧克蘭大學工程學教授，全球最受歡迎線上課程「Learning How to Learn」創作者。著有《大腦喜歡這樣學》。", career: "工程學教授 / 學習策略專家", achievements: ["全球熱門MOOC創辦人", "工程學與腦科學跨界專家"] },
"David A. Kessler": { bio: "前美國 FDA 局長，醫學博士。致力於研究食品工業如何影響大腦。其著作《美食的侵蝕》（The End of Overeating）深刻解析了暴飲暴食的生理機制。", career: "前 FDA 局長 / 醫學博士", achievements: ["FDA 行政官員", "《美食的侵蝕》作者"] },
"舒婭": { bio: "心理諮商師，長期關注大腦認知與情緒管理。其作品《為什麼事情做不完，你還在滑手機？》深入剖析了拖延與情緒的關係。", career: "心理諮商師 / 作家", achievements: ["知名個人成長作家"] }
};

const mappings = {
    "曾國棟, 黃文鴻, 李知昂": "曾國棟",
    "MISA 智享會 (曾國棟 等)": "曾國棟",
    "Barbara Oakley & Olav Schewe": "Barbara Oakley",
    "Jocko Willink & Leif Babin": "Jocko Willink",
    "達瑞爾·布瑞克, 約翰·伊比森": "達瑞爾·布瑞克",
    "David A. Kessler, MD": "David A. Kessler"
};

const updated = authors.map(a => {
    const target = mappings[a.name] || a.name;
    if (richBios[target]) {
        return {
            ...a,
            ...richBios[target],
            name_zh: richBios[target].name_zh || target,
            has_detailed_bio: true
        };
    }
    return a;
});

fs.writeFileSync(authorsPath, JSON.stringify(updated, null, 2));
console.log('Finished deep author audit and bio enrichment.');
