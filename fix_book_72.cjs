const fs = require('fs');

const booksPath = 'public/books.json';
const authorsPath = 'public/authors.json';

const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

// 1. Update book_72
const b72 = books.find(b => b.id === 'book_72');
if (b72) {
    b72.author = "美木良介";
    b72.original_language = "ja";
}

fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));

// 2. Add/Update author "美木良介"
const rBio = {
    "name_zh": "美木良介",
    "bio": "日本知名演員、男歌手，也是「深長呼吸法」（Long Breath）的創始人。他因長期受劇烈腰痛所苦，在求醫無門下研發出這套透過呼吸強化核心肌群的健康法，不僅在 50 天內瘦下 13 公斤，更徹底根治腰痛。其著作《改善體質，你只需要深～呼～吸～》在亞洲引發強烈迴響，幫助無數讀者透過簡單的呼吸練習重獲健康。",
    "career": "演員 / 歌手 / 健康養生導師",
    "achievements": ["「深長呼吸法」創始人", "健康類暢銷書作者"],
    "has_detailed_bio": true
};

let authorFound = false;
const updatedAuthors = authors.map(a => {
    if (a.name === "美木良介" || a.name === "美目良介") {
        authorFound = true;
        return { ...a, ...rBio, name: "美木良介", name_zh: "美木良介" };
    }
    return a;
});

if (!authorFound) {
    updatedAuthors.push({
        id: "ryosuke-miki",
        name: "美木良介",
        name_zh: "美木良介",
        name_en: "Ryosuke Miki",
        ...rBio,
        book_count: 0,
        books: [],
        avatar_initial: "美"
    });
}

fs.writeFileSync(authorsPath, JSON.stringify(updatedAuthors, null, 2));

console.log('Fixed book_72 and enriched Ryosuke Miki bio.');
