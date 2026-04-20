import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Play, Globe, BarChart3, Eye, Trophy, Flame, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function formatViews(n) {
    if (!n || n === 0) return '—';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toLocaleString();
}

function ViewBar({ cnViews, enViews, maxViews, language }) {
    const cnWidth = maxViews > 0 ? (cnViews / maxViews) * 100 : 0;
    const enWidth = maxViews > 0 ? (enViews / maxViews) * 100 : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
            {/* Chinese bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', width: '36px', flexShrink: 0, textAlign: 'right' }}>{language === 'zh' ? '中文' : 'CN'}</span>
                <div style={{ flex: 1, height: '10px', background: 'var(--bg)', borderRadius: '5px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                        height: '100%', width: `${cnWidth}%`,
                        background: 'linear-gradient(90deg, var(--primary), #00bcd4)',
                        borderRadius: '5px',
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        minWidth: cnViews > 0 ? '4px' : '0',
                    }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', width: '50px', flexShrink: 0 }}>{formatViews(cnViews)}</span>
            </div>
            {/* English bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', width: '36px', flexShrink: 0, textAlign: 'right' }}>{language === 'zh' ? '英文' : 'EN'}</span>
                <div style={{ flex: 1, height: '10px', background: 'var(--bg)', borderRadius: '5px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                        height: '100%', width: `${enWidth}%`,
                        background: 'linear-gradient(90deg, var(--accent), #ffa726)',
                        borderRadius: '5px',
                        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                        minWidth: enViews > 0 ? '4px' : '0',
                    }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent)', width: '50px', flexShrink: 0 }}>{formatViews(enViews)}</span>
            </div>
        </div>
    );
}

export default function Popular() {
    const navigate = useNavigate();
    const { language, t, toggleLanguage, translateTag } = useLanguage();
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('total');
    const [showTop, setShowTop] = useState(50);

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'youtube_stats.json')
            .then(r => r.json())
            .then(data => { setStats(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const sorted = useMemo(() => {
        const arr = [...stats];
        if (sortBy === 'total') arr.sort((a, b) => b.total_views - a.total_views);
        else if (sortBy === 'cn') arr.sort((a, b) => b.cn_views - a.cn_views);
        else if (sortBy === 'en') arr.sort((a, b) => b.en_views - a.en_views);
        return arr.slice(0, showTop);
    }, [stats, sortBy, showTop]);

    const maxViews = useMemo(() => {
        if (sorted.length === 0) return 1;
        if (sortBy === 'cn') return Math.max(...sorted.map(b => b.cn_views));
        if (sortBy === 'en') return Math.max(...sorted.map(b => b.en_views));
        return Math.max(...sorted.map(b => Math.max(b.cn_views, b.en_views)));
    }, [sorted, sortBy]);

    const totalCnViews = stats.reduce((s, b) => s + (b.cn_views || 0), 0);
    const totalEnViews = stats.reduce((s, b) => s + (b.en_views || 0), 0);
    const totalAllViews = (totalCnViews + totalEnViews) || 1;
    const booksWithViews = stats.filter(b => b.total_views > 0).length;

    const sortButtons = [
        { key: 'total', label: language === 'zh' ? '總計' : 'Total', icon: <TrendingUp size={14} /> },
        { key: 'cn', label: language === 'zh' ? '中文版' : 'Chinese', icon: <Play size={14} /> },
        { key: 'en', label: language === 'zh' ? '英文版' : 'English', icon: <Globe size={14} /> },
    ];

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
                        <Flame size={22} color="var(--accent)" />
                        {language === 'zh' ? '熱門排行榜' : 'Popular Rankings'}
                    </h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                        onClick={() => navigate('/trends')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                            borderRadius: 'var(--radius-sm)', border: '1px solid #a18aff', background: '#f5f0ff',
                            cursor: 'pointer', fontSize: '14px', color: '#6366f1', fontWeight: '700',
                            transition: 'all var(--transition-fast)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                    >
                        <BarChart3 size={18} />
                        {language === 'zh' ? '趨勢分析' : 'Trends'}
                    </button>
                    <button
                        onClick={toggleLanguage}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white',
                            cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: 'var(--text)',
                            transition: 'all var(--transition-fast)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
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
                        {language === 'zh' ? '全站書籍熱度排行' : 'Global Book Popularity'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0, fontWeight: '500' }}>
                        {language === 'zh' ? '基於 YouTube 播放量數據的實時熱度排行榜。' : 'Real-time popularity rankings based on YouTube view counts.'}
                    </p>
                </div>

                {/* Summary cards */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px', marginBottom: '48px',
                }}>
                    {/* Total Views */}
                    <div 
                        onClick={() => navigate('/trends')}
                        style={{
                            background: 'linear-gradient(135deg, var(--primary), #00bcd4)',
                            borderRadius: 'var(--radius-lg)', padding: '32px', color: 'white',
                            boxShadow: '0 12px 32px rgba(0,131,143,0.25)',
                            animation: 'fadeInUp 0.6s var(--transition-med) 0.1s both',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <Eye size={20} style={{ opacity: 0.9 }} />
                            <span style={{ fontSize: '13px', fontWeight: '700', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'zh' ? '總觀看次數' : 'Total Views'}</span>
                        </div>
                        <div style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-0.03em' }}>{formatViews(totalAllViews)}</div>
                        <div style={{ fontSize: '13px', opacity: 0.8, marginTop: '8px', fontWeight: '600' }}>{booksWithViews} {language === 'zh' ? '本書有數據' : 'books with data'}</div>
                    </div>

                    {/* Top Book */}
                    <div 
                        onClick={() => sorted[0] && navigate(`/book/${sorted[0].id}`)}
                        style={{
                            background: 'white', border: '1px solid var(--border-light)',
                            borderRadius: 'var(--radius-lg)', padding: '32px',
                            boxShadow: 'var(--card-shadow)',
                            animation: 'fadeInUp 0.6s var(--transition-med) 0.2s both',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <Trophy size={20} color="var(--accent)" />
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'zh' ? '本日冠軍' : 'Top Book Today'}</span>
                        </div>
                        <div style={{ 
                            fontSize: '20px', fontWeight: '850', color: 'var(--text)', lineHeight: 1.3, 
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' 
                        }}>
                            {language === 'zh' ? (sorted[0]?.title_cn || sorted[0]?.title_en) : (sorted[0]?.title_en || sorted[0]?.title_cn)}
                        </div>
                        <div style={{ fontSize: '14px', color: 'var(--accent)', marginTop: '8px', fontWeight: '800' }}>{formatViews(sorted[0]?.total_views)} {language === 'zh' ? '次觀看' : 'views'}</div>
                    </div>

                    {/* Distribution */}
                    <div style={{
                        background: 'white', border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-lg)', padding: '32px',
                        boxShadow: 'var(--card-shadow)',
                        animation: 'fadeInUp 0.6s var(--transition-med) 0.3s both',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <Globe size={20} color="var(--primary)" />
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'zh' ? '語言分佈' : 'Language Mix'}</span>
                        </div>
                        <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden', background: 'var(--bg)' }}>
                            <div style={{ width: `${(totalCnViews/totalAllViews)*100}%`, background: 'var(--primary)' }} title={`CN: ${Math.round(totalCnViews/totalAllViews*100)}%`} />
                            <div style={{ width: `${(totalEnViews/totalAllViews)*100}%`, background: 'var(--accent)' }} title={`EN: ${Math.round(totalEnViews/totalAllViews*100)}%`} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '12px', fontWeight: '700' }}>
                            <span style={{ color: 'var(--primary)' }}>CN {Math.round(totalCnViews/totalAllViews*100)}%</span>
                            <span style={{ color: 'var(--accent)' }}>EN {Math.round(totalEnViews/totalAllViews*100)}%</span>
                        </div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
                    padding: '12px', background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)',
                    gap: '16px', marginBottom: '32px',
                    animation: 'fadeInUp 0.6s var(--transition-med) 0.4s both',
                }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {sortButtons.map(btn => (
                            <button
                                key={btn.key}
                                onClick={() => setSortBy(btn.key)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                                    borderRadius: 'var(--radius-sm)', border: `1px solid ${sortBy === btn.key ? 'var(--primary)' : 'var(--border)'}`,
                                    background: sortBy === btn.key ? 'rgba(0,131,143,0.05)' : 'white',
                                    color: sortBy === btn.key ? 'var(--primary)' : 'var(--text)',
                                    cursor: 'pointer', fontSize: '14px', fontWeight: sortBy === btn.key ? '700' : '600',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {btn.icon}
                                {btn.label}
                            </button>
                        ))}
                    </div>
                    <select 
                        value={showTop} 
                        onChange={e => setShowTop(Number(e.target.value))} 
                        style={{
                            padding: '10px 16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                            background: 'white', fontSize: '14px', color: 'var(--text)', fontWeight: '600',
                            outline: 'none', cursor: 'pointer',
                        }}
                    >
                        <option value={20}>Top 20</option>
                        <option value={50}>Top 50</option>
                        <option value={100}>Top 100</option>
                        <option value={9999}>{language === 'zh' ? '顯示全部' : 'Show All'}</option>
                    </select>
                </div>

                {/* Rankings list */}
                <div style={{ 
                    display: 'flex', flexDirection: 'column', gap: '16px',
                    animation: 'fadeInUp 0.6s var(--transition-med) 0.5s both',
                }}>
                    {sorted.map((book, i) => {
                        const rank = i + 1;
                        const isTop3 = rank <= 3;
                        const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

                        return (
                             <div
                                 key={book.id}
                                 className="popular-card"
                                 onClick={() => navigate(`/book/${book.id}`)}
                                 style={{
                                     display: 'flex', alignItems: 'center', gap: '24px',
                                     padding: '24px', background: 'white',
                                     borderRadius: 'var(--radius-lg)', border: isTop3 ? `2px solid ${medalColors[i]}40` : '1px solid var(--border-light)',
                                     cursor: 'pointer', transition: 'all var(--transition-med)',
                                     boxShadow: isTop3 ? `0 12px 32px ${medalColors[i]}15` : 'var(--card-shadow)',
                                 }}
                                onMouseEnter={e => { 
                                    e.currentTarget.style.transform = 'translateY(-4px)'; 
                                    e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                                    e.currentTarget.style.borderColor = 'var(--primary)';
                                }}
                                onMouseLeave={e => { 
                                    e.currentTarget.style.transform = ''; 
                                    e.currentTarget.style.boxShadow = isTop3 ? `0 12px 32px ${medalColors[i]}15` : 'var(--card-shadow)';
                                    e.currentTarget.style.borderColor = isTop3 ? `${medalColors[i]}40` : 'var(--border-light)';
                                }}
                            >
                                {/* Rank */}
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: isTop3 ? `linear-gradient(135deg, ${medalColors[i]}, ${medalColors[i]}dd)` : 'var(--bg)',
                                    color: isTop3 ? 'white' : 'var(--text-muted)',
                                    fontWeight: '900', fontSize: '18px',
                                    flexShrink: 0,
                                    boxShadow: isTop3 ? `0 8px 16px ${medalColors[i]}40` : 'none',
                                    border: isTop3 ? '3px solid white' : '1px solid var(--border)',
                                }}>
                                    {rank}
                                </div>

                                {/* Thumbnail */}
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <img
                                        src={book.thumbnail}
                                        alt=""
                                        style={{
                                            width: '120px', height: '68px', objectFit: 'cover',
                                            borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    {isTop3 && <Flame size={16} style={{ position: 'absolute', top: '-8px', right: '-8px', color: '#ff4d4f', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />}
                                </div>

                                 {/* Info */}
                                 <div className="popular-card-info" style={{ minWidth: 0, flex: '1 1 240px' }}>
                                    <h3 style={{
                                        margin: '0 0 6px', fontSize: '17px', fontWeight: '800', color: 'var(--text)',
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        letterSpacing: '-0.01em'
                                    }}>
                                        {language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn)}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                            ✍️ {language === 'en' ? (book.author_en || book.author) : book.author}
                                        </span>
                                        {book.code && (
                                            <span style={{
                                                background: 'var(--badge-bg)', color: 'white',
                                                padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '800',
                                            }}>{book.code}</span>
                                        )}
                                    </div>
                                     {/* Tags */}
                                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                                         {(book.tags || []).slice(0, 2).map((tag, j) => (
                                             <span key={j} className="tag-chip" style={{
                                                 fontSize: '10px', padding: '1px 8px', borderRadius: '4px',
                                                 background: 'var(--tag-bg)', color: 'var(--tag-text)',
                                                 fontWeight: '600', letterSpacing: '0.01em',
                                             }}>
                                                 {translateTag(tag)}
                                             </span>
                                         ))}
                                     </div>
                                </div>

                                {/* View bars */}
                                <ViewBar cnViews={book.cn_views} enViews={book.en_views} maxViews={maxViews} language={language} />

                                {/* Total */}
                                <div style={{
                                    textAlign: 'right', flexShrink: 0, minWidth: '100px', paddingLeft: '20px', borderLeft: '1px solid var(--border-light)'
                                }}>
                                    <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.02em' }}>{formatViews(book.total_views)}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{language === 'zh' ? '總觀看' : 'Total'}</div>
                                </div>
                                <ChevronRight size={20} color="var(--primary)" style={{ opacity: 0.3, flexShrink: 0 }} />
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div style={{
                    display: 'flex', gap: '32px', justifyContent: 'center',
                    padding: '48px 24px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--primary)' }} />
                        {language === 'zh' ? '中文版觀看次數' : 'Chinese Version Views'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--accent)' }} />
                        {language === 'zh' ? '英文版觀看次數' : 'English Version Views'}
                    </div>
                </div>
            </div>
        </div>
    );
}
