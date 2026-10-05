import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Users, BookOpen, Award, ChevronRight, Globe, Compass, Sparkles, Brain, Landmark, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import ReadingComfortControls from '../components/ReadingComfortControls';

export default function Authors() {
    const navigate = useNavigate();
    const { language, t, toggleLanguage } = useLanguage();
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('books');

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'authors.json')
            .then(r => r.json())
            .then(data => { setAuthors(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        let arr = [...authors];
        if (search) {
            const q = search.toLowerCase();
            arr = arr.filter(a =>
                a.name.toLowerCase().includes(q) ||
                (a.name_en || '').toLowerCase().includes(q) ||
                (a.name_zh || '').toLowerCase().includes(q) ||
                (a.career || '').toLowerCase().includes(q)
            );
        }
        if (sortBy === 'books') arr.sort((a, b) => b.book_count - a.book_count);
        else if (sortBy === 'name') arr.sort((a, b) => {
            const nameA = language === 'en' ? (a.name_en || a.name) : (a.name_zh || a.name);
            const nameB = language === 'en' ? (b.name_en || b.name) : (b.name_zh || b.name);
            return nameA.localeCompare(nameB);
        });
        return arr;
    }, [authors, search, sortBy, language]);

    const totalBooks = authors.reduce((s, a) => s + a.book_count, 0);

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

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            {/* Top nav bar */}
            <div style={{
                padding: '16px 32px', borderBottom: '1px solid var(--border-light)',
                background: 'var(--sidebar-bg)', backdropFilter: 'blur(var(--sidebar-blur))',
                WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100,
            }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white',
                        cursor: 'pointer', fontSize: '14px', color: 'var(--text)', fontWeight: '600',
                        transition: 'all var(--transition-fast)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(-4px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
                >
                    <ArrowLeft size={16} />
                    {t('back')}
                </button>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '850', color: 'var(--text)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <Users size={22} color="var(--primary)" />
                        {t('authorsList')}
                    </h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GamificationHUD />
                    <ReadingComfortControls compact />
                    <button
                        onClick={toggleLanguage}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white',
                            cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: 'var(--text)',
                            transition: 'all var(--transition-fast)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}
                    >
                        <Globe size={16} color="var(--primary)" />
                        {language === 'zh' ? 'EN' : '中文'}
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px' }}>
                {/* Header Section */}
                <div style={{ marginBottom: '48px', animation: 'fadeInUp 0.6s var(--transition-med) both' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '850', color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                        {language === 'en' ? 'Renowned Authors' : '名家作者'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0, fontWeight: '500' }}>
                        {language === 'en' ? 'Explore our collection by world-class thinkers and writers.' : '探索來自全球頂尖思想家與創作者的書籍作品。'}
                    </p>
                </div>

                {/* Summary cards */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px', marginBottom: '48px',
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary), #0097a7)',
                        borderRadius: 'var(--radius-lg)', padding: '32px', color: 'white',
                        boxShadow: '0 12px 32px rgba(0,131,143,0.25)',
                        animation: 'fadeInUp 0.6s var(--transition-med) 0.1s both',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <Users size={20} style={{ opacity: 0.9 }} />
                            <span style={{ fontSize: '13px', fontWeight: '700', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'en' ? 'Total Authors' : '作者總數'}</span>
                        </div>
                        <div style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em' }}>{authors.length}</div>
                    </div>

                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px',
                        border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                        animation: 'fadeInUp 0.6s var(--transition-med) 0.2s both',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <BookOpen size={20} color="var(--accent)" />
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('booksByAuthor')}</span>
                        </div>
                        <div style={{ fontSize: '42px', fontWeight: '900', color: 'var(--accent)', letterSpacing: '-0.03em' }}>{totalBooks}</div>
                    </div>

                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-lg)', padding: '32px',
                        border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                        animation: 'fadeInUp 0.6s var(--transition-med) 0.3s both',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <Award size={20} color="#7b1fa2" />
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>詳細簡介</span>
                        </div>
                        <div style={{ fontSize: '42px', fontWeight: '900', color: '#7b1fa2', letterSpacing: '-0.03em' }}>{authors.filter(a => a.bio && a.bio.length > 10).length}</div>
                    </div>
                </div>

                {/* Intellectual Traditions Matrix */}
                <div style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: '28px 32px',
                    border: '1px solid var(--border-light)',
                    boxShadow: 'var(--card-shadow)',
                    marginBottom: '36px',
                    animation: 'fadeInUp 0.6s var(--transition-med) 0.35s both',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
                        <div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
                                <Landmark size={14} />
                                <span>{language === 'zh' ? '思想圖譜導航' : 'Intellectual Atlas'}</span>
                            </div>
                            <h3 style={{ margin: 0, fontSize: '19px', fontWeight: '850', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>🏛️ {language === 'zh' ? '全球六大頂尖思想流派與大師方法論對照表' : 'Top 6 Intellectual Traditions & Masters Matrix'}</span>
                            </h3>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                            {language === 'zh' ? '💡 點擊大師名稱可立即快速搜尋作者' : '💡 Click author name to search'}
                        </span>
                    </div>

                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', minWidth: '700px' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg)', color: 'var(--text-secondary)' }}>
                                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>{language === 'zh' ? '思想學派' : 'Tradition'}</th>
                                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>{language === 'zh' ? '代表大師 (點擊過濾)' : 'Master Mind'}</th>
                                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>{language === 'zh' ? '底層核心假說' : 'Core Axiom'}</th>
                                    <th style={{ padding: '12px 14px', fontWeight: '800' }}>{language === 'zh' ? '破局思維心法' : 'Mental Model & Breakthrough'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        school: language === 'zh' ? '理性決策與行為經濟' : 'Rationality & Behavioral Econ',
                                        icon: '🧠',
                                        color: '#3b82f6',
                                        master: language === 'zh' ? '丹尼爾·康納曼' : 'Daniel Kahneman',
                                        axiom: language === 'zh' ? '大腦雙系統存在致命認知啟發式偏誤' : 'System 1 heuristics cause systematic bias',
                                        model: language === 'zh' ? '調用系統 2 深思 · 前置驗屍法 · 錨定矯正' : 'System 2 Activation, Premortem, Anchoring Audit'
                                    },
                                    {
                                        school: language === 'zh' ? '多學科思維模型格柵' : 'Multidisciplinary Latticework',
                                        icon: '🧩',
                                        color: '#8b5cf6',
                                        master: language === 'zh' ? '查理·蒙格' : 'Charlie Munger',
                                        axiom: language === 'zh' ? '單一學科專家必陷「鐵鎚人盲區」' : 'Single discipline causes man-with-hammer syndrome',
                                        model: language === 'zh' ? '逆向思考 (Invert) · 跨界格柵 · 檢查清單' : 'Inversion, Latticework of Models, Checklist'
                                    },
                                    {
                                        school: language === 'zh' ? '反脆弱與非對稱風險' : 'Antifragility & Risk Philosophy',
                                        icon: '🛡️',
                                        color: '#ec4899',
                                        master: language === 'zh' ? '納西姆·塔雷伯' : 'Nassim Taleb',
                                        axiom: language === 'zh' ? '黑天鵝不可預測，脆弱者因波動毀滅' : 'Black Swans are unpredictable; fragilistas perish',
                                        model: language === 'zh' ? '反脆弱凹凸性 · 槓鈴策略 · 切身利益 (Skin in Game)' : 'Barbell Strategy, Convexity, Skin in the Game'
                                    },
                                    {
                                        school: language === 'zh' ? '行為工程與原子習慣' : 'Behavior Engineering & Habits',
                                        icon: '⚙️',
                                        color: '#10b981',
                                        master: language === 'zh' ? '詹姆斯·克利爾' : 'James Clear',
                                        axiom: language === 'zh' ? '目標無法決定成功，系統與微反饋才是' : 'You fall to the level of your systems, not goals',
                                        model: language === 'zh' ? '提示-渴望-回應-獎勵迴路 · 環境重構 · 習慣堆疊' : 'Habit Loop (Cue-Craving-Response-Reward), Stacking'
                                    },
                                    {
                                        school: language === 'zh' ? '現代管理與效能哲學' : 'Modern Management & Effectiveness',
                                        icon: '🏛️',
                                        color: '#f59e0b',
                                        master: language === 'zh' ? '彼得·杜拉克' : 'Peter Drucker',
                                        axiom: language === 'zh' ? '效率是把事做對，效能是做對的事' : 'Efficiency is doing things right; effectiveness is doing right things',
                                        model: language === 'zh' ? '時間審計 · 貢獻承諾 · 發揮個人與組織優勢' : 'Time Audit, Focus on Contribution, Strength Synergy'
                                    },
                                    {
                                        school: language === 'zh' ? '斯多葛理性心智韌性' : 'Stoic Resilience & Philosophy',
                                        icon: '🌿',
                                        color: '#06b6d4',
                                        master: language === 'zh' ? '馬可·奧理略' : 'Marcus Aurelius',
                                        axiom: language === 'zh' ? '煩惱源於對事物的評價，而非外物本身' : 'Distress arises not from things, but our judgments',
                                        model: language === 'zh' ? '控制二分法 · 接受必然命運 (Amor Fati) · 內在城堡' : 'Dichotomy of Control, Amor Fati, Inner Citadel'
                                    }
                                ].map((row, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.15s ease' }}>
                                        <td style={{ padding: '12px 14px', fontWeight: '800', color: 'var(--text)' }}>
                                            <span style={{ marginRight: '6px' }}>{row.icon}</span>
                                            {row.school}
                                        </td>
                                        <td style={{ padding: '12px 14px' }}>
                                            <button
                                                onClick={() => setSearch(row.master)}
                                                style={{
                                                    background: `${row.color}15`,
                                                    color: row.color,
                                                    border: `1px solid ${row.color}35`,
                                                    borderRadius: '8px',
                                                    padding: '4px 10px',
                                                    fontSize: '12px',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    transition: 'all 0.15s ease'
                                                }}
                                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.background = `${row.color}25`; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = `${row.color}15`; }}
                                                title={`搜尋 ${row.master}`}
                                            >
                                                <span>{row.master}</span>
                                                <ArrowUpRight size={12} />
                                            </button>
                                        </td>
                                        <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                            {row.axiom}
                                        </td>
                                        <td style={{ padding: '12px 14px', color: 'var(--text)', fontWeight: '700' }}>
                                            {row.model}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Filter Controls */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px',
                    flexWrap: 'wrap', background: 'white', padding: '12px', borderRadius: '16px',
                    border: '1px solid var(--border-light)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    animation: 'fadeInUp 0.6s var(--transition-med) 0.4s both',
                }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={language === 'zh' ? '搜尋作者...' : 'Search authors...'}
                            style={{
                                width: '100%', padding: '12px 12px 12px 44px', borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border)', background: 'var(--bg)', fontSize: '15px',
                                outline: 'none', color: 'var(--text)', transition: 'border-color 0.2s',
                            }}
                            onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                            onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {[{ key: 'books', label: language === 'zh' ? '書籍數量' : 'Books' }, { key: 'name', label: language === 'zh' ? '名稱排序' : 'Name Sort' }].map(btn => (
                            <button
                                key={btn.key}
                                onClick={() => setSortBy(btn.key)}
                                style={{
                                    padding: '10px 20px', borderRadius: 'var(--radius-sm)',
                                    border: `1px solid ${sortBy === btn.key ? 'var(--primary)' : 'var(--border)'}`,
                                    background: sortBy === btn.key ? 'rgba(0,131,143,0.05)' : 'white',
                                    color: sortBy === btn.key ? 'var(--primary)' : 'var(--text)',
                                    cursor: 'pointer', fontSize: '14px', fontWeight: sortBy === btn.key ? '700' : '600',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Authors grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '20px',
                    animation: 'fadeInUp 0.6s var(--transition-med) 0.5s both',
                }}>
                    {filtered.map((author) => {
                        const cardColor = getColor(author.name);
                        return (
                            <div
                                key={author.id}
                                onClick={() => navigate(`/author/${author.id}`)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '20px',
                                    padding: '24px', background: 'white',
                                    borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)',
                                    cursor: 'pointer', transition: 'all var(--transition-med)',
                                    boxShadow: 'var(--card-shadow)',
                                }}
                                onMouseEnter={e => { 
                                    e.currentTarget.style.transform = 'translateY(-6px)'; 
                                    e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={e => { 
                                    e.currentTarget.style.transform = ''; 
                                    e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                                    e.currentTarget.style.borderColor = 'var(--border-light)';
                                }}
                            >
                                {/* Avatar */}
                                <div style={{
                                    width: '64px', height: '64px', borderRadius: '18px',
                                    background: `linear-gradient(135deg, ${cardColor}, ${cardColor}dd)`,
                                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: '850', fontSize: '24px', flexShrink: 0,
                                    boxShadow: `0 12px 24px ${cardColor}20`,
                                    border: '3px solid white',
                                }}>
                                    {author.avatar_initial}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{
                                        margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: 'var(--text)',
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        letterSpacing: '-0.01em'
                                    }}>
                                        {language === 'en' ? (author.name_en || author.name) : (author.name_zh || author.name)}
                                    </h3>
                                    <div style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {author.career}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                                        <div style={{
                                            padding: '4px 12px', borderRadius: '999px', background: 'var(--tag-bg)',
                                            color: 'var(--tag-text)', fontSize: '12px', fontWeight: '700',
                                            display: 'flex', alignItems: 'center', gap: '6px'
                                        }}>
                                            <BookOpen size={13} />
                                            {author.book_count} {language === 'zh' ? '本' : 'Books'}
                                        </div>
                                        <ChevronRight size={16} color="var(--primary)" style={{ marginLeft: 'auto', opacity: 0.4 }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '100px 0', animation: 'fadeIn 1s ease' }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
                        <h3 style={{ fontSize: '20px', color: 'var(--text)', margin: '0 0 10px' }}>
                            {language === 'zh' ? '找不到相關作者' : 'No authors found'}
                        </h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            {language === 'zh' ? '請嘗試不同的關鍵字' : 'Try searching with different keywords'}
                        </p>
                    </div>
                )}
            </div>
            <BottomNavbar />
        </div>
    );
}
