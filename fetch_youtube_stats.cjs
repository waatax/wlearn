// Fetch YouTube view counts for all books
// Uses YouTube's oEmbed endpoint (no API key needed) + page scraping fallback
const fs = require('fs');
const https = require('https');

const books = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));

function extractVideoId(url) {
        if (!url) return null;
        const m = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
        return m ? m[1] : null;
}

function fetchPage(url) {
        return new Promise((resolve, reject) => {
                https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
                        let data = '';
                        res.on('data', chunk => data += chunk);
                        res.on('end', () => resolve(data));
                }).on('error', reject);
        });
}

async function getViewCount(videoId) {
        try {
                const html = await fetchPage(`https://www.youtube.com/watch?v=${videoId}`);
                // Try to extract view count from page meta
                const m = html.match(/"viewCount":"(\d+)"/);
                if (m) return parseInt(m[1]);
                // Try alternate pattern
                const m2 = html.match(/viewCount\\?":\\?"(\d+)/);
                if (m2) return parseInt(m2[1]);
                return null;
        } catch (e) {
                return null;
        }
}

async function main() {
        const stats = {};
        const total = books.filter(b => b.video_id && b.title_cn !== '[Private video]').length;
        let done = 0;

        console.log(`Fetching view counts for ${total} books...`);

        // Process in batches of 5 to avoid overwhelming
        const validBooks = books.filter(b => b.video_id && b.title_cn !== '[Private video]');

        for (let i = 0; i < validBooks.length; i += 5) {
                const batch = validBooks.slice(i, i + 5);
                const results = await Promise.all(batch.map(async (book) => {
                        const cnViews = await getViewCount(book.video_id);

                        let enViews = null;
                        const enVideoId = extractVideoId(book.english_url);
                        if (enVideoId) {
                                enViews = await getViewCount(enVideoId);
                        }

                        done++;
                        if (done % 10 === 0) console.log(`  Progress: ${done}/${total}`);

                        return {
                                id: book.id,
                                cn_views: cnViews,
                                en_views: enViews,
                        };
                }));

                results.forEach(r => { stats[r.id] = r; });

                // Small delay between batches
                await new Promise(r => setTimeout(r, 200));
        }

        // Merge stats back into books data for the dashboard
        const output = validBooks.map(book => {
                const s = stats[book.id] || {};
                return {
                        id: book.id,
                        title_cn: book.title_cn,
                        title_en: book.title_en,
                        author: book.author,
                        code: book.code,
                        video_id: book.video_id,
                        english_video_id: extractVideoId(book.english_url),
                        cn_views: s.cn_views || 0,
                        en_views: s.en_views || 0,
                        total_views: (s.cn_views || 0) + (s.en_views || 0),
                        thumbnail: `https://img.youtube.com/vi/${book.video_id}/mqdefault.jpg`,
                        tags: book.tags,
                };
        }).sort((a, b) => b.total_views - a.total_views);

        fs.writeFileSync('public/youtube_stats.json', JSON.stringify(output, null, 2), 'utf8');

        const withCn = output.filter(b => b.cn_views > 0).length;
        const withEn = output.filter(b => b.en_views > 0).length;
        console.log(`\nDone! Saved to public/youtube_stats.json`);
        console.log(`Books with CN views: ${withCn}`);
        console.log(`Books with EN views: ${withEn}`);
        console.log(`Top 5:`);
        output.slice(0, 5).forEach((b, i) => {
                console.log(`  ${i + 1}. ${b.title_cn} — CN:${b.cn_views} EN:${b.en_views} Total:${b.total_views}`);
        });
}

main().catch(console.error);
