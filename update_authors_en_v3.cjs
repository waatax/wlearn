const fs = require('fs');
const authorsPath = 'public/authors.json';
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

const nameMap = {
  "柿內尚文": "Naofumi Kakiuchi",
  "岡野純": "Jun Okano",
  "三浦崇典": "Takanori Miura",
  "樺澤紫苑": "Shion Kabasawa",
  "メンタリスト DaiGo": "Mentalist DaiGo",
  "及川幸久": "Yuki Oikawa",
  "鈴木祐": "Yu Suzuki",
  "井上裕之": "Hiroyuki Inoue",
  "野口悠紀雄": "Yukio Noguchi",
  "出口治明": "Haruaki Deguchi",
  "堀江貴文": "Takafumi Horie",
  "DaiGo": "Mentalist DaiGo",
  "勝間和代": "Kazuyo Katsuma",
  "西野亮廣": "Akihiro Nishino",
  "西野 亮廣": "Akihiro Nishino",
  "前田裕二": "Yuji Maeda",
  "前田 裕二": "Yuji Maeda",
  "佐藤可士和": "Kashiwa Sato",
  "池上彰": "Akira Ikegami",
  "佐藤優": "Masaru Sato",
  "齋藤孝": "Takashi Saito"
};

const updatedAuthors = authors.map(a => {
    const cleanName = a.name.trim();
    if (nameMap[cleanName]) {
        a.name_en = nameMap[cleanName];
    } else if (a.name_zh && nameMap[a.name_zh.trim()]) {
        a.name_en = nameMap[a.name_zh.trim()];
    }
    
    // Auto latin for any Latin-looking name
    if (!a.name_en && /^[A-Za-zÀ-ÖØ-öø-ÿ\s.\-&',]+$/.test(cleanName)) {
        a.name_en = cleanName;
    }
    
    return a;
});

fs.writeFileSync(authorsPath, JSON.stringify(updatedAuthors, null, 2));
console.log('Authors updated with more Japanese names.');
