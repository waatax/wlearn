const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));
const batches = [1, 2, 3, 4, 5, 6, 7];
let total = 0;

for (const n of batches) {
        const file = path.join(__dirname, `desc_batch${n}.json`);
        if (!fs.existsSync(file)) { console.log(`Skip batch ${n}`); continue; }
        const map = JSON.parse(fs.readFileSync(file, 'utf8'));
        let count = 0;
        for (const [id, desc] of Object.entries(map)) {
                const book = data.find(b => b.id === id);
                if (book) { book.description_cn = desc; count++; }
        }
        console.log(`Batch ${n}: updated ${count} books`);
        total += count;
}

// Also fix the last missing author
const b145 = data.find(b => b.id === 'book_145');
if (b145 && !b145.author) { b145.author = '波波夫'; total++; }

fs.writeFileSync('public/books.json', JSON.stringify(data, null, 2), 'utf8');

// Stats
const withAuthor = data.filter(b => b.author).length;
const withDesc = data.filter(b => b.description_cn && b.description_cn.length > 30).length;
const nonPrivate = data.filter(b => (b.title_cn || '') !== '[Private video]').length;
console.log(`\nTotal updated: ${total}`);
console.log(`Books with author: ${withAuthor}/${data.length}`);
console.log(`Books with real description: ${withDesc}/${data.length}`);
console.log(`Non-private books: ${nonPrivate}`);
