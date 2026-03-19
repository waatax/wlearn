import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Globe, Youtube, Users, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language, translateTag } = useLanguage();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    const [authorInfo, setAuthorInfo] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch(import.meta.env.BASE_URL + 'books.json').then(r => r.json()),
            fetch(import.meta.env.BASE_URL + 'authors.json').then(r => r.json())
        ])
            .then(([booksData, authorsData]) => {
                const foundBook = booksData.find(b => String(b.id) === String(id));
                setBook(foundBook || null);
                
                if (foundBook && foundBook.author) {
                    const foundAuthor = authorsData.find(a => 
                        a.name === foundBook.author || 
                        a.name_en === foundBook.author || 
                        a.name_en === foundBook.author_en ||
                        a.name_zh === foundBook.author
                    );
                    setAuthorInfo(foundAuthor || null);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (book) {
            // Update SEO Meta Tags
            const metaTags = {
                'original-language': book.original_language || 'en',
                'isbn-en': book.isbn_en || '',
                'isbn-zh': book.isbn_zh || ''
            };

            Object.entries(metaTags).forEach(([name, content]) => {
                let meta = document.querySelector(`meta[name="${name}"]`);
                if (!meta) {
                    meta = document.createElement('meta');
                    meta.setAttribute('name', name);
                    document.head.appendChild(meta);
                }
                meta.setAttribute('content', content);
            });

            // Cleanup function to remove tags when navigating away or changing books
            return () => {
                Object.keys(metaTags).forEach(name => {
                    const meta = document.querySelector(`meta[name="${name}"]`);
                    if (meta) meta.remove();
                });
            };
        }
    }, [book]);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f0e8' }}>
            <div style={{ fontSize: '16px', color: '#888' }}>{language === 'zh' ? '載入中...' : 'Loading...'}</div>
        </div>
    );

    if (!book) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f0e8' }}>
            <p style={{ fontSize: '18px', color: '#888', marginBottom: '16px' }}>{language === 'zh' ? '找不到此書籍' : 'Book not found'}</p>
            <button onClick={() => navigate('/')} style={{
                padding: '10px 24px', borderRadius: '8px', border: '1px solid #e0d8cc',
                background: 'white', cursor: 'pointer', fontSize: '14px',
            }}>{t('back')}</button>
        </div>
    );

    const title = language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn);
    const description = language === 'zh' ? (book.description_cn || book.description_en || book.description) : (book.description_en || book.description_cn || book.description);
    const thumbnail = book.cover_url || (book.video_id
        ? `https://img.youtube.com/vi/${book.video_id}/maxresdefault.jpg`
        : null);

    const { toggleLanguage, t } = useLanguage();

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
                {/* Top section: badge + title + action buttons */}
                <div className="detail-top-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', gap: '24px' }}>
                    <div style={{ minWidth: 0 }}>
                        {book.code && (
                            <span style={{
                                display: 'inline-block', background: 'var(--badge-bg)', color: 'white',
                                fontSize: '13px', fontWeight: '800', padding: '4px 14px',
                                borderRadius: '8px', marginBottom: '16px',
                                boxShadow: '0 4px 12px rgba(239, 108, 0, 0.3)',
                                letterSpacing: '0.04em'
                            }}>
                                {book.code}
                            </span>
                        )}
                        <h1 className="detail-title" style={{ margin: '8px 0 0', fontSize: '42px', fontWeight: '850', color: 'var(--text)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                            {title}
                        </h1>
                        {book.author && (
                            <div style={{ marginTop: '20px' }}>
                                {authorInfo ? (
                                    <Link to={`/author/${authorInfo.id}`} style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                                        padding: '8px 20px', borderRadius: '999px',
                                        background: 'var(--tag-bg)', color: 'var(--tag-text)',
                                        fontSize: '15px', fontWeight: '700', textDecoration: 'none',
                                        transition: 'all var(--transition-fast)',
                                        border: '1px solid rgba(45, 102, 72, 0.2)'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                        <Users size={16} />
                                        {language === 'en' ? (authorInfo.name_en || authorInfo.name) : (authorInfo.name_zh || authorInfo.name)}
                                        <ChevronRight size={16} opacity={0.5} />
                                    </Link>
                                ) : (
                                    <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                                        ✍️ {language === 'en' ? (book.author_en || book.author) : book.author}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="detail-buttons" style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
                        {book.youtube_url && (
                            <a
                                href={book.youtube_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    padding: '14px 32px', borderRadius: '12px',
                                    background: 'var(--primary)', color: 'white', textDecoration: 'none',
                                    fontSize: '16px', fontWeight: '700', minWidth: '140px',
                                    transition: 'all var(--transition-fast)',
                                    boxShadow: '0 4px 14px var(--primary-glow)',
                                    letterSpacing: '0.02em'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <Play size={18} fill="white" />
                                {language === 'zh' ? '立即觀看' : 'Watch Now'}
                            </a>
                        )}
                        {book.english_url && (
                            <a
                                href={book.english_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    padding: '14px 32px', borderRadius: '12px',
                                    border: '1.5px solid var(--border)', color: 'var(--text)', textDecoration: 'none',
                                    fontSize: '16px', fontWeight: '700', background: 'white', minWidth: '140px',
                                    transition: 'all var(--transition-fast)',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <Globe size={18} />
                                {t('englishVersion')}
                            </a>
                        )}
                    </div>
                </div>

                {/* Two-column layout: cover + info */}
                <div className="detail-content-columns" style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
                    {/* Left: cover image */}
                    <div className="detail-cover" style={{ flexShrink: 0, width: '320px' }}>
                        {thumbnail && (
                            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--card-shadow-hover)' }}>
                                <img
                                    src={thumbnail}
                                    alt={title}
                                    style={{
                                        width: '100%', display: 'block',
                                        transition: 'transform var(--transition-slow)',
                                    }}
                                    onError={e => { e.target.src = `https://img.youtube.com/vi/${book.video_id}/hqdefault.jpg`; }}
                                />
                                <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'inherit', pointerEvents: 'none' }} />
                            </div>
                        )}
                    </div>

                    {/* Right: details */}
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Tags */}
                        <div>
                            <h3 style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: '700', color: '#6b6459', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {t('tags')}
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {(book.tags || []).map((tag, i) => (
                                    <span key={i} style={{
                                        fontSize: '13px', padding: '5px 14px', borderRadius: '999px',
                                        background: '#f0ebe0', color: '#2d2a24', fontWeight: '500',
                                        border: '1px solid #e0d8cc',
                                    }}>
                                        {translateTag(tag)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Playlist card */}
                        <div style={{
                            background: '#f0ebe0', borderRadius: '12px', padding: '16px 20px',
                        }}>
                            <div style={{ fontSize: '12px', color: '#6b6459', fontWeight: '600', marginBottom: '4px' }}>{t('playlists')}</div>
                            <div style={{ fontSize: '15px', color: '#2d2a24', fontWeight: '600' }}>{book.playlist}</div>
                        </div>

                        {/* Description card */}
                        {description && (
                            <div style={{
                                background: 'white', borderRadius: 'var(--radius-md)', padding: '28px',
                                border: '1px solid var(--border-light)',
                                boxShadow: 'var(--card-shadow)'
                            }}>
                                <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '800', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '4px', height: '16px', background: 'var(--primary)', borderRadius: '2px' }} />
                                    {language === 'zh' ? '書籍內容詳解' : 'Detailed Insight'}
                                </h3>
                                <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.85', color: 'var(--text-secondary)', letterSpacing: '0.01em' }}>
                                    {description}
                                </p>
                            </div>
                        )}

                        {/* Author Bio card */}
                        {authorInfo && (
                            <div style={{
                                background: 'white', borderRadius: '12px', padding: '20px',
                                border: '1px solid #e0d8cc', borderLeft: '4px solid #0097a7'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#2d2a24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Users size={16} color="#0097a7" /> {t('aboutAuthor')}
                                    </h3>
                                    <Link to={`/author/${authorInfo.id}`} style={{ fontSize: '12px', color: '#0097a7', textDecoration: 'none', fontWeight: '600' }}>
                                        {t('viewProfile')}
                                    </Link>
                                </div>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.8', color: '#2d2a24', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {authorInfo.bio}
                                </p>
                            </div>
                        )}

                        {/* Book Metadata Section (ISBN, Language) */}
                        {(book.isbn_en || book.isbn_zh || book.original_language) && (
                            <div style={{
                                marginTop: '12px',
                                padding: '16px',
                                background: 'white',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                            }}>
                                <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '8px', 
                                    marginBottom: '12px',
                                    paddingBottom: '8px',
                                    borderBottom: '1px solid var(--border-light)'
                                }}>
                                    <Globe size={16} color="var(--primary)" />
                                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)' }}>
                                        {t('publishingInfo')}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {book.isbn_en && book.isbn_en !== book.isbn_zh && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('isbnEn')}</span>
                                            <span style={{ fontSize: '12px', fontWeight: '600', fontFamily: 'monospace', color: 'var(--text)' }}>{book.isbn_en}</span>
                                        </div>
                                    )}
                                    {book.isbn_zh && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('isbnZh')}</span>
                                            <span style={{ fontSize: '12px', fontWeight: '600', fontFamily: 'monospace', color: 'var(--text)' }}>{book.isbn_zh}</span>
                                        </div>
                                    )}
                                    {book.original_language && (
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('originalLanguage')}</span>
                                            <span style={{ 
                                                fontSize: '10px', 
                                                fontWeight: '700', 
                                                color: 'var(--primary)', 
                                                padding: '2px 6px', 
                                                borderRadius: '4px',
                                                background: 'var(--primary-glow)',
                                                textTransform: 'uppercase'
                                            }}>
                                                {book.original_language === 'en' ? 'English' : 
                                                 book.original_language === 'ja' ? 'Japanese' : 
                                                 book.original_language === 'zh' ? 'Chinese' : book.original_language}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* YouTube links card */}
                        <div style={{
                            background: 'white', borderRadius: '12px', padding: '20px',
                            border: '1px solid #e0d8cc',
                        }}>
                            <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '700', color: '#2d2a24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Youtube size={18} /> YouTube
                            </h3>

                            {/* Chinese version */}
                            {book.youtube_url && (
                                <div style={{ marginBottom: book.english_url ? '16px' : '0' }}>
                                    <div style={{ fontSize: '12px', color: '#6b6459', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                        <Globe size={12} /> {language === 'zh' ? '中文版' : 'Chinese Version'}
                                    </div>
                                    <a
                                        href={book.youtube_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontSize: '14px', color: '#0097a7', wordBreak: 'break-all' }}
                                    >
                                        {book.youtube_url}
                                    </a>
                                    {book.english_url && (
                                        <div style={{ borderBottom: '1px solid #e8e2d8', margin: '16px 0 0' }} />
                                    )}
                                </div>
                            )}

                            {/* English version */}
                            {book.english_url && (
                                <div>
                                    <div style={{ fontSize: '12px', color: '#6b6459', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                        <Globe size={12} /> {language === 'zh' ? '英文版' : 'English Version'}
                                    </div>
                                    <a
                                        href={book.english_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontSize: '14px', color: '#0097a7', wordBreak: 'break-all' }}
                                    >
                                        {book.english_url}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
