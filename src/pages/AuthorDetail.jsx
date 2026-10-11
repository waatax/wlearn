import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, Briefcase, ExternalLink, Users, ChevronRight, Globe, Brain, Sparkles, Compass, Lightbulb, CheckCircle2, AlertTriangle, BarChart2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import GlobalHeader from '../components/GlobalHeader';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import ReadingComfortControls from '../components/ReadingComfortControls';

export default function AuthorDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language, translateTag, t, toggleLanguage } = useLanguage();
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'authors.json')
            .then(r => r.json())
            .then(data => {
                const found = data.find(a => a.id === id);
                setAuthor(found || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const avatarColors = [
        '#00838f', '#ad1457', '#6a1b9a', '#4527a0', '#283593',
        '#00695c', '#d84315', '#4e342e', '#37474f', '#ef6c00',
    ];
    const getColor = (name) => avatarColors[(name || '').charCodeAt(0) % avatarColors.length];

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
            <div className="loader"></div>
        </div>
    );

    if (!author) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
            <p style={{ fontSize: '20px', color: 'var(--text-muted)', marginBottom: '24px', fontWeight: '600' }}>找不到此作者</p>
            <button 
                onClick={() => navigate('/authors')} 
                style={{
                    padding: '12px 32px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                    background: 'white', cursor: 'pointer', fontSize: '15px', fontWeight: '700',
                    boxShadow: 'var(--card-shadow)', transition: 'all var(--transition-fast)'
                }}
            >
                {t('authorsList')}
            </button>
        </div>
    );

    const color = getColor(author.name);

    // Calculate cognitive domain distribution from author's books
    const cognitiveDomains = useMemo(() => {
        if (!author || !author.books) return [];
        let score = {
            strategy: 25,
            psychology: 25,
            execution: 25,
            communication: 20,
            framework: 20
        };

        const allTags = (author.books || []).flatMap(b => b.tags || []).join(' ').toLowerCase();
        const text = ((author.bio || '') + ' ' + (author.career || '') + ' ' + allTags).toLowerCase();

        if (text.includes('商') || text.includes('經') || text.includes('管理') || text.includes('biz') || text.includes('market') || text.includes('投資')) score.strategy += 45;
        if (text.includes('心') || text.includes('認知') || text.includes('腦') || text.includes('思維') || text.includes('psychology')) score.psychology += 45;
        if (text.includes('習慣') || text.includes('執行') || text.includes('目標') || text.includes('行動') || text.includes('高效')) score.execution += 45;
        if (text.includes('溝通') || text.includes('關係') || text.includes('領導') || text.includes('人際') || text.includes('社交')) score.communication += 45;
        if (text.includes('哲學') || text.includes('科學') || text.includes('歷史') || text.includes('底層') || text.includes('本質')) score.framework += 45;

        const total = score.strategy + score.psychology + score.execution + score.communication + score.framework;
        return [
            { label: language === 'zh' ? '商業策略' : 'Strategy', key: 'strategy', val: Math.round((score.strategy / total) * 100), color: '#3b82f6' },
            { label: language === 'zh' ? '心理認知' : 'Psychology', key: 'psychology', val: Math.round((score.psychology / total) * 100), color: '#8b5cf6' },
            { label: language === 'zh' ? '實戰執行' : 'Execution', key: 'execution', val: Math.round((score.execution / total) * 100), color: '#10b981' },
            { label: language === 'zh' ? '溝通協作' : 'Communication', key: 'communication', val: Math.round((score.communication / total) * 100), color: '#f59e0b' },
            { label: language === 'zh' ? '底層框架' : 'First Principles', key: 'framework', val: Math.round((score.framework / total) * 100), color: '#ec4899' },
        ];
    }, [author, language]);

    // Author core mental models
    const mentalModels = useMemo(() => {
        if (!author) return [];
        const name = (author.name || '') + ' ' + (author.name_en || '') + ' ' + (author.name_zh || '');

        if (name.includes('康納曼') || name.includes('Kahneman')) {
            return [
                {
                    name: language === 'zh' ? '雙系統思維模型 (System 1 & System 2)' : 'Dual-System Theory',
                    breakthrough: language === 'zh' ? '揭露直覺系統 1 的捷思偏誤，主動召喚系統 2 的理性深思。' : 'Overcoming System 1 heuristics with deliberate System 2 reflection.',
                    doAction: language === 'zh' ? '重大決策前冷卻 24 小時，列出客觀反例' : 'Take a 24-hr pause and compile disconfirming evidence.',
                    dontAction: language === 'zh' ? '憑「第一直覺」或「過度自信」倉促下注' : 'Relying purely on gut instinct under stress.'
                },
                {
                    name: language === 'zh' ? '前景理論與損失厭惡 (Loss Aversion)' : 'Prospect Theory & Loss Aversion',
                    breakthrough: language === 'zh' ? '損失痛苦感約為同等收益愉悅感的 2 至 2.5 倍。' : 'Psychological pain of losing is 2.5x greater than joy of gaining.',
                    doAction: language === 'zh' ? '用「基準線歸零法」評估沉沒成本' : 'Reset reference points to zero when assessing costs.',
                    dontAction: language === 'zh' ? '因害怕停損而繼續加碼虧損項目' : 'Doubling down on failing commitments to avoid loss.'
                },
                {
                    name: language === 'zh' ? '前置驗屍法 (Pre-Mortem Analysis)' : 'Pre-Mortem Analysis',
                    breakthrough: language === 'zh' ? '在專案啟動前假設「已經徹底失敗」，反向挖掘潛在盲點。' : 'Assume total failure beforehand to identify hidden vulnerabilities.',
                    doAction: language === 'zh' ? '邀請全員匿名寫下專案未來最致命的爆死原因' : 'Conduct anonymous root-cause failure simulation.',
                    dontAction: language === 'zh' ? '在團隊中壓抑反對聲音、盲目狂熱' : 'Suppressing dissent under the illusion of harmony.'
                }
            ];
        }

        if (name.includes('蒙格') || name.includes('Munger')) {
            return [
                {
                    name: language === 'zh' ? '多學科思維模型格柵 (Latticework of Models)' : 'Latticework of Mental Models',
                    breakthrough: language === 'zh' ? '掌握數學、物理、生物、心理等基礎學科中 80~90 個大模型。' : 'Combine 80-90 fundamental models across science and humanities.',
                    doAction: language === 'zh' ? '用 3 個不同學科維度交叉審視同一個難題' : 'Examine problems through at least 3 distinct scientific lenses.',
                    dontAction: language === 'zh' ? '拿著一把鐵鎚，把全世界的問題都看成釘子' : 'Acting as a man with a hammer seeing only nails.'
                },
                {
                    name: language === 'zh' ? '逆向思維法 (Inversion Principle)' : 'Inversion Principle',
                    breakthrough: language === 'zh' ? '「反過來想，總是反過來想」——如果想知道如何成功，先研究如何徹底失敗。' : 'Invert, always invert: identify how to fail and avoid it.',
                    doAction: language === 'zh' ? '條列會導致破產、生病或關係破裂的行為並嚴格避開' : 'List specific disaster triggers and systematically eliminate them.',
                    dontAction: language === 'zh' ? '只憧憬美好藍圖，完全不防禦致命下行風險' : 'Ignoring downside catastrophe while chasing upside.'
                },
                {
                    name: language === 'zh' ? '魯拉帕路薩效應 (Lollapalooza Effect)' : 'Lollapalooza Synergy',
                    breakthrough: language === 'zh' ? '多種心理或物理偏誤朝同一方向共振時，會引發超常的極端連鎖爆發。' : 'Extreme resonance when multiple models align toward one direction.',
                    doAction: language === 'zh' ? '設計機制時同時調用社會認同、稀缺性與習慣動能' : 'Stack positive incentives, social proof, and compounding loops.',
                    dontAction: language === 'zh' ? '低估群體非理性盲從的破壞力' : 'Underestimating groupthink cascade effects.'
                }
            ];
        }

        if (name.includes('克利爾') || name.includes('Clear')) {
            return [
                {
                    name: language === 'zh' ? '原子習慣四步反饋迴路 (The Habit Loop)' : 'The 4-Step Habit Loop',
                    breakthrough: language === 'zh' ? '提示顯而易見 ➔ 渴望有吸引力 ➔ 回應簡便易行 ➔ 獎勵令人滿足。' : 'Cue (obvious), Craving (attractive), Response (easy), Reward (satisfying).',
                    doAction: language === 'zh' ? '將新習慣綁定在既有習慣之後（習慣堆疊法）' : 'Stack new micro-habits onto established daily routines.',
                    dontAction: language === 'zh' ? '單純依賴不可靠的意志力去抵抗惡劣環境' : 'Relying on sheer willpower against hostile environments.'
                },
                {
                    name: language === 'zh' ? '身分認同驅動習慣 (Identity-Based Habits)' : 'Identity-Based Habits',
                    breakthrough: language === 'zh' ? '改變的核心不是「我要做什麼」，而是「我想成為什麼樣的人」。' : 'Shift focus from "what I do" to "who I wish to become".',
                    doAction: language === 'zh' ? '把每次微小行動當作對理想自我投下的一票' : 'Treat every tiny action as a vote for your future self.',
                    dontAction: language === 'zh' ? '給自己貼上「我天生意志力差」的消極標籤' : 'Internalizing limiting labels about your capacity.'
                },
                {
                    name: language === 'zh' ? '兩分鐘法則 (The 2-Minute Rule)' : 'The 2-Minute Rule',
                    breakthrough: language === 'zh' ? '任何新習慣的起點，都要能在兩分鐘內輕鬆完成，讓大腦啟動無阻力。' : 'Scale down habits until they take under 2 minutes to initiate.',
                    doAction: language === 'zh' ? '讀一本書從「打開翻開第 1 頁」開始打卡' : 'Start with reading just 1 page to establish consistency.',
                    dontAction: language === 'zh' ? '第一天就設定宏大繁重的不可持續目標' : 'Setting unsustainable marathon goals on day one.'
                }
            ];
        }

        // Generic intelligent fallback for any renowned author
        return [
            {
                name: language === 'zh' ? '第一性原理拆解 (First Principles Thinking)' : 'First Principles Breakdown',
                breakthrough: language === 'zh' ? '撥開傳統經驗與盲從表象，直達系統底層的不可動搖真理。' : 'Strip away conventions to uncover the foundational axioms.',
                doAction: language === 'zh' ? '持續追問「為什麼」，直至找到不可辯駁的事實原點' : 'Ask 5 Whys to establish foundational empirical truths.',
                dontAction: language === 'zh' ? '盲從「大家過去都是這樣做的」慣性妥協' : 'Blindly following established routines and analogies.'
            },
            {
                name: language === 'zh' ? '正向反饋複利飛輪 (Compounding Flywheel)' : 'Compounding Flywheel Effect',
                breakthrough: language === 'zh' ? '每一分微小努力沉澱為系統結構資產，隨時間產生幾何級數回報。' : 'Small inputs reinforce structural capital for geometric growth.',
                doAction: language === 'zh' ? '專注於具備長期累積效應的高槓桿核心任務' : 'Invest energy in high-leverage compoundable skills.',
                dontAction: language === 'zh' ? '頻繁切換跑道，消耗未成形的初始動能' : 'Constantly resetting domains before flywheel spins.'
            },
            {
                name: language === 'zh' ? '知行合一行動閉環 (Action-Learning Loop)' : 'Closed Action-Learning Loop',
                breakthrough: language === 'zh' ? '沒有反饋的思考是空想，沒有思考的行動是莽撞。' : 'Thought without feedback is idle; action without thought is reckless.',
                doAction: language === 'zh' ? '建立「輸入 ➔ 萃取 ➔ 輸出 ➔ 複盤」的每週微循環' : 'Build weekly rhythm: Input, Extract, Output, Review.',
                dontAction: language === 'zh' ? '只進不出，讓知識停留在未經驗證的書架上' : 'Hoarding unapplied notes without empirical testing.'
            }
        ];
    }, [author, language]);

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <GlobalHeader />

            {/* Sub Bar */}
            <div style={{
                padding: '10px 24px',
                borderBottom: '1px solid var(--border-light)',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                position: 'sticky',
                top: 0,
                zIndex: 40,
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        onClick={() => navigate('/authors')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                            borderRadius: '8px', border: '1px solid var(--border)', background: 'white',
                            cursor: 'pointer', fontSize: '13px', color: 'var(--text)', fontWeight: '650'
                        }}
                    >
                        <ArrowLeft size={14} />
                        <span>{t('authorsList')}</span>
                    </button>
                    <span style={{ color: 'var(--border)', fontSize: '14px' }}>|</span>
                    <span style={{ fontSize: '13px', fontWeight: '750', color: 'var(--text)' }}>
                        {language === 'zh' ? (author.name_zh || author.name) : (author.name_en || author.name)}
                    </span>
                </div>

                <ReadingComfortControls compact />
            </div>

            {/* Main content */}
            <div className="detail-main reading-prose" style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 32px 100px' }}>
                {/* Author header */}
                <div className="detail-top-section" style={{
                    display: 'flex', gap: '40px', alignItems: 'flex-start',
                    marginBottom: '48px', animation: 'fadeInUp 0.6s var(--transition-med) both',
                }}>
                    {/* Avatar */}
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '32px',
                        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                        color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '850', fontSize: '48px', flexShrink: 0,
                        boxShadow: `0 20px 40px ${color}30`,
                        transform: 'rotate(-2deg)',
                        border: '4px solid white',
                    }}>
                        {author.avatar_initial}
                    </div>

                    <div style={{ flex: 1, paddingTop: '8px' }}>
                        <h1 style={{ margin: '0 0 6px', fontSize: '38px', fontWeight: '850', color: 'var(--text)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                            {language === 'en' ? (author.name_en || author.name) : (author.name_zh || author.name)}
                        </h1>
                        {language === 'zh' && author.name_en && author.name_en !== author.name && (
                            <div style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: '500', letterSpacing: '-0.01em' }}>
                                {author.name_en}
                            </div>
                        )}
                        {language === 'en' && author.name_zh && author.name_zh !== author.name && (
                            <div style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: '500', letterSpacing: '-0.01em' }}>
                                {author.name_zh}
                            </div>
                        )}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '8px 18px', borderRadius: '999px',
                            background: 'white', color: color,
                            fontSize: '14px', fontWeight: '700',
                            border: `1.5px solid ${color}20`,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}>
                            <Briefcase size={16} />
                            {author.career}
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: '32px', marginTop: '24px' }}>
                            <div>
                                <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)', letterSpacing: '-0.02em' }}>{author.book_count}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('booksByAuthor')}</div>
                            </div>
                            {author.achievements?.length > 0 && (
                                <div>
                                    <div style={{ fontSize: '28px', fontWeight: '900', color: '#7b1fa2', letterSpacing: '-0.02em' }}>{author.achievements.length}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('achievements')}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio card */}
                <div style={{
                    background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px',
                    border: '1px solid var(--border-light)', marginBottom: '32px',
                    boxShadow: 'var(--card-shadow)',
                    animation: 'fadeInUp 0.6s var(--transition-med) 0.1s both',
                }}>
                    <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '850', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ width: '4px', height: '18px', background: color, borderRadius: '2px' }} />
                        {t('authorBio')}
                    </h2>
                    <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.9', color: 'var(--text-secondary)', letterSpacing: '0.01em' }}>
                        {author.bio}
                    </p>
                </div>

                {/* Achievements */}
                {author.achievements?.length > 0 && (
                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px',
                        border: '1px solid var(--border-light)', marginBottom: '32px',
                        boxShadow: 'var(--card-shadow)',
                        animation: 'fadeInUp 0.6s var(--transition-med) 0.2s both',
                    }}>
                        <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '850', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Award size={20} color="var(--accent)" /> {t('achievements')}
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
                            {author.achievements.map((ach, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '12px 16px', borderRadius: '12px', background: 'var(--bg)',
                                    border: '1px solid var(--border-light)',
                                }}>
                                    <div style={{
                                        width: '8px', height: '8px', borderRadius: '50%',
                                        background: color, flexShrink: 0,
                                    }} />
                                    <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '600' }}>{ach}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cognitive Domain Footprint */}
                {cognitiveDomains.length > 0 && (
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '28px 32px',
                        border: '1px solid var(--border-light)',
                        marginBottom: '32px',
                        boxShadow: 'var(--card-shadow)',
                        animation: 'fadeInUp 0.6s var(--transition-med) 0.25s both',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
                            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '850', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <BarChart2 size={20} color={color} />
                                <span>{language === 'zh' ? '大師思想穿透力 · 五維認知版圖' : 'Author Cognitive Domain Footprint'}</span>
                            </h2>
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                {language === 'zh' ? '基於作者全部收錄著作之核心標籤加權分析' : 'Based on thematic weighting of authored works'}
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                            {cognitiveDomains.map((d) => (
                                <div key={d.key} style={{ background: 'var(--bg)', borderRadius: '12px', padding: '14px 16px', border: '1px solid var(--border-light)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)' }}>{d.label}</span>
                                        <span style={{ fontSize: '14px', fontWeight: '900', color: d.color }}>{d.val}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${d.val}%`,
                                            background: d.color,
                                            borderRadius: '4px',
                                            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Mental Models Matrix */}
                {mentalModels.length > 0 && (
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '28px 32px',
                        border: '1px solid var(--border-light)',
                        marginBottom: '32px',
                        boxShadow: 'var(--card-shadow)',
                        animation: 'fadeInUp 0.6s var(--transition-med) 0.3s both',
                    }}>
                        <div style={{ marginBottom: '18px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                                <Brain size={14} />
                                <span>{language === 'zh' ? '核心方法論解構' : 'Core Methodology'}</span>
                            </div>
                            <h2 style={{ margin: 0, fontSize: '19px', fontWeight: '850', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>🧠 {language === 'zh' ? '大師底層思維模型與實踐法則矩陣' : 'Master Mental Models & Action Axioms'}</span>
                            </h2>
                        </div>

                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '650px' }}>
                                <thead>
                                    <tr style={{ background: 'var(--bg)', color: 'var(--text-secondary)' }}>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', width: '25%' }}>{language === 'zh' ? '思維模型' : 'Mental Model'}</th>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', width: '35%' }}>{language === 'zh' ? '認知破局點' : 'Cognitive Breakthrough'}</th>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', color: '#16a34a', width: '20%' }}>{language === 'zh' ? '推薦實踐 (Do)' : 'Recommended (Do)'}</th>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', color: '#dc2626', width: '20%' }}>{language === 'zh' ? '禁忌盲區 (Don\'t)' : 'Pitfall (Don\'t)'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mentalModels.map((m, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                            <td style={{ padding: '12px 14px', fontWeight: '800', color: 'var(--text)' }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                    <span style={{ color, marginTop: '2px' }}>✦</span>
                                                    <span>{m.name}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                                {m.breakthrough}
                                            </td>
                                            <td style={{ padding: '12px 14px', color: '#15803d', fontWeight: '600', lineHeight: 1.4, background: 'rgba(34, 197, 94, 0.03)' }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                                                    <CheckCircle2 size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                    <span>{m.doAction}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '12px 14px', color: '#b91c1c', fontWeight: '600', lineHeight: 1.4, background: 'rgba(239, 68, 68, 0.03)' }}>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                                                    <AlertTriangle size={14} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                    <span>{m.dontAction}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Books section */}
                <div style={{
                    background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--card-shadow)',
                    animation: 'fadeInUp 0.6s var(--transition-med) 0.3s both',
                }}>
                    <h2 style={{ margin: '0 0 24px', fontSize: '18px', fontWeight: '850', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <BookOpen size={20} color="var(--primary)" /> {t('booksCollected')} ({author.books?.length || 0})
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {author.books?.map((book) => (
                            <Link
                                key={book.id}
                                to={`/book/${book.id}`}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '20px',
                                    padding: '16px 20px', borderRadius: 'var(--radius-md)',
                                    background: 'white', border: '1px solid var(--border-light)',
                                    textDecoration: 'none', color: 'var(--text)',
                                    transition: 'all var(--transition-med)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                }}
                                onMouseEnter={e => { 
                                    e.currentTarget.style.background = 'var(--bg)'; 
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={e => { 
                                    e.currentTarget.style.background = 'white'; 
                                    e.currentTarget.style.transform = ''; 
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.02)';
                                    e.currentTarget.style.borderColor = 'var(--border-light)';
                                }}
                            >
                                {/* Thumbnail */}
                                {book.video_id && (
                                    <img
                                        src={`https://img.youtube.com/vi/${book.video_id}/mqdefault.jpg`}
                                        alt=""
                                        style={{
                                            width: '100px', height: '56px', objectFit: 'cover',
                                            borderRadius: '8px', flexShrink: 0,
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                )}

                                {/* Book info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: '16px', fontWeight: '750', color: 'var(--text)',
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        letterSpacing: '-0.01em'
                                    }}>
                                        {language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn)}
                                    </div>
                                    {((language === 'zh' && book.title_en) || (language === 'en' && book.title_cn)) && (
                                        <div style={{
                                            fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px',
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        }}>
                                            {language === 'zh' ? book.title_en : book.title_cn}
                                        </div>
                                    )}
                                    {book.tags && (
                                        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                                            {book.tags.slice(0, 3).map((tag, j) => (
                                                <span key={j} style={{
                                                    fontSize: '11px', padding: '2px 10px', borderRadius: '999px',
                                                    background: 'var(--tag-bg)', color: 'var(--tag-text)', fontWeight: '600',
                                                }}>{translateTag(tag)}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Code badge + arrow */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                                    {book.code && (
                                        <span style={{
                                            background: 'var(--badge-bg)', color: 'white', padding: '3px 10px',
                                            borderRadius: '6px', fontSize: '11px', fontWeight: '800',
                                            boxShadow: '0 4px 8px rgba(239, 108, 0, 0.2)'
                                        }}>{book.code}</span>
                                    )}
                                    <ExternalLink size={16} color="var(--primary)" opacity={0.6} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <BottomNavbar />
        </div>
    );
}
