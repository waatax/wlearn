// Script to fetch real book descriptions from 博客來 (books.com.tw)
// Uses search API to find each book, then scrapes the description
const fs = require('fs');
const https = require('https');
const http = require('http');

function fetch(url) {
        return new Promise((resolve, reject) => {
                const mod = url.startsWith('https') ? https : http;
                const req = mod.get(url, {
                        headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                                'Accept': 'text/html,application/xhtml+xml',
                                'Accept-Language': 'zh-TW,zh;q=0.9',
                        },
                        timeout: 10000,
                }, (res) => {
                        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                                return fetch(res.headers.location).then(resolve).catch(reject);
                        }
                        let data = '';
                        res.on('data', chunk => data += chunk);
                        res.on('end', () => resolve(data));
                });
                req.on('error', reject);
                req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
        });
}

async function searchBooksComTw(title) {
        try {
                const q = encodeURIComponent(title);
                const searchUrl = `https://search.books.com.tw/search/query/key/${q}/cat/all`;
                const html = await fetch(searchUrl);

                // Extract first product link
                const linkMatch = html.match(/href="(https:\/\/www\.books\.com\.tw\/products\/[^"]+)"/);
                if (!linkMatch) return null;

                const productUrl = linkMatch[1];
                const productHtml = await fetch(productUrl);

                // Extract description from product page
                // Look for the book description in the content section
                let desc = null;

                // Try multiple patterns for description extraction
                const patterns = [
                        /class="content"[^>]*>([\s\S]*?)<\/div>/,
                        /id="M014a_0"[^>]*>([\s\S]*?)<\/div>/,
                        /<div[^>]*class="[^"]*mod_b"[^>]*>([\s\S]*?)<\/div>/,
                        /內容簡介[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>/,
                ];

                for (const pattern of patterns) {
                        const m = productHtml.match(pattern);
                        if (m && m[1]) {
                                // Strip HTML tags
                                desc = m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').trim();
                                if (desc.length > 30) break;
                                desc = null;
                        }
                }

                // Also try to extract author from the page
                let author = null;
                const authorMatch = productHtml.match(/作者[：:]\s*<a[^>]*>([^<]+)<\/a>/);
                if (authorMatch) author = authorMatch[1].trim();

                return { description: desc, author, url: productUrl };
        } catch (e) {
                return null;
        }
}

async function searchKobo(title) {
        try {
                const q = encodeURIComponent(title);
                const searchUrl = `https://www.kobo.com/tw/zh/search?query=${q}`;
                const html = await fetch(searchUrl);

                // Extract first product link
                const linkMatch = html.match(/href="(\/tw\/zh\/[^"]*ebook[^"]*)"/);
                if (!linkMatch) return null;

                const productUrl = `https://www.kobo.com${linkMatch[1]}`;
                const productHtml = await fetch(productUrl);

                // Extract synopsis
                const synopsisMatch = productHtml.match(/class="synopsis-description"[^>]*>([\s\S]*?)<\/div>/);
                if (!synopsisMatch) return null;

                const desc = synopsisMatch[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
                return { description: desc.length > 30 ? desc : null };
        } catch (e) {
                return null;
        }
}

async function main() {
        const data = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));

        // Identify books with generic/bad descriptions
        const genericPhrases = [
                '這部作品深入探討人類思維的本質和運作方式',
                '這是一部關於個人發展和自我提升的著作',
                '探討如何在現代社會中實現個人成長和專業發展',
                '這本書探討如何設定和實現有意義的目標',
        ];

        const needsFix = data.filter(b => {
                if (!b.description_cn) return true;
                return genericPhrases.some(p => b.description_cn.includes(p));
        }).filter(b => b.title_cn && b.title_cn !== '[Private video]');

        console.log(`Books needing description fix: ${needsFix.length}`);

        let fixed = 0;
        let failed = 0;

        for (let i = 0; i < needsFix.length; i++) {
                const book = needsFix[i];
                const title = book.title_cn;
                console.log(`[${i + 1}/${needsFix.length}] Searching: ${title}`);

                // Try 博客來 first
                let result = await searchBooksComTw(title);

                if (result && result.description) {
                        // Truncate to reasonable length (max 500 chars)
                        const desc = result.description.length > 500
                                ? result.description.substring(0, 500) + '...'
                                : result.description;
                        book.description_cn = desc;
                        if (result.author && !book.author) book.author = result.author;
                        fixed++;
                        console.log(`  ✓ Found on 博客來 (${desc.length} chars)`);
                } else {
                        failed++;
                        console.log(`  ✗ Not found`);
                }

                // Rate limiting - wait 500ms between requests
                await new Promise(r => setTimeout(r, 500));

                // Save every 10 books
                if ((i + 1) % 10 === 0) {
                        fs.writeFileSync('public/books.json', JSON.stringify(data, null, 2), 'utf8');
                        console.log(`  [Saved progress: ${fixed} fixed, ${failed} failed]`);
                }
        }

        // Final save
        fs.writeFileSync('public/books.json', JSON.stringify(data, null, 2), 'utf8');
        console.log(`\nDone! Fixed: ${fixed}, Failed: ${failed}, Total processed: ${needsFix.length}`);
}

main().catch(console.error);
