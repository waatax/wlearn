import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Play, Globe, BarChart3, Eye, Trophy, Flame } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function formatViews(n) {
        if (!n || n === 0) return '—';
        if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
        if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
        return n.toLocaleString();
}

function ViewBar({ cnViews, enViews, maxViews }) {
        const cnWidth = maxViews > 0 ? (cnViews / maxViews) * 100 : 0;
        const enWidth = maxViews > 0 ? (enViews / maxViews) * 100 : 0;

        return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
                        {/* Chinese bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '11px', color: '#6b6459', width: '36px', flexShrink: 0, textAlign: 'right' }}>中文</span>
                                <div style={{ flex: 1, height: '14px', background: '#f0ebe0', borderRadius: '7px', overflow: 'hidden', position: 'relative' }}>
                                        <div style={{
                                                height: '100%', width: `${cnWidth}%`,
                                                background: 'linear-gradient(90deg, #0097a7, #00bcd4)',
                                                borderRadius: '7px',
                                                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                minWidth: cnViews > 0 ? '4px' : '0',
                                        }} />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '600', color: '#0097a7', width: '50px', flexShrink: 0 }}>{formatViews(cnViews)}</span>
                        </div>
                        {/* English bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '11px', color: '#6b6459', width: '36px', flexShrink: 0, textAlign: 'right' }}>英文</span>
                                <div style={{ flex: 1, height: '14px', background: '#f0ebe0', borderRadius: '7px', overflow: 'hidden', position: 'relative' }}>
                                        <div style={{
                                                height: '100%', width: `${enWidth}%`,
                                                background: 'linear-gradient(90deg, #ff8f00, #ffa726)',
                                                borderRadius: '7px',
                                                transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                                                minWidth: enViews > 0 ? '4px' : '0',
                                        }} />
                                </div>
                                <span style={{ fontSize: '11px', fontWeight: '600', color: '#ff8f00', width: '50px', flexShrink: 0 }}>{formatViews(enViews)}</span>
                        </div>
                </div>
        );
}

export default function Popular() {
        const navigate = useNavigate();
        const { language } = useLanguage();
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

        // Summary stats
        const totalCnViews = stats.reduce((s, b) => s + (b.cn_views || 0), 0);
        const totalEnViews = stats.reduce((s, b) => s + (b.en_views || 0), 0);
        const totalAllViews = totalCnViews + totalEnViews;
        const booksWithViews = stats.filter(b => b.total_views > 0).length;

        const sortButtons = [
                { key: 'total', label: '總計', icon: <TrendingUp size={14} /> },
                { key: 'cn', label: '中文版', icon: <Play size={14} /> },
                { key: 'en', label: '英文版', icon: <Globe size={14} /> },
        ];

        return (
                <div style={{ background: '#f5f0e8', minHeight: '100vh' }}>
                        {/* Top nav */}
                        <div style={{
                                padding: '12px 24px', borderBottom: '1px solid #e0d8cc',
                                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                                <button onClick={() => navigate('/')} style={{
                                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                                        borderRadius: '8px', border: '1px solid #e0d8cc', background: 'white',
                                        cursor: 'pointer', fontSize: '14px', color: '#2d2a24', fontWeight: '500',
                                }}>
                                        <ArrowLeft size={16} /> 返回
                                </button>
                                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: '#2d2a24' }}>
                                        <Flame size={20} color="#ff8f00" /> 熱門書籍
                                </h1>
                                <div style={{ width: '80px' }} />
                        </div>

                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                                {loading ? (
                                        <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>載入中...</div>
                                ) : (
                                        <>
                                                {/* Summary cards */}
                                                <div className="dashboard-summary" style={{
                                                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                                        gap: '16px', marginBottom: '28px',
                                                }}>
                                                        {/* Total Views */}
                                                        <div style={{
                                                                background: 'linear-gradient(135deg, #0097a7, #00bcd4)',
                                                                borderRadius: '16px', padding: '24px', color: 'white',
                                                                boxShadow: '0 8px 24px rgba(0,151,167,0.25)',
                                                                animation: 'fadeInUp 0.4s ease both',
                                                        }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                                        <Eye size={18} style={{ opacity: 0.8 }} />
                                                                        <span style={{ fontSize: '12px', fontWeight: '600', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>總觀看次數</span>
                                                                </div>
                                                                <div style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.02em' }}>{formatViews(totalAllViews)}</div>
                                                                <div style={{ fontSize: '12px', opacity: 0.75, marginTop: '4px' }}>{booksWithViews} 本書有觀看數據</div>
                                                        </div>

                                                        {/* Chinese Views */}
                                                        <div style={{
                                                                background: 'white', borderRadius: '16px', padding: '24px',
                                                                border: '1px solid #e0d8cc', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                                                animation: 'fadeInUp 0.4s ease 0.1s both',
                                                        }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                                        <Play size={18} color="#0097a7" />
                                                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b6459', textTransform: 'uppercase', letterSpacing: '0.05em' }}>中文版觀看</span>
                                                                </div>
                                                                <div style={{ fontSize: '32px', fontWeight: '800', color: '#0097a7', letterSpacing: '-0.02em' }}>{formatViews(totalCnViews)}</div>
                                                                <div style={{ fontSize: '12px', color: '#9e9486', marginTop: '4px' }}>佔 {totalAllViews > 0 ? Math.round(totalCnViews / totalAllViews * 100) : 0}%</div>
                                                        </div>

                                                        {/* English Views */}
                                                        <div style={{
                                                                background: 'white', borderRadius: '16px', padding: '24px',
                                                                border: '1px solid #e0d8cc', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                                                animation: 'fadeInUp 0.4s ease 0.2s both',
                                                        }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                                        <Globe size={18} color="#ff8f00" />
                                                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b6459', textTransform: 'uppercase', letterSpacing: '0.05em' }}>英文版觀看</span>
                                                                </div>
                                                                <div style={{ fontSize: '32px', fontWeight: '800', color: '#ff8f00', letterSpacing: '-0.02em' }}>{formatViews(totalEnViews)}</div>
                                                                <div style={{ fontSize: '12px', color: '#9e9486', marginTop: '4px' }}>佔 {totalAllViews > 0 ? Math.round(totalEnViews / totalAllViews * 100) : 0}%</div>
                                                        </div>

                                                        {/* Top Book */}
                                                        <div style={{
                                                                background: 'linear-gradient(135deg, #ff8f00, #ffa726)',
                                                                borderRadius: '16px', padding: '24px', color: 'white',
                                                                boxShadow: '0 8px 24px rgba(255,143,0,0.25)',
                                                                animation: 'fadeInUp 0.4s ease 0.3s both',
                                                        }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                                        <Trophy size={18} style={{ opacity: 0.85 }} />
                                                                        <span style={{ fontSize: '12px', fontWeight: '600', opacity: 0.85, textTransform: 'uppercase', letterSpacing: '0.05em' }}>最熱門書籍</span>
                                                                </div>
                                                                <div style={{ fontSize: '16px', fontWeight: '700', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                                        {sorted[0]?.title_cn || '—'}
                                                                </div>
                                                                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '6px' }}>{formatViews(sorted[0]?.total_views)} 次觀看</div>
                                                        </div>
                                                </div>

                                                {/* Sort controls */}
                                                <div style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
                                                        gap: '12px', marginBottom: '20px',
                                                }}>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                                {sortButtons.map(btn => (
                                                                        <button key={btn.key} onClick={() => setSortBy(btn.key)} style={{
                                                                                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                                                                                borderRadius: '999px', border: `1px solid ${sortBy === btn.key ? '#0097a7' : '#e0d8cc'}`,
                                                                                background: sortBy === btn.key ? '#e0f7fa' : 'white',
                                                                                color: sortBy === btn.key ? '#0097a7' : '#2d2a24',
                                                                                cursor: 'pointer', fontSize: '13px', fontWeight: sortBy === btn.key ? '600' : '400',
                                                                                transition: 'all 0.15s',
                                                                        }}>
                                                                                {btn.icon} {btn.label}
                                                                        </button>
                                                                ))}
                                                        </div>
                                                        <select value={showTop} onChange={e => setShowTop(Number(e.target.value))} style={{
                                                                padding: '8px 12px', borderRadius: '8px', border: '1px solid #e0d8cc',
                                                                background: 'white', fontSize: '13px', color: '#2d2a24', cursor: 'pointer',
                                                        }}>
                                                                <option value={20}>Top 20</option>
                                                                <option value={50}>Top 50</option>
                                                                <option value={100}>Top 100</option>
                                                                <option value={9999}>全部</option>
                                                        </select>
                                                </div>

                                                {/* Rankings list */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        {sorted.map((book, i) => {
                                                                const rank = i + 1;
                                                                const isTop3 = rank <= 3;
                                                                const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

                                                                return (
                                                                        <div
                                                                                key={book.id}
                                                                                onClick={() => navigate(`/book/${book.id}`)}
                                                                                style={{
                                                                                        display: 'flex', alignItems: 'center', gap: '16px',
                                                                                        padding: '16px 20px', background: 'white',
                                                                                        borderRadius: '14px', border: isTop3 ? `2px solid ${medalColors[i]}30` : '1px solid #ebe5da',
                                                                                        cursor: 'pointer', transition: 'all 0.2s',
                                                                                        boxShadow: isTop3 ? `0 4px 16px ${medalColors[i]}20` : '0 1px 4px rgba(0,0,0,0.04)',
                                                                                        animation: `fadeInUp 0.3s ease ${Math.min(i * 30, 500)}ms both`,
                                                                                }}
                                                                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
                                                                                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isTop3 ? `0 4px 16px ${medalColors[i]}20` : '0 1px 4px rgba(0,0,0,0.04)'; }}
                                                                        >
                                                                                {/* Rank */}
                                                                                <div style={{
                                                                                        width: '36px', height: '36px', borderRadius: '50%',
                                                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                        background: isTop3 ? medalColors[i] : '#f0ebe0',
                                                                                        color: isTop3 ? 'white' : '#6b6459',
                                                                                        fontWeight: '800', fontSize: isTop3 ? '16px' : '14px',
                                                                                        flexShrink: 0,
                                                                                        boxShadow: isTop3 ? `0 2px 8px ${medalColors[i]}40` : 'none',
                                                                                }}>
                                                                                        {rank}
                                                                                </div>

                                                                                {/* Thumbnail */}
                                                                                <img
                                                                                        src={book.thumbnail}
                                                                                        alt=""
                                                                                        style={{
                                                                                                width: '64px', height: '36px', objectFit: 'cover',
                                                                                                borderRadius: '6px', flexShrink: 0,
                                                                                        }}
                                                                                        onError={e => { e.target.style.display = 'none'; }}
                                                                                />

                                                                                {/* Info */}
                                                                                <div style={{ minWidth: 0, flex: '0 0 200px' }}>
                                                                                        <div style={{
                                                                                                fontSize: '14px', fontWeight: '600', color: '#2d2a24',
                                                                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                                                        }}>
                                                                                                {book.title_cn || book.title_en}
                                                                                        </div>
                                                                                        <div style={{ fontSize: '11px', color: '#9e9486', marginTop: '2px' }}>
                                                                                                {book.author && `✍️ ${book.author}`}
                                                                                                {book.code && <span style={{
                                                                                                        marginLeft: '8px', background: '#ff8f00', color: 'white',
                                                                                                        padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '700',
                                                                                                }}>{book.code}</span>}
                                                                                        </div>
                                                                                </div>

                                                                                {/* View bars */}
                                                                                <ViewBar cnViews={book.cn_views} enViews={book.en_views} maxViews={maxViews} />

                                                                                {/* Total */}
                                                                                <div style={{
                                                                                        textAlign: 'right', flexShrink: 0, minWidth: '70px',
                                                                                }}>
                                                                                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#2d2a24' }}>{formatViews(book.total_views)}</div>
                                                                                        <div style={{ fontSize: '10px', color: '#9e9486' }}>總計</div>
                                                                                </div>
                                                                        </div>
                                                                );
                                                        })}
                                                </div>

                                                {/* Legend */}
                                                <div style={{
                                                        display: 'flex', gap: '24px', justifyContent: 'center',
                                                        padding: '24px', color: '#6b6459', fontSize: '12px',
                                                }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'linear-gradient(90deg, #0097a7, #00bcd4)' }} />
                                                                中文版觀看次數
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'linear-gradient(90deg, #ff8f00, #ffa726)' }} />
                                                                英文版觀看次數
                                                        </div>
                                                </div>
                                        </>
                                )}
                        </div>
                </div>
        );
}
