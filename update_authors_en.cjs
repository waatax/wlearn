const fs = require('fs');
const authorsPath = 'public/authors.json';
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

const nameMap = {
  "吳淡如": "Betty Wu",
  "樊登": "Fan Deng",
  "李笑來": "Li Xiaolai",
  "采銅": "Cai Tong",
  "劉奕酉": "Liu Yiyou",
  "曾國棟": "Tseng Kuo-tung",
  "山下英子": "Hideko Yamashita",
  "本田健": "Ken Honda",
  "岸見一郎": "Ichiro Kishimi",
  "何飛鵬": "He Feipeng",
  "蔡叔": "Cai Shu",
  "貓叔": "Mao Shu",
  "尹慕言": "Yin Muyan",
  "張萌": "Zhang Meng",
  "崖麗娟": "Ya Lijuan",
  "趙彥春": "Zhao Yanchun",
  "舒婭": "Shu Ya",
  "陳恆霖": "Chen Henglin",
  "賴婷婷": "Lai Ting-ting",
  "中島聰": "Satoshi Nakajima",
  "美木良介": "Ryosuke Miki",
  "剛剛好": "Time Just Right",
  "古賀史健": "Fumitake Koga",
  "黃文鴻": "Huang Wen-hung",
  "李知昂": "Li Chih-ang",
  "張誠忠": "Chang Cheng-chung",
  "陳立飛": "Chen Lifei",
  "美目良介": "Ryosuke Miki", // Corrected name variant
  "劉奕酉": "Liu Yiyou",
  "曾國棟": "TK Tseng",
  "莫凡": "Mo Fan",
  "傅盛": "Fu Sheng",
  "周嶺": "Zhou Ling",
  "李笑來": "Li Xiaolai",
  "剽悍一只貓": "Mao Shu (Jason)"
};

const updatedAuthors = authors.map(a => {
    // If name is already in English (Latin characters), set as name_en
    if (/^[A-Za-z\s.\-&',]+$/.test(a.name) && !a.name_en) {
        a.name_en = a.name;
    } else if (nameMap[a.name]) {
        a.name_en = nameMap[a.name];
    } else if (!a.name_en) {
        // Fallback: if name_zh is present, use Pinyin-like if needed or keep as name
        a.name_en = a.name; 
    }
    
    // Ensure name_zh is also present
    if (!a.name_zh && !/^[A-Za-z\s.\-&',]+$/.test(a.name)) {
        a.name_zh = a.name;
    }
    
    return a;
});

fs.writeFileSync(authorsPath, JSON.stringify(updatedAuthors, null, 2));
console.log('Authors updated with English names.');
