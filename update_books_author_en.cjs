const fs = require('fs');
const booksPath = 'public/books.json';
const authorsPath = 'public/authors.json';
const books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));
const authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));

const authorMap = {};
authors.forEach(a => {
    authorMap[a.name] = a.name_en || a.name;
});

const updatedBooks = books.map(b => {
    if (authorMap[b.author]) {
        b.author_en = authorMap[b.author];
    } else {
        b.author_en = b.author;
    }
    return b;
});

fs.writeFileSync(booksPath, JSON.stringify(updatedBooks, null, 2));
console.log('Books updated with author_en.');
