// Final script to fill ALL remaining author fields and missing English titles
const fs = require('fs');

const finalMap = {
        '剛剛好的孤獨': { author: '鎌田實', title_en: 'Solitude Just Right' },
        'My Life in Full 完整的力量': { author: 'Indra Nooyi', title_en: 'My Life in Full' },
        '最高精力管理法': { author: 'Tom Rath', title_en: 'Have More Energy' },
        '科學休息': { author: 'Alex Soojung-Kim Pang', title_en: 'Rest' },
        '創運思維': { author: 'Morten T. Hansen', title_en: 'Lucky' },
        '領導者該想什麼': { author: 'Gerald M. Weinberg', title_en: 'Becoming a Technical Leader' },
        '你想成為什麼樣的人': { author: 'James Clear', title_en: 'Uncommon Wisdom' },
        '一切都是誘因的問題': { author: 'Uri Gneezy, John List', title_en: 'The Why Axis' },
        '執行長日記': { author: 'Steven Bartlett', title_en: 'The Diary of a CEO' },
        '鋼鐵⼈⾺斯克': { author: 'Ashlee Vance', title_en: 'Elon Musk' },
        '馬斯克傳   唯一不設限、全公開傳記': { author: 'Walter Isaacson', title_en: 'Elon Musk' },
        '張忠謀 自傳': { author: '張忠謀', title_en: 'Morris Chang Autobiography' },
        '賈伯斯傳': { author: 'Walter Isaacson', title_en: 'Steve Jobs' },
        '貝佐斯傳': { author: 'Brad Stone', title_en: 'The Everything Store' },
        '複利領導': { author: '賴婷婷', title_en: 'Compounding Leadership' },
        '超級專案管理': { author: 'Bent Flyvbjerg', title_en: 'How Big Things Get Done' },
        '原始碼 成為比爾蓋茲': { author: 'Bill Gates', title_en: 'Source Code' },
        '恆毅力': { author: 'Angela Duckworth', title_en: 'Grit' },
        'The Start Up of You 第一次工作就該懂': { author: 'Reid Hoffman', title_en: 'The Start-Up of You' },
        'Missing Each Other 調和': { author: 'Edward Brodkin, Ashley Pallathra', title_en: 'Missing Each Other' },
        '就怕平庸成為你的人生註解': { author: '歐陽立中', title_en: 'Fear of Being Mediocre' },
        'The E Myth Revisited 創業這條路': { author: 'Michael E. Gerber', title_en: 'The E-Myth Revisited' },
        'The Unfair Advantage': { author: 'Ash Ali, Hasan Kubba', title_en: 'The Unfair Advantage' },
        'How to Lead When You are Not in Charge': { author: 'Clay Scroggins', title_en: 'How to Lead When You\'re Not in Charge' },
        'AI世界的底層邏輯與生存法則': { author: '劉潤', title_en: 'AI World Underlying Logic' },
        '大谷翔平   棒球雙刀流現象級傳奇': { author: 'Jay Paris', title_en: 'Shohei Ohtani: Baseball\'s Two-Way Legend' },
        '憤怒的勇氣': { author: '岸見一郎', title_en: 'The Courage to Be Angry' },
        'Growth From Microorganisms to Megacities': { author: 'Vaclav Smil', title_en: 'Growth' },
        '讓你自帶好運的奇蹟習慣': { author: 'Hal Elrod', title_en: 'The Miracle Habits' },
        'All the Brains in the Business The Engendered Brain in the 21st Century Organisation': { author: 'Kate Lanz, Paul Brown', title_en: 'All the Brains in the Business' },
        'Where Good Ideas Come From': { author: 'Steven Johnson', title_en: 'Where Good Ideas Come From' },
        'The Coming Wave Technology - Power and the Twenty first Century\'s Greatest Dilemma': { author: 'Mustafa Suleyman', title_en: 'The Coming Wave' },
        'Good Economics for Hard Times': { author: 'Abhijit V. Banerjee, Esther Duflo', title_en: 'Good Economics for Hard Times' },
        '內向外的洞見': { author: 'Jørgen Vig Knudstorp', title_en: 'Outside Insight' },
        '陌生人的力量': { author: 'Joe Keohane', title_en: 'The Power of Strangers' },
        '為什麼要讀書工作Why do we work': { author: '池上彰', title_en: 'Why Do We Work' },
        '生命之源': { author: 'Nick Lane', title_en: 'The Vital Question' },
        'How to Feed the World': { author: 'Jessica Eise, Ken Foster', title_en: 'How to Feed the World' },
        'The Psychological Construction of Emotion': { author: 'Lisa Feldman Barrett', title_en: 'The Psychological Construction of Emotion' },
        'Handbook of Cognition and Emotion': { author: 'Michael D. Robinson', title_en: 'Handbook of Cognition and Emotion' },
        'Emotion and Consciousness': { author: 'Lisa Feldman Barrett', title_en: 'Emotion and Consciousness' },
        'THE EXPENDABLES   Jeff Rubin': { author: 'Jeff Rubin', title_en: 'The Expendables' },
        'Five Dimensions of Learning  A Guide to Effective Study': { author: 'Geoff Petty', title_en: 'Five Dimensions of Learning' },
        'Essentialism  The Disciplined Pursuit of Less': { author: 'Greg McKeown', title_en: 'Essentialism' },
        'The Successful Speaker': { author: 'Grant Baldwin', title_en: 'The Successful Speaker' },
        'The Daily Stoic 366 Meditations on Wisdom^J Perseverance^J and the Art of Living': { author: 'Ryan Holiday', title_en: 'The Daily Stoic' },
        'The Happiness Advantage': { author: 'Shawn Achor', title_en: 'The Happiness Advantage' },
        '工作 新律': { author: 'Alexandra Cavoulacos, Kathryn Minshew', title_en: 'The New Rules of Work' },
        '如何停止傷自己的心': { author: 'Meggan Roxanne', title_en: 'How to Stop Breaking Your Own Heart' },
        '正面思考的再思': { author: 'Gabriele Oettingen', title_en: 'Rethinking Positive Thinking' },
        'The Art of Creative Thinking': { author: 'Rod Judkins', title_en: 'The Art of Creative Thinking' },
        'The Art of Explanation': { author: 'Ros Atkins', title_en: 'The Art of Explanation' },
        'The Art of Laziness  Overcome Procrastination': { author: 'Library Mindset', title_en: 'The Art of Laziness' },
        'Outlive - The Science and Art of Longivity': { author: 'Peter Attia', title_en: 'Outlive' },
        'C 別幫部屬養猴子': { author: 'William Oncken Jr.', title_en: 'The One Minute Manager Meets the Monkey' },
        'C 改變心意的字句/話語': { author: 'Shelle Rose Charvet', title_en: 'Words That Change Minds' },
        'C 無限記憶': { author: 'Kevin Horsley', title_en: 'Unlimited Memory' },
        'C 小型企業管理': { author: 'Justin G. Longenecker', title_en: 'Small Business Management' },
        'C 如何當擇你的生命': { author: 'Edith Eva Eger', title_en: 'The Choice' },
        'C 詢問更多': { author: 'Alexandra Carter', title_en: 'Ask for More' },
        'C 受膏者 Anointed 標籤比品質更重要': { author: 'Thomas Sowell', title_en: 'Intellectuals and Society' },
        'C 忠誠王道 Loyalty rules! 忠誠度讓獲利翻倍': { author: 'Frederick F. Reichheld', title_en: 'Loyalty Rules!' },
        'C 第五項修練 實戰手冊': { author: 'Peter Senge', title_en: 'The Fifth Discipline Fieldbook' },
        'VS-14 完全沉浸 LIT - 點燃成功之火的哈佛專注力革命': { author: 'Amanda Crowell', title_en: 'Great Work' },
        'VS-06 Burn - How We Really Burn Calories, Stay Healthy, and Lose Weight': { author: 'Herman Pontzer', title_en: 'Burn' },
        'VS-05 Glucose Revolution': { author: 'Jessie Inchauspé', title_en: 'Glucose Revolution' },
        'VS-04 Nature Wants Us to Be Fat 大自然就是要你胖 !': { author: 'Richard J. Johnson', title_en: 'Nature Wants Us to Be Fat' },
        'VS-03 The Complete Guide to Fasting': { author: 'Jason Fung', title_en: 'The Complete Guide to Fasting' },
        'VS-02 The Hunger Habit - 我不餓，但我就是想吃': { author: 'Judson Brewer', title_en: 'The Hunger Habit' },
        'VS-01 The Model Thinker 多模型思維：天才的32個思考策略': { author: 'Scott E. Page', title_en: 'The Model Thinker' },
        'VW-06C  從飄移到駕駛': { author: '何則文', title_en: 'From Drift to Drive' },
        '倦怠 為何我們不想工作   波波夫 Exhausted Why We Don\'t': { author: '波波夫', title_en: 'Exhausted: Why We Don\'t Want to Work' },
};

const data = JSON.parse(fs.readFileSync('public/books.json', 'utf8'));
let authorUpdated = 0;
let titleUpdated = 0;

data.forEach(book => {
        const key = book.title_cn || book.title_en;
        // Try matching by title_cn first, then title_en
        const match = finalMap[book.title_cn] || finalMap[book.title_en] || (key ? finalMap[key] : null);

        if (match) {
                if (!book.author && match.author) {
                        book.author = match.author;
                        authorUpdated++;
                }
                if (!book.title_en && match.title_en) {
                        book.title_en = match.title_en;
                        titleUpdated++;
                }
        }
});

fs.writeFileSync('public/books.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Authors updated: ${authorUpdated}`);
console.log(`English titles updated: ${titleUpdated}`);
console.log('Total books:', data.length);
console.log('Books with author:', data.filter(b => b.author).length);
console.log('Books without author:', data.filter(b => !b.author).length);
console.log('Books without author (non-private):', data.filter(b => !b.author && (b.title_cn || '') !== '[Private video]').length);
