const fs = require('fs');
const authorsPath = 'public/authors.json';
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

const nameMap = {
  "及川幸久": "Yuki Oikawa",
  "鈴木祐": "Yu Suzuki",
  "井上裕之": "Hiroyuki Inoue",
  "野口悠紀雄": "Yukio Noguchi",
  "出口治明": "Haruaki Deguchi",
  "堀江貴文": "Takafumi Horie",
  "DaiGo": "Mentalist DaiGo",
  "勝間和代": "Kazuyo Katsuma",
  "西野亮廣": "Akihiro Nishino",
  "前田裕二": "Yuji Maeda",
  "佐藤可士和": "Kashiwa Sato",
  "池上彰": "Akira Ikegami",
  "佐藤優": "Masaru Sato",
  "齋藤孝": "Takashi Saito",
  "山下英子": "Hideko Yamashita",
  "本田健": "Ken Honda",
  "岸見一郎": "Ichiro Kishimi",
  "中島聰": "Satoshi Nakajima",
  "古賀史健": "Fumitake Koga",
  "美木良介": "Ryosuke Miki",
  "剛剛好": "Time Just Right",
  "黃文鴻": "Huang Wen-hung",
  "李知昂": "Li Chih-ang",
  "張誠忠": "Chang Cheng-chung",
  "陳立飛": "Chen Lifei",
  "美目良介": "Ryosuke Miki",
};

const updatedAuthors = authors.map(a => {
    if (nameMap[a.name]) {
        a.name_en = nameMap[a.name];
    } else if (nameMap[a.name_zh]) {
        a.name_en = nameMap[a.name_zh];
    }
    
    // Fallback for names that are already mostly Latin but have accents
    if (!a.name_en && /^[A-Za-zÀ-ÖØ-öø-ÿ\s.\-&',]+$/.test(a.name)) {
        a.name_en = a.name;
    }
    
    return a;
});

fs.writeFileSync(authorsPath, JSON.stringify(updatedAuthors, null, 2));
console.log('Authors updated with Japanese and accented names.');
