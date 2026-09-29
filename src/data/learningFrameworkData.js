// 學習科學與認知底層邏輯全景框架核心資料模組 (優質修訂版)
// The Science of Learning & Cognitive Framework System Core Data (Enhanced)

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
            zh: '學習在大腦中的物理實質，是突觸的重塑、神經元連結的強化以及神經軸突髓鞘質（Myelin）的增生。理解大腦的生物節奏與能量限制，才能避免無效疲勞，實現指數級學習複利。',
            en: 'The biological essence of learning is synaptic plasticity, neural rewiring, and myelin insulation along axons. Understanding biological limits unlocks exponential learning.'
        },
        mechanisms: [
            {
                name: { zh: '神經可塑性與赫布定律 (Hebbian Learning)', en: 'Neuroplasticity & Hebbian Synaptic Plasticity' },
                desc: {
                    zh: '「同步發射的神經元連結在一起 (Neurons that fire together, wire together)」。成年大腦具備終身動態自塑能力。每次深度思考與挑戰性操練，都在刺激突觸生長、強化神經電位傳導效率（長期增益效應 LTP）。',
                    en: 'The adult brain retains lifelong neuroplasticity. Deliberate practice stimulates synaptic growth and increases neural transmission efficiency via Long-Term Potentiation (LTP).'
                }
            },
            {
                name: { zh: '雙模式思考：專注模式 vs 發散模式', en: 'Dual-Thinking Modes: Focused vs. Diffuse' },
                desc: {
                    zh: '芭芭拉·歐克莉《學習如何學習》核心：專注模式（前額葉皮質緊繃）負責嚴密邏輯運算與細節攻堅；發散模式（預設模式網絡 DMN）在散步、沐浴、冥想或微睡時啟動，負責跨腦區概念跳躍與頓悟式靈感誕生。',
                    en: 'Focused mode drives intensive linear problem-solving, while diffuse mode (Default Mode Network) connects distant neural territories during relaxation to trigger breakthroughs.'
                }
            },
            {
                name: { zh: '雙系統認知架構：系統 1 與系統 2', en: 'Dual-Process Cognitive Architecture: System 1 & 2' },
                desc: {
                    zh: '康納曼《快思慢想》基石。系統 1（快思）自動直覺、能耗極低但充滿認知偏誤；系統 2（慢想）理性嚴謹、能耗巨大且極易疲勞。學習的終極目標，就是將系統 2 的深度思維，透過刻意練習淬鍊為系統 1 的精準直覺。',
                    en: 'System 1 is fast, automatic, and biased; System 2 is slow, analytical, and energy-depleting. True mastery crystallizes deliberate System 2 operations into intuitive System 1 heuristics.'
                }
            },
            {
                name: { zh: '神經遞質網絡：多巴胺、去甲腎上腺素與乙醯膽鹼', en: 'Neuromodulators: Dopamine, Norepinephrine & Acetylcholine' },
                desc: {
                    zh: '去甲腎上腺素點燃高度警覺與聚焦；乙醯膽鹼精確標記當下活躍的神經元突觸；多巴胺則在「預期突破與即將解鎖新知」時大量釋放，修補突觸路徑並注入持續探索的心智動力。',
                    en: 'Norepinephrine triggers acute vigilance, acetylcholine illuminates target synapses, and dopamine surges upon anticipating mastery to reinforce neural reward pathways.'
                }
            },
            {
                name: { zh: '睡眠、膠淋巴系統與長效記憶固化', en: 'Sleep Architecture, Glymphatic Clearance & Consolidation' },
                desc: {
                    zh: '深層慢波睡眠與快速動眼期（REM）期間，大腦膠淋巴系統運作，腦脊液沖洗代謝廢物（如 β-類澱粉蛋白）；海馬迴則如投影機般高頻重播白天經驗，將短期記憶移轉固化至大腦皮質長效儲存。熬夜等於主動破壞大腦硬碟。',
                    en: 'During deep NREM and REM sleep, the glymphatic system clears metabolic toxins while the hippocampus replays waking neural sequences to consolidate memories into the neocortex.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '疲勞戰術與通宵熬夜苦讀 (睡眠借貸陷阱)', en: 'Sleep Deprivation & False Hustle' },
                solution: { zh: '睡眠不是學習的停止，而是記憶固化與突觸修剪（Synaptic Pruning）的關鍵生理工序。每天必須確保 7 至 8 小時的高品質睡眠週期。', en: 'Sleep is active biological consolidation. Safeguard 7-8 hours of uninterrupted restorative sleep cycles.' }
            },
            {
                trap: { zh: '持續緊繃、不給大腦發散留白', en: 'Continuous Cognitive Strain without Diffuse Breathers' },
                solution: { zh: '前額葉專注 25-50 分鐘後，務必切換為無螢幕漫步、深呼吸或閉目發呆 5-10 分鐘，啟動預設模式網絡整合深層概念組塊。', en: 'Alternate 25-50 min focused sprints with screen-free diffuse wandering to let subconscious neural networks percolate.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '90 分鐘人體生理節律聚焦律動 (Ultradian Rhythm)', en: 'Ultradian Rhythm Deep Work Protocol' },
                step: { zh: '依循大腦 90 分鐘專注上限波段，進入深度心流；隨後強制進行 10-15 分鐘無螢幕、純放空的發散模式漫步，重啟認知能量。', en: 'Align deep focus with 90-minute ultradian cycles, immediately followed by 10-15 minutes of non-screen diffuse recovery.' }
            },
            {
                title: { zh: '微多巴胺回饋階梯設計 (Micro-Dopamine Stacking)', en: 'Micro-Dopamine Reward Stacking' },
                step: { zh: '將令人望而生畏的龐大主題，拆解為 10-15 分鐘即可驗證的微任務。每攻克一題即刻打勾，主動誘發大腦內在多巴胺獎賞迴路。', en: 'Deconstruct massive chapters into 10-15 minute verifiable wins. Check off tasks immediately to trigger natural dopamine reinforcements.' }
            }
        ],
        bookCodes: ['S1-43', 'S4-28', 'S1-81', 'S5-58', 'S5-43', 'S4-88', 'S5-39', 'S1-61', 'S1-62']
    },
    {
        id: 'memory',
        code: 'DIM-02',
        title: { zh: '記憶編碼與科學提取', en: 'Memory & Retention Science' },
        subtitle: { zh: '艾賓浩斯遺忘曲線、主動回想與認知負荷管理', en: 'Ebbinghaus Curve, Active Recall & Cognitive Load Theory' },
        icon: 'Zap',
        color: '#0284c7',
        gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        accentBg: '#f0f9ff',
        borderColor: '#7dd3fc',
        tag: '資訊存取引擎',
        coreConcept: {
            zh: '記憶不是硬碟錄像，而是一次又一次的神經重構。越費力提取的資訊，在大腦中烙印的神經連結越堅固；反覆重讀只是製造「熟悉的認知假象」，主動提取（Active Recall）才是神經強化的王道。',
            en: 'Memory is neural reconstruction, not static recording. Desirable difficulty and retrieval practice forge indomitable neural circuits, overcoming the fluency illusion.'
        },
        mechanisms: [
            {
                name: { zh: '提取練習效應 (The Testing Effect)', en: 'Retrieval Practice & Testing Effect' },
                desc: {
                    zh: '《超牢記憶法》(Make It Stick) 實證：從記憶中費力「調取」資訊的動作，比重新「閱讀輸入」更能大幅倍增長期記憶保留率。合上書本、自我提問、口述闡述，能讓神經提取路徑愈發寬闊。',
                    en: 'Active retrieval from long-term memory strengthens neural retrieval pathways significantly more than passive re-reading or highlighted review.'
                }
            },
            {
                name: { zh: '間隔重複與抗遺忘節奏 (Spaced Repetition)', en: 'Spaced Repetition & Spacing Effect' },
                desc: {
                    zh: '艾賓浩斯曲線表明新知識在 24 小時內會遺忘高達 70%。若在即將遺忘的臨界點（第 1 天、第 3 天、第 7 天、第 15 天）進行主動提取，大腦會將該突觸標記為「生存攸關」，升級為永久儲存。',
                    en: 'Spacing review sessions across expanding intervals forces the brain to re-consolidate fading memory traces into stable long-term semantic structures.'
                }
            },
            {
                name: { zh: '交錯練習與模式識別 (Interleaved Practice)', en: 'Interleaved Practice vs. Blocking' },
                desc: {
                    zh: '不要連續數小時只操練同一題型（區塊練習）。交錯穿插練習不同類型的問題，會迫使大腦訓練高階的「模式辨識與情境鑑別力」，學會判斷問題的底層結構而非表面特徵。',
                    en: 'Interleaving distinct but related problem types trains pattern recognition and adaptive discrimination between underlying structural principles.'
                }
            },
            {
                name: { zh: '認知負荷理論 (Cognitive Load Theory)', en: 'Cognitive Load & Working Memory' },
                desc: {
                    zh: '約翰·斯威勒（John Sweller）提出：人類工作記憶僅能同時乘載 4±1 個資訊組塊。學習時必須消滅「外在無效負荷」（雜亂介面、噪音），合理調節「內在難度」，將心智帶寬保留給「關聯負荷」（基模建構）。',
                    en: 'Working memory can hold only 4±1 chunks. Streamline extraneous cognitive load to maximize germane load for rich mental schema construction.'
                }
            },
            {
                name: { zh: '雙重編碼與空間表徵 (Dual-Coding Theory)', en: 'Dual-Coding Theory & Spatial Mnemonics' },
                desc: {
                    zh: '佩維奧（Allan Paivio）證實：人類大腦分別以「語義系統（文字概念）」與「非語言系統（圖像空間）」獨立編碼。將抽象理論轉化為空間結構圖、心智模型或圖解隱喻，能在大腦中建立雙重索引檢索通路。',
                    en: 'Encoding concepts simultaneously through linguistic propositions and spatial visualizations generates redundant, resilient cognitive retrieval paths.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '反覆劃線與重複刷書 (流暢度假象 Fluency Illusion)', en: 'Passive Highlighting & Fluency Illusion' },
                solution: { zh: '劃線只帶來「我看懂了」的眼睛辨識錯覺。看完一個小節立刻蓋上書，用紙筆憑記憶默寫出 3 個核心本質要點。', en: 'Replace passive highlighting with closed-book retrieval: write down 3 key takeaways entirely from memory.' }
            },
            {
                trap: { zh: '考前突擊死記硬背 (短期填鴨 Cramming)', en: 'Massed Cramming Session' },
                solution: { zh: '突擊只將資訊暫存於脆弱的工作記憶，考完 48 小時內消逝殆盡。透過 Anki 或間隔排程，將複習精力分散於數週進行。', en: 'Distribute revision across weeks using spaced intervals or flashcard systems for durable long-term retention.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '3 步白紙閉卷自檢法 (Closed-Book Recall)', en: '3-Step Closed-Book Active Recall Protocol' },
                step: { zh: '閱讀小節 ➔ 蓋上書本，在一張白紙上默繪心智骨架與核心推論 ➔ 翻開書本比對漏失處，標記並強化認知盲區。', en: 'Read section ➔ Close book and diagram core concepts from memory on blank paper ➔ Reopen to calibrate omissions.' }
            },
            {
                title: { zh: '萊特納五階間隔複習盒 (Leitner Box System)', en: 'Leitner Expanding Box Protocol' },
                step: { zh: '依難易度將知識卡片依 1 天、3 天、7 天、14 天、30 天推進；答錯一張即刻退回第 1 盒，確保薄弱環節被高頻淬鍊。', en: 'Promote cards across 1, 3, 7, 14, 30 day intervals upon correct recall; demote failed cards back to Box 1 immediately.' }
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
            zh: '卓越從非天賦所賜，而是正確心智模型與刻意練習累積的產物。將挫折與犯錯視為大腦突觸正在生長的客觀生物訊號，構建不依賴意志力的原子習慣系統，是終身成長的永動發動機。',
            en: 'Mastery is not gifted; it is sculpted through deliberate practice and identity-based habit loops. Failure is merely biological feedback of synaptic growth.'
        },
        mechanisms: [
            {
                name: { zh: '成長型心態 vs 固定型心態 (Growth Mindset)', en: 'Growth vs. Fixed Mindset Dynamics' },
                desc: {
                    zh: '卡蘿·杜維克（Carol Dweck）發現：固定型心態深信天賦不可改變，將困難視為能力不足的羞辱而逃避；成長型心態深信神經網路具備演化能力，將「感到艱澀卡關」視為大腦正在擴展心智頻寬的黃金信號。',
                    en: 'Growth mindset reframes challenges and mistakes as indispensable biological evidence that neural circuits are expanding and adapting.'
                }
            },
            {
                name: { zh: '刻意練習與心理表徵 (Deliberate Practice)', en: 'Deliberate Practice & Mental Representations' },
                desc: {
                    zh: '安德斯·艾利克森《刻意練習》：單純重複一萬小時只是機械平庸。卓越的練習必須位於「舒適圈邊緣（學習區）」、具備明確具體的微技能目標、獲取即時精確反饋，並在腦中構建高解析度的「心理表徵」。',
                    en: 'Deliberate practice demands training at the edge of comfort, targeting micro-skills, seeking immediate feedback, and building rich mental representations.'
                }
            },
            {
                name: { zh: '心流通道黃金比例 (The Flow Channel)', en: 'Csikszentmihalyi Flow State Dynamics' },
                desc: {
                    zh: '契克森米哈伊提出：當「任務挑戰難度」剛好比「當前個人技能」高出約 4% 時，自我意識消融、時間感知扭曲，個體進入極致專注的心流境地。難度過高產生焦慮，難度過低產生無聊。',
                    en: 'Flow emerges at the sweet spot where task difficulty slightly exceeds personal skill by ~4%, dissolving self-doubt into deep absorption.'
                }
            },
            {
                name: { zh: '原子習慣四步閉環 (The Atomic Habit Loop)', en: 'The Atomic Habit Loop (Clear)' },
                desc: {
                    zh: '詹姆斯·克利爾法則：提示（顯而易見）➔ 渴望（具吸引力）➔ 回應（簡便易行，2 分鐘定律）➔ 獎勵（即刻滿足）。永遠不要依賴易枯竭的意志力，而要依賴精心設計的無阻力環境。',
                    en: 'Cue, Craving, Response, and Reward. Eliminate friction using the 2-minute rule and anchor new study habits onto existing daily routines.'
                }
            },
            {
                name: { zh: '情緒調節與拖延本質 (Emotional Regulation)', en: 'Procrastination as Emotional Defense' },
                desc: {
                    zh: '拖延從來不是時間管理問題，而是杏仁核主導的情緒防衛機制（對無聊、挫敗感、未知恐懼的逃避）。學會認知重評（Cognitive Reappraisal），先做 2 分鐘打破靜摩擦力。',
                    en: 'Procrastination is an amygdala-driven emotional defense against perceived discomfort and perfectionism, dissolved by lowering the starting threshold.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '追求完美主義導致的癱瘓性拖延', en: 'Perfectionist Paralysis' },
                solution: { zh: '完成遠勝於完美。啟動「粗糙初稿原則 (Embrace a rough first draft)」，先寫下或做完最粗糙的 2 分鐘版本打破心智僵局。', en: 'Lower starting barriers: embrace an imperfect 2-minute draft to overcome cognitive inertia.' }
            },
            {
                trap: { zh: '在舒適圈內的低效自我感動 (偽刻意練習)', en: 'Mindless Repetition within Comfort Zone' },
                solution: { zh: '停止反覆做自己早就會的題目。主動挑選讓自己感到「微卡頓、需動腦」的邊界題，追求外部精準指標的反饋。', en: 'Leave the effortless comfort zone; target the 5% error zone where real skill acquisition takes place.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '習慣堆疊與 2 分鐘啟動公式 (Habit Stacking)', en: 'Identity Habit Stacking Formula' },
                step: { zh: '「在［每天必然發生的固定動作］之後，我會［花 2 分鐘打開筆記默寫一條核心模型］」，讓行為阻力無限接近於零。', en: 'Apply formula: "After [Current Habit], I will [study deliberately for 2 minutes]." Make initial friction zero.' }
            },
            {
                title: { zh: '微挫折成長型自我對話卡 (Growth Reframing)', en: 'Growth Reframing Self-Talk' },
                step: { zh: '當想說「這太難我學不會」時，強制替換為：「我只是『尚未』掌握它，這正是我大腦神經元建立新連結的物理過程。」', en: 'Replace "I cannot do this" with "I haven\'t mastered this yet; my neural circuits are actively rewiring."' }
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
            zh: '「在手裡拿著鐵鎚的人看來，每個問題都長得像釘子。」只有跨學科構建 80-90 個重大思維模型格柵，才能突破單一學科的認知盲點，穿透紛擾複雜現象，直達事物的本質常識。',
            en: 'To avoid the man with a hammer syndrome, assemble a multidisciplinary latticework of fundamental mental models to perceive reality without distortions.'
        },
        mechanisms: [
            {
                name: { zh: '多元思維模型格柵 (Munger Latticework)', en: 'Multidisciplinary Mental Latticework' },
                desc: {
                    zh: '查理·蒙格終身推崇：從數學（機率、複利、排列組合）、物理（臨界點、力矩、熵增）、生物（自然選擇、生態位）、心理（認知偏差、激勵反應）汲取核心模型，交織為立體思考框架。',
                    en: 'Synthesize foundational principles from physics, evolutionary biology, math, and psychology into an interconnected analytical latticework.'
                }
            },
            {
                name: { zh: '元認知監控與思維校準 (Metacognition)', en: 'Metacognitive Executive Monitoring' },
                desc: {
                    zh: '「對自己思考過程的再審視與批判」。抽離至第三人稱視角，審視自己的心智運行：「我是真正理解因果邏輯，還是只是被作者的文筆說服？我的推論中隱藏了哪些未經驗證的默認假設？」',
                    en: 'Thinking about thinking: the metacognitive ability to monitor, audit, and calibrate one\'s own reasoning paths and cognitive biases.'
                }
            },
            {
                name: { zh: '逆向思維 (Inversion: Invert, Always Invert)', en: 'Inversion Thinking (Jacobi & Munger)' },
                desc: {
                    zh: '數學家雅可比名言。與其苦思「怎樣才能高效學好一門學問」，不如先徹底研究：「怎樣的學習習慣能確保我思維僵化、迅速忘光、成為半吊子？」列出所有致命毒藥並徹底避開，成就自然水到渠成。',
                    en: 'Solve problems backwards: investigate thoroughly what guarantees failure, and rigorously eliminate those catastrophic pitfalls.'
                }
            },
            {
                name: { zh: '科學家心態 (The Scientist Mindset)', en: 'The Scientist Mindset (Grant)' },
                desc: {
                    zh: '亞當·格蘭特《逆思維》：拋棄傳教士（捍衛既有教條）、檢察官（猛烈攻擊他人謬誤）或政客（迎合群體認同）心態；以科學家精神將自身知識視為待檢驗的「暫時性假說」，為發現自己過去的錯誤而歡呼。',
                    en: 'Reject preacher, prosecutor, and politician postures; embrace the scientist mindset that treats opinions as hypotheses eager to be disproven.'
                }
            },
            {
                name: { zh: '反脆弱知識習得 (Antifragility)', en: 'Antifragile Knowledge Acquisition' },
                desc: {
                    zh: '納西姆·塔雷伯概念：脆弱系統畏懼擾動與壓力；反脆弱系統則能從隨機波動、阻力與錯誤中汲取能量、自我增強。在學習中主動尋找難以解答的反例與悖論，是認知架構升級的最佳催化劑。',
                    en: 'Design learning systems that gain from disorder and contradictions, using disconfirmed beliefs as raw fuel for conceptual expansion.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '單一學科鐵鎚人綜合症 (專業傲慢盲點)', en: 'Man with a Hammer Syndrome' },
                solution: { zh: '強迫自己用至少 3 種完全跨領域的學科模型（如演化生物學、熱力學熵增、微觀經濟激勵）重新解釋同一問題。', en: 'Force yourself to explain a single complex issue using foundational models from three disparate fields.' }
            },
            {
                trap: { zh: '達克效應愚昧山丘 (不知己不知)', en: 'Dunning-Kruger Peak of Mount Stupid' },
                solution: { zh: '當感覺某領域「太簡單了、全懂了」時，立刻去解答該領域頂級專家的經典難題，讓現實數據給予清醒校準。', en: 'Calibrate confidence against rigorous external benchmarks or expert peer review to expose blind spots.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '事前剖析逆向失敗清單 (Pre-Mortem Failure Audit)', en: 'Pre-Mortem Failure Audit Protocol' },
                step: { zh: '在開始一項新技能學習前，寫下「未來 3 個月內可能導致這次學習徹底流產的 5 種致命錯誤」，並為每一條設立防禦防線。', en: 'Draft the 5 fastest pathways to complete learning failure before starting, and install concrete guardrails.' }
            },
            {
                title: { zh: '跨學科模型隱喻遷移筆記 (Latticework Mapping)', en: 'Cross-Disciplinary Analogy Mapping' },
                step: { zh: '在讀書筆記中強制建立一個專欄：「這個概念與物理/生物/經濟學中的哪個根本定律互相印證？」鍛鍊心智格柵聯網。', en: 'Add a mandatory section in study notes: "How does this concept map to principles in physics, biology, or economics?"' }
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
            zh: '「現象是變數，規律是公式，底層邏輯是公理。」事物表象日新月異，但背後支配運行的系統動力學與反饋迴路始終穩定。看懂事物背後的系統結構，才能找到以小博大的最高槓桿點。',
            en: 'Phenomena are transient variables; laws are equations; underlying logic is foundational axioms. Master systemic structures to act on maximum leverage points.'
        },
        mechanisms: [
            {
                name: { zh: '第一性原理思考 (First Principles Thinking)', en: 'First Principles Deconstruction' },
                desc: {
                    zh: '亞里斯多德與馬斯克推崇：拒絕「按類比推論（別人怎麼做我就怎麼做）」，而是將複雜事物層層剝離至不可爭議的最根本物理真實或數學公理，再從最底層向上演繹構建全新解法。',
                    en: 'Break a system down to its most fundamental, indubitable physical truths and reason upwards, bypassing blind analogical reasoning.'
                }
            },
            {
                name: { zh: '系統動力學：存量、流量與延遲效應', en: 'Systems Thinking: Stocks, Flows & Delays' },
                desc: {
                    zh: '梅多斯《系統思考》：現實是由「存量（長期蓄水池）」、「流量（進出速率）」與「時間延遲」構成的動態網絡。學習成果不是當天線性產生的，而是內在知識存量跨越臨界閥值後的突變相變。',
                    en: 'Systems comprise stocks, flows, delays, and non-linear thresholds. Breakthroughs occur when cumulative internal stock crosses tipping points.'
                }
            },
            {
                name: { zh: '增強迴路與平衡迴路 (Feedback Loops)', en: 'Reinforcing & Balancing Feedback Loops' },
                desc: {
                    zh: '增強迴路（滾雪球效應）帶來指數級爆發，但也可能形成惡性循環；平衡迴路（自動調節抗力）則維持系統穩定，但也形成隱形天花板。優秀學習系統懂得拆除平衡阻力、強化正向增強迴路。',
                    en: 'Reinforcing loops amplify compounding growth, while balancing loops impose systemic resistance. Optimize outcomes by mitigating systemic friction.'
                }
            },
            {
                name: { zh: '尋找系統最高槓桿解 (Strategic Leverage Points)', en: 'High-Leverage Intervention Points' },
                desc: {
                    zh: '在複雜系統中，最直觀、最費力的用力點往往成效最低甚至帶來反作用（如機械式死記硬背）；真正的槓桿點藏在「資訊流通結構」、「底層目標規則」以及「支配系統的心智範式（Paradigms）」。',
                    en: 'Highest systemic leverage lies not in tweaking superficial parameters, but in transforming information structure, rules, and overarching paradigms.'
                }
            },
            {
                name: { zh: '二階思維與貝氏動態更新 (Second-Order & Bayesian)', en: 'Second-Order Thinking & Bayesian Updating' },
                desc: {
                    zh: '一階思維只看眼前即時後果；二階思維追問：「然後呢？三年後這會引發何種連鎖反應？」結合貝氏機率思維，依據先驗機率隨新證據不斷更新認知信念，逼近真實客觀世界。',
                    en: 'First-order thinking asks for immediate results; second-order thinking simulates downstream chain reactions and continuously updates beliefs via Bayes\' theorem.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '盲目套用成功模版 (類比推論陷阱)', en: 'Copy-Paste Template Syndrome' },
                solution: { zh: '別人的成功是特定環境、機遇與變數的產物。必須用第一性原理剝離特定外在條件，提煉出放諸四海皆準的底層公理。', en: 'Distinguish context-dependent environmental variables from invariant underlying axioms before adopting methods.' }
            },
            {
                trap: { zh: '頭痛醫頭的一階局部修補 (症狀解治標不治本)', en: 'Superficial Symptom Relief' },
                solution: { zh: '繪製因果迴路圖（Causal Loop），識別問題背後是否存在反向平衡迴路，從結構層面解決根本問題。', en: 'Map causal loops to identify root causes and structural balancing bottlenecks rather than applying temporary band-aids.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '5-Why 本質回溯追問沙盤 (5-Whys Root Deconstruction)', en: '5-Whys Root Deconstruction Protocol' },
                step: { zh: '面對任何棘手問題連續追問 5 次「為什麼」，直到抵達無法再拆解的生物物理限制、心理動機或數學規律為止。', en: 'Ask "Why" sequentially five times until uncovering the irreducible first principles governing the scenario.' }
            },
            {
                title: { zh: '決策連鎖反應推演卡 (Second-Order Cascade Matrix)', en: 'Second-Order Cascade Matrix' },
                step: { zh: '在重大學習或事業決策前，列出：1. 直接效果 (T+0)；2. 伴隨副作用 (T+1)；3. 系統各參與者的動態應對與終局平衡 (T+2)。', en: 'Diagram cascading impacts across immediate results (T+0), secondary ripples (T+1), and long-term systemic equilibrium (T+2).' }
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
            zh: '「輸入是徒勞，輸出是王道；輸出倒逼輸入，閉環方得複利。」樺澤紫苑研究發現輸入與輸出的黃金比例是 3:7。任何沒有形成「教導、寫作、實踐、交付」的知識，都只是大腦中的短暫資訊垃圾。',
            en: 'Input is futile without output. The golden ratio of learning is 30% consumption to 70% production. Knowledge unapplied is transient cognitive noise.'
        },
        mechanisms: [
            {
                name: { zh: '費曼學習技巧四步閉環 (The Feynman Technique)', en: 'The 4-Step Feynman Technique' },
                desc: {
                    zh: '諾貝爾物理獎得主理查·費曼心法：1. 選擇核心概念；2. 假想向一位 8 歲小孩解釋（用最通俗大白話與生動類比，禁用專業術語）；3. 發現卡頓處回溯查證；4. 簡化提煉形成優雅表徵。能講明白才是真懂。',
                    en: '1. Select concept; 2. Teach it to an 8-year-old in plain words; 3. Pinpoint comprehension gaps and consult sources; 4. Refine analogies until crystal clear.'
                }
            },
            {
                name: { zh: '超速學習九大原則 (Ultralearning)', en: 'Ultralearning 9 Principles (Scott Young)' },
                desc: {
                    zh: '史考特·楊《超速學習》：1. 元學習（先畫知識地圖）；2. 專注力；3. 直接性（在真實情境做中學）；4. 反覆操練（攻克最脆弱微技能）；5. 提取測試；6. 即時反饋；7. 記憶保留；8. 培養直覺；9. 勇於實驗。',
                    en: 'Master extreme self-directed skill acquisition through meta-learning maps, directness in actual contexts, intense drilling, and bold experimentation.'
                }
            },
            {
                name: { zh: '打造第二大腦 CODE 模型 (Tiago Forte)', en: 'Building a Second Brain: CODE Framework' },
                desc: {
                    zh: '大腦是用來思考的，不是用來記事情的。C (Capture 捕捉共鳴靈感)、O (Organize 按行動力組織/PARA 法則)、D (Distill 漸進式提煉核心金句)、E (Express 產出作品與分享)。將外在知識轉化為個人終身數位資產。',
                    en: 'Your biological brain is for creative processing, not storage. Capture resonant sparks, Organize by actionability (PARA), Distill essence, Express finished creations.'
                }
            },
            {
                name: { zh: '輸入與輸出 3:7 黃金法則 (Output-Driven Learning)', en: 'The 3:7 Input-to-Output Golden Ratio' },
                desc: {
                    zh: '神經科學證實：神經元只有在反覆對外傳遞信號時才會建立長期髓鞘。每投入 30 分鐘閱讀吸收，必須搭配 70 分鐘的口述、筆記、心智圖重構或公開實踐分享。以輸出倒逼輸入，學習效率提升 5 倍以上。',
                    en: 'Neurons build myelin insulation through active signal generation. Invest 30% time absorbing and 70% producing summaries, mental maps, or public teachings.'
                }
            },
            {
                name: { zh: 'SQ3R 經典精讀閉環法 (Survey to Review)', en: 'The SQ3R Reading Mastery Framework' },
                desc: {
                    zh: 'S (Survey 快速掃描目錄與結構) ➔ Q (Question 將小標題轉化為自問問題) ➔ R1 (Read 帶著問題主動閱讀) ➔ R2 (Recite 闔書憑記憶口述回答) ➔ R3 (Review 定期展開間隔複習)。',
                    en: 'Survey overall structure ➔ formulate Questions ➔ Read intentionally to answer ➔ Recite from memory ➔ Review at spaced intervals.'
                }
            }
        ],
        traps: [
            {
                trap: { zh: '數位囤積狂人 (收藏等於學會的心理幻覺)', en: 'Digital Hoarding & The Bookmark Illusion' },
                solution: { zh: '收藏是認知廉價的心理撫慰。建立個人鐵律：「若未寫下 3 句自己的反思提煉或行動方案，嚴禁打勾收藏或歸檔」。', en: 'Bookmark nothing without appending three sentences of personal reflection or actionable synthesis.' }
            },
            {
                trap: { zh: '只進不出 (被動聽書上癮、毫無實踐產出)', en: 'Passive Audiobook Consumption Addiction' },
                solution: { zh: '聽完一集說書或讀完一章，立刻在筆記區寫下一項「24 小時內我能落地的具體微行動」。', en: 'Translate every book or podcast into one tangible micro-action executed within 24 hours.' }
            }
        ],
        actionProtocols: [
            {
                title: { zh: '費曼小鴨 3 分鐘白話音頻法 (Feynman Audio Protocol)', en: 'Feynman Rubber-Duck Audio Protocol' },
                step: { zh: '開啟手機錄音機，想像在向一位完全不懂該領域的小朋友解釋。限時 3 分鐘用生活類比講明白，回聽錄音標記任何卡頓或術語堆砌處。', en: 'Record a 3-minute voice note explaining the concept to a child using everyday metaphors. Listen back to spot confusing jargon.' }
            },
            {
                title: { zh: 'PARA 行動導向個人知識庫架構 (PARA File Architecture)', en: 'PARA Actionable File Architecture' },
                step: { zh: '將筆記與檔案依據行動性嚴格劃分為：1. Projects (當前短期專案)；2. Areas (長期持續責任)；3. Resources (未來參考主題)；4. Archives (封存庫)。', en: 'Organize notes strictly by actionability: Projects, Areas of Responsibility, Resources, and Archives.' }
            }
        ],
        bookCodes: ['S1-06', 'S3-69', 'S4-32', 'S1-42', 'S1-46', 'S1-44', 'S1-19', 'S1-22']
    }
];

// 16 大經典學習心智模型速查庫 (Mental Models Quick Reference)
export const LEARNING_MENTAL_MODELS = [
    {
        id: 'feynman',
        name: { zh: '費曼學習技巧', en: 'The Feynman Technique' },
        category: '輸出閉環',
        tag: '極致白話',
        formula: '選擇概念 ➔ 白話向外行教導 ➔ 標記模糊卡點 ➔ 查證簡化與類比',
        description: {
            zh: '若你無法向一個八歲孩子用通俗大白話講明白一個概念，說明你自己根本還沒真正弄懂。以教代學是最高級別的學習。',
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
            zh: '在記憶即將消逝的臨界邊界進行主動提取，大腦會釋放化學信號將突觸連結判定為生存攸關，轉化為永久長期記憶。',
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
            zh: '強迫大腦在沒有提示的情況下重構資訊，比反覆閱讀課本有效 300% 以上。神經回溯路徑在每一次費力提取中被實質拓寬。',
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
            zh: '大腦在專注模式下處理既有路徑的細節運算，在發散模式下調動全腦各神經群進行宏觀連結與創新。二者交替是頂級思考者的節奏。',
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
        formula: '剝離表象類比 ➔ 追溯物理本質/公理 ➔ 由底層重新演繹全新方案',
        description: {
            zh: '不因循守舊地照抄前人做法，而是將事物解構到最不可爭議的基礎事實，再推論出全局最優解。',
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
        formula: '明確微技能 ➔ 舒適圈邊界 ➔ 專注投入 ➔ 即時精準反饋 ➔ 修訂心理表徵',
        description: {
            zh: '反覆重複已知的事情只是浪費光陰；大師的練習永遠專注在自己做不好的那 5% 學習區邊界上。',
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
            zh: '不要依賴不可靠的意志力，而是依賴優雅的環境架構設計，讓好的學習行為成為阻力最小的自然路徑。',
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
        formula: '識別存量與流量 ➔ 繪製因果反饋迴路 ➔ 洞察時間延遲 ➔ 尋找核心槓桿點',
        description: {
            zh: '看懂系統的內在結構勝過指責單一事件。解決問題要找深層結構的槓桿解，而非應急的表面症狀解。',
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
        formula: '挑戰難度 = 當前能力 + 4% ➔ 阻絕外在干擾 ➔ 沉浸式時間感知扭曲',
        description: {
            zh: '維持在焦慮與無聊之間的狹窄通道中，讓任務難度剛好比現有水平高一點點，激發大腦神經的最佳潛能。',
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
            zh: '將記憶外包給個人數位筆記庫，釋放生物大腦的運算與創造能量，形成個人可檢索的終身知識資產。',
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
    },
    {
        id: 'second_order',
        name: { zh: '二階思維 (Second-Order Thinking)', en: 'Second-Order Thinking' },
        category: '底層邏輯',
        tag: '長遠穿透',
        formula: '問「這件事的直接後果是什麼？」➔ 再問「然後呢？三年後連鎖反應為何？」',
        description: {
            zh: '平庸者只看眼前第一階好處；卓越者能推演行動引發的二階、三階系統性連鎖後果，規避隱形成本。',
            en: 'Examine downstream systemic repercussions and delayed consequences rather than immediate surface gains.'
        },
        sourceBook: 'S1-16 《反直覺思考》',
        icon: 'TrendingUp'
    },
    {
        id: 'desirable_difficulties',
        name: { zh: '期望困難理論', en: 'Desirable Difficulties (Bjork)' },
        category: '記憶編碼',
        tag: '有益阻力',
        formula: '引入適度困難 (間隔/交錯/提取) ➔ 阻斷順滑感 ➔ 深度重構永久記憶',
        description: {
            zh: '羅伯特·比約克提出：學習過程看似費力痛苦的「有益障礙」，反而是長期神經鞏固與概念深化的必由之路。',
            en: 'Obstacles during learning that make retrieval challenging trigger durable, flexible long-term retention.'
        },
        sourceBook: 'S4-84 《超牢記憶法》',
        icon: 'Target'
    },
    {
        id: 'pareto_principle',
        name: { zh: '帕累托 80/20 法則', en: '80/20 Pareto Principle' },
        category: '學習哲學',
        tag: '高槓桿解',
        formula: '找出創造 80% 價值的 20% 核心骨幹概念 ➔ 集中優勢兵力徹底擊穿',
        description: {
            zh: '任何學科中，80% 的理解與成果來自 20% 的底層核心公理。抓準 20% 核心，即可掌握整個領域的主幹。',
            en: 'Focus disproportionate deliberate effort on the vital 20% of core concepts that generate 80% of systemic comprehension.'
        },
        sourceBook: 'S1-18 《關鍵少數》',
        icon: 'Award'
    },
    {
        id: 'lindy_effect',
        name: { zh: '林迪效應 (Lindy Effect)', en: 'The Lindy Effect' },
        category: '學習哲學',
        tag: '經典篩選',
        formula: '已經存在 N 年的非易損知識 ➔ 預期還能再持續存在 N 年',
        description: {
            zh: '過濾瞬息萬變的新聞短訊，將寶貴的閱讀時間投入那些已經歷幾十年、甚至幾百年時光淬鍊的經典好書。',
            en: 'For non-perishable knowledge, future life expectancy is proportional to current age. Prioritize time-tested classics.'
        },
        sourceBook: 'S1-37 《黑天鵝》',
        icon: 'BookOpen'
    }
];

// 個人學習模式自測診斷問卷 (Interactive Diagnostic Assessment - Enhanced)
export const LEARNING_DIAGNOSTICS_QUESTIONS = [
    {
        id: 'q1',
        dimension: 'neuroscience',
        dimensionName: { zh: '腦科學與節律調度', en: 'Neuroscience & Rhythms' },
        question: {
            zh: '當你在學習或深度研究遭遇卡關、百思不得其解時，你的典型第一反應是？',
            en: 'When hitting a cognitive wall while learning, your typical response is?'
        },
        options: [
            {
                text: { zh: '死嗑到底，強迫自己坐在螢幕前繼續盯著看，直到想出來為止。', en: 'Force myself to sit and grind until a breakthrough happens.' },
                score: 1,
                feedback: { zh: '【低分警示】陷入前額葉專注模式的「死鎖循環」。過度疲勞會阻斷大腦神經突觸的靈活跳躍，缺乏發散模式的介入。', en: 'Trapped in focused mode lockup without diffuse recovery, depleting prefrontal resources.' }
            },
            {
                text: { zh: '滑手機看社交媒體短影音放鬆，但往往一滑就是一小時，回來時大腦更加昏沉。', en: 'Scroll social media to relax, but end up more cognitively depleted.' },
                score: 2,
                feedback: { zh: '【中分警示】高頻短影音是超量多巴胺刺激，不僅不是真正的大腦休息，反而搶佔工作記憶並增加認知混亂。', en: 'Social media adds high-frequency cognitive noise rather than true restorative neural rest.' }
            },
            {
                text: { zh: '果斷起身喝杯水，或在無螢幕環境下散步放空 10 分鐘；往往在洗手、散步或小憩時靈感自然浮現。', en: 'Take a screen-free walk or drink water; breakthroughs often surface during wandering.' },
                score: 4,
                feedback: { zh: '【高分典範】卓越的大腦節奏大師！懂得自如切換專注模式與預設模式網絡（DMN），運用全腦神經跳躍催生頓悟。', en: 'Mastery of focused-diffuse switching, leveraging the default mode network to synthesize subconscious connections.' }
            }
        ]
    },
    {
        id: 'q2',
        dimension: 'memory',
        dimensionName: { zh: '記憶編碼與提取機制', en: 'Memory & Retention' },
        question: {
            zh: '在讀完一本重要好書或研讀完一個複雜章節後，你通常如何複習鞏固？',
            en: 'After reading a book or finishing a course section, how do you review?'
        },
        options: [
            {
                text: { zh: '把書中劃線和熒光筆標記的地方，重新拿出來翻看一遍。', en: 'Reread the highlighted passages and sticky notes.' },
                score: 1,
                feedback: { zh: '【低分警示】掉入經典的「流暢度假象（Fluency Illusion）」。眼睛認識文字不代表神經掌握；重讀帶來的熟悉感會欺騙大腦。', en: 'Victim of fluency illusion. Rereading produces recognition familiarity, not durable retrieval circuits.' }
            },
            {
                text: { zh: '整理精美的章節筆記，把作者的原話與架構逐字摘抄在漂亮的筆記本中。', en: 'Transcribe key paragraphs neatly into an aesthetic notebook.' },
                score: 2,
                feedback: { zh: '【中分提示】單純謄抄是低認知負荷的體力勞動。缺乏主動思考與重構，對長期記憶突觸強化的效果十分有限。', en: 'Verbatim copying offers minimal cognitive friction needed for neuroplastic retention.' }
            },
            {
                text: { zh: '合上書本，在一張白紙上或閃卡中憑記憶默寫核心架構，並嘗試自問自答、解釋因果邏輯。', en: 'Close the book, recall core schemas on a blank page, and self-test.' },
                score: 4,
                feedback: { zh: '【高分典範】主動提取練習（Active Recall）頂級實踐者！每一次費力的記憶回想，都在拓寬並加固神經突觸提取路徑！', en: 'Exemplary active recall practitioner! Retrieval effort drives deep, permanent memory traces.' }
            }
        ]
    },
    {
        id: 'q3',
        dimension: 'mindset',
        dimensionName: { zh: '成長心態與刻意練習', en: 'Mindset & Deliberate Practice' },
        question: {
            zh: '面對自己過去完全不擅長的高難度新領域（如程式碼、高階財務、複雜理論），你的直覺心態是？',
            en: 'When confronting a challenging new domain, what is your mindset?'
        },
        options: [
            {
                text: { zh: '「我天生就不是這塊料，我沒這方面的天賦，學了也是浪費時間。」', en: '"I am not built for this; my brain is wired differently, so why bother."' },
                score: 1,
                feedback: { zh: '【低分警示】典型固定型心態（Fixed Mindset）。無視了大腦終生具備神經可塑性的生物學事實，主動鎖死了個人潛能。', en: 'Fixed mindset trap. Ignores the biological reality of lifelong neuroplasticity.' }
            },
            {
                text: { zh: '很有興趣但追求完美，一遇到碰壁挫折就產生強烈挫敗焦慮，常常半途而廢。', en: 'Enthusiastic but perfectionist; stumble and abandon at initial friction.' },
                score: 2,
                feedback: { zh: '【中分提示】完美主義引發杏仁核的情緒防衛。需學會將「挫折與卡頓」重新定性為「突觸正在生長」的生理反應。', en: 'Perfectionism triggers defensive retreat; learn to reframe cognitive struggle as physical neural growth.' }
            },
            {
                text: { zh: '「這正是我大腦神經突觸升級的好機會！」拆解為微小目標，在舒適圈邊界刻意練習並享受每一次突破。', en: '"This is prime neural growth!" Deconstruct micro-steps and embrace stretch zones.' },
                score: 4,
                feedback: { zh: '【高分典範】卓越的成長型心態！深諳刻意練習精髓，將難題視為智力升級的磨刀石，具備強大的反脆弱性。', en: 'Supreme growth mindset. Treats error signals as the fundamental fuel for cognitive mastery.' }
            }
        ]
    },
    {
        id: 'q4',
        dimension: 'underlying_logic',
        dimensionName: { zh: '底層邏輯與系統思考', en: 'Underlying Logic & Mental Models' },
        question: {
            zh: '在剖析一個複雜的新現象、商業難題或現實決策時，你習慣從何處著手？',
            en: 'When deconstructing a complex problem or business case, how do you think?'
        },
        options: [
            {
                text: { zh: '看當紅網紅或熱門文章怎麼說，直接照搬套用最流行的流行語或套路做法。', en: 'Follow industry influencers and copy trending templates by analogy.' },
                score: 1,
                feedback: { zh: '【低分警示】類比思維的受害者。盲目照搬表象模板，一旦外部環境變數產生微小擾動，模型便會徹底失效。', en: 'Analogy trap. Surface-level mimicking fails when environment variables fluctuate.' }
            },
            {
                text: { zh: '單純憑藉自己過往有限的直覺經驗或單一學科視角下結論。', en: 'Rely solely on intuitive gut feeling and past singular experiences.' },
                score: 2,
                feedback: { zh: '【中分提示】過度依賴系統 1 快思直覺，容易掉入「鐵鎚人盲點」與確認偏差，無法看清多維系統的全貌。', en: 'Over-reliant on System 1 heuristics, vulnerable to the man-with-a-hammer bias.' }
            },
            {
                text: { zh: '用第一性原理追問 5 次為什麼，拆解系統的存量、流量與反饋迴路，並跨學科檢驗。', en: 'Apply first principles, 5 Whys, and cross-disciplinary causal feedback maps.' },
                score: 4,
                feedback: { zh: '【高分典範】底層邏輯大師！兼具馬斯克的第一性原理與梅多斯的系統思考視角，能洞穿事物本質並找到槓桿解。', en: 'Master system architect! Synthesizes Munger lattices and first principles reasoning to identify high-leverage points.' }
            }
        ]
    },
    {
        id: 'q5',
        dimension: 'action_systems',
        dimensionName: { zh: '全閉環輸出與實踐', en: 'Closed-Loop Output & Action' },
        question: {
            zh: '你平時吸收大量新資訊（看書、看影片、聽講座）與真實對外輸出/實踐應用的比例大概是？',
            en: 'What is your actual ratio of content consumption to tangible output?'
        },
        options: [
            {
                text: { zh: '9:1 或 10:0。只看不做，收藏夾裡存了上百篇好文章與幾十本書，但很少有自己的產出。', en: '9:1 or 10:0. Hoard dozens of unread books and bookmarks with zero synthesis.' },
                score: 1,
                feedback: { zh: '【低分警示】「資訊囤積症」。大腦將「收藏」誤以為「學會」；未經輸出與實踐的資訊，在 48 小時內就會被大腦當作垃圾清理。', en: 'Digital hoarder syndrome. Unexpressed knowledge decays within 48 hours.' }
            },
            {
                text: { zh: '6:4。偶爾會寫點閱讀隨筆或社群動態，但沒有形成穩定的知識交付、教導他人或專案落地系統。', en: '6:4. Occasionally jot down thoughts or social posts, but lack systematic delivery.' },
                score: 2,
                feedback: { zh: '【中分提示】具備良好的輸出意識，但缺乏工程級閉環體系。需要引入 CODE 模型或費曼白話輸出法建立個人知識資產。', en: 'Nascent output awareness, yet lacks an automated production pipeline and delivery habit.' }
            },
            {
                text: { zh: '3:7。嚴格落實費曼技巧，學完立刻寫文章、教同事、製作思維導圖，或在真實專案中落地交付。', en: '3:7 golden ratio. Apply Feynman method, teaching others or shipping projects.' },
                score: 4,
                feedback: { zh: '【高分典範】以輸出倒逼輸入的終身大師！完美踐行 3:7 黃金法則與費曼心法，知識轉化率高達 90% 以上，學習複利最高！', en: 'Master of the 3:7 output golden ratio. Exponential compounding via deliberate delivery and peer teaching!' }
            }
        ]
    }
];
