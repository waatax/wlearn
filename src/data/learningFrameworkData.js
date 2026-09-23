// 學習科學與認知底層邏輯全景框架核心資料模組
// The Science of Learning & Cognitive Framework System Core Data

export const LEARNING_DIMENSIONS = [
    {
        id: 'neuroscience',
        code: 'DIM-01',
        title: { zh: '腦科學與神經認知底層', en: 'Neuroscience of Learning' },
        subtitle: { zh: '大腦結構、神經可塑性與認知能量調度', en: 'Brain Structures, Neuroplasticity & Cognitive Allocation' },
        icon: 'Brain',
        color: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        accentBg: '#f5f3ff',
        borderColor: '#c4b5fd',
        tag: '生物物理基礎',
        coreConcept: {
            zh: '學習在大腦中的物理實質，是突觸的重塑、神經元連結的強化以及神經軸突髓鞘質的增生。理解大腦的生物限制與節奏，才能避免無效疲勞，實現指數級學習。',
            en: 'The biological essence of learning is synaptic plasticity, neural rewiring, and myelin insulation along axons. Understanding biological limits unlocks exponential learning.'
        },
        mechanisms: [
            {
                name: { zh: '神經可塑性 (Neuroplasticity)', en: 'Neuroplasticity' },
                desc: {
                    zh: '大腦不是僵硬的硬體，而是具備終生自塑能力的動態神經網絡。每一次深度思考與刻意練習，都會刺激突觸生長、強化突觸傳導效率（LTP, 長期增益效應）。',
                    en: 'The adult brain retains the ability to rewire its neural pathways throughout life in response to deliberate practice and new cognitive challenges.'
                }
            },
            {
                name: { zh: '雙模式思考：專注 vs 發散', en: 'Focused vs. Diffuse Mode' },
                desc: {
                    zh: '由芭芭拉·歐克莉提出。專注模式（前額葉高度緊繃）負責分析細節與運算；發散模式（預設模式網絡 DMN）在放鬆、散步、洗澡或小憩時激活，負責跨神經區域的神經跳躍與靈感頓悟。',
                    en: 'Focused mode drives intensive linear problem-solving, while diffuse mode (DMN) connects distant neural regions for breakthroughs during rest.'
                }
            },
            {
                name: { zh: '雙系統認知架構：System 1 & System 2', en: 'Dual-Process Cognitive Architecture' },
                desc: {
                    zh: '康納曼《快思慢想》核心。系統 1（快思）自動、直覺、能耗低但充斥偏誤；系統 2（慢想）邏輯、深思、能耗極高且容易疲勞。學習的本質就是將系統 2 的深度思維內化為系統 1 的直覺表徵。',
                    en: 'System 1 is fast, automatic, and biased; System 2 is slow, analytical, and energy-intensive. Learning transforms deliberate System 2 efforts into fluent System 1 intuitions.'
                }
            },
            {
                name: { zh: '神經遞質驅動：多巴胺與去甲腎上腺素', en: 'Neuromodulators: Dopamine & Noradrenaline' },
                desc: {
                    zh: '去甲腎上腺素提供高度警覺與聚焦；乙醯膽鹼標記神經元突觸；多巴胺則在「預期回報與進步」時釋放，修補神經通路並提供持續探索的持久心智動能。',
                    en: 'Norepinephrine generates focus, acetylcholine marks active synapses, and dopamine fuels motivation and synaptic reinforcement upon anticipation of mastery.'
                }
            },
            {
                name: { zh: '睡眠、膠淋巴系統與記憶固化', en: 'Glymphatic Clearance & Sleep Consolidation' },
                desc: {
                    zh: '深層慢波睡眠與 REM 睡眠期間，大腦微血管收縮，腦脊液沖洗代謝廢物（如 β-類澱粉蛋白）；海馬迴將白天的短期神經暫存轉移固化至大腦皮質長效儲存。熬夜等於主動破壞記憶。',
                    en: 'During deep and REM sleep, the glymphatic system clears metabolic toxins while the hippocampus replays and transfers short-term memories into the neocortex.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '疲勞戰術與熬夜苦讀', en: 'Sleep Deprivation & Burnout' },
                solution: { zh: '睡眠不是學習的暫停，而是記憶固化與神經突觸修剪的關鍵生理工序。必須保證 7-8 小時優質睡眠。', en: 'Sleep is not downtime; it is an active neurobiological phase of memory consolidation and synapse pruning.' }
            },
            {
                trap: { zh: '持續緊繃、不給發散留白', en: 'Relentless Uninterrupted Focus' },
                solution: { zh: '專注 25-50 分鐘後必須切換至散步或無屏幕休息，讓發散模式網絡整合大腦深處的概念組塊。', en: 'Alternate 25-50 min focused sprints with screen-free diffuse breaks to allow cognitive percolation.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '25+5 雙模式節奏律動', en: 'Ultradian Focus Protocol' },
                step: { zh: '採用 90 分鐘人體生理節律或 25 分鐘番茄鐘；高強度聚焦後立即進行 5-10 分鐘無螢幕發散漫步。', en: 'Align work with 90-min ultradian cycles or 25-min sprints followed by 5-10 min offline mental wandering.' }
            },
            {
                title: { zh: '微多巴胺回饋階梯', en: 'Micro-Dopamine Reward Stacking' },
                step: { zh: '將龐大主題拆解為 10 分鐘可驗證的小任務，每攻克一個即刻劃掉，主動觸發大腦內在多巴胺獎賞。', en: 'Deconstruct intimidating topics into 10-minute milestones to trigger intrinsic dopamine reinforcement.' }
            }
        ],
        bookCodes: ['S1-43', 'S4-28', 'S1-81', 'S5-58', 'S5-43', 'S4-88', 'S5-39', 'S1-61', 'S1-62']
    },
    {
        id: 'memory',
        code: 'DIM-02',
        title: { zh: '記憶編碼與科學提取', en: 'Memory & Retention Science' },
        subtitle: { zh: '艾賓浩斯遺忘曲線、主動回想與認知負荷管理', en: 'Ebbinghaus Forgetting Curve, Active Recall & Cognitive Load' },
        icon: 'Zap',
        color: '#0284c7',
        gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        accentBg: '#f0f9ff',
        borderColor: '#7dd3fc',
        tag: '資訊存取引擎',
        coreConcept: {
            zh: '記憶不是硬碟寫入，而是一次又一次的神經重構。越費力提取的資訊，在大腦中烙印的神經連結越堅固；反覆重讀只是製造「熟悉的假象」，主動提取才是神經強化的王道。',
            en: 'Memory is not recording; it is neural reconstruction. Desirable difficulty and retrieval practice forge indomitable neural circuits, overcoming the illusion of competence.'
        },
        mechanisms: [
            {
                name: { zh: '提取練習效應 (The Testing Effect)', en: 'Retrieval Practice & Testing Effect' },
                desc: {
                    zh: '《超牢記憶法》(Make It Stick) 證實：從大腦中「調取」資訊的動作，比重新「放入」資訊更能百倍強化記憶。閉上書本嘗試口述或作答，是抵抗遺忘的最強武器。',
                    en: 'Retrieving information from long-term memory strengthens neural retrieval routes far more effectively than passive rereading.'
                }
            },
            {
                name: { zh: '間隔重複與遺忘曲線 (Spaced Repetition)', en: 'Spaced Repetition & Spacing Effect' },
                desc: {
                    zh: '艾賓浩斯曲線表明新知識在 24 小時內會流失 70%。若在即將遺忘的臨界點（第 1 天、第 3 天、第 7 天、第 15 天）進行主動提取，大腦會將神經突觸判定為「生存攸關」，永久固化。',
                    en: 'Spacing review sessions at expanding intervals forces the brain to re-consolidate fading memory traces into stable semantic networks.'
                }
            },
            {
                name: { zh: '交錯學習 vs 區塊練習 (Interleaving)', en: 'Interleaved Practice vs. Blocking' },
                desc: {
                    zh: '不要連續數小時只算同一種類型的題目（區塊練習）。交錯練習多種不同概念，能迫使大腦訓練「模式識別能力」，學會分辨不同問題本質與適用解法。',
                    en: 'Interleaving distinct but related subjects trains cognitive pattern recognition and adaptive discrimination between fundamental concepts.'
                }
            },
            {
                name: { zh: '認知負荷理論 (Cognitive Load Theory)', en: 'Cognitive Load & Working Memory' },
                desc: {
                    zh: '人類工作記憶（Working Memory）容量僅有 4±1 個組塊。學習時必須消滅「外在無效負荷」（繁雜排版、干擾），合理平衡「內在負荷」，並將能量專注於「關聯負荷」（基模構建）。',
                    en: 'Working memory can hold only 4±1 chunks. Streamline extraneous cognitive load to maximize germane load for schema construction.'
                }
            },
            {
                name: { zh: '雙重編碼理論 (Dual-Coding Theory)', en: 'Dual-Coding & Spatial Mnemonic' },
                desc: {
                    zh: '佩維奧（Paivio）提出：大腦分別以語言系統（語義）與非語言系統（圖像）獨立編碼。將抽象概念轉化為心智圖、空間記憶宮殿或隱喻圖表，能建立雙倍神經提取索引。',
                    en: 'Encoding concepts simultaneously through semantic propositions and spatial imagery creates redundant cognitive retrieval cues.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '反覆劃線與重讀課本 (劃重點的假象)', en: 'Passive Highlighting & Rereading' },
                solution: { zh: '劃線只帶來「我看懂了」的流暢度假象（Fluency Illusion）。改為看完一頁立刻合上書，用紙筆默寫核心三個要點。', en: 'Replace passive highlighting with closed-book retrieval: write down 3 key takeaways from memory.' }
            },
            {
                trap: { zh: '短期突擊死記硬背 (Cramming)', en: 'Massed Cramming' },
                solution: { zh: '考前突擊只能暫存於工作記憶，考完三天忘光。透過間隔排程，將複習分散在數週內完成。', en: 'Distribute revision across weeks using flashcards or spaced intervals for long-term retention.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '3-Step 主動回想清單', en: '3-Step Active Recall Protocol' },
                step: { zh: '閱讀章節 → 合上書本自問自答（我是如何向新手解釋的？） → 對照原文補齊盲點。', en: 'Read a section → Close book and quiz yourself → Reopen and calibrate your blind spots.' }
            },
            {
                title: { zh: '數位間隔複習盒 (Leitner System)', en: 'Leitner Spaced Repetition Box' },
                step: { zh: '利用 Anki、閃卡或實體筆記盒，依據熟悉程度將知識卡片依 1/3/7/14/30 天階梯推進。', en: 'Sort flashcards into expanding time intervals based on recall difficulty.' }
            }
        ],
        bookCodes: ['S4-84', 'S4-80', 'S4-83', 'VW-03', 'S1-47', 'S1-48', 'S4-78']
    },
    {
        id: 'mindset',
        code: 'DIM-03',
        title: { zh: '成長心態與內在驅動', en: 'Growth Mindset & Inner Drive' },
        subtitle: { zh: '刻意練習、抗挫心理韌性與行為微習慣系統', en: 'Deliberate Practice, Resilience & Atomic Habit Loop' },
        icon: 'Flame',
        color: '#ea580c',
        gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
        accentBg: '#fff7ed',
        borderColor: '#fdba74',
        tag: '心理與能量驅動',
        coreConcept: {
            zh: '卓越從非天賦所賜，而是正確心智模型與刻意練習累積的產物。將挫折視為大腦突觸新生的生物訊號，構建不依賴意志力的原子習慣系統，是終身成長的發動機。',
            en: 'Mastery is not gifted; it is sculpted through deliberate practice and identity-based habit loops. Failure is merely biological feedback of synaptic expansion.'
        },
        mechanisms: [
            {
                name: { zh: '成長型心態 (Growth Mindset)', en: 'Growth Mindset vs. Fixed Mindset' },
                desc: {
                    zh: '卡蘿·杜維克（Carol Dweck）發現：固定型心態認為智力與天賦固定，畏懼挑戰與失敗；成長型心態深信能力可隨神經重組而進化，視「犯錯」為神經突觸正在生長的客觀證據。',
                    en: 'A growth mindset perceives challenge and failure as indispensable catalytic signals for cognitive and synaptic restructuring.'
                }
            },
            {
                name: { zh: '刻意練習與心理表徵 (Deliberate Practice)', en: 'Deliberate Practice & Mental Representations' },
                desc: {
                    zh: '安德斯·艾利克森《刻意練習》核心：單純重覆一萬小時毫無意義。必須處於「舒適圈邊緣（學習區）」、設定清晰微目標、獲取即時精確反饋，並構建豐富強大的領域心理表徵。',
                    en: 'Deliberate practice requires staying at the edge of comfort, target-specific sub-skills, receiving instant feedback, and building rich mental representations.'
                }
            },
            {
                name: { zh: '心流通道 (Flow Channel)', en: 'The Flow Channel (Csikszentmihalyi)' },
                desc: {
                    zh: '當「挑戰難度」與「當前技能」達到黃金平衡點時，個體進入心流：自我意識消融、時間感扭曲、專注力達到極致。挑戰過高產生焦慮，挑戰過低產生無聊。',
                    en: 'Flow occurs at the delicate equilibrium where challenge matches personal capability, dissolving self-doubt into intense absorption.'
                }
            },
            {
                name: { zh: '原子習慣四步迴路 (The Habit Loop)', en: 'The Atomic Habit Loop' },
                desc: {
                    zh: '詹姆斯·克利爾《原子習慣》法則：提示（顯而易見）→ 渴望（極具吸引力）→ 回應（簡便易行）→ 獎勵（令人滿足）。將學習綁定在既有習慣之後（習慣堆疊）。',
                    en: 'Harness Cue, Craving, Response, and Reward. Reduce friction with the 2-minute rule and anchor study routines via habit stacking.'
                }
            },
            {
                name: { zh: '情緒調節與拖延本質 (Emotional Regulation)', en: 'Procrastination as Emotional Regulation' },
                desc: {
                    zh: '拖延從來不是時間管理缺陷，而是杏仁核主導的情緒調節危機（對無聊、挫折、恐懼失敗的防衛反應）。接受不完美，啟動「兩分鐘定律」降低認知阻力。',
                    en: 'Procrastination is an amygdala-driven emotional avoidance of discomfort and perfectionism, solved by lowering entry friction.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '追求完美主義導致持續拖延', en: 'Perfectionist Paralysis' },
                solution: { zh: '完成優於完美。運用「爛開始原則」（Allow a shitty first draft），先做 2 分鐘打破靜摩擦力。', en: 'Lower standards for the start: embrace a rough 2-minute attempt to dissolve mental inertia.' }
            },
            {
                trap: { zh: '盲目低效重覆（偽刻意練習）', en: 'Mindless Repetition in Comfort Zone' },
                solution: { zh: '永遠在感到「卡住、微痛苦」的學習區操練，尋求教練或客觀指標的精準即時反饋。', en: 'Move away from effortless tasks into the uncomfortable stretch zone with clear metrics.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '微習慣錨定法 (Habit Stacking)', en: 'Identity-Based Habit Stacking' },
                step: { zh: '設定句型：「在［每天固定習慣］之後，我會［花 5 分鐘閱讀/複述一頁］」。', en: 'Formula: "After [Current Habit], I will [study deliberately for 5 minutes]."' }
            },
            {
                title: { zh: '心流四條件清單', en: 'Flow State Ignition Checklist' },
                step: { zh: '明確目標 + 阻斷所有干擾 + 匹配微挑戰（難度約高於能力 4%） + 即時反饋。', en: 'Set explicit goals, eliminate distractions, tune challenge to ~4% above skill, and monitor feedback.' }
            }
        ],
        bookCodes: ['S1-10', 'S1-41', 'S2-11', 'S3-87', 'S4-87', 'S4-89', 'S1-65', 'S4-07', 'S4-77']
    },
    {
        id: 'mental_models',
        code: 'DIM-04',
        title: { zh: '學習哲學與心智模型', en: 'Philosophy & Mental Models' },
        subtitle: { zh: '蒙格思維格柵、元認知監控與反脆弱思維', en: 'Munger Latticework, Metacognition & Antifragility' },
        icon: 'Compass',
        color: '#16a34a',
        gradient: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        accentBg: '#f0fdf4',
        borderColor: '#86efac',
        tag: '認知操作系統',
        coreConcept: {
            zh: '「在手裡拿著鐵鎚的人看來，每個問題都像釘子。」只有跨學科構建 80-90 個重大思維模型網格，才能突破單一學科的盲點，洞穿複雜現象背後的普通常識。',
            en: 'To avoid the man with a hammer syndrome, assemble a multidisciplinary latticework of fundamental mental models to perceive reality without distortions.'
        },
        mechanisms: [
            {
                name: { zh: '多元思維模型格柵 (Munger Latticework)', en: 'Multidisciplinary Mental Latticework' },
                desc: {
                    zh: '查理·蒙格主張：吸收數學（機率、複利）、物理（臨界點、力矩）、生物（演化、自然選擇）、心理（認知偏差）等跨學科基礎模型，交織成心智格柵以應對萬變決策。',
                    en: 'Synthesize foundational principles from physics, biology, mathematics, and cognitive psychology into an interconnected decision framework.'
                }
            },
            {
                name: { zh: '元認知監控 (Metacognition)', en: 'Metacognition & Self-Regulation' },
                desc: {
                    zh: '「對自己思考過程的再思考」。從第三人稱視角抽離出來，時刻自我盤問：「我剛才是真正理解了，還是只是記住了文字？我的邏輯推論中是否存在未經證實的假設？」',
                    en: 'Thinking about thinking: cultivating the executive ability to observe, calibrate, and critique one\'s own comprehension and reasoning biases.'
                }
            },
            {
                name: { zh: '逆向思維 (Inversion: Invert, Always Invert)', en: 'Inversion Thinking (Jacobi & Munger)' },
                desc: {
                    zh: '想知道怎樣才能學得又快又牢？先思考：「怎樣的學習方式會保證我迅速遺忘、思維僵化、一事無成？」列出必敗清單並嚴格避開，成功自然水到渠成。',
                    en: 'Solve problems backwards: investigate thoroughly how to guarantee failure, and deliberately avoid those specific missteps.'
                }
            },
            {
                name: { zh: '反思與科學家心態 (Scientist Mindset)', en: 'The Scientist Mindset (Think Again)' },
                desc: {
                    zh: '亞當·格蘭特《逆思維》：拒絕傳教士（捍衛既有教條）、檢察官（攻擊他人謬誤）或政客（迎合他人認同）思維；以科學家心態視自身知識為待驗證假說，熱愛被事實糾正。',
                    en: 'Abandon preacher, prosecutor, and politician mentalities; embrace the scientist mindset that treats opinions as hypotheses eager to be revised.'
                }
            },
            {
                name: { zh: '反脆弱學習 (Antifragility)', en: 'Antifragile Knowledge Acquisition' },
                desc: {
                    zh: '塔雷伯概念：脆弱事物畏懼波動與壓力，反脆弱事物則從壓力、隨機性與錯誤中獲益並茁壯。主動尋找難以解答的反例與觀點衝突，是心智認知升級的最佳催化劑。',
                    en: 'Design learning routines that gain from disorder, contradictions, and unexpected setbacks, converting disconfirmed beliefs into superior clarity.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '鐵鎚人綜合症 (單一學科傲慢)', en: 'Man with a Hammer Syndrome' },
                solution: { zh: '強迫自己用至少 3 種完全不同學科（例如物理熱力學、演化生物學、微觀經濟學）的角度重新解釋同一個問題。', en: 'Force yourself to explain a single phenomenon using models from at least three disparate disciplines.' }
            },
            {
                trap: { zh: '達克效應 (井底之蛙不知己不知)', en: 'Dunning-Kruger Cognitive Blindness' },
                solution: { zh: '運用元認知自省，在自以為完全弄懂時，主動尋求該領域頂尖行家的嚴厲挑錯與公開評議。', en: 'Subject intuitive confidence to peer review or rigorous external benchmarks to reveal blind spots.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '逆向失敗清單設計', en: 'Failure Avoidance Audit' },
                step: { zh: '在發起任何新學習專案前，寫下「如何讓這次學習徹底失敗的 5 種致命做法」，並建立守則規避。', en: 'Draft the 5 fastest routes to catastrophic learning failure and install prophylactic checkpoints.' }
            },
            {
                title: { zh: '跨學科模型類比練習', en: 'Latticework Cross-Mapping' },
                step: { zh: '嘗試將一個商業或程式概念，以生物學演化或物理學熵增定律進行深度類比並寫下共通性。', en: 'Map a software/business problem to entropy, natural selection, or compounding equations.' }
            }
        ],
        bookCodes: ['S1-38', 'S3-12', 'S1-37', 'S2-18', 'S1-49', 'S4-20', 'S2-35', 'VS-25']
    },
    {
        id: 'underlying_logic',
        code: 'DIM-05',
        title: { zh: '底層邏輯與系統思考', en: 'Underlying Logic & Systems' },
        subtitle: { zh: '第一性原理、反饋迴路、槓桿解與動態演化', en: 'First Principles, Feedback Loops & High-Leverage Dynamics' },
        icon: 'Layers',
        color: '#dc2626',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
        accentBg: '#fef2f2',
        borderColor: '#fca5a5',
        tag: '本質洞察骨架',
        coreConcept: {
            zh: '「現象是變數，規律是公式，底層邏輯是公理。」事物百年間千變萬化，但背後的演變機制與因果反饋迴路始終穩定。看懂事物系統結構，才能找到牽一髮動全身的關鍵槓桿點。',
            en: 'Phenomena are transient variables; laws are mathematical equations; underlying logic is foundational axioms. Grasp systemic leverage points to reshape outcomes.'
        },
        mechanisms: [
            {
                name: { zh: '第一性原理 (First Principles Thinking)', en: 'First Principles Deconstruction' },
                desc: {
                    zh: '亞里斯多德與馬斯克推崇：拒絕「按類比推論（別人怎麼做我就怎麼做）」，而是將事物層層剝離至不可動搖的物理真實或基本公理，再從底層向上重新演繹推導。',
                    en: 'Break a system down to its most basic, indubitable physical truths and reason upwards, bypassing blind analogy.'
                }
            },
            {
                name: { zh: '系統思考：存量、流量與反饋迴路', en: 'Systems Thinking: Stocks, Flows & Feedback' },
                desc: {
                    zh: '梅多斯《系統思考》：事物是由「存量（積累）」、「流量（進出）」以及「增強反饋 / 平衡反饋」構成的有機整體。學習成效不是線性單日產出，而是長期存量突破臨界閥值後的相變爆發。',
                    en: 'Reality comprises stocks, flows, delays, and balancing/reinforcing loops. Breakthroughs stem from non-linear threshold dynamics.'
                }
            },
            {
                name: { zh: '尋找系統最高槓桿點 (Leverage Points)', en: 'Strategic Leverage Points' },
                desc: {
                    zh: '在複雜系統中，最直觀的用力點往往是低效甚至反作用的（表象治療）；高槓桿點藏在「資訊流通架構」、「規則設計」以及「支配系統運行的心智範式（Paradigms）」之中。',
                    en: 'The most impactful intervention points lie not in trivial parameters, but in information architecture, rules, and paradigm shifts.'
                }
            },
            {
                name: { zh: '二階思維與連鎖反應 (Second-Order Thinking)', en: 'Second-Order Thinking & Cascades' },
                desc: {
                    zh: '一階思維只問：「這樣做直接後果是什麼？」二階思維則問：「然後呢？三年後這會引發何種連鎖反應？系統中的其他參與者會如何相應反應？」',
                    en: 'First-order thinkers evaluate immediate outcomes; second-order thinkers simulate downstream systemic repercussions and unintended consequences.'
                }
            },
            {
                name: { zh: '機率論、期望值與貝氏更新 (Bayesian Updating)', en: 'Probabilistic Thinking & Bayesian Updating' },
                desc: {
                    zh: '面對不確定世界，拒絕絕對真偽的二元論。依據初始先驗機率（Prior），每當遇到新證據時，運用貝氏法則動態修正後驗機率（Posterior），逐步逼近客觀世界真相。',
                    en: 'Approach understanding as probability distributions, continuously calibrating hypotheses in light of fresh empirical signals via Bayes\' theorem.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '頭痛醫頭、腳痛醫腳 (一階局部優化)', en: 'Symptomatic Relief & Local Optimization' },
                solution: { zh: '退後一步繪製因果迴路圖（Causal Loop Diagram），找出導致問題持續發生的系統反饋循環。', en: 'Step back to sketch causal loops; solve structural generators rather than isolated symptoms.' }
            },
            {
                trap: { zh: '盲從暢銷方法論 (類比陷阱)', en: 'Copy-Pasting Methodologies by Analogy' },
                solution: { zh: '拆解別人的成功經驗：哪些是特定環境變數？哪些才是放諸四海皆準的不變底層邏輯？', en: 'Separate context-dependent variables from invariant underlying axioms before adopting methods.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '5-Why 本質回溯提問', en: '5-Whys Root Cause Protocol' },
                step: { zh: '遭遇瓶頸時連續追問 5 次「為什麼」，直到觸及不可再分拆的基本物理約束或動機根源。', en: 'Ask "Why" iteratively five times to penetrate surface symptoms down to first principles.' }
            },
            {
                title: { zh: '決策二階連鎖沙盤', en: 'Second-Order Repercussion Mapping' },
                step: { zh: '在紙上寫下：「如果實施 X，第一階段發生 A；那麼第二階段誰會受到衝擊？長期會產生什麼隱性成本？」', en: 'Trace consequential waves: "If X happens, then what follows in T+1, T+2, and systemic equilibrium?"' }
            }
        ],
        bookCodes: ['S1-02', 'S1-16', 'VS-17', 'VS-25', 'S5-06', 'S2-26', 'S1-18']
    },
    {
        id: 'action_systems',
        code: 'DIM-06',
        title: { zh: '全閉環實踐學習系統', en: 'Closed-Loop Actionable Systems' },
        subtitle: { zh: '費曼學習法、超速學習 9 原則與數位第二大腦', en: 'The Feynman Technique, Ultralearning & Building a Second Brain' },
        icon: 'Workflow',
        color: '#2d6648',
        gradient: 'linear-gradient(135deg, #2d6648 0%, #1b452e 100%)',
        accentBg: '#eaf3ed',
        borderColor: '#86efac',
        tag: '終極工程實踐',
        coreConcept: {
            zh: '「輸入是徒勞，輸出是王道；輸出倒逼輸入，閉環方得複利。」樺澤紫苑指出輸入與輸出的黃金比例是 3:7。任何沒有形成「教導、寫作、實踐、交付」的知識，都只是大腦中的短暫資訊垃圾。',
            en: 'Input is futile without output. The golden ratio of learning is 30% consumption to 70% production. Knowledge unapplied is transient cognitive noise.'
        },
        mechanisms: [
            {
                name: { zh: '費曼學習法 4 步法 (The Feynman Technique)', en: 'The 4-Step Feynman Technique' },
                desc: {
                    zh: '諾貝爾物理學獎得主理查·費曼心法：1. 選擇概念；2. 假想向一位 8 歲小孩解釋（用最通俗大白話與生動類比，禁用專業術語）；3. 發現卡頓點回溯查閱；4. 簡化提煉。能講清楚才是真懂。',
                    en: '1. Select concept; 2. Teach it to an 8-year-old using plain vernacular; 3. Pinpoint gaps and consult source; 4. Refine analogies until crystal clear.'
                }
            },
            {
                name: { zh: '超速學習 9 大原則 (Ultralearning)', en: 'Ultralearning 9 Principles (Scott Young)' },
                desc: {
                    zh: '1. 元學習（先畫地圖）；2. 專注力；3. 直接性（在真實情境中做中學）；4. 反覆操練（攻克最脆弱環節）；5. 提取測試；6. 即時反饋；7. 記憶保留；8. 培養直覺；9. 勇於實驗。',
                    en: 'Master extreme self-directed skill acquisition through meta-learning maps, directness in actual contexts, intense drilling, and bold experimentation.'
                }
            },
            {
                name: { zh: '打造第二大腦 CODE 模型 (Tiago Forte)', en: 'Building a Second Brain: CODE Framework' },
                desc: {
                    zh: '大腦是用來思考的，不是用來記事情的。C (Capture 捕捉靈感)、O (Organize 依行動組織/PARA)、D (Distill 漸進式提煉精華)、E (Express 產出作品與表達)。將外部知識轉化為個人資產。',
                    en: 'Your mind is for having ideas, not holding them. Capture resonant notes, Organize by actionability (PARA), Distill to core essence, Express finished outputs.'
                }
            },
            {
                name: { zh: '輸入與輸出 3:7 黃金律 (Output-Driven Learning)', en: 'The 3:7 Input-to-Output Golden Ratio' },
                desc: {
                    zh: '日本精神科醫師樺澤紫苑《最高學習法》：大腦神經元只有在反覆對外傳遞信號時才會建立長期髓鞘。每讀 30 分鐘，必須花 70 分鐘進行口述、筆記、心智圖重構或社群分享。',
                    en: 'For every 30 minutes of reading, invest 70 minutes writing summaries, teaching peers, or generating actionable solutions.'
                }
            },
            {
                name: { zh: 'SQ3R 經典精讀法 (Survey to Review)', en: 'The SQ3R Reading Mastery Method' },
                desc: {
                    zh: 'S (Survey 快速掃描目錄與結構) → Q (Question 將小標題轉化為問題) → R1 (Read 帶著問題主動閱讀) → R2 (Recite 合書複述回答) → R3 (Review 定期間隔回顧)。',
                    en: 'Survey overall structure → formulate Questions → Read intentionally to answer → Recite from memory → Review spaced intervals.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '收藏狂魔與資訊囤積狂 (Digital Hoarding)', en: 'The Illusion of Bookmarking' },
                solution: { zh: '收藏不等於學會。建立鐵律：「未寫下 3 句個人原創心得或提煉的內容，禁止打勾或歸檔」。', en: 'Bookmark nothing without appending three sentences of personal reflection or immediate application.' }
            },
            {
                trap: { zh: '只進不出 (只聽書、不輸出實踐)', en: 'Passive Audio Consumption without Synthesis' },
                solution: { zh: '聽完一集說書，立即在筆記區寫下一項「明天下班前我能執行的微小改變」。', en: 'Translate every book summary into one micro-action executable within 24 hours.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '費曼外行對話自檢卡', en: 'Feynman Rubber-Duck Protocol' },
                step: { zh: '對著桌上的黃色小鴨或鏡子，限時 3 分鐘用生活比喻把剛學會的概念講清楚，錄音並回聽檢核。', en: 'Spend 3 minutes explaining the concept aloud to a rubber duck with everyday metaphors; audit clarity.' }
            },
            {
                title: { zh: 'PARA 行動導向知識庫', en: 'PARA Knowledge Architecture' },
                step: { zh: '將筆記嚴格分類為：Projects (當前專案)、Areas (長期責任)、Resources (興趣資源)、Archives (封存)。', en: 'Structure external notes strictly by actionability: Projects, Areas, Resources, and Archives.' }
            }
        ],
        bookCodes: ['S1-06', 'S3-69', 'S4-32', 'S1-42', 'S1-46', 'S1-44', 'S1-19', 'S1-22']
    }
];

// 15+ 學習心智模型速查庫 (Mental Models Quick Reference)
export const LEARNING_MENTAL_MODELS = [
    {
        id: 'feynman',
        name: { zh: '費曼學習技巧', en: 'The Feynman Technique' },
        category: '輸出閉環',
        tag: '極致白話',
        formula: '選擇概念 ➔ 白話向外行教導 ➔ 標記模糊卡點 ➔ 查證簡化與類比',
        description: {
            zh: '若你無法向一個八歲孩子用通俗語言講明白一個概念，說明你自己根本還沒真正弄懂。教導是最高級別的學習。',
            en: 'If you cannot explain something in simple terms to an 8-year-old child, you do not truly understand it.'
        },
        sourceBook: 'S1-42 《學習究竟是什麼》',
        icon: 'MessageSquareQuote'
    },
    {
        id: 'spaced_repetition',
        name: { zh: '間隔重複法', en: 'Spaced Repetition' },
        category: '記憶編碼',
        tag: '遺忘阻擊',
        formula: '學習 (Day 0) ➔ 提取 (Day 1) ➔ 提取 (Day 3) ➔ 提取 (Day 7) ➔ 固化 (Day 15)',
        description: {
            zh: '在記憶即將消逝的懸崖邊界進行主動提取，大腦會釋放神經化學訊號將突觸連結升級為永久儲存。',
            en: 'Challenging retrieval right at the verge of forgetting triggers deep neural consolidation.'
        },
        sourceBook: 'S4-84 《超牢記憶法》',
        icon: 'Repeat'
    },
    {
        id: 'active_recall',
        name: { zh: '主動回想 (提取練習)', en: 'Active Recall' },
        category: '記憶編碼',
        tag: '拒絕假熟',
        formula: '合上書本 ➔ 腦中重建基模 ➔ 白紙默寫 ➔ 校對糾偏',
        description: {
            zh: '強迫大腦在沒有提示的情況下重構資訊，比反覆閱讀課本有效 300% 以上。神經回溯路徑在回想中被反覆拓寬。',
            en: 'Forcing memory retrieval without cues builds exponentially stronger cognitive pathways than passive reading.'
        },
        sourceBook: 'S4-83 《如何記住任何事》',
        icon: 'Sparkles'
    },
    {
        id: 'diffuse_focus',
        name: { zh: '專注與發散雙重模式', en: 'Focused vs. Diffuse Thinking' },
        category: '腦科學',
        tag: '靈感切換',
        formula: '前額葉專注衝刺 ➔ 遭遇瓶頸 ➔ 切換散步/休息發散 ➔ 頓悟靈感湧現',
        description: {
            zh: '大腦在專注模式下處理既有路徑的細節運算，在發散模式下調動全腦各神經群進行宏觀連結與創新。',
            en: 'Alternate between intense focused problem-solving and screen-free diffuse wandering for breakthrough insights.'
        },
        sourceBook: 'S1-43 《學習如何學習》',
        icon: 'Maximize2'
    },
    {
        id: 'first_principles',
        name: { zh: '第一性原理', en: 'First Principles Thinking' },
        category: '底層邏輯',
        tag: '破除盲從',
        formula: '剝離表象類比 ➔ 追溯物理本質/公理 ➔ 由底層重新演繹演算法',
        description: {
            zh: '不因循守舊地照抄前人做法，而是將事物解構到最不可爭議的基礎事實，再推論出最優方案。',
            en: 'Boil things down to the most fundamental truths you can confirm and reason up from there.'
        },
        sourceBook: 'S1-02 《底層邏輯 I》',
        icon: 'Anchor'
    },
    {
        id: 'deliberate_practice',
        name: { zh: '刻意練習與心理表徵', en: 'Deliberate Practice' },
        category: '心態修煉',
        tag: '突破平庸',
        formula: '明確微技能 ➔ 舒適圈邊界 ➔ 專注投入 ➔ 即時反饋 ➔ 修訂心理表徵',
        description: {
            zh: '反覆重複已知的事情只是浪費光陰；大師的練習永遠專注在自己做不好的那 5% 邊界上。',
            en: 'Progress requires operating at the razor edge of ability with immediate, unambiguous feedback.'
        },
        sourceBook: 'S1-10 《刻意練習》',
        icon: 'Crosshair'
    },
    {
        id: 'habit_loop',
        name: { zh: '原子習慣四步迴路', en: 'The Habit Loop' },
        category: '心態修煉',
        tag: '無痛自律',
        formula: '讓提示顯而易見 ➔ 讓渴望極具吸引 ➔ 讓回應簡便易行 ➔ 讓獎勵令人滿足',
        description: {
            zh: '不要依賴不可靠的意志力，而是依賴優雅的環境架構設計，讓好的學習行為成為阻力最小的路徑。',
            en: 'Design environment architectures that make productive learning habits frictionless and rewarding.'
        },
        sourceBook: 'S2-11 《原子習慣》',
        icon: 'RotateCw'
    },
    {
        id: 'systems_thinking',
        name: { zh: '系統思考與因果反饋', en: 'Systems Feedback Loops' },
        category: '底層邏輯',
        tag: '全局視野',
        formula: '識別存量與流量 ➔ 繪製因果反饋迴路 ➔ 洞察延遲效應 ➔ 尋找核心槓桿點',
        description: {
            zh: '看懂系統的內在結構勝過指責單一事件。解決問題要找深層結構的槓桿解，而非應急的症狀解。',
            en: 'True leverage lies in restructuring systemic feedback loops rather than treating isolated symptoms.'
        },
        sourceBook: 'VS-17 《系統思考》',
        icon: 'Network'
    },
    {
        id: 'inversion',
        name: { zh: '逆向思維 (Inversion)', en: 'Inversion Thinking' },
        category: '學習哲學',
        tag: '反向求真',
        formula: '反過來想，總是反過來想 ➔ 列出保證失敗的途徑 ➔ 嚴格規避所有愚蠢錯誤',
        description: {
            zh: '研究如何變得偉大往往充斥倖存者偏差；研究如何必然愚蠢並竭力避免，是勝率最高的成功策略。',
            en: 'Invert, always invert: identify how to fail completely and avoid those pitfalls with religious discipline.'
        },
        sourceBook: 'S1-38 《窮查理的普通常識》',
        icon: 'Shuffle'
    },
    {
        id: 'flow_channel',
        name: { zh: '心流通道 (Flow Channel)', en: 'The Flow Channel' },
        category: '心態修煉',
        tag: '極致專注',
        formula: '挑戰強度 = 當前能力 + 4% ➔ 消除外在干擾 ➔ 沉浸式時間扭曲',
        description: {
            zh: '維持在焦慮與無聊之間的狹窄通道中，讓任務難度剛好比現有水平高一點點，激發大腦最佳潛能。',
            en: 'Keep challenge calibrated just slightly above your skill level to sustain prolonged autotelic focus.'
        },
        sourceBook: 'S1-41 《心流》',
        icon: 'Waves'
    },
    {
        id: 'code_second_brain',
        name: { zh: '第二大腦 CODE 架構', en: 'CODE Second Brain' },
        category: '輸出閉環',
        tag: '數位延伸',
        formula: 'Capture (捕捉) ➔ Organize (按行動組織) ➔ Distill (提煉金句) ➔ Express (輸出分享)',
        description: {
            zh: '將記憶外包給筆記庫，釋放生物大腦的運算與創造能量，形成個人可檢索的終身知識資產。',
            en: 'Offload memory storage to an external digital brain to liberate biological processing bandwidth.'
        },
        sourceBook: 'S4-32 《打造第二大腦》',
        icon: 'Database'
    },
    {
        id: 'cognitive_load',
        name: { zh: '認知負荷優化模型', en: 'Cognitive Load Optimization' },
        category: '腦科學',
        tag: '工作記憶',
        formula: '消滅外在干擾負荷 ➔ 模組化拆解內在負荷 ➔ 釋放容量給基模建構 (關聯負荷)',
        description: {
            zh: '工作記憶一次只能處理 4 個組塊。學習新概念前先清理桌面與手機干擾，保護極為稀缺的認知能量。',
            en: 'Working memory bandwidth is severely capped; rigorously eliminate distractions to preserve capacity.'
        },
        sourceBook: 'S4-88 《在大腦外思考》',
        icon: 'Cpu'
    }
];

// 個人學習模式自測診斷問卷 (Interactive Diagnostic Assessment)
export const LEARNING_DIAGNOSTICS_QUESTIONS = [
    {
        id: 'q1',
        dimension: 'neuroscience',
        dimensionName: { zh: '腦科學與節律調度', en: 'Neuroscience & Rhythms' },
        question: {
            zh: '當你在學習或研究遭遇卡關、想不出解法時，你的典型反應是？',
            en: 'When hitting a cognitive wall while learning, your typical response is?'
        },
        options: [
            {
                text: { zh: '死嗑到底，強迫自己坐在螢幕前繼續盯著看，直到想出來為止。', en: 'Force myself to sit and grind until a breakthrough happens.' },
                score: 1,
                feedback: { zh: '【低分】陷入專注模式僵局。缺乏發散模式激活，大腦前額葉高度疲勞，容易產生思維固化。', en: 'Trapped in focused mode lockup without diffuse recovery.' }
            },
            {
                text: { zh: '滑手機看社交媒體放鬆，但往往一滑就是一小時，回來更累。', en: 'Scroll social media to relax, but end up more cognitively depleted.' },
                score: 2,
                feedback: { zh: '【中分】滑手機是高多巴胺刺激，並未讓大腦真正休息，反而搶佔工作記憶。', en: 'Social media adds cognitive noise rather than true neural rest.' }
            },
            {
                text: { zh: '起身去喝杯水或在無螢幕環境下散步 10 分鐘，放空思緒，往往在洗手間或散步時靈感突現。', en: 'Take a screen-free walk or drink water; breakthroughs often surface during wandering.' },
                score: 4,
                feedback: { zh: '【高分】完美掌握專注與發散雙模式交替！成功運用預設網絡（DMN）進行神經跨區聯想。', en: 'Mastery of focused-diffuse switching, leveraging the default mode network.' }
            }
        ]
    },
    {
        id: 'q2',
        dimension: 'memory',
        dimensionName: { zh: '記憶編碼與提取機制', en: 'Memory & Retention' },
        question: {
            zh: '在讀完一本重要好書或學習完一個章節後，你通常如何複習？',
            en: 'After reading a book or finishing a course section, how do you review?'
        },
        options: [
            {
                text: { zh: '把書中劃線和熒光筆標記的地方，重新拿出來翻看一遍。', en: 'Reread the highlighted passages and sticky notes.' },
                score: 1,
                feedback: { zh: '【低分】掉入「流暢度假象」。重讀只是眼睛辨識，大腦神經沒有進行任何有價值的提取努力。', en: 'Victim of fluency illusion. Rereading produces familiarity, not durable retrieval.' }
            },
            {
                text: { zh: '整理精美的章節摘要筆記，把作者的文字重新抄寫在筆記本中。', en: 'Transcribe key paragraphs neatly into an aesthetic notebook.' },
                score: 2,
                feedback: { zh: '【中分】單純轉抄是低認知負荷的體力勞動，對長期記憶固化提升有限。', en: 'Verbatim copying offers minimal cognitive friction needed for retention.' }
            },
            {
                text: { zh: '合上書本，在一張白紙上或閃卡中憑記憶默寫核心架構，並嘗試用自己的話回答自設問題。', en: 'Close the book, recall core schemas on a blank page, and self-test.' },
                score: 4,
                feedback: { zh: '【高分】提取練習（Active Recall）頂級實踐者！主動回想能在神經突觸上建立無比堅固的提取索引。', en: 'Exemplary active recall practitioner! Retrieval effort drives deep memory traces.' }
            }
        ]
    },
    {
        id: 'q3',
        dimension: 'mindset',
        dimensionName: { zh: '成長心態與刻意練習', en: 'Mindset & Deliberate Practice' },
        question: {
            zh: '面對自己不擅長的高難度新領域（如程式設計、高階理財、複雜理論），你通常的心態是？',
            en: 'When confronting a challenging new domain, what is your mindset?'
        },
        options: [
            {
                text: { zh: '「我天生就不是這塊料，我文科腦/沒數學細胞，學了也是浪費時間。」', en: '"I am not built for this; my brain is wired differently, so why bother."' },
                score: 1,
                feedback: { zh: '【低分】典型固定型心態（Fixed Mindset）。忽略了大腦具有終生神經可塑性的生物學事實。', en: 'Fixed mindset trap. Ignores the biological reality of lifelong neuroplasticity.' }
            },
            {
                text: { zh: '很有興趣但追求完美，一遇到卡關就感到挫折焦慮，容易中途放棄。', en: 'Enthusiastic but perfectionist; stumble and abandon at initial friction.' },
                score: 2,
                feedback: { zh: '【中分】完美主義引發情緒防衛，未能將「挫折與痛苦」識別為大腦突觸正在生長的信號。', en: 'Perfectionism triggers defensive retreat; learn to reframe struggle as neural growth.' }
            },
            {
                text: { zh: '「這正是我大腦神經突觸生長的好機會！」主動拆解小步驟，在舒適圈邊界刻意練習並享受突破感。', en: '"This is prime neural growth!" Deconstruct micro-steps and embrace stretch zones.' },
                score: 4,
                feedback: { zh: '【高分】卓越成長型心態！深諳刻意練習心法，將錯誤與阻力視為認知進化的黃金燃料。', en: 'Supreme growth mindset. Treats error signals as the fundamental fuel for mastery.' }
            }
        ]
    },
    {
        id: 'q4',
        dimension: 'underlying_logic',
        dimensionName: { zh: '底層邏輯與本質洞察', en: 'Underlying Logic & Mental Models' },
        question: {
            zh: '在分析一個複雜的新商業案例或現實問題時，你習慣如何思考？',
            en: 'When deconstructing a complex problem or business case, how do you think?'
        },
        options: [
            {
                text: { zh: '看別的網紅或同行怎麼說，直接套用最流行的流行語和做法（按類比推論）。', en: 'Follow industry influencers and copy trending templates by analogy.' },
                score: 1,
                feedback: { zh: '【低分】類比思維的受害者。照貓畫虎難以應對外部環境變數的劇烈變化。', en: 'Analogy trap. Surface-level mimicking fails when environment variables fluctuate.' }
            },
            {
                text: { zh: '憑藉自己過往累積的工作經驗與直覺直截了當下結論。', en: 'Rely solely on intuitive gut feeling and past singular experiences.' },
                score: 2,
                feedback: { zh: '【中分】依賴系統 1 快思直覺，容易陷入可得性偏差與確認偏差。', en: 'Over-reliant on System 1 heuristics, vulnerable to availability bias.' }
            },
            {
                text: { zh: '用第一性原理追問 5 次為什麼，拆解系統的存量、流量與反饋迴路，並跨學科檢驗。', en: 'Apply first principles, 5 Whys, and cross-disciplinary causal feedback maps.' },
                score: 4,
                feedback: { zh: '【高分】底層邏輯架構師！具備蒙格多元思維與梅多斯系統思考的透視眼。', en: 'System architect! Synthesizes Munger lattices and first principles reasoning.' }
            }
        ]
    },
    {
        id: 'q5',
        dimension: 'action_systems',
        dimensionName: { zh: '全閉環輸出與實踐', en: 'Closed-Loop Output & Action' },
        question: {
            zh: '你平時吸收大量新知識（如看書、聽 Podcast、上課）與實際產出/行動的比例大概是？',
            en: 'What is your actual ratio of content consumption to tangible output?'
        },
        options: [
            {
                text: { zh: '9:1 或 10:0。只看不做，囤積了幾百篇收藏文章與幾十本書，但極少有產出。', en: '9:1 or 10:0. Hoard dozens of unread books and bookmarks with zero synthesis.' },
                score: 1,
                feedback: { zh: '【低分】「囤積狂人」假象。大腦以為收藏等於學會，實際上未經輸出的知識在 48 小時內煙消雲散。', en: 'Digital hoarder syndrome. Unexpressed knowledge decays within 48 hours.' }
            },
            {
                text: { zh: '6:4。偶爾會寫點讀書隨筆或發個社群動態，但沒有形成固定交付或實踐習慣。', en: '6:4. Occasionally jot down thoughts or social posts, but lack systematic delivery.' },
                score: 2,
                feedback: { zh: '【中分】具備初步輸出意識，但尚未建立「以輸出倒逼輸入」的工程閉環體系。', en: 'Nascent output awareness, yet lacks an automated production pipeline.' }
            },
            {
                text: { zh: '3:7。嚴格落實費曼技巧，學完立刻寫文章、教同事、製作心智圖或應用在真實專案中交付。', en: '3:7 golden ratio. Apply Feynman method, teaching others or shipping projects.' },
                score: 4,
                feedback: { zh: '【高分】輸出為王的全閉環宗師！深得樺澤紫苑 3:7 黃金法則與費曼學習精髓，學習複利最高！', en: 'Master of the 3:7 output golden ratio. Exponential compounding via deliberate delivery!' }
            }
        ]
    }
];
