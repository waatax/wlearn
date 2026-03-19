import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Users, BookOpen, Award, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Authors() {
    const navigate = useNavigate();
    const { language, t } = useLanguage();
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
                    {filtered.map((author, i) => {
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
        </div>
    );
}
