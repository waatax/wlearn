import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Play, Globe, Youtube, Users, BookOpen, Quote, List, Star, ShoppingBag, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import BottomNavbar from '../components/BottomNavbar';

export default function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language, t } = useLanguage();
    
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authorInfo, setAuthorInfo] = useState(null);
    const [activeSection, setActiveSection] = useState('insight');

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

    // Handle smooth scrolling to anchors
    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            // Offset for the sticky header
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Keep track of active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['insight', 'quotes', 'outline', 'video', 'author'];
            const scrollPosition = window.scrollY + 120;

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [book]);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ fontSize: '16px', color: 'var(--text-muted)' }}>{language === 'zh' ? '載入中...' : 'Loading...'}</div>
        </div>
    );

    if (!book) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{language === 'zh' ? '找不到此書籍' : 'Book not found'}</p>
            <button onClick={() => navigate('/')} style={{
                padding: '10px 24px', borderRadius: '8px', border: '1px solid var(--border)',
                background: 'white', cursor: 'pointer', fontSize: '14px', color: 'var(--text)', fontWeight: '600'
            }}>{t('back')}</button>
        </div>
    );

    const title = language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn);
    const description = language === 'zh' ? (book.description_cn || book.description_en || book.description) : (book.description_en || book.description_cn || book.description);
    const thumbnail = book.cover_url || (book.video_id
        ? `https://img.youtube.com/vi/${book.video_id}/maxresdefault.jpg`
        : null);

    // Dynamic rating based on id for high-quality mock UX
    const numericId = parseInt(String(book.id).replace(/\D/g, '')) || 0;
    const rating = (4.5 + (numericId % 5) * 0.1).toFixed(1);

    // Dynamic books.com.tw search url based on ISBN or title, falls back to search if books_url is not set
    const booksUrl = book.books_url || (book.isbn_zh
        ? `https://search.books.com.tw/search/query/key/${book.isbn_zh}/cat/all`
        : `https://search.books.com.tw/search/query/key/${encodeURIComponent(book.title_cn || book.title_en)}/cat/all`);

    // Dynamic kobo tw search url based on title (always search by title to avoid ISBN mismatches on Kobo store)
    const koboTwUrl = `https://www.kobo.com/tw/zh/Search?Query=${encodeURIComponent(book.title_cn || book.title_en)}`;
 
    // Dynamic kobo us search url based on title
    const koboUsUrl = `https://www.kobo.com/us/en/Search?Query=${encodeURIComponent(book.title_en || book.title_cn)}`;

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
                    onClick={() => navigate(-1)}
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
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white',
                        cursor: 'pointer', fontSize: '14px', color: 'var(--text)', fontWeight: '600',
                        marginRight: '12px', transition: 'all var(--transition-fast)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                >
                    <BookOpen size={16} color="var(--primary)" />
                    {language === 'zh' ? '回探索頁' : 'Explore'}
                </button>
            </div>

            {/* Reading Outpost layout container */}
            <div style={{
                maxWidth: '1120px', margin: '0 auto', padding: '40px 24px 80px',
                display: 'flex', gap: '48px'
            }}>
                
                {/* Left: Table of Contents (TOC) - Desktop only (>=992px) */}
                <aside className="toc-sidebar" style={{
                    width: '220px', flexShrink: 0, position: 'sticky', top: '100px',
                    height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '20px',
                }}>
                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-md)', padding: '20px',
                        border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                    }}>
                        <h4 style={{
                            margin: '0 0 16px', fontSize: '13px', fontWeight: '800',
                            color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <List size={14} color="var(--primary)" />
                            {language === 'zh' ? '導讀目錄' : 'Navigation'}
                        </h4>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {[
                                { id: 'insight', label: language === 'zh' ? '重點導讀' : 'Insight' },
                                { id: 'quotes', label: language === 'zh' ? '核心金句' : 'Quotes' },
                                { id: 'outline', label: language === 'zh' ? '內容大綱' : 'Outline' },
                                { id: 'video', label: language === 'zh' ? '說書影片' : 'Video' },
                                { id: 'author', label: language === 'zh' ? '關於作者' : 'Author' }
                            ].map(item => {
                                const active = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', padding: '10px 12px',
                                            borderRadius: '8px', border: 'none', background: active ? 'var(--sidebar-active)' : 'transparent',
                                            color: active ? 'var(--primary)' : 'var(--text-secondary)',
                                            fontSize: '14px', fontWeight: active ? '700' : '500',
                                            cursor: 'pointer', textAlign: 'left', width: '100%',
                                            transition: 'all var(--transition-fast)'
                                        }}
                                    >
                                        <span style={{
                                            width: '6px', height: '6px', borderRadius: '50%',
                                            background: 'var(--primary)', marginRight: '10px',
                                            opacity: active ? 1 : 0, transition: 'opacity 0.2s'
                                        }} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Right: Main reading column */}
                <article style={{ flex: 1, minWidth: 0, maxWidth: '780px' }}>
                    
                    {/* S5/Series badge & Title */}
                    <div style={{ marginBottom: '32px' }}>
                        {book.code && (
                            <span style={{
                                display: 'inline-block', background: 'var(--badge-bg)', color: 'var(--badge-text)',
                                fontSize: '12px', fontWeight: '800', padding: '4px 12px',
                                borderRadius: '6px', marginBottom: '14px', letterSpacing: '0.04em'
                            }}>
                                {book.code}
                            </span>
                        )}
                        <h1 style={{
                            margin: '0 0 12px', fontSize: '36px', fontWeight: '900',
                            color: 'var(--text)', lineHeight: '1.25', letterSpacing: '-0.02em'
                        }}>
                            {title}
                        </h1>
                        {book.title_en && book.title_en !== book.title_cn && (
                            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', margin: '0 0 16px', fontWeight: '500' }}>
                                原文：{book.title_en}
                            </p>
                        )}
                    </div>

                    {/* Book Metadata & Info Box (Tribute to Reading Outpost) */}
                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)',
                        boxShadow: 'var(--card-shadow)', padding: '24px', marginBottom: '40px',
                        display: 'flex', gap: '24px', flexWrap: 'wrap'
                    }}>
                        {/* Thumbnail image */}
                        <div style={{
                            width: '130px', height: '180px', flexShrink: 0, borderRadius: '8px',
                            overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                            background: '#f8f8f8', border: '1px solid var(--border-light)'
                        }}>
                            {thumbnail ? (
                                <img
                                    src={thumbnail}
                                    alt={title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={e => { e.target.src = `https://img.youtube.com/vi/${book.video_id}/hqdefault.jpg`; }}
                                />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#bbb' }}>No Cover</div>
                            )}
                        </div>

                        {/* Metadata fields */}
                        <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t('author') || '作者'}：</span>
                                    <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>
                                        {language === 'en' ? (book.author_en || book.author) : book.author}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>評分：</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ display: 'flex', color: '#ffb300' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < Math.floor(rating) ? '#ffb300' : 'none'} strokeWidth={2} />
                                            ))}
                                        </div>
                                        <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)' }}>{rating} / 5.0</span>
                                    </div>
                                </div>
                                {book.isbn_zh && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>ISBN：</span>
                                        <span style={{ fontSize: '13px', fontWeight: '600', fontFamily: 'monospace', color: 'var(--text)' }}>{book.isbn_zh}</span>
                                    </div>
                                )}
                                {book.playlist && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>收錄於：</span>
                                        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--primary)' }}>{book.playlist}</span>
                                    </div>
                                )}
                            </div>

                            {/* Purchase Links Container */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
                                {/* Books.com.tw Buy Link */}
                                <a
                                    href={booksUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        padding: '10px 18px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                                        textDecoration: 'none', fontSize: '13px', fontWeight: '750',
                                        transition: 'all 0.15s ease', boxShadow: '0 4px 10px rgba(202,122,44,0.2)'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    <ShoppingBag size={14} />
                                    {language === 'zh' ? '博客來 書頁' : 'Books.com.tw Page'}
                                </a>

                                {/* KOBO Link */}
                                <a
                                    href={language === 'zh' ? koboTwUrl : koboUsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                        padding: '10px 18px', borderRadius: '8px', background: '#330066', color: 'white',
                                        textDecoration: 'none', fontSize: '13px', fontWeight: '750',
                                        transition: 'all 0.15s ease', boxShadow: '0 4px 10px rgba(51,0,102,0.2)'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#440088'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#330066'; e.currentTarget.style.transform = 'none'; }}
                                >
                                    <Globe size={14} />
                                    {language === 'zh' ? 'KOBO 書頁' : 'KOBO Page'}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Detailed Insight (重點導讀) */}
                    <section id="insight" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
                        <h2 style={{
                            margin: '0 0 20px', fontSize: '20px', fontWeight: '800',
                            color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px',
                            borderBottom: '2px solid var(--border-light)', paddingBottom: '10px'
                        }}>
                            <span style={{ width: '4px', height: '20px', background: 'var(--primary)', borderRadius: '2px' }} />
                            {language === 'zh' ? '重點導讀' : 'Detailed Insight'}
                        </h2>
                        <div style={{
                            fontSize: '16px', lineHeight: '1.85', color: 'var(--text-secondary)',
                            letterSpacing: '0.01em', textAlign: 'justify'
                        }}>
                            {description.split('\n').map((para, i) => (
                                <p key={i} style={{ marginBottom: '16px' }}>{para}</p>
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Core Quotes (核心金句) */}
                    {((language === 'zh' ? book.quotes : (book.quotes_en || book.quotes)) && (language === 'zh' ? book.quotes : (book.quotes_en || book.quotes)).length > 0) && (
                        <section id="quotes" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
                            <h2 style={{
                                margin: '0 0 20px', fontSize: '20px', fontWeight: '800',
                                color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px',
                                borderBottom: '2px solid var(--border-light)', paddingBottom: '10px'
                            }}>
                                <span style={{ width: '4px', height: '20px', background: 'var(--primary)', borderRadius: '2px' }} />
                                {language === 'zh' ? '核心金句' : 'Core Quotes'}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {(language === 'zh' ? book.quotes : (book.quotes_en || book.quotes)).map((quote, i) => (
                                    <blockquote key={i} style={{
                                        margin: 0, padding: '20px 24px', borderRadius: '12px',
                                        background: 'var(--tag-bg)', borderLeft: '4px solid var(--primary)',
                                        position: 'relative', overflow: 'hidden'
                                    }}>
                                        <Quote size={48} style={{
                                            position: 'absolute', right: '12px', bottom: '-4px',
                                            color: 'var(--primary)', opacity: 0.08, pointerEvents: 'none'
                                        }} />
                                        <p style={{
                                            margin: 0, fontSize: '15px', fontWeight: '700',
                                            lineHeight: '1.7', color: 'var(--primary-dark)',
                                            position: 'relative', zIndex: 1
                                        }}>
                                            {language === 'zh' ? `「${quote}」` : `"${quote}"`}
                                        </p>
                                    </blockquote>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Section 3: Outline / Index (內容大綱) */}
                    {((language === 'zh' ? book.outline : (book.outline_en || book.outline)) && (language === 'zh' ? book.outline : (book.outline_en || book.outline)).length > 0) && (
                        <section id="outline" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
                            <h2 style={{
                                margin: '0 0 20px', fontSize: '20px', fontWeight: '800',
                                color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px',
                                borderBottom: '2px solid var(--border-light)', paddingBottom: '10px'
                            }}>
                                <span style={{ width: '4px', height: '20px', background: 'var(--primary)', borderRadius: '2px' }} />
                                {language === 'zh' ? '內容大綱 (Index)' : 'Book Outline'}
                            </h2>
                            <div style={{
                                background: 'white', borderRadius: 'var(--radius-md)', padding: '24px',
                                border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                                display: 'flex', flexDirection: 'column', gap: '14px'
                            }}>
                                {(language === 'zh' ? book.outline : (book.outline_en || book.outline)).map((chapter, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            width: '24px', height: '24px', borderRadius: '6px',
                                            background: 'var(--tag-bg)', color: 'var(--primary)',
                                            fontSize: '12px', fontWeight: '800', flexShrink: 0, marginTop: '2px'
                                        }}>
                                            {i + 1}
                                        </div>
                                        <span style={{ fontSize: '15px', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.4' }}>
                                            {chapter}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Section 4: Video Review (說書影片) */}
                    <section id="video" style={{ marginBottom: '48px', scrollMarginTop: '100px' }}>
                        <h2 style={{
                            margin: '0 0 20px', fontSize: '20px', fontWeight: '800',
                            color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px',
                            borderBottom: '2px solid var(--border-light)', paddingBottom: '10px'
                        }}>
                            <span style={{ width: '4px', height: '20px', background: 'var(--primary)', borderRadius: '2px' }} />
                            {language === 'zh' ? '說書影片' : 'Video Summary'}
                        </h2>
                        {book.video_id ? (
                            <div style={{
                                position: 'relative', paddingBottom: '56.25%', height: 0,
                                borderRadius: 'var(--radius-md)', overflow: 'hidden',
                                boxShadow: 'var(--card-shadow-hover)', border: '1px solid var(--border-light)'
                            }}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${book.video_id}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                />
                            </div>
                        ) : (
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                height: '200px', background: 'white', borderRadius: '12px',
                                border: '1px solid var(--border-light)', color: 'var(--text-muted)'
                            }}>
                                {language === 'zh' ? '暫無影片介紹' : 'No video available'}
                            </div>
                        )}
                        
                        {book.author_talk_video_id && (
                            <div style={{ marginTop: '36px' }}>
                                <h3 style={{
                                    fontSize: '15px', fontWeight: '800', color: 'var(--text-secondary)',
                                    marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px',
                                    textTransform: 'uppercase', letterSpacing: '0.04em'
                                }}>
                                    <Youtube size={16} color="var(--primary)" />
                                    {language === 'zh' ? '原著作者專題演講 / 訪談 (原聲)' : 'Hear from the Author (Original Speech/Interview)'}
                                </h3>
                                <div style={{
                                    position: 'relative', paddingBottom: '56.25%', height: 0,
                                    borderRadius: 'var(--radius-md)', overflow: 'hidden',
                                    boxShadow: 'var(--card-shadow-hover)', border: '1px solid var(--border-light)'
                                }}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${book.author_talk_video_id}`}
                                        title="Author Speech YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    />
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Section 5: Author Info (關於作者) */}
                    {authorInfo && (
                        <section id="author" style={{ marginBottom: '24px', scrollMarginTop: '100px' }}>
                            <h2 style={{
                                margin: '0 0 20px', fontSize: '20px', fontWeight: '800',
                                color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '10px',
                                borderBottom: '2px solid var(--border-light)', paddingBottom: '10px'
                            }}>
                                <span style={{ width: '4px', height: '20px', background: 'var(--primary)', borderRadius: '2px' }} />
                                {language === 'zh' ? '關於作者' : 'About the Author'}
                            </h2>
                            <div style={{
                                background: 'white', borderRadius: 'var(--radius-md)', padding: '24px',
                                border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                                display: 'flex', flexDirection: 'column', gap: '16px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: 'var(--text)' }}>
                                            {language === 'en' ? (authorInfo.name_en || authorInfo.name) : (authorInfo.name_zh || authorInfo.name)}
                                        </h3>
                                        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                            {authorInfo.career}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/author/${authorInfo.id}`}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                                            fontSize: '13px', color: 'var(--primary)', textDecoration: 'none',
                                            fontWeight: '700', padding: '6px 12px', borderRadius: '6px',
                                            background: 'var(--sidebar-active)', transition: 'background 0.15s ease'
                                        }}
                                    >
                                        {language === 'zh' ? '查看檔案' : 'View Profile'}
                                        <ArrowLeft size={12} style={{ transform: 'rotate(180deg)' }} />
                                    </Link>
                                </div>
                                <p style={{
                                    margin: 0, fontSize: '15px', lineHeight: '1.75',
                                    color: 'var(--text-secondary)', textAlign: 'justify'
                                }}>
                                    {authorInfo.bio}
                                </p>
                            </div>
                        </section>
                    )}

                </article>

            </div>

            {/* PWA Bottom Navigation (Only visible on mobile) */}
            <BottomNavbar />
        </div>
    );
}
