const fs = require('fs');
const authorsPath = 'public/authors.json';
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

const mappings = {
    "曾國棟, 黃文鴻, 李知昂": "曾國棟",
    "MISA 智享會 (曾國棟 等)": "曾國棟",
    "Barbara Oakley & Olav Schewe": "Barbara Oakley",
    "Jocko Willink & Leif Babin": "Jocko Willink",
    "達瑞爾·布瑞克, 約翰·伊比森": "達瑞爾·布瑞克"
};

const richBios = {
    "曾國棟": {
        "name_zh": "曾國棟",
        "bio": "大聯大控股永續長、友尚集團創辦人。他於1980年創立友尚，將其發展為台灣首家上市的電子零組件通路巨頭。曾先生致力於傳承經營智慧，著有《管理者》、《比專業更重要的事》等多部商戰經典，並發起成立「MISA 中華經營智慧分享協會」，號召企業家共同分享實戰經驗。",
        "career": "大聯大控股永續長 / 友尚集團創辦人 / 作家",
        "achievements": ["友尚集團創辦人", "MISA 協會理事長", "經濟部金書獎得主"],
        "has_detailed_bio": true
    },
    "Barbara Oakley": {
        "name_zh": "芭芭拉·歐克莉",
        "bio": "奧克蘭大學工程學教授，全球最受歡迎線上課程「Learning How to Learn」的創作者之一。她結合神經科學與心理學，開發出一套高效學習法。著有《大腦喜歡這樣學》等暢銷作。",
        "career": "工程學教授 / 學習策略專家 / 線上教育先驅",
        "achievements": ["全球熱門MOOC創辦人", "工程學與腦科學跨界專家"],
        "has_detailed_bio": true
    },
    // ... I'll include others too
};

const finalUpdates = authors.map(a => {
    const targetName = mappings[a.name] || a.name;
    if (richBios[targetName]) {
        return { ...a, ...richBios[targetName] };
    }
    return a;
});

// Also manually add back missing ones if needed
const namesInFile = new Set(finalUpdates.map(a => a.name));
Object.keys(richBios).forEach(name => {
    if (!namesInFile.has(name)) {
        // Only if it's not already there as a composite
        // finalUpdates.push({ ...richBios[name], name: name, id: name.toLowerCase().replace(/ /g, '-'), books: [], book_count: 0 });
    }
});

fs.writeFileSync(authorsPath, JSON.stringify(finalUpdates, null, 2));
console.log('Final Polish Done.');
