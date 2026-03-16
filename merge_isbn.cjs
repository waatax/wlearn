const fs = require('fs');
const path = require('path');

const BOOKS_PATH = path.join(__dirname, 'public', 'books.json');
const RESULTS_PATH = path.join(__dirname, 'public', 'isbn_results.json');

if (!fs.existsSync(RESULTS_PATH)) {
    console.error('isbn_results.json not found!');
    process.exit(1);
}

const books = JSON.parse(fs.readFileSync(BOOKS_PATH, 'utf8'));
const results = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf8'));

let count = 0;
const updatedBooks = books.map(book => {
    const res = results[book.id];
    if (res && res.status === 'success') {
        count++;
        return {
            ...book,
            isbn_en: res.isbn_en || book.isbn_en,
            isbn_zh: res.isbn_zh || book.isbn_zh,
            original_language: res.original_language || book.original_language
        };
    }
    return book;
});

fs.writeFileSync(BOOKS_PATH, JSON.stringify(updatedBooks, null, 2));
console.log(`Successfully merged ISBN data for ${count} books.`);
