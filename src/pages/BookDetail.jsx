import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Play,
    Globe,
    Youtube,
    Users,
    BookOpen,
    Quote,
    List,
    Star,
    ShoppingBag,
    Info,
    CheckCircle2,
    Bookmark,
    Sparkles,
    Edit3,
    Compass,
    ArrowUpRight,
    Save,
    Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';
import { getCrossUniverseSynapses } from '../lib/gamification';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';

export default function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language, t, toggleLanguage } = useLanguage();
    const {
        state,
        toggleReadBook,
        toggleBookmark,
        saveBookNote,
        trackExternalVisit
    } = useGamification();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authorInfo, setAuthorInfo] = useState(null);
    const [activeSection, setActiveSection] = useState('insight');
    const [noteContent, setNoteContent] = useState('');
    const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

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

                // Load existing note
                if (foundBook && state.notes?.[foundBook.id]) {
                    setNoteContent(state.notes[foundBook.id]);
                }

                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const isRead = book && (state.readBooks || []).includes(book.id);
    const isBookmarked = book && (state.bookmarkedBooks || []).includes(book.id);
    const crossSynapses = book ? getCrossUniverseSynapses(book) : [];

    const handleSaveNote = () => {
        if (!book) return;
        saveBookNote(book.id, noteContent);
        setNoteSavedFeedback(true);
        setTimeout(() => setNoteSavedFeedback(false), 2500);
    };

    const handleVisitRealm = (realm) => {
        if (realm && realm.url && realm.url !== '#') {
            trackExternalVisit(realm.id);
            window.open(realm.url, '_blank', 'noopener,noreferrer');
        }
    };

    // Handle smooth scrolling to anchors
    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
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
            const sections = ['video', 'author', 'insight', 'synapses', 'notes', 'quotes', 'outline', 'purchase'];
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

    const numericId = parseInt(String(book.id).replace(/\D/g, '')) || 0;
    const rating = (4.5 + (numericId % 5) * 0.1).toFixed(1);

    const booksUrl = book.books_url || (book.isbn_zh
        ? `https://search.books.com.tw/search/query/key/${book.isbn_zh}/cat/all`
        : `https://search.books.com.tw/search/query/key/${encodeURIComponent(book.title_cn || book.title_en)}/cat/all`);

    const koboTwUrl = `https://www.kobo.com/tw/zh/Search?Query=${encodeURIComponent(book.title_cn || book.title_en)}`;
    const koboUsUrl = `https://www.kobo.com/us/en/Search?Query=${encodeURIComponent(book.title_en || book.title_cn)}`;

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            {/* Top nav bar */}
            <div style={{
                padding: '16px 32px', borderBottom: '1px solid var(--border-light)',
                background: 'var(--sidebar-bg)', backdropFilter: 'blur(var(--sidebar-blur))',
                WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100,
                gap: '12px', flexWrap: 'wrap'
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white',
                        cursor: 'pointer', fontSize: '13px', color: 'var(--text)', fontWeight: '600',
                        transition: 'all var(--transition-fast)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                >
                    <ArrowLeft size={15} />
                    <span>{t('back')}</span>
                </button>

                <div style={{ flex: 1 }} />

                {/* Gamification HUD */}
                <GamificationHUD />

                <button
                    onClick={toggleLanguage}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                        borderRadius: '12px', border: '1px solid var(--border)', background: 'white',
                        cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)',
                        fontWeight: '600'
                    }}
                >
                    <Globe size={15} />
                    <span>{language === 'zh' ? 'EN' : '繁中'}</span>
                </button>
            </div>

            {/* Reading Outpost layout container */}
            <div style={{
                maxWidth: '1160px', margin: '0 auto', padding: '36px 24px 80px',
                display: 'flex', gap: '40px'
            }}>

                {/* Left: Table of Contents (TOC) */}
                <aside className="toc-sidebar" style={{
                    width: '230px', flexShrink: 0, position: 'sticky', top: '90px',
                    height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '16px',
                }}>
                    <div style={{
                        background: 'white', borderRadius: 'var(--radius-md)', padding: '20px',
                        border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                    }}>
                        <h4 style={{
                            margin: '0 0 14px', fontSize: '12px', fontWeight: '800',
                            color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <List size={14} color="var(--primary)" />
                            {language === 'zh' ? '導讀導航' : 'Navigation'}
                        </h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {[
                                { id: 'video', label: language === 'zh' ? '影音說書' : 'Media', icon: Play },
                                { id: 'author', label: language === 'zh' ? '作者介紹' : 'Author', icon: Users },
                                { id: 'insight', label: language === 'zh' ? '核心洞察' : 'Insights', icon: BookOpen },
                                { id: 'synapses', label: language === 'zh' ? '🌌 跨星系共鳴' : '🌌 Cosmic Synapses', icon: Compass },
                                { id: 'notes', label: language === 'zh' ? '📝 研讀筆記' : '📝 Scholar Notes', icon: Edit3 },
                                { id: 'quotes', label: language === 'zh' ? '經典金句' : 'Quotes', icon: Quote },
                                { id: 'outline', label: language === 'zh' ? '內容大綱' : 'Outline', icon: List },
                                { id: 'purchase', label: language === 'zh' ? '書籍頁面' : 'Pages', icon: ShoppingBag },
                            ].map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '8px',
                                            padding: '8px 12px', borderRadius: '8px',
                                            border: 'none', background: isActive ? 'var(--tag-bg)' : 'transparent',
                                            color: isActive ? 'var(--primary-dark)' : 'var(--text-secondary)',
                                            fontWeight: isActive ? '750' : '500',
                                            fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                                            transition: 'all var(--transition-fast)',
                                        }}
                                    >
                                        <Icon size={14} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Right: Main Content */}
                <article style={{ flex: 1, minWidth: 0 }}>
                    {/* Header: Title, Author & Gamification Actions */}
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                            {book.code && (
                                <span style={{
                                    background: isRead ? '#dcfce7' : 'var(--badge-bg)',
                                    color: isRead ? '#15803d' : 'var(--badge-text)',
                                    fontSize: '11px', fontWeight: '800', padding: '3px 9px',
                                    borderRadius: '6px', letterSpacing: '0.04em'
                                }}>
                                    {book.code}
                                </span>
                            )}
                            {(book.tags || []).map((tag, idx) => (
                                <span key={idx} style={{
                                    background: 'var(--tag-bg)', color: 'var(--tag-text)',
                                    fontSize: '12px', fontWeight: '600', padding: '3px 9px',
                                    borderRadius: '6px'
                                }}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text)', margin: '0 0 10px 0', lineHeight: 1.25 }}>
                            {title}
                        </h1>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px' }}>
                            <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
                                ✍️ {language === 'zh' ? (book.author || book.author_en) : (book.author_en || book.author)}
                            </span>
                            <span>•</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#eab308', fontWeight: '700' }}>
                                <Star size={14} fill="#eab308" />
                                <span>{rating}</span>
                            </div>
                        </div>

                        {/* Gamification Action Buttons */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px',
                            background: 'white',
                            padding: '16px 20px',
                            borderRadius: '16px',
                            border: '1px solid var(--border-light)',
                            boxShadow: 'var(--card-shadow)',
                            alignItems: 'center'
                        }}>
                            {/* Toggle Read */}
                            <button
                                onClick={() => toggleReadBook(book.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 18px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: isRead
                                        ? 'linear-gradient(135deg, #16a34a, #15803d)'
                                        : 'linear-gradient(135deg, #2d6648, #1b452e)',
                                    color: 'white',
                                    fontWeight: '750',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(45, 102, 72, 0.25)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <CheckCircle2 size={16} />
                                <span>{isRead ? (language === 'zh' ? '✓ 已完成研讀 (+50 EXP)' : '✓ Completed (+50 EXP)') : (language === 'zh' ? '標記為已研讀 (+50 EXP)' : 'Mark as Completed (+50 EXP)')}</span>
                            </button>

                            {/* Bookmark */}
                            <button
                                onClick={() => toggleBookmark(book.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '10px 16px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    background: isBookmarked ? '#fff7ed' : 'white',
                                    color: isBookmarked ? '#ea580c' : 'var(--text)',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Bookmark size={16} fill={isBookmarked ? '#ea580c' : 'none'} />
                                <span>{isBookmarked ? t('inBookmarks') : t('addToBookmarks')}</span>
                            </button>

                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--primary)', fontWeight: '750' }}>
                                <Sparkles size={14} />
                                <span>{language === 'zh' ? '研讀本精華可獲取 50 EXP' : 'Earn 50 EXP upon study'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Video & Audio */}
                    <section id="video" style={{ marginBottom: '40px', scrollMarginTop: '90px' }}>
                        <div style={{
                            position: 'relative', aspectRatio: '16/9', borderRadius: '20px',
                            overflow: 'hidden', boxShadow: '0 15px 35px -10px rgba(0,0,0,0.2)',
                            background: '#000'
                        }}>
                            {book.video_id ? (
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${book.video_id}?autoplay=0&rel=0`}
                                    title={title}
                                    style={{ width: '100%', height: '100%', border: 'none' }}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <img
                                    src={thumbnail}
                                    alt={title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    </section>

                    {/* Section 2: Author Bio */}
                    {authorInfo && (
                        <section id="author" style={{ marginBottom: '40px', scrollMarginTop: '90px' }}>
                            <div style={{
                                background: 'white', borderRadius: '18px', padding: '24px',
                                border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                                display: 'flex', gap: '20px', alignItems: 'flex-start'
                            }}>
                                <div style={{
                                    width: '56px', height: '56px', borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #00796b, #004d40)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', flexShrink: 0
                                }}>
                                    <Users size={26} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 6px 0' }}>
                                        {language === 'zh' ? (authorInfo.name_zh || authorInfo.name) : (authorInfo.name_en || authorInfo.name)}
                                    </h3>
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                        {language === 'zh' ? (authorInfo.bio_zh || authorInfo.bio) : (authorInfo.bio_en || authorInfo.bio)}
                                    </p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Section 3: Core Insight */}
                    <section id="insight" style={{ marginBottom: '40px', scrollMarginTop: '90px' }}>
                        <div style={{
                            background: 'white', borderRadius: '20px', padding: '32px',
                            border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)'
                        }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px 0' }}>
                                💡 {language === 'zh' ? '精華導讀與核心洞察' : 'Core Insights & Summary'}
                            </h2>
                            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>
                                {description}
                            </p>
                        </div>
                    </section>

                    {/* Section 4: Cross-Universe Synapses (🌌 跨星系共鳴) */}
                    <section id="synapses" style={{ marginBottom: '40px', scrollMarginTop: '90px' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)',
                            borderRadius: '20px',
                            padding: '30px',
                            border: '1px solid #ddd6fe',
                            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.08)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '20px' }}>🌌</span>
                                <h2 style={{ fontSize: '19px', fontWeight: '850', color: '#4c1d95', margin: 0 }}>
                                    {t('crossUniverseSynapses')}
                                </h2>
                            </div>
                            <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 20px 0' }}>
                                {language === 'zh'
                                    ? '跨越領域邊界的知識共振！本書的核心概念與以下知識星域深度連結：'
                                    : 'Cross-domain knowledge resonance! Connect insights from this book to our cosmic study realms:'}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
                                {crossSynapses.map((item, idx) => {
                                    const realm = item.realm;
                                    if (!realm) return null;

                                    return (
                                        <div key={idx} style={{
                                            background: 'white',
                                            borderRadius: '14px',
                                            padding: '18px',
                                            border: '1px solid rgba(139, 92, 246, 0.2)',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{
                                                        fontSize: '11px',
                                                        fontWeight: '800',
                                                        color: realm.color,
                                                        background: realm.accentBg,
                                                        padding: '2px 8px',
                                                        borderRadius: '6px'
                                                    }}>
                                                        {realm.badge}
                                                    </span>
                                                    <span style={{ fontSize: '10px', color: '#16a34a', fontWeight: '750' }}>+35 EXP</span>
                                                </div>
                                                <h4 style={{ fontSize: '14px', fontWeight: '750', color: '#1e293b', margin: '0 0 6px 0' }}>
                                                    {language === 'zh' ? realm.name.zh : realm.name.en}
                                                </h4>
                                                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                                                    {language === 'zh' ? item.reason.zh : item.reason.en}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => handleVisitRealm(realm)}
                                                style={{
                                                    padding: '8px 12px',
                                                    borderRadius: '8px',
                                                    border: 'none',
                                                    background: realm.gradient,
                                                    color: 'white',
                                                    fontWeight: '700',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '6px'
                                                }}
                                            >
                                                <span>{language === 'zh' ? '前往星域探索' : 'Explore Realm'}</span>
                                                <ArrowUpRight size={14} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Section 5: Scholar Notes (📝 研讀筆記與書摘) */}
                    <section id="notes" style={{ marginBottom: '40px', scrollMarginTop: '90px' }}>
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '28px',
                            border: '1px solid var(--border-light)',
                            boxShadow: 'var(--card-shadow)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Edit3 size={18} color="var(--primary)" />
                                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                                        {t('scholarNotes')}
                                    </h3>
                                </div>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                    {language === 'zh' ? '記錄首次筆記獲取 +20 EXP' : '+20 EXP on first note'}
                                </span>
                            </div>

                            <textarea
                                value={noteContent}
                                onChange={e => setNoteContent(e.target.value)}
                                placeholder={t('writeNotesPlaceholder')}
                                style={{
                                    width: '100%',
                                    minHeight: '110px',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    fontSize: '14px',
                                    lineHeight: 1.6,
                                    outline: 'none',
                                    color: 'var(--text)',
                                    resize: 'vertical',
                                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)',
                                    marginBottom: '12px'
                                }}
                            />

                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
                                {noteSavedFeedback && (
                                    <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '750', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Check size={14} />
                                        <span>{t('noteSaved')}</span>
                                    </span>
                                )}
                                <button
                                    onClick={handleSaveNote}
                                    style={{
                                        padding: '9px 18px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                                        color: 'white',
                                        fontWeight: '700',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        boxShadow: '0 2px 8px rgba(45, 102, 72, 0.2)'
                                    }}
                                >
                                    <Save size={15} />
                                    <span>{t('saveNote')}</span>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: Quotes */}
                    {book.quotes && book.quotes.length > 0 && (
                        <section id="quotes" style={{ marginBottom: '40px', scrollMarginTop: '90px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px 0' }}>
                                📜 {language === 'zh' ? '大師經典名言' : 'Master Quotes'}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {book.quotes.map((quote, i) => (
                                    <blockquote key={i} style={{
                                        margin: 0, padding: '16px 20px', borderRadius: '12px',
                                        background: 'var(--tag-bg)', borderLeft: '4px solid var(--primary)',
                                        color: 'var(--primary-dark)', fontSize: '14px', fontWeight: '650', lineHeight: 1.6
                                    }}>
                                        {language === 'zh' ? `「${quote}」` : `"${quote}"`}
                                    </blockquote>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Section 7: Outline */}
                    {book.outline && book.outline.length > 0 && (
                        <section id="outline" style={{ marginBottom: '40px', scrollMarginTop: '90px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px 0' }}>
                                📑 {language === 'zh' ? '全書章節大綱' : 'Book Outline'}
                            </h2>
                            <div style={{
                                background: 'white', borderRadius: '18px', padding: '24px',
                                border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                                display: 'flex', flexDirection: 'column', gap: '12px'
                            }}>
                                {book.outline.map((ch, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <span style={{
                                            width: '24px', height: '24px', borderRadius: '6px',
                                            background: 'var(--tag-bg)', color: 'var(--primary)',
                                            fontSize: '12px', fontWeight: '800', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                        }}>
                                            {i + 1}
                                        </span>
                                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                            {ch}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Section 8: Purchase / Library Pages */}
                    <section id="purchase" style={{ marginBottom: '32px', scrollMarginTop: '90px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', margin: '0 0 16px 0' }}>
                            🛍️ {language === 'zh' ? '書籍頁面' : 'Book Pages'}
                        </h2>
                        <div style={{
                            background: 'white', borderRadius: '18px', padding: '24px',
                            border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                            display: 'flex', gap: '12px', flexWrap: 'wrap'
                        }}>
                            <a
                                href={booksUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 20px', borderRadius: '10px', background: 'var(--accent)', color: 'white',
                                    textDecoration: 'none', fontSize: '13px', fontWeight: '750'
                                }}
                            >
                                <ShoppingBag size={15} />
                                <span>博客來 書頁</span>
                            </a>
                            <a
                                href={language === 'zh' ? koboTwUrl : koboUsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    padding: '10px 20px', borderRadius: '10px', background: '#330066', color: 'white',
                                    textDecoration: 'none', fontSize: '13px', fontWeight: '750'
                                }}
                            >
                                <Globe size={15} />
                                <span>KOBO 書頁</span>
                            </a>
                        </div>
                    </section>
                </article>
            </div>

            <BottomNavbar />
        </div>
    );
}
