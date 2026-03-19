import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, Briefcase, ExternalLink, Users, ChevronRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
                    onClick={() => navigate('/authors')}
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
                    {t('authorsList')}
                </button>

                <div style={{ flex: 1 }} />

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

            {/* Main content */}
            <div className="detail-main" style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 32px' }}>
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
                        {author.books?.map((book, i) => (
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
        </div>
    );
}
