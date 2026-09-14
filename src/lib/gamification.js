// 遊戲化核心理論與資料定義模組 (Octalysis Framework Engine)

// 1. 知識宇宙 6 大星域定義 (The 6 Cosmic Realms)
export const COSMIC_REALMS = [
    {
        id: 'bible',
        code: 'REALM-0',
        name: { zh: '聖經與靈修智慧殿堂', en: 'Bibilia Sanctuary' },
        subtitle: { zh: '經典章節、信仰靈修與歷史哲學', en: 'Biblical Wisdom, Spiritual Devotion & Philosophy' },
        icon: 'BookMarked',
        badge: '0. Bibilia',
        url: 'https://waatax.github.io/Bibilia',
        color: '#8b5cf6', // 靈性紫
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        accentBg: '#f5f3ff',
        tags: ['信仰', '哲學', '靈修', '歷史', '生命智慧', '心靈平靜', '道德倫理'],
        expReward: 35,
        description: {
            zh: '研讀聖經經文、探索神學思想、靈修箴言與跨越千年的生命智慧。培養內心平靜與崇高道德指引。',
            en: 'Study sacred scriptures, theological thought, spiritual devotions, and millennia of existential wisdom.'
        }
    },
    {
        id: 'arch',
        code: 'REALM-1',
        name: { zh: '系統架構與工程神殿', en: 'Arch Citadel' },
        subtitle: { zh: '軟體架構、雲端技術與工程最佳實踐', en: 'Software Architecture, Cloud & Engineering Mastery' },
        icon: 'Layers',
        badge: '1. Arch',
        url: 'https://waatax.github.io/Arch',
        color: '#0284c7', // 科技藍
        gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        accentBg: '#f0f9ff',
        tags: ['科技', '系統架構', '軟體工程', '雲端', '底層邏輯', '工作效率', '設計', '思考技術'],
        expReward: 35,
        description: {
            zh: '拆解大型系統設計、微服務架構、高可用分散式架構與軟體工程工程師的核心心法。',
            en: 'Deconstruct large-scale system design, microservices, distributed architectures, and elite software craftsmanship.'
        }
    },
    {
        id: 'litc',
        code: 'REALM-2',
        name: { zh: '文史哲學古典學堂', en: 'LitC Academy' },
        subtitle: { zh: '中華古典名著、文史精粹與諸子百家', en: 'Chinese Classical Literature, History & Thought' },
        icon: 'Scroll',
        badge: '2. LitC',
        url: 'https://waatax.github.io/LitC',
        color: '#dc2626', // 典雅朱紅
        gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        accentBg: '#fef2f2',
        tags: ['人文與科學', '社會與文化', '哲學思維', '歷史', '文學與故事', '古文經典'],
        expReward: 35,
        description: {
            zh: '品讀先秦諸子、唐詩宋詞、歷代史略與人文典籍，融會貫通東方千年博大思想脈絡。',
            en: 'Immerse in ancient philosophies, classical poetry, historical annals, and profound Eastern heritage.'
        }
    },
    {
        id: 'viet',
        code: 'REALM-3',
        name: { zh: '越南語文與文化探險', en: 'Viet Frontier' },
        subtitle: { zh: '越南語言學習、實用語法與文化視野', en: 'Vietnamese Language, Grammar & Culture' },
        icon: 'Compass',
        badge: '3. Viet',
        url: 'https://waatax.github.io/Viet',
        color: '#ea580c', // 活力橙
        gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
        accentBg: '#fff7ed',
        tags: ['語言學習', '東南亞文化', '越南語', '海外視野', '溝通表達', '商務拓展'],
        expReward: 35,
        description: {
            zh: '從基礎發音、核心詞彙到實用日常會話，掌握急速崛起之東南亞經濟與文化要地的語言之鑰。',
            en: 'Master pronunciation, core vocabulary, and conversational fluency of Vietnam, unlocking Southeast Asian culture.'
        }
    },
    {
        id: 'indonesia',
        code: 'REALM-4',
        name: { zh: '印尼群島生活語言學', en: 'Indonesia Archipelago' },
        subtitle: { zh: '印尼語文教學、常用會話與千島人文', en: 'Indonesian Language, Island Culture & Conversation' },
        icon: 'Palmtree',
        badge: '4. Indonesia',
        url: 'https://waatax.github.io/Indonesia',
        color: '#16a34a', // 熱帶翠綠
        gradient: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
        accentBg: '#f0fdf4',
        tags: ['語言學習', '印尼語', '千島文化', '海外視野', '溝通表達', '生活實用'],
        expReward: 35,
        description: {
            zh: '探索世界第四大人口國的印尼語（Bahasa Indonesia），掌握群島文化背景與多元風土民情。',
            en: 'Discover Bahasa Indonesia and the vibrant customs of the world\'s largest archipelago nation.'
        }
    },
    {
        id: 'welearn',
        code: 'REALM-5',
        name: { zh: 'WeLearn 說書大圖書館', en: 'WeLearn YouTube Codex' },
        subtitle: { zh: '700+ 精選書籍影音導讀與思維淬鍊', en: '700+ Curated Book Summaries & Mental Models' },
        icon: 'BookOpen',
        badge: '5. WeLearn',
        url: '#', // 本站核心
        color: '#2d6648', // 智慧深綠
        gradient: 'linear-gradient(135deg, #2d6648 0%, #1b452e 100%)',
        accentBg: '#eaf3ed',
        tags: ['商業', '心智與思維', '心理學', '個人成長', '投資理財', '管理領導', '工作效率', '職場工作'],
        expReward: 50,
        description: {
            zh: '匯聚心理學、商業策略、認知思維、投資理財與自我成長之百大暢銷好書深度精華導讀。',
            en: 'Comprehensive audio-visual book summaries spanning psychology, business, finance, and cognitive models.'
        }
    }
];

// 2. 等級階梯體系 (Level Hierarchy & Titles)
export const LEVEL_TITLES = [
    { level: 1, exp: 0, title: { zh: '見習學徒', en: 'Novice Apprentice' }, rank: 'Iron' },
    { level: 2, exp: 80, title: { zh: '啟蒙探索者', en: 'Initiate Seeker' }, rank: 'Bronze' },
    { level: 3, exp: 200, title: { zh: '求知行者', en: 'Knowledge Nomad' }, rank: 'Bronze' },
    { level: 4, exp: 380, title: { zh: '多思學者', en: 'Reflective Scholar' }, rank: 'Silver' },
    { level: 5, exp: 620, title: { zh: '晨曦讀者', en: 'Dawn Reader' }, rank: 'Silver' },
    { level: 6, exp: 920, title: { zh: '跨界旅人', en: 'Cross-Domain Traveler' }, rank: 'Gold' },
    { level: 7, exp: 1300, title: { zh: '通識專家', en: 'Polymath Practitioner' }, rank: 'Gold' },
    { level: 8, exp: 1800, title: { zh: '博雅導師', en: 'Liberal Arts Mentor' }, rank: 'Platinum' },
    { level: 9, exp: 2400, title: { zh: '思維大師', en: 'Master Strategist' }, rank: 'Platinum' },
    { level: 10, exp: 3200, title: { zh: '星際知識領航者', en: 'Cosmic Navigator' }, rank: 'Diamond' },
    { level: 15, exp: 6000, title: { zh: '文明星座先驅', en: 'Constellation Pioneer' }, rank: 'Master' },
    { level: 20, exp: 12000, title: { zh: '全知大賢者', en: 'Grand Archsage' }, rank: 'Grandmaster' },
    { level: 30, exp: 30000, title: { zh: '知識宇宙宗師', en: 'Cosmic Polymath Titan' }, rank: 'Legendary' }
];

export function getLevelInfo(exp = 0) {
    let current = LEVEL_TITLES[0];
    let next = LEVEL_TITLES[1];

    for (let i = 0; i < LEVEL_TITLES.length; i++) {
        if (exp >= LEVEL_TITLES[i].exp) {
            current = LEVEL_TITLES[i];
            next = LEVEL_TITLES[i + 1] || null;
        } else {
            break;
        }
    }

    const currentLevelExp = current.exp;
    const nextLevelExp = next ? next.exp : current.exp + 10000;
    const progressInLevel = exp - currentLevelExp;
    const levelRange = nextLevelExp - currentLevelExp;
    const percentage = Math.min(100, Math.max(0, Math.floor((progressInLevel / levelRange) * 100)));

    return {
        level: current.level,
        title: current.title,
        rank: current.rank,
        currentExp: exp,
        currentLevelExp,
        nextLevelExp,
        progressInLevel,
        levelRange,
        percentage
    };
}

// 3. 成就徽章大典 (20+ Badges across Bartle/Octalysis archetypes)
export const BADGES_CATALOG = [
    // --- 新手旅程 (Onboarding) ---
    {
        id: 'first_spark',
        name: { zh: '初試啼聲', en: 'First Spark' },
        desc: { zh: '完成第一本說書的研讀標記', en: 'Mark your very first book as completed' },
        icon: 'Sparkles',
        rarity: 'common', // common, rare, epic, legendary
        category: 'learning',
        check: (state) => (state.readBooks || []).length >= 1
    },
    {
        id: 'first_streak',
        name: { zh: '燃燒熱忱', en: 'First Flame' },
        desc: { zh: '完成連續打卡 1 天', en: 'Complete your first daily study streak' },
        icon: 'Flame',
        rarity: 'common',
        category: 'streak',
        check: (state) => (state.streak || 0) >= 1
    },
    {
        id: 'bookmark_collector',
        name: { zh: '藏書信徒', en: 'Codex Keeper' },
        desc: { zh: '將 3 本書籍加入個人收藏書籤', en: 'Save 3 books to your personal bookmarks' },
        icon: 'Bookmark',
        rarity: 'common',
        category: 'learning',
        check: (state) => (state.bookmarkedBooks || []).length >= 3
    },

    // --- 跨星系探索 (Cross-Realm Explorer) ---
    {
        id: 'realm_pilgrim',
        name: { zh: '跨界行者', en: 'Cosmic Pilgrim' },
        desc: { zh: '探索過 3 個以上的外部知識星域（聖經、架構、文史、越南、印尼）', en: 'Explore at least 3 distinct knowledge realms' },
        icon: 'Globe',
        rarity: 'rare',
        category: 'exploration',
        check: (state) => Object.keys(state.externalVisits || {}).filter(k => (state.externalVisits[k] || 0) > 0).length >= 3
    },
    {
        id: 'universe_polymath',
        name: { zh: '六芒全通者', en: 'Hexagon Polymath' },
        desc: { zh: '探索過所有 5 大外部知識星域', en: 'Explore all 5 external knowledge realms' },
        icon: 'Crown',
        rarity: 'legendary',
        category: 'exploration',
        check: (state) => {
            const visited = state.externalVisits || {};
            return ['bible', 'arch', 'litc', 'viet', 'indonesia'].every(r => (visited[r] || 0) > 0);
        }
    },
    {
        id: 'bible_scholar',
        name: { zh: '靈修磐石', en: 'Sacred Anchor' },
        desc: { zh: '前往聖經研讀殿堂探索 2 次以上', en: 'Visit Bibilia Sanctuary at least 2 times' },
        icon: 'BookMarked',
        rarity: 'rare',
        category: 'exploration',
        check: (state) => (state.externalVisits?.bible || 0) >= 2
    },
    {
        id: 'arch_engineer',
        name: { zh: '系統巨匠', en: 'Arch Grandmaster' },
        desc: { zh: '前往系統架構神殿探索 2 次以上', en: 'Visit Arch Citadel at least 2 times' },
        icon: 'Layers',
        rarity: 'rare',
        category: 'exploration',
        check: (state) => (state.externalVisits?.arch || 0) >= 2
    },
    {
        id: 'litc_master',
        name: { zh: '典籍博士', en: 'Classics Sage' },
        desc: { zh: '前往文史哲學古典學堂探索 2 次以上', en: 'Visit LitC Academy at least 2 times' },
        icon: 'Scroll',
        rarity: 'rare',
        category: 'exploration',
        check: (state) => (state.externalVisits?.litc || 0) >= 2
    },
    {
        id: 'southeast_linguist',
        name: { zh: '東南亞雙語通', en: 'ASEAN Linguist' },
        desc: { zh: '同時探索過越南語與印尼語學習站點', en: 'Explore both Vietnamese and Indonesian learning realms' },
        icon: 'Compass',
        rarity: 'epic',
        category: 'exploration',
        check: (state) => (state.externalVisits?.viet || 0) >= 1 && (state.externalVisits?.indonesia || 0) >= 1
    },

    // --- 連勝與毅力 (Streak & Habit) ---
    {
        id: 'streak_3',
        name: { zh: '恆心三日', en: 'Triad Momentum' },
        desc: { zh: '達成連續學習打卡 3 天', en: 'Maintain a 3-day study streak' },
        icon: 'Zap',
        rarity: 'rare',
        category: 'streak',
        check: (state) => (state.streak || 0) >= 3
    },
    {
        id: 'streak_7',
        name: { zh: '七日之火', en: 'Seven Flames' },
        desc: { zh: '達成連續學習打卡 7 天', en: 'Maintain a 7-day study streak' },
        icon: 'Sun',
        rarity: 'epic',
        category: 'streak',
        check: (state) => (state.streak || 0) >= 7
    },
    {
        id: 'streak_30',
        name: { zh: '鋼鐵意志', en: 'Iron Will Titan' },
        desc: { zh: '達成連續學習打卡 30 天', en: 'Maintain an incredible 30-day study streak' },
        icon: 'ShieldAlert',
        rarity: 'legendary',
        category: 'streak',
        check: (state) => (state.streak || 0) >= 30
    },

    // --- 說書深度與積累 (Mastery & Accumulation) ---
    {
        id: 'scholar_5',
        name: { zh: '五卷通達', en: 'Five Volumes' },
        desc: { zh: '累計研讀 5 本書籍', en: 'Complete study of 5 books' },
        icon: 'BookOpen',
        rarity: 'rare',
        category: 'learning',
        check: (state) => (state.readBooks || []).length >= 5
    },
    {
        id: 'scholar_15',
        name: { zh: '博覽群書', en: 'Avid Bibliophile' },
        desc: { zh: '累計研讀 15 本書籍', en: 'Complete study of 15 books' },
        icon: 'GraduationCap',
        rarity: 'epic',
        category: 'learning',
        check: (state) => (state.readBooks || []).length >= 15
    },
    {
        id: 'scholar_50',
        name: { zh: '百川歸海', en: 'Library Titan' },
        desc: { zh: '累計研讀 50 本書籍', en: 'Complete study of 50 books' },
        icon: 'Trophy',
        rarity: 'legendary',
        category: 'learning',
        check: (state) => (state.readBooks || []).length >= 50
    },
    {
        id: 'note_craftsman',
        name: { zh: '格物致知', en: 'Marginalia Scribe' },
        desc: { zh: '為至少 3 本書籍撰寫個人專屬筆記', en: 'Write personal study notes for 3 different books' },
        icon: 'Edit3',
        rarity: 'rare',
        category: 'learning',
        check: (state) => Object.keys(state.notes || {}).filter(k => (state.notes[k] || '').trim().length > 0).length >= 3
    },

    // --- 隨機漫步與探索 (Unpredictability & Serendipity) ---
    {
        id: 'serendipity_reader',
        name: { zh: '滄海拾粟', en: 'Ocean Grain Seeker' },
        desc: { zh: '使用「滄海一粟」在浩瀚書海中探索書目 3 次', en: 'Discover books via "A Drop in the Ocean" 3 times' },
        icon: 'Sparkles',
        rarity: 'rare',
        category: 'curiosity',
        check: (state) => (state.serendipityPicks || state.rouletteSpins || 0) >= 3
    },
    {
        id: 'capsule_seeker',
        name: { zh: '每日醍醐', en: 'Capsule Seeker' },
        desc: { zh: '開啟過「每日智慧盲盒」5 次', en: 'Open the Daily Wisdom Capsule 5 times' },
        icon: 'Gift',
        rarity: 'rare',
        category: 'curiosity',
        check: (state) => (state.capsulesOpened || 0) >= 5
    }
];

// 4. 每日智慧金句盲盒庫 (Wisdom Capsules Library)
export const WISDOM_CAPSULES = [
    {
        id: 1,
        quote: {
            zh: '「交易不是戰勝市場，而是徹底戰勝自我人性的貪婪與恐懼。」',
            en: '"Trading is not about beating the market, but about conquering human greed and fear."'
        },
        source: '《巨人思維》巨人傑',
        realm: 'welearn',
        spark: 15
    },
    {
        id: 2,
        quote: {
            zh: '「事物千變萬化，唯有抓住不變的底層邏輯，才能洞察全局。」',
            en: '"Things fluctuate constantly; only by grasping underlying logic can one see the essence."'
        },
        source: '《底層邏輯》劉潤',
        realm: 'welearn',
        spark: 15
    },
    {
        id: 3,
        quote: {
            zh: '「敬畏耶和華是智慧的開端，認識至聖者便是聰明。」',
            en: '"The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding."'
        },
        source: '箴言 9:10',
        realm: 'bible',
        spark: 20
    },
    {
        id: 4,
        quote: {
            zh: '「好的架構不是一次性設計出來的，而是在持續重構與業務演進中生長出來的。」',
            en: '"Good architecture is not built in one stroke; it evolves through relentless refactoring and trade-offs."'
        },
        source: '軟體架構之道',
        realm: 'arch',
        spark: 20
    },
    {
        id: 5,
        quote: {
            zh: '「博學之，審問之，慎思之，明辨之，篤行之。」',
            en: '"Study broadly, inquire thoroughly, ponder carefully, discern clearly, and practice faithfully."'
        },
        source: '《禮記·中庸》',
        realm: 'litc',
        spark: 20
    },
    {
        id: 6,
        quote: {
            zh: '「Học, học nữa, học mãi.（學，再學，永遠學下去。）」',
            en: '"Learn, learn more, learn forever."'
        },
        source: '越南求知名言',
        realm: 'viet',
        spark: 20
    },
    {
        id: 7,
        quote: {
            zh: '「Bhinneka Tunggal Ika（多元一體 / 殊途同歸）。」',
            en: '"Unity in Diversity."'
        },
        source: '印尼國家格言',
        realm: 'indonesia',
        spark: 20
    },
    {
        id: 8,
        quote: {
            zh: '「當你覺得無法再撐下去時，其實你只用上了40%的潛能。」',
            en: '"When your mind says you are done, you are really only 40 percent done."'
        },
        source: '《我，刀槍不入》大衛·哥金斯',
        realm: 'welearn',
        spark: 15
    }
];

// 5. 跨星系共鳴智能關聯函式 (Cross-Universe Synapses Mapping)
export function getCrossUniverseSynapses(book) {
    if (!book) return [];
    const tags = (book.tags || []).map(t => t.toLowerCase());
    const title = (book.title_cn || book.title_en || '').toLowerCase();
    const desc = (book.description || '').toLowerCase();
    const combined = `${tags.join(' ')} ${title} ${desc}`;

    const matches = [];

    // 關聯 0: Bible (心靈、平靜、生命、哲學、道德)
    if (tags.some(t => ['心靈平靜', '哲學思維', '自我認識', '生命智慧', '心理學'].includes(t)) || combined.includes('心態') || combined.includes('靈魂')) {
        matches.push({
            realm: COSMIC_REALMS.find(r => r.id === 'bible'),
            reason: {
                zh: '本書探討內在平靜與心性修煉，與聖經靈修智慧及心靈箴言深層共鳴。',
                en: 'This book explores inner peace and mindset, deeply resonating with biblical spiritual reflections.'
            }
        });
    }

    // 關聯 1: Arch (系統思維、邏輯、效率、科技、商業框架)
    if (tags.some(t => ['心智與思維', '思維方式', '工作效率', '思考技術', '商業', '管理領導'].includes(t)) || combined.includes('底層邏輯') || combined.includes('系統')) {
        matches.push({
            realm: COSMIC_REALMS.find(r => r.id === 'arch'),
            reason: {
                zh: '本書著重底層邏輯與結構性思維，可與大型軟體架構及系統工程方法互相對照應用。',
                en: 'Focusing on first principles and structural thinking, matching software architecture methodologies.'
            }
        });
    }

    // 關聯 2: LitC (歷史、社會文化、文史、古今智慧、人際)
    if (tags.some(t => ['社會與文化', '歷史', '文學與故事', '人文與科學', '哲學思維', '溝通表達'].includes(t)) || combined.includes('古典') || combined.includes('人性')) {
        matches.push({
            realm: COSMIC_REALMS.find(r => r.id === 'litc'),
            reason: {
                zh: '本書洞察人性與社會運作規律，與中華古典文史哲之博弈與修身思想相輔相成。',
                en: 'Insights into human nature and society harmonize with Chinese classical philosophy.'
            }
        });
    }

    // 關聯 3 & 4: Viet & Indonesia (商業拓展、語言溝通、談判、全球化視野)
    if (tags.some(t => ['溝通表達', '溝通談判', '創業經營', '行旅閱讀', '未來趨勢'].includes(t)) || combined.includes('談判') || combined.includes('市場')) {
        matches.push({
            realm: COSMIC_REALMS.find(r => r.id === 'viet'),
            reason: {
                zh: '結合溝通談判與跨文化商務策略，可延伸探索越南快速成長市場之語言視野。',
                en: 'Pairing negotiation skills with cross-border language readiness for Vietnam.'
            }
        });
        matches.push({
            realm: COSMIC_REALMS.find(r => r.id === 'indonesia'),
            reason: {
                zh: '拓展國際格局與多元協作能力，可延伸探索印尼千島之國的語言文化。',
                en: 'Expand global collaboration capacity into the rich linguistic landscape of Indonesia.'
            }
        });
    }

    // 若無特殊匹配，預設給予 Arch + LitC
    if (matches.length === 0) {
        matches.push({
            realm: COSMIC_REALMS.find(r => r.id === 'arch'),
            reason: { zh: '將本書觀點轉化為結構化知識模型。', en: 'Transform book insights into structured mental models.' }
        });
        matches.push({
            realm: COSMIC_REALMS.find(r => r.id === 'litc'),
            reason: { zh: '參照文史哲精粹深度思辨。', en: 'Cross-reference with timeless classical wisdom.' }
        });
    }

    return matches.slice(0, 3);
}

// 6. 生成每日任務 (Daily Quests Generator)
export function generateDailyQuests(_dateStr = new Date().toDateString()) {
    return [
        {
            id: 'quest_checkin',
            title: { zh: '晨曦修行：每日學習打卡', en: 'Dawn Practice: Daily Check-in' },
            desc: { zh: '點擊打卡按鈕，維持熱忱火苗連勝', en: 'Click check-in to maintain your active streak' },
            exp: 25,
            sparks: 10,
            icon: 'Flame',
            type: 'checkin'
        },
        {
            id: 'quest_read_book',
            title: { zh: '博學研讀：完成一本說書研讀', en: 'Polymath Study: Complete 1 Book Summary' },
            desc: { zh: '在說書詳情頁點擊「標記為已研讀」', en: 'Mark any book summary as completed' },
            exp: 50,
            sparks: 20,
            icon: 'BookOpen',
            type: 'read_book'
        },
        {
            id: 'quest_realm_explore',
            title: { zh: '星際遠航：跨界探索 1 個外部星域', en: 'Cosmic Voyage: Explore 1 External Realm' },
            desc: { zh: '前往聖經、架構、文史、越南或印尼站點探索', en: 'Visit Bibilia, Arch, LitC, Viet, or Indonesia' },
            exp: 35,
            sparks: 15,
            icon: 'Globe',
            type: 'explore_realm'
        },
        {
            id: 'quest_wisdom_capsule',
            title: { zh: '每日啟迪：抽取今日智慧盲盒', en: 'Daily Epiphany: Open Wisdom Capsule' },
            desc: { zh: '開啟今日大師靈感盲盒獲取智慧金句', en: 'Claim today’s insight capsule for inspiration' },
            exp: 20,
            sparks: 10,
            icon: 'Gift',
            type: 'capsule'
        }
    ];
}
