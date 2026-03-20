#!/usr/bin/env node
/**
 * ISBN-First 書籍驗證器
 * 
 * 驗證邏輯：
 * 1. 檢查 ISBN 格式是否正確（ISBN-10 / ISBN-13 校驗碼）
 * 2. 標記可疑的 ISBN（如：英文 ISBN 出現在 isbn_zh 欄位）
 * 3. 檢查書名中文 vs 英文是否與 ISBN 語言區段吻合
 * 4. 生成需要人工確認的清單
 * 
 * 使用方式：
 *   node 05_isbn_validator.cjs [--fix] [--limit N]
 */

const fs = require('fs');
const path = require('path');

const BOOKS_PATH = path.join(__dirname, '..', '..', 'public', 'books.json');
const AUTHORS_PATH = path.join(__dirname, '..', '..', 'public', 'authors.json');

// ─────────────────────────────────────
// ISBN 工具函式
// ─────────────────────────────────────

/** 純數字化（移除連字號） */
function normalizeISBN(isbn) {
  if (!isbn) return '';
  return String(isbn).replace(/[-\s]/g, '');
}

/** 驗證 ISBN-13 校驗碼 */
function isValidISBN13(isbn) {
  const digits = normalizeISBN(isbn);
  if (digits.length !== 13 || !/^\d{13}$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return check === parseInt(digits[12]);
}

/** 驗證 ISBN-10 校驗碼 */
function isValidISBN10(isbn) {
  const digits = normalizeISBN(isbn);
  if (digits.length !== 10) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    if (!/\d/.test(digits[i])) return false;
    sum += parseInt(digits[i]) * (10 - i);
  }
  const last = digits[9];
  const checkVal = last === 'X' || last === 'x' ? 10 : parseInt(last);
  if (isNaN(checkVal)) return false;
  return (sum + checkVal) % 11 === 0;
}

/** 判斷 ISBN 是否有效 */
function isValidISBN(isbn) {
  const norm = normalizeISBN(isbn);
  if (norm.length === 13) return isValidISBN13(norm);
  if (norm.length === 10) return isValidISBN10(norm);
  return false;
}

/**
 * 從 ISBN-13 的地區段（Registration Group）推斷語言
 * 
 * ISBN-13 結構：978-{group}-{publisher}-{title}-{check}
 * 常見 group 碼：
 *   0, 1    = 英語系 (US, UK, AU, etc.)
 *   2       = 法語系
 *   3       = 德語系
 *   4       = 日本
 *   7       = 中國大陸
 *   89      = 韓國
 *   957, 986, 626 = 台灣
 *   962, 988 = 香港
 *   99937   = 澳門
 */
function guessISBNLanguage(isbn) {
  const norm = normalizeISBN(isbn);
  if (norm.length !== 13) return 'unknown';
  
  const prefix = norm.slice(0, 3); // 978 or 979
  const rest = norm.slice(3);
  
  if (prefix !== '978' && prefix !== '979') return 'unknown';
  
  // 依 Registration Group 判斷
  if (rest.startsWith('0') || rest.startsWith('1')) return 'en';
  if (rest.startsWith('2')) return 'fr';
  if (rest.startsWith('3')) return 'de';
  if (rest.startsWith('4')) return 'ja';
  if (rest.startsWith('7')) return 'zh-cn';
  if (rest.startsWith('89')) return 'ko';
  if (rest.startsWith('957') || rest.startsWith('986') || rest.startsWith('626')) return 'zh-tw';
  if (rest.startsWith('962') || rest.startsWith('988')) return 'zh-hk';
  if (rest.startsWith('84')) return 'es';
  if (rest.startsWith('5')) return 'ru';
  if (rest.startsWith('65')) return 'pt-br';
  
  return 'other';
}

/** 判斷字串是否含有中文字元 */
function hasChinese(str) {
  return /[\u4e00-\u9fff]/.test(str || '');
}

// ─────────────────────────────────────
// 主要驗證邏輯
// ─────────────────────────────────────

function validateBooks() {
  const books = JSON.parse(fs.readFileSync(BOOKS_PATH, 'utf8'));
  const authors = JSON.parse(fs.readFileSync(AUTHORS_PATH, 'utf8'));

  const issues = [];

  books.forEach(book => {
    const bookIssues = [];
    const isbnZh = normalizeISBN(book.isbn_zh);
    const isbnEn = normalizeISBN(book.isbn_en);

    // ── Check 1: ISBN 格式校驗 ──
    if (isbnZh) {
      if (!isValidISBN(isbnZh)) {
        bookIssues.push({
          type: 'INVALID_ISBN',
          field: 'isbn_zh',
          value: isbnZh,
          message: `ISBN-${isbnZh.length} 校驗碼不正確`
        });
      }
    }
    if (isbnEn) {
      if (!isValidISBN(isbnEn)) {
        bookIssues.push({
          type: 'INVALID_ISBN',
          field: 'isbn_en',
          value: isbnEn,
          message: `ISBN-${isbnEn.length} 校驗碼不正確`
        });
      }
    }

    // ── Check 2: ISBN 語言區段 vs 欄位名不匹配 ──
    if (isbnZh && isValidISBN(isbnZh)) {
      const lang = guessISBNLanguage(isbnZh);
      if (lang === 'en') {
        bookIssues.push({
          type: 'ISBN_LANG_MISMATCH',
          field: 'isbn_zh',
          value: isbnZh,
          detectedLang: lang,
          message: `isbn_zh 欄位存放的是英語系 ISBN（978-0/1 開頭），應改放 isbn_en`
        });
      } else if (lang === 'ja') {
        bookIssues.push({
          type: 'ISBN_LANG_MISMATCH',
          field: 'isbn_zh',
          value: isbnZh,
          detectedLang: lang,
          message: `isbn_zh 欄位存放的是日文 ISBN（978-4 開頭），考慮是否需要 isbn_ja`
        });
      } else if (lang === 'ko') {
        bookIssues.push({
          type: 'ISBN_LANG_MISMATCH',
          field: 'isbn_zh',
          value: isbnZh,
          detectedLang: lang,
          message: `isbn_zh 欄位存放的是韓文 ISBN（978-89 開頭），考慮是否需要 isbn_ko`
        });
      }
    }

    // ── Check 3: 有中文書名但 ISBN 是非中文區段 ──
    if (isbnZh && hasChinese(book.title_cn) && isValidISBN(isbnZh)) {
      const lang = guessISBNLanguage(isbnZh);
      if (lang === 'en') {
        bookIssues.push({
          type: 'TITLE_ISBN_CONFLICT',
          field: 'isbn_zh',
          value: isbnZh,
          message: `書名「${book.title_cn}」是中文，但 ISBN 屬於英語系，可能使用了原文 ISBN 而非中文翻譯版 ISBN`
        });
      }
    }

    // ── Check 4: ISBN 重複（同一個 ISBN 出現在多本書中） ──
    // （在主函式最後統一檢查）

    // ── Check 5: 作者在 authors.json 中不存在 ──
    if (book.author) {
      const authorInList = authors.find(au =>
        au.books && au.books.some(ab => ab.id === book.id)
      );
      if (!authorInList) {
        bookIssues.push({
          type: 'ORPHAN_BOOK',
          message: `書籍 "${book.title_cn}" 的作者「${book.author}」在 authors.json 中沒有對應條目`
        });
      }
    }

    // ── Check 6: 沒有任何 ISBN ──
    if (!isbnZh && !isbnEn) {
      bookIssues.push({
        type: 'MISSING_ISBN',
        message: '缺少所有 ISBN 欄位'
      });
    }

    if (bookIssues.length > 0) {
      issues.push({
        id: book.id,
        title_cn: book.title_cn,
        title_en: book.title_en,
        author: book.author,
        isbn_zh: book.isbn_zh || '',
        isbn_en: book.isbn_en || '',
        issues: bookIssues
      });
    }
  });

  // ── 全局 Check 4: ISBN 重複 ──
  const isbnMap = {};
  books.forEach(book => {
    [book.isbn_zh, book.isbn_en].forEach(isbn => {
      const norm = normalizeISBN(isbn);
      if (!norm) return;
      if (!isbnMap[norm]) isbnMap[norm] = [];
      isbnMap[norm].push(book.id);
    });
  });
  Object.entries(isbnMap).forEach(([isbn, ids]) => {
    if (ids.length > 1) {
      ids.forEach(id => {
        const existing = issues.find(i => i.id === id);
        const issue = {
          type: 'DUPLICATE_ISBN',
          value: isbn,
          message: `ISBN ${isbn} 被多本書共用：${ids.join(', ')}`
        };
        if (existing) {
          existing.issues.push(issue);
        } else {
          const book = books.find(b => b.id === id);
          issues.push({
            id, title_cn: book?.title_cn, author: book?.author,
            isbn_zh: book?.isbn_zh || '', issues: [issue]
          });
        }
      });
    }
  });

  return { issues, totalBooks: books.length, booksWithISBN: books.filter(b => b.isbn_zh || b.isbn_en).length };
}

// ─────────────────────────────────────
// 報告輸出
// ─────────────────────────────────────

function generateReport(result) {
  const { issues, totalBooks, booksWithISBN } = result;

  // 分類
  const byType = {};
  issues.forEach(item => {
    item.issues.forEach(iss => {
      if (!byType[iss.type]) byType[iss.type] = [];
      byType[iss.type].push({ ...iss, bookId: item.id, title: item.title_cn, author: item.author });
    });
  });

  console.log('═══════════════════════════════════════');
  console.log('  ISBN-First 書籍驗證報告');
  console.log('═══════════════════════════════════════');
  console.log(`  總書籍數：${totalBooks}`);
  console.log(`  有 ISBN：${booksWithISBN}`);
  console.log(`  無 ISBN：${totalBooks - booksWithISBN}`);
  console.log(`  有問題的書：${issues.length}`);
  console.log('');

  const typeLabels = {
    'INVALID_ISBN':       '❌ ISBN 校驗碼錯誤',
    'ISBN_LANG_MISMATCH': '🔀 ISBN 語言欄位不匹配',
    'TITLE_ISBN_CONFLICT':'⚠️  書名語言與 ISBN 衝突',
    'DUPLICATE_ISBN':     '🔁 ISBN 重複',
    'ORPHAN_BOOK':        '👤 孤兒書籍（作者缺失）',
    'MISSING_ISBN':       '📭 缺少 ISBN',
  };

  Object.entries(byType).forEach(([type, items]) => {
    if (type === 'MISSING_ISBN') {
      console.log(`\n${typeLabels[type] || type}：${items.length} 本`);
      return; // 太多，不逐一列出
    }
    console.log(`\n${typeLabels[type] || type}：${items.length} 本`);
    console.log('─'.repeat(60));
    items.forEach(item => {
      console.log(`  ${item.bookId}: ${(item.title || '').slice(0, 20)} | ${(item.author || '').slice(0, 15)}`);
      console.log(`    → ${item.message}`);
    });
  });

  // 寫 JSON 結果
  const outPath = path.join(__dirname, 'isbn_audit_result.json');
  fs.writeFileSync(outPath, JSON.stringify({ summary: { totalBooks, booksWithISBN, issueCount: issues.length }, issues }, null, 2), 'utf8');
  console.log(`\n📄 完整結果已輸出至：${outPath}`);
}

// ─────────────────────────────────────
// 執行
// ─────────────────────────────────────
const result = validateBooks();
generateReport(result);
