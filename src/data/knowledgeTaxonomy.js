// 全站系統化分類知識點體系與學習路徑核心資料庫
// Master Knowledge Taxonomy, Learning Roadmaps & Interactive Flashcards

export const KNOWLEDGE_DOMAINS = [
    {
        id: 'mind_cognition',
        title: { zh: '心智與認知科學', en: 'Mind & Cognitive Science' },
        icon: 'Brain',
        color: '#8b5cf6',
        bg: 'rgba(139, 92, 246, 0.08)',
        border: 'rgba(139, 92, 246, 0.25)',
        desc: {
            zh: '探索大腦底層運算邏輯、突破大腦固有偏誤，打造清晰深邃的思考演算法。',
            en: 'Unpack neural processing, conquer cognitive biases, and refine mental algorithms.'
        },
        subcategories: [
            {
                name: { zh: '思考架構與決策系統', en: 'Thinking & Decision Systems' },
                concepts: [
                    { name: '雙系統思維 (System 1 & 2)', desc: '快思直覺與慢想理性的能量博弈，識別啟發式偏誤。', books: ['S1-81', 'S5-58'] },
                    { name: '第一性原理 (First Principles)', desc: '剝離表面類比，回歸事物最本質的公理重新推導。', books: ['S1-02', 'S1-43'] },
                    { name: '逆向思維 (Inversion Principle)', desc: '「反過來想」，如果想成功，先找出所有徹底失敗的途徑並避開。', books: ['S1-03', 'S5-39'] },
                    { name: '前置驗屍法 (Pre-Mortem)', desc: '在專案啟動前假設其已經徹底慘敗，倒推最致命的盲區。', books: ['S1-81', 'S2-15'] }
                ]
            },
            {
                name: { zh: '神經科學與記憶抗遺忘', en: 'Neuroscience & Memory Science' },
                concepts: [
                    { name: '神經可塑性 (Neuroplasticity)', desc: '成人大腦具備終身重塑突觸的能力，挑戰鍛造大腦物理結構。', books: ['S4-28', 'S5-43'] },
                    { name: '艾賓浩斯間隔提取', desc: '在即將遺忘的臨界點進行費力回想，升級為永久長效記憶。', books: ['S1-43', 'S4-88'] },
                    { name: '雙模式思考 (專注與發散)', desc: '前額葉線性能量攻堅與預設模式網絡 (DMN) 跨領域頓悟的交替。', books: ['S4-28', 'S1-61'] },
                    { name: '認知負荷理論 (Cognitive Load)', desc: '工作記憶容量僅 4±1 個組塊，必須消滅外在干擾以保留關聯基模。', books: ['S1-43', 'S1-62'] }
                ]
            },
            {
                name: { zh: '心智韌性與心理免疫', en: 'Mental Resilience & Immunity' },
                concepts: [
                    { name: '成長型思維 (Growth Mindset)', desc: '將挫折視為神經元突觸生長的養分，而非天賦的終審判決。', books: ['S1-12', 'S2-45'] },
                    { name: '後設認知 (Metacognition)', desc: '「對思考本身的思考」，跳出自我情緒視角，客觀審視認知偏見。', books: ['S1-01', 'S3-19'] },
                    { name: '情緒顆粒度 (Emotional Granularity)', desc: '精確命名內在感受，降低杏仁核過度反應，提升情緒耐受度。', books: ['S2-63', 'S3-88'] }
                ]
            }
        ]
    },
    {
        id: 'habits_productivity',
        title: { zh: '行為工程與個人效能', en: 'Habits & High Performance' },
        icon: 'Zap',
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.08)',
        border: 'rgba(16, 185, 129, 0.25)',
        desc: {
            zh: '將宏大願景拆解為物理微動作，透過環境設計與反饋系統實現自驅力。',
            en: 'Deconstruct massive ambitions into atomic actions and environmental architecture.'
        },
        subcategories: [
            {
                name: { zh: '習慣迴路與行為設計', en: 'Habit Architecture & Loop' },
                concepts: [
                    { name: '原子習慣四步迴路', desc: '提示顯而易見 ➔ 渴望有吸引力 ➔ 回應簡便易行 ➔ 獎勵令人滿足。', books: ['S1-15', 'S1-22'] },
                    { name: '兩分鐘啟動法則', desc: '縮小習慣門檻至 120 秒內即可完成，降低大腦前額葉啟動阻力。', books: ['S1-15', 'S3-04'] },
                    { name: '習慣堆疊 (Habit Stacking)', desc: '將想建立的新習慣，綁定在每天必然發生的既有慣性之後。', books: ['S1-15', 'S2-38'] },
                    { name: '環境架構學 (Choice Architecture)', desc: '不要考驗意志力，直接重新設計物理房間與數位工作桌面。', books: ['S1-15', 'S1-49'] }
                ]
            },
            {
                name: { zh: '深度工作與心流專注', en: 'Deep Work & Flow State' },
                concepts: [
                    { name: '深度工作力 (Deep Work)', desc: '在無干擾狀態下進行高認知負荷任務，推動技能產出逼近極限。', books: ['S1-49', 'S2-77'] },
                    { name: '心流通道 (The Flow Channel)', desc: '挑戰難度比當前技能高出約 4%，進入沉浸忘我的最佳體驗狀態。', books: ['S1-33', 'S2-11'] },
                    { name: '注意力殘留 (Attention Residue)', desc: '頻繁在任務間切換會留下認知碎屑，大幅損耗大腦的工作記憶。', books: ['S1-49', 'S3-52'] },
                    { name: '超晝夜節律 (Ultradian Rhythms)', desc: '人體大腦專注極限約 90 分鐘，必須配合 15 分鐘主動發散恢復。', books: ['S1-49', 'S4-28'] }
                ]
            },
            {
                name: { zh: '任務管理與精力資本', en: 'Task Architecture & Energy' },
                concepts: [
                    { name: 'GTD 搞定閉環 (Getting Things Done)', desc: '收集 ➔ 釐清 ➔ 組織 ➔ 檢視 ➔ 執行，清空大腦內存以獲心靈平靜。', books: ['S2-09', 'S3-44'] },
                    { name: '精力金字塔 (Energy Pyramid)', desc: '體能（睡眠運動）➔ 情緒（正面接納）➔ 思想（專注）➔ 精神（意義感）。', books: ['S3-12', 'S4-65'] },
                    { name: '艾森豪威爾矩陣 (重要 vs 緊急)', desc: '全力專注「重要但不緊急」的第二象限，杜絕虛假忙碌。', books: ['S1-18', 'S2-09'] }
                ]
            }
        ]
    },
    {
        id: 'business_strategy',
        title: { zh: '商業戰略與市場競爭', en: 'Business & Strategy' },
        icon: 'Briefcase',
        color: '#3b82f6',
        bg: 'rgba(59, 130, 246, 0.08)',
        border: 'rgba(59, 130, 246, 0.25)',
        desc: {
            zh: '洞察商業世界底層結構，構建不可複製的護城河與組織協同優勢。',
            en: 'Decipher underlying economic dynamics and engineer durable competitive moats.'
        },
        subcategories: [
            {
                name: { zh: '競爭優勢與商業護城河', en: 'Competitive Moats & Position' },
                concepts: [
                    { name: '經濟護城河 (Economic Moats)', desc: '無形資產、網絡效應、轉換成本、成本優勢，四重防禦陣地。', books: ['S1-03', 'S2-81'] },
                    { name: '定位理論 (Positioning)', desc: '在潛在客戶心智中佔據一個獨特而無可替代的詞彙與心智認知。', books: ['S2-33', 'S3-08'] },
                    { name: '破壞式創新 (Disruptive Innovation)', desc: '從低階市場或未被服務客群切入，以低成本極簡架構顛覆巨頭。', books: ['S2-56', 'S3-71'] },
                    { name: '飛輪效應 (Flywheel Effect)', desc: '多個業務環節相互推動強化，每一圈動力都為下一圈注入動能。', books: ['S1-08', 'S2-94'] }
                ]
            },
            {
                name: { zh: '精實創業與產品驗證', en: 'Lean Startup & Product Logic' },
                concepts: [
                    { name: '最小可行產品 (MVP)', desc: '以最低成本製造能驗證核心商業假設的產品，開啟學習閉環。', books: ['S1-27', 'S2-42'] },
                    { name: '產品市場適配 (PMF)', desc: '在一個具備巨大成長潛力的市場中，擁有一款能滿足使用者的產品。', books: ['S1-27', 'S3-15'] },
                    { name: '單位經濟效益 (Unit Economics)', desc: '客戶終身價值 (LTV) 必須穩定大於獲客成本 (CAC) 的 3 倍以上。', books: ['S2-18', 'S3-60'] }
                ]
            },
            {
                name: { zh: '現代管理與效能哲學', en: 'Management & Effectiveness' },
                concepts: [
                    { name: '目標與關鍵結果 (OKR)', desc: '由雄心勃勃的定性目標 (O) 與量化可衡量指標 (KR) 驅動對齊。', books: ['S2-89', 'S3-31'] },
                    { name: '杜拉克效能原則', desc: '效率是把事情做對，效能是做對的事情；知識工作者必須貢獻導向。', books: ['S1-18', 'S3-45'] }
                ]
            }
        ]
    },
    {
        id: 'wealth_investment',
        title: { zh: '財富思維與資本複利', en: 'Wealth & Compounding' },
        icon: 'Coins',
        color: '#f59e0b',
        bg: 'rgba(245, 158, 11, 0.08)',
        border: 'rgba(245, 158, 11, 0.25)',
        desc: {
            zh: '看懂週期波動、掌握風險非對稱性，用時間的複利構築個人自由資產。',
            en: 'Harness market cycles, asymmetric convexity, and compounding capital.'
        },
        subcategories: [
            {
                name: { zh: '價值投資與心態修煉', en: 'Value Investing & Mindset' },
                concepts: [
                    { name: '安全邊際 (Margin of Safety)', desc: '永遠以低於真實內在價值的折扣價格買入，防禦不可知風險。', books: ['S1-03', 'S2-05'] },
                    { name: '市場先生寓言 (Mr. Market)', desc: '市場每天提供情緒化的報價，投資者應當利用它而非被它主宰。', books: ['S1-03', 'S1-50'] },
                    { name: '能力圈 (Circle of Competence)', desc: '清楚知道自己懂什麼、不懂什麼，只在自己精通的邊界內下注。', books: ['S1-03', 'S2-14'] },
                    { name: '非對稱風險回報 (Asymmetry)', desc: '尋找潛在下行風險有限，而上行收益具備無窮凸性的投資機會。', books: ['S1-01', 'S2-27'] }
                ]
            },
            {
                name: { zh: '週期思維與反脆弱配置', en: 'Cycles & Antifragility' },
                concepts: [
                    { name: '市場週期規律 (Market Cycles)', desc: '鐘擺永遠在極度樂觀與極度悲觀之間擺動，極端處即是均值回歸。', books: ['S2-05', 'S3-83'] },
                    { name: '槓鈴策略 (Barbell Strategy)', desc: '90% 極度安全保守防禦 + 10% 追求高凸性非對稱投機，拒絕平庸中庸。', books: ['S2-27', 'S3-55'] },
                    { name: '資產負債與現金流', desc: '資產是把錢放進口袋的東西，負債是把錢從口袋拿走的東西。', books: ['S1-06', 'S2-39'] }
                ]
            }
        ]
    },
    {
        id: 'communication_relations',
        title: { zh: '人際溝通與高維影響力', en: 'Influence & Communication' },
        icon: 'MessageSquareText',
        color: '#ec4899',
        bg: 'rgba(236, 72, 153, 0.08)',
        border: 'rgba(236, 72, 153, 0.25)',
        desc: {
            zh: '超越話術套路，從同理共情與心理安全感出發，達成深度協同與共贏。',
            en: 'Move beyond scripts to authentic empathy, psychological safety, and synergy.'
        },
        subcategories: [
            {
                name: { zh: '深度對話與同理傾聽', en: 'Deep Dialogue & Empathy' },
                concepts: [
                    { name: '非暴力溝通 (NVC)', desc: '觀察事實 ➔ 體會感受 ➔ 辨識需要 ➔ 提出具體請求，打破指責循環。', books: ['S1-35', 'S2-68'] },
                    { name: '關鍵對話 (Crucial Conversations)', desc: '當利害攸關、意見分歧、情緒激烈時，首要任務是維護對話的安全氛圍。', books: ['S1-42', 'S3-17'] },
                    { name: '視角置換 (Perspective Taking)', desc: '抽離自我立場，真正走進對方的認知坐標系，看見對方未說出口的恐懼。', books: ['S1-35', 'S2-46'] }
                ]
            },
            {
                name: { zh: '說服心理學與影響力法則', en: 'Persuasion & Influence' },
                concepts: [
                    { name: '互惠原理 (Reciprocity)', desc: '人們天然渴望回報他人給予的善意與價值，主動給予開啟信任大門。', books: ['S1-29', 'S2-73'] },
                    { name: '社會認同 (Social Proof)', desc: '在不確定情境下，個體會根據周遭人群的行為來校準自己的判斷。', books: ['S1-29', 'S3-36'] },
                    { name: '費曼教學法 (以教代學)', desc: '用 8 歲小孩能聽懂的大白話解釋複雜概念，輸出是最高維度的吸收。', books: ['S1-43', 'S1-62'] }
                ]
            }
        ]
    },
    {
        id: 'philosophy_meaning',
        title: { zh: '哲學思辨與心靈燈塔', en: 'Philosophy & Meaning' },
        icon: 'Compass',
        color: '#06b6d4',
        bg: 'rgba(6, 182, 212, 0.08)',
        border: 'rgba(6, 182, 212, 0.25)',
        desc: {
            zh: '在無常的世界中安頓身心，建立堅定不可動搖的精神內核與意義感。',
            en: 'Anchor inner stillness amidst chaos and construct enduring spiritual purpose.'
        },
        subcategories: [
            {
                name: { zh: '斯多葛主義與心靈防禦', en: 'Stoicism & Inner Citadel' },
                concepts: [
                    { name: '控制二分法 (Dichotomy of Control)', desc: '嚴格區分「我能掌控的（內在選擇）」與「我無法掌控的（外在遭遇）」。', books: ['S1-77', 'S2-91'] },
                    { name: '命運之愛 (Amor Fati)', desc: '不僅忍受發生的事，更全心熱愛命運賦予的一切考驗，將障礙化為道路。', books: ['S1-77', 'S3-69'] },
                    { name: '預先消極想像 (Premeditatio Malorum)', desc: '定期在心智中排演失去與困厄，祛除對意外的恐慌，更加珍惜當下。', books: ['S1-77', 'S2-91'] }
                ]
            },
            {
                name: { zh: '存在主義與意義追尋', en: 'Existentialism & Meaning' },
                concepts: [
                    { name: '意義療法 (Logotherapy)', desc: '「知道為何而活的人，幾乎能忍受任何生存方式。」在苦難中找尋意義。', books: ['S1-55', 'S2-84'] },
                    { name: '阿德勒個體心理學', desc: '課題分離，擁有「被討厭的勇氣」，一切煩惱皆源自人際關係。', books: ['S1-25', 'S2-49'] },
                    { name: '終身探索與自律自由', desc: '自律不是自我懲罰，而是奪回人生的最高主權，以自律換取絕對自由。', books: ['S1-22', 'S1-49'] }
                ]
            }
        ]
    }
];

// 5 條精心策劃的系統化通關學習路徑
export const LEARNING_ROADMAPS = [
    {
        id: 'path_habits',
        title: { zh: '路線一：終極習慣與個人生產力躍遷', en: 'Track 1: Atomic Habits & Extreme Productivity' },
        subtitle: { zh: '從意志力掙扎到行為自動化，重塑你的生活系統', en: 'Master behavioral automation and deep focus.' },
        badge: '⚡ 習慣工程師',
        color: '#10b981',
        estimatedHours: '8 小時精讀',
        milestones: [
            { step: 1, code: 'S1-15', title: '《原子習慣》', focus: '建立提示-渴望-回應-獎勵四步迴路，掌握兩分鐘起步法則。' },
            { step: 2, code: 'S1-49', title: '《深度工作力》', focus: '消除注意力殘留，建立無干擾專注儀式，奪回深度心智產能。' },
            { step: 3, code: 'S1-33', title: '《心流》', focus: '校準技能與挑戰的黃金匹配區（+4%），進入極致投入體驗。' },
            { step: 4, code: 'S2-09', title: '《搞定 GTD》', focus: '打造外化大腦任務閉環，將所有未結事務自腦海清空。' }
        ]
    },
    {
        id: 'path_cognition',
        title: { zh: '路線二：高維認知與底層決策破局', en: 'Track 2: Cognitive Mastery & High-Stakes Decision' },
        subtitle: { zh: '裝備多學科思維模型，擺脫單一鐵鎚人的致命盲區', en: 'Build a latticework of multidisciplinary mental models.' },
        badge: '🧠 認知戰略家',
        color: '#8b5cf6',
        estimatedHours: '10 小時精讀',
        milestones: [
            { step: 1, code: 'S1-03', title: '《窮查理的普通常識》', focus: '構建跨學科思維模型格柵，實踐反過來想的逆向思維。' },
            { step: 2, code: 'S1-81', title: '《快思慢想》', focus: '透析系統 1 的啟發式捷思偏誤，學會在關鍵時刻強制召喚系統 2。' },
            { step: 3, code: 'S2-27', title: '《反脆弱》', focus: '辨識脆弱性，運用槓鈴策略與非對稱性，在波動中獲益。' },
            { step: 4, code: 'S1-08', title: '《原則》', focus: '建立極度求真與極度透明的生活與決策機器，演化反饋。' }
        ]
    },
    {
        id: 'path_wealth',
        title: { zh: '路線三：商業戰略與資本複利進化', en: 'Track 3: Business Strategy & Capital Compounding' },
        subtitle: { zh: '理解市場週期與複利幾何增益，構建個人的護城河', en: 'Decipher economic moats and exponential wealth engines.' },
        badge: '💎 資本洞察者',
        color: '#f59e0b',
        estimatedHours: '9 小時精讀',
        milestones: [
            { step: 1, code: 'S1-01', title: '《巨人思維》', focus: '理解風險報酬不對稱，建立嚴格交易紀律與心態修煉。' },
            { step: 2, code: 'S1-06', title: '《富爸爸窮爸爸》', focus: '區分資產與負債，建立讓錢為你工作的被動現金流思維。' },
            { step: 3, code: 'S2-05', title: '《掌握市場週期》', focus: '掌握鐘擺規律，在市場極端悲觀時看見價值，保持理性。' },
            { step: 4, code: 'S1-27', title: '《精實創業》', focus: '以最小可行產品 (MVP) 驗證假設，打造正向自我強化的產品飛輪。' }
        ]
    },
    {
        id: 'path_influence',
        title: { zh: '路線四：情商溝通與高維人際影響力', en: 'Track 4: Emotional Intelligence & High-Trust Influence' },
        subtitle: { zh: '學會深度傾聽與關鍵對話，將衝突轉化為協同共贏', en: 'Transform tension into psychological safety and win-win outcomes.' },
        badge: '🗣️ 共情協同者',
        color: '#ec4899',
        estimatedHours: '7 小時精讀',
        milestones: [
            { step: 1, code: 'S1-35', title: '《非暴力溝通》', focus: '區分事實與評價，精確表達感受與核心需要，打破防禦。' },
            { step: 2, code: 'S1-42', title: '《關鍵對話》', focus: '營造雙方安全感，在意見激烈分歧時維持共同目的。' },
            { step: 3, code: 'S1-29', title: '《影響力》', focus: '洞察互惠、社會認同、權威與稀缺等六大人性決策捷徑。' },
            { step: 4, code: 'S1-43', title: '《超牢記憶法》', focus: '以費曼技巧將深刻知識以大白話講述給身邊的人聽。' }
        ]
    },
    {
        id: 'path_philosophy',
        title: { zh: '路線五：斯多葛心性與情緒抗震防禦', en: 'Track 5: Stoic Fortitude & Inner Citadel' },
        subtitle: { zh: '在動盪世界中構築內在城堡，找尋不假外求的平靜', en: 'Construct the inner citadel to thrive under external volatility.' },
        badge: '🌿 精神哲人',
        color: '#06b6d4',
        estimatedHours: '8 小時精讀',
        milestones: [
            { step: 1, code: 'S1-77', title: '《沉思錄》', focus: '踐行控制二分法，專注內在品格，淡然接納外在命運安排。' },
            { step: 2, code: 'S1-25', title: '《被討厭的勇氣》', focus: '實施課題分離，擺脫認可欲求，專注於此時此刻的當下。' },
            { step: 3, code: 'S1-55', title: '《活出意義來》', focus: '在極端苦難中尋求生命的終極意義，選擇面對苦難的態度。' },
            { step: 4, code: 'S1-02', title: '《底層邏輯》', focus: '看清事物本質，在紛繁世事中建立處變不驚的底層認知坐標。' }
        ]
    }
];

// 每日互動思維閃卡與翻牌挑戰題庫
export const DAILY_FLASHCARDS = [
    {
        id: 'fc_01',
        category: '認知決策',
        question: '為什麼人們往往在已經虧損時，反而更傾向於冒更大的風險加碼？',
        model: '前景理論之「損失厭惡」與「反射效應」',
        answer: '康納曼指出，人類對「損失」的心理痛感是同等「收益」快感的 2 至 2.5 倍。當處於獲利狀態時，人們厭惡風險（傾向落袋為安）；但當處於虧損狀態時，為了避免承認實質損失，人們會轉為「風險偏好」（極端冒險以期回本）。',
        takeaway: '破局對策：建立嚴格止損點，把注意力放在「當前資產的最優配置」，將沉沒成本歸零思考。'
    },
    {
        id: 'fc_02',
        category: '行為工程',
        question: '為什麼單憑意志力去戒除壞習慣，成功率通常低於 10%？',
        model: '前額葉能量耗竭與「環境架構效應」',
        answer: '意志力是前額葉皮質的有償認知資源，隨著一整天的決策而快速衰竭。真正自律的高手不是意志力堅強，而是「極擅長設計物理環境」，讓誘惑變得極度隱形或難以觸及，使自律成為阻力最小的自然路徑。',
        takeaway: '破局對策：將手機放在另一間房間、清除書桌雜物，用物理距離代替心理搏鬥。'
    },
    {
        id: 'fc_03',
        category: '學習科學',
        question: '反覆閱讀劃線筆記，為什麼會讓人產生「我已經完全學會了」的虛假自滿？',
        model: '流暢性錯覺 (Illusion of Fluency)',
        answer: '看著眼前已經劃滿重點的文字，大腦識別過程極其順暢，容易將這種「視覺辨識的輕鬆感」誤判為「知識已深度內化」。事實上一旦合上書本，缺乏外部提示，大腦神經網絡根本無法主動提取。',
        takeaway: '破局對策：強制合上書本，在一張白紙上徒手默寫或以白話向假想的小學生講述。'
    },
    {
        id: 'fc_04',
        category: '商業戰略',
        question: '為什麼產品功能做得比對手多、規格比對手強，市場上卻常常打不過對手？',
        model: '心智定位理論與「認知即事實」',
        answer: '商業競爭的終極戰場不是工廠或貨架，而是「潛在用戶的心智空間」。用戶的心智容量極度有限，無法記住規格參數，只能記住「某個品類的第一名」或「某個獨特的心智標籤」。',
        takeaway: '破局對策：寧可成為某個細分領域的第一名，也不要在廣泛紅海中當全能的平庸追隨者。'
    },
    {
        id: 'fc_05',
        category: '心靈哲學',
        question: '當面對突如其來的嚴重挫折、批評或不可抗力時，斯多葛哲人會如何思考？',
        model: '斯多葛之「控制二分法」與「障礙即是道路」',
        answer: '斯多葛哲學主張：世界上只有兩件事——你能掌控的事（自己的判斷、慾望、行動），以及你無法掌控的事（天氣、別人的看法、過去的遭遇）。所有痛苦均源於企圖掌控無法掌控的事物。',
        takeaway: '破局對策：自問「在目前的局面下，我能採取的下一個微小、正確的行動是什麼？」並立即執行。'
    },
    {
        id: 'fc_06',
        category: '投資思維',
        question: '在長期複利計算中，為什麼避免「致命大跌」比追求「暴賺翻倍」重要得多？',
        model: '幾何複利的幾何平均值與非對稱下行代價',
        answer: '如果你的本金虧損 50%，需要後續賺 100% 才能回到原點；如果虧損 80%，需要後續暴賺 400% 才能回本。一次歸零的災難，會徹底抹殺前面數十年的複利積累。',
        takeaway: '破局對策：巴菲特第一法則「永遠不要虧損本金」，留存充足流動性安全邊際。'
    }
];
