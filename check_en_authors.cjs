const fs = require('fs');
const books = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));
const authors = JSON.parse(fs.readFileSync('public/authors.json', 'utf8'));

const authorMap = {};
authors.forEach(a => {
    authorMap[a.name] = a;
    if (a.name_zh) authorMap[a.name_zh] = a;
});

const issues = [];
books.forEach(b => {
    if (b.original_language && b.original_language !== 'zh') {
        const auth = authorMap[b.author];
        if (!auth || !auth.name_en || !/^[A-Za-z\s.\-&',]+$/.test(auth.name_en)) {
            issues.push({ bookId: b.id, title: b.title_cn || b.title_en, author: b.author, lang: b.original_language, authMatch: auth ? auth.name_en : 'NOT FOUND' });
        }
    }
});

if (issues.length > 0) {
    console.log('Issues found with non-Chinese books lacking Latin author names:');
    console.log(JSON.stringify(issues, null, 2));
} else {
    console.log('All non-Chinese books have Latin author names confirmed.');
}
