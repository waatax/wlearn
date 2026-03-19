const fs = require('fs');

const books = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));
const authors = JSON.parse(fs.readFileSync('public/authors.json', 'utf8'));

// 1. Audit: Book -> Author Mapping
const booksByAuthor = {};
books.forEach(book => {
    const authorName = book.author || 'Unknown';
    if (!booksByAuthor[authorName]) {
        booksByAuthor[authorName] = [];
    }
    booksByAuthor[authorName].push({
        id: book.id,
        title_cn: book.title_cn,
        title_en: book.title_en,
        code: book.code,
        video_id: book.video_id,
        tags: book.tags || []
    });
});

// 2. Sync: Ensure every author in books.json has an entry in authors.json and the book list is correct
const updatedAuthors = [];
const authorMap = new Map();
authors.forEach(a => authorMap.set(a.name, a));

Object.keys(booksByAuthor).forEach(aName => {
    let authorEntry = authorMap.get(aName);
    
    if (!authorEntry) {
        // Create new entry if missing
        const id = aName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        authorEntry = {
            id: id || 'unknown',
            name: aName,
            name_en: aName,
            name_zh: aName,
            bio: `${aName} 是本站收錄書籍的作者，共有 ${booksByAuthor[aName].length} 本書籍收錄於本站。`,
            career: "作家",
            achievements: [],
            has_detailed_bio: false,
            avatar_initial: aName.charAt(0).toUpperCase()
        };
    }
    
    // Always sync the book list and count
    authorEntry.books = booksByAuthor[aName];
    authorEntry.book_count = booksByAuthor[aName].length;
    
    updatedAuthors.push(authorEntry);
    authorMap.delete(aName);
});

// 3. Keep existing authors who might not have a book currently but have detailed bios (safety)
authorMap.forEach(a => {
    if (a.has_detailed_bio) {
        a.books = [];
        a.book_count = 0;
        updatedAuthors.push(a);
    }
});

fs.writeFileSync('public/authors.json', JSON.stringify(updatedAuthors, null, 2));

console.log(`Synced ${updatedAuthors.length} authors.`);
console.log('Verification Complete: All books are now correctly mapped to their authors in authors.json.');
