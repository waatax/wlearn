import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import BookCard from '../components/BookCard';
import BookListItem from '../components/BookListItem';
import Pagination from '../components/Pagination';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import ReadingComfortControls from '../components/ReadingComfortControls';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';
import {
    Globe,
    Menu,
    Sparkles,
    Gift,
    ArrowRight,
    Search,
    X,
    LayoutGrid,
    List,
    ArrowUpDown,
    CheckCircle2,
    Bookmark,
    ArrowUp,
    RotateCcw,
    BookOpen,
    Brain,
    Target,
    Zap,
    ChevronDown,
    ChevronUp,
    GraduationCap,
    Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    const { language, t, toggleLanguage } = useLanguage();
    const { state, openModal, claimDailyCapsule } = useGamification();
    const [books, setBooks] = useState([]);
    const [ytStats, setYtStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ search: '', tags: [], playlist: '', status: 'all' });
    const [sortBy, setSortBy] = useState('code'); // 'code', 'views', 'title', 'author'
    const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(24);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [showGuideDetails, setShowGuideDetails] = useState(false);

    // Fetch books & YouTube stats
    useEffect(() => {
        Promise.all([
            fetch(import.meta.env.BASE_URL + 'books.json').then(r => r.json()),
            fetch(import.meta.env.BASE_URL + 'youtube_stats.json').then(r => r.json()).catch(() => [])
        ])
            .then(([booksData, statsData]) => {
                setBooks(booksData || []);

                // Build lookup map for YouTube stats by video_id or book id
                const statsMap = {};
                if (Array.isArray(statsData)) {
                    statsData.forEach(item => {
                        if (item.video_id) statsMap[item.video_id] = item;
                        if (item.id) statsMap[item.id] = item;
                    });
                }
                setYtStats(statsMap);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // Scroll listener for Back to Top
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleFiltersChange = useCallback((newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate reading stats counts
    const statsCount = useMemo(() => {
        const readSet = new Set(state.readBooks || []);
        const bookmarkSet = new Set(state.bookmarkedBooks || []);

        const readCount = books.filter(b => readSet.has(b.id)).length;
        const bookmarkCount = books.filter(b => bookmarkSet.has(b.id)).length;
        const unreadCount = Math.max(0, books.length - readCount);

        return {
            total: books.length,
            read: readCount,
            unread: unreadCount,
            bookmarked: bookmarkCount
        };
    }, [books, state.readBooks, state.bookmarkedBooks]);

    // Filter and sort books
    const filteredBooks = useMemo(() => {
        const readSet = new Set(state.readBooks || []);
        const bookmarkSet = new Set(state.bookmarkedBooks || []);

        const filtered = books.filter(book => {
            // Status filter
            if (filters.status === 'read' && !readSet.has(book.id)) return false;
            if (filters.status === 'unread' && readSet.has(book.id)) return false;
            if (filters.status === 'bookmarked' && !bookmarkSet.has(book.id)) return false;

            // Search query
            if (filters.search) {
                const q = filters.search.toLowerCase().trim();
                const matchTitle = (book.title_cn || '').toLowerCase().includes(q) ||
                    (book.title_en || '').toLowerCase().includes(q);
                const matchAuthor = (book.author || '').toLowerCase().includes(q) ||
                    (book.author_en || '').toLowerCase().includes(q);
                const matchTags = (book.tags || []).some(t => t.toLowerCase().includes(q));
                const matchDesc = (book.description || '').toLowerCase().includes(q);
                const matchCode = (book.code || '').toLowerCase().includes(q);

                if (!matchTitle && !matchAuthor && !matchTags && !matchDesc && !matchCode) {
                    return false;
                }
            }

            // Tags filter
            if (filters.tags && filters.tags.length > 0) {
                const bookTags = book.tags || [];
                if (!filters.tags.some(ft => bookTags.includes(ft))) return false;
            }

            // Playlist filter
            if (filters.playlist && book.playlist !== filters.playlist) return false;

            return true;
        });

        // Sorting
        return filtered.sort((a, b) => {
            if (sortBy === 'views') {
                const viewsA = (ytStats[a.video_id]?.total_views) || (ytStats[a.id]?.total_views) || 0;
                const viewsB = (ytStats[b.video_id]?.total_views) || (ytStats[b.id]?.total_views) || 0;
                return viewsB - viewsA;
            }
            if (sortBy === 'title') {
                const titleA = language === 'zh' ? (a.title_cn || a.title_en || '') : (a.title_en || a.title_cn || '');
                const titleB = language === 'zh' ? (b.title_cn || b.title_en || '') : (b.title_en || b.title_cn || '');
                return titleA.localeCompare(titleB, 'zh');
            }
            if (sortBy === 'author') {
                const authorA = language === 'zh' ? (a.author || a.author_en || '') : (a.author_en || a.author || '');
                const authorB = language === 'zh' ? (b.author || b.author_en || '') : (b.author_en || b.author || '');
                return authorA.localeCompare(authorB, 'zh');
            }
            // Default: by code (e.g. S1-01, S1-02...)
            const codeA = a.code || '';
            const codeB = b.code || '';
            return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
        });
    }, [books, filters, sortBy, ytStats, language, state.readBooks, state.bookmarkedBooks]);

    // Paginated subset
    const totalPages = Math.ceil(filteredBooks.length / pageSize);
    const paginatedBooks = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredBooks.slice(start, start + pageSize);
    }, [filteredBooks, currentPage, pageSize]);

    const isDeepFiltering = Boolean(filters.search || filters.tags.length > 0 || filters.playlist || filters.status !== 'all');

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
            <Sidebar
                books={books}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Top Sticky Bar */}
                <header className="top-bar" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 28px',
                    borderBottom: '1px solid var(--border-light)',
                    background: 'var(--sidebar-bg)',
                    backdropFilter: 'blur(var(--sidebar-blur))',
                    WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                    position: 'sticky',
                    top: 0,
                    zIndex: 20,
                    gap: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                        {/* Hamburger menu for mobile */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="開啟導覽選單"
                            style={{
                                background: 'white',
                                border: '1px solid var(--border)',
                                borderRadius: '10px',
                                width: '38px',
                                height: '38px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <Menu size={20} color="#1f2923" />
                        </button>

                        {/* Quick Search in Top Bar */}
                        <div style={{
                            position: 'relative',
                            maxWidth: '420px',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Search size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                value={filters.search}
                                onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                                placeholder={language === 'zh' ? '快速檢索 597 本說書、作者或標籤...' : 'Search 597 books, authors, or tags...'}
                                style={{
                                    width: '100%',
                                    padding: '8px 32px 8px 36px',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border)',
                                    background: 'white',
                                    fontSize: '13px',
                                    fontWeight: '500',
                                    color: 'var(--text)',
                                    outline: 'none',
                                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                                    transition: 'border-color 0.2s ease'
                                }}
                            />
                            {filters.search && (
                                <button
                                    onClick={() => handleFiltersChange({ ...filters, search: '' })}
                                    style={{
                                        position: 'absolute',
                                        right: '8px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '4px',
                                        color: 'var(--text-muted)'
                                    }}
                                    title="清除搜尋"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right utilities */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <GamificationHUD />
                        <ReadingComfortControls compact />

                        {/* Language Switcher */}
                        <button
                            onClick={toggleLanguage}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 14px',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '13px',
                                color: 'var(--text-secondary)',
                                fontWeight: '700',
                                transition: 'all var(--transition-fast)'
                            }}
                        >
                            <Globe size={15} />
                            <span>{language === 'zh' ? 'EN' : '繁中'}</span>
                        </button>
                    </div>
                </header>

                {/* Hero Banner (Shown when not filtering) */}
                {!isDeepFiltering && (
                    <div style={{ padding: '24px 32px 0 32px' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #1b452e 0%, #2d6648 60%, #15803d 100%)',
                            borderRadius: '24px',
                            padding: '32px 36px',
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 15px 35px -10px rgba(27, 69, 46, 0.4)',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '24px'
                        }}>
                            <div style={{ maxWidth: '650px', position: 'relative', zIndex: 2 }}>
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    backdropFilter: 'blur(8px)',
                                    padding: '4px 12px',
                                    borderRadius: '100px',
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    color: '#fef08a',
                                    marginBottom: '12px'
                                }}>
                                    <Sparkles size={13} color="#fef08a" />
                                    <span>WELEARN MULTIVERSE NEXUS 2.0</span>
                                </div>
                                <h1 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                                    {language === 'zh' ? '探索知識宇宙 · 跨界多維修行' : 'Explore the Multiverse · Master Modern Polymathy'}
                                </h1>
                                <p style={{ fontSize: '13px', color: '#d1fae5', margin: '0 0 20px 0', lineHeight: 1.6 }}>
                                    {language === 'zh'
                                        ? `典藏 597 本經典說書影音精華，全面串聯聖經靈修、系統架構、文史哲學、越南與印尼語言學習 6 大星域。目前已研讀 ${statsCount.read} 本，持續修行獲取學者成就！`
                                        : `Traverse 597 curated book summaries and connect seamlessly to Biblical Wisdom, Software Architecture, Chinese Classics, and ASEAN Languages.`}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                    <Link
                                        to="/learning-science"
                                        style={{
                                            padding: '10px 18px',
                                            borderRadius: '12px',
                                            background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                                            color: '#5b21b6',
                                            fontWeight: '800',
                                            fontSize: '13px',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            border: '1px solid #c4b5fd'
                                        }}
                                    >
                                        <Brain size={15} color="#6d28d9" />
                                        <span>🧠 {language === 'zh' ? '學習科學與框架' : 'Science of Learning'}</span>
                                    </Link>

                                    <Link
                                        to="/universe"
                                        style={{
                                            padding: '10px 18px',
                                            borderRadius: '12px',
                                            background: '#fef08a',
                                            color: '#1b452e',
                                            fontWeight: '800',
                                            fontSize: '13px',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                        }}
                                    >
                                        <span>🌌 {t('universePortal')} (6 大星系)</span>
                                        <ArrowRight size={14} />
                                    </Link>

                                    <button
                                        onClick={() => openModal('random_discovery')}
                                        style={{
                                            padding: '10px 16px',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            background: 'rgba(255,255,255,0.12)',
                                            color: 'white',
                                            fontWeight: '750',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            backdropFilter: 'blur(8px)'
                                        }}
                                    >
                                        <Sparkles size={15} />
                                        <span>🌊 {language === 'zh' ? '滄海一粟' : 'A Drop in Ocean'}</span>
                                    </button>

                                    <button
                                        onClick={claimDailyCapsule}
                                        style={{
                                            padding: '10px 16px',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            background: 'rgba(255,255,255,0.12)',
                                            color: 'white',
                                            fontWeight: '750',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            backdropFilter: 'blur(8px)'
                                        }}
                                    >
                                        <Gift size={15} />
                                        <span>{t('wisdomCapsule')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <main style={{ padding: '24px 32px 64px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Scientific Reading Guide Banner */}
                    <div style={{
                        marginBottom: '24px',
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #311042 100%)',
                        borderRadius: '20px',
                        padding: '24px 28px',
                        color: 'white',
                        boxShadow: '0 12px 30px rgba(15, 23, 42, 0.25)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Background glow circle */}
                        <div style={{
                            position: 'absolute',
                            right: '-40px',
                            top: '-40px',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0) 70%)',
                            pointerEvents: 'none'
                        }} />

                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ maxWidth: '640px' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em', color: '#c4b5fd', marginBottom: '8px' }}>
                                    <Sparkles size={13} color="#a78bfa" />
                                    <span>{language === 'zh' ? '認知科學驅動 · 研讀方法論' : 'Cognitive Science Driven Reading Method'}</span>
                                </div>
                                <h2 style={{ fontSize: '20px', fontWeight: '850', margin: '0 0 6px 0', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span>🚀 {language === 'zh' ? '輸學合一 · 高效研讀 3 步躍遷指南' : 'The 3-Step Scientific Mastery Engine'}</span>
                                </h2>
                                <p style={{ fontSize: '13px', margin: 0, opacity: 0.85, lineHeight: 1.6, color: '#cbd5e1' }}>
                                    {language === 'zh' 
                                        ? '拒絕「看過就忘」的假勤奮！善用大腦雙重編碼、艾賓浩斯間隔提取與費曼輸出協議，將書本精華 100% 化為行動實踐能力。' 
                                        : 'Replace passive reading with active neural retrieval, dual-coding mental models, and Feynman action protocols.'}
                                </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setShowGuideDetails(!showGuideDetails)}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '9px 15px',
                                        borderRadius: '10px',
                                        background: showGuideDetails ? 'rgba(255, 255, 255, 0.22)' : 'rgba(255, 255, 255, 0.12)',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: '750',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <span>{showGuideDetails ? (language === 'zh' ? '收合效能對照表' : 'Hide Matrix') : (language === 'zh' ? '查看讀法效能對照表' : 'View Reading Matrix')}</span>
                                    {showGuideDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                <Link
                                    to="/learning-science"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '9px 16px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        boxShadow: '0 4px 14px rgba(168, 85, 247, 0.35)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}
                                >
                                    <Brain size={14} />
                                    <span>{language === 'zh' ? '探索學習科學中心' : 'Learning Science Hub'}</span>
                                    <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>

                        {/* 3 Steps Visual Flow */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '12px'
                        }}>
                            {/* Step 1 */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '14px',
                                padding: '14px 16px',
                                backdropFilter: 'blur(8px)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', fontSize: '11px', fontWeight: '900' }}>
                                        01
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#7dd3fc' }}>
                                        {language === 'zh' ? '課前錨定 · SQ3R 痛點' : 'Step 1: Anchor & SQ3R'}
                                    </div>
                                </div>
                                <p style={{ fontSize: '12px', margin: 0, color: '#e2e8f0', lineHeight: 1.5 }}>
                                    {language === 'zh' ? '開卷前先寫下 3 個最迫切的現實疑問，喚醒前額葉專注網絡，把被動翻頁變成精準打擊。' : 'Ask 3 core questions before reading to prime prefrontal attention networks.'}
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '14px',
                                padding: '14px 16px',
                                backdropFilter: 'blur(8px)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(251, 191, 36, 0.2)', border: '1px solid #fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', fontSize: '11px', fontWeight: '900' }}>
                                        02
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#fde047' }}>
                                        {language === 'zh' ? '雙重編碼 · 主動提取' : 'Step 2: Dual Coding & Retrieval'}
                                    </div>
                                </div>
                                <p style={{ fontSize: '12px', margin: 0, color: '#e2e8f0', lineHeight: 1.5 }}>
                                    {language === 'zh' ? '不劃無效重點！將文字概念轉換為視覺節點與脈絡，合上書本在腦中主動檢索結構。' : 'Encode words into visual concept maps and actively retrieve structural insights.'}
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '14px',
                                padding: '14px 16px',
                                backdropFilter: 'blur(8px)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid #34d178', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d178', fontSize: '11px', fontWeight: '900' }}>
                                        03
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#86efac' }}>
                                        {language === 'zh' ? '費曼輸出 · 7天行動協議' : 'Step 3: Feynman & Action'}
                                    </div>
                                </div>
                                <p style={{ fontSize: '12px', margin: 0, color: '#e2e8f0', lineHeight: 1.5 }}>
                                    {language === 'zh' ? '以教代學！在下方研讀筆記記下白話解釋，並立下 1 個可在本週執行的微習慣協議。' : 'Teach to master. Formulate a 7-day action protocol and micro-habit to lock gains.'}
                                </p>
                            </div>
                        </div>

                        {/* Collapsible Comparison Table */}
                        {showGuideDetails && (
                            <div style={{
                                marginTop: '18px',
                                paddingTop: '18px',
                                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
                                animation: 'fadeInUp 0.3s ease'
                            }}>
                                <div style={{ fontSize: '13px', fontWeight: '800', color: '#f8fafc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>📊 {language === 'zh' ? '兩種研讀範式效能對照矩陣' : 'Comparison Matrix: Intuitive vs. Scientific Reading'}</span>
                                </div>
                                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left', minWidth: '580px' }}>
                                        <thead>
                                            <tr style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#94a3b8' }}>
                                                <th style={{ padding: '8px 12px', fontWeight: '750' }}>{language === 'zh' ? '評估維度' : 'Dimension'}</th>
                                                <th style={{ padding: '8px 12px', fontWeight: '750', color: '#f87171' }}>{language === 'zh' ? '直覺閱讀 (直覺傳統)' : 'Intuitive Reading'}</th>
                                                <th style={{ padding: '8px 12px', fontWeight: '750', color: '#4ade80' }}>{language === 'zh' ? '科學研讀 (輸學合一)' : 'Scientific Reading'}</th>
                                                <th style={{ padding: '8px 12px', fontWeight: '750' }}>{language === 'zh' ? '30天留存率' : '30-Day Retention'}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                                <td style={{ padding: '8px 12px', fontWeight: '700', color: '#cbd5e1' }}>{language === 'zh' ? '心智狀態' : 'Mindset'}</td>
                                                <td style={{ padding: '8px 12px', color: '#cbd5e1' }}>{language === 'zh' ? '被動接收、逐字閱讀' : 'Passive reception, word-by-word'}</td>
                                                <td style={{ padding: '8px 12px', color: '#86efac', fontWeight: '600' }}>{language === 'zh' ? '問題導向、預測提問、前額葉啟用' : 'Problem-driven, hypothesis testing'}</td>
                                                <td style={{ padding: '8px 12px', color: '#f87171' }}>5% vs <strong style={{ color: '#4ade80' }}>50%+</strong></td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                                <td style={{ padding: '8px 12px', fontWeight: '700', color: '#cbd5e1' }}>{language === 'zh' ? '標記與筆記' : 'Notes Strategy'}</td>
                                                <td style={{ padding: '8px 12px', color: '#cbd5e1' }}>{language === 'zh' ? '大量劃螢光筆、抄寫佳句' : 'Highlighting text, copying quotes'}</td>
                                                <td style={{ padding: '8px 12px', color: '#86efac', fontWeight: '600' }}>{language === 'zh' ? '雙重編碼視覺圖譜、白話轉譯' : 'Dual-coding concept graphs'}</td>
                                                <td style={{ padding: '8px 12px', color: '#f87171' }}>10% vs <strong style={{ color: '#4ade80' }}>75%+</strong></td>
                                            </tr>
                                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                                <td style={{ padding: '8px 12px', fontWeight: '700', color: '#cbd5e1' }}>{language === 'zh' ? '記憶複習' : 'Spaced Review'}</td>
                                                <td style={{ padding: '8px 12px', color: '#cbd5e1' }}>{language === 'zh' ? '重複翻閱同一段（虛假熟悉感）' : 'Rereading (illusion of competence)'}</td>
                                                <td style={{ padding: '8px 12px', color: '#86efac', fontWeight: '600' }}>{language === 'zh' ? '艾賓浩斯間隔提取（Day 1, 3, 7, 15）' : 'Spaced active retrieval'}</td>
                                                <td style={{ padding: '8px 12px', color: '#f87171' }}>15% vs <strong style={{ color: '#4ade80' }}>85%+</strong></td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: '8px 12px', fontWeight: '700', color: '#cbd5e1' }}>{language === 'zh' ? '成果交付' : 'Outcome'}</td>
                                                <td style={{ padding: '8px 12px', color: '#cbd5e1' }}>{language === 'zh' ? '自我感動「我讀完了」但無法實踐' : 'Book finished, zero action'}</td>
                                                <td style={{ padding: '8px 12px', color: '#86efac', fontWeight: '600' }}>{language === 'zh' ? '產出費曼教學摘要 + 7天行為改變' : 'Feynman synthesis + 7-Day Protocol'}</td>
                                                <td style={{ padding: '8px 12px', color: '#f87171' }}>0 轉化 vs <strong style={{ color: '#4ade80' }}>落地融入工作生活</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Controls Bar: Status Pills, Sort, View Modes */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '14px',
                        marginBottom: '20px',
                        background: 'white',
                        padding: '12px 18px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        {/* Reading Status Filter Pills */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                            {[
                                { id: 'all', label: language === 'zh' ? '全部書籍' : 'All Books', count: statsCount.total, icon: BookOpen },
                                { id: 'unread', label: language === 'zh' ? '待研讀' : 'Unread', count: statsCount.unread, icon: null },
                                { id: 'read', label: language === 'zh' ? '已研讀' : 'Completed', count: statsCount.read, icon: CheckCircle2 },
                                { id: 'bookmarked', label: language === 'zh' ? '收藏清單' : 'Bookmarked', count: statsCount.bookmarked, icon: Bookmark },
                            ].map(tab => {
                                const isActive = filters.status === tab.id;
                                const IconComponent = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleFiltersChange({ ...filters, status: tab.id })}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                                            background: isActive ? 'var(--sidebar-active)' : 'transparent',
                                            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                            fontWeight: isActive ? '800' : '600',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            transition: 'all 0.15s ease'
                                        }}
                                    >
                                        {IconComponent && <IconComponent size={13} />}
                                        <span>{tab.label}</span>
                                        <span style={{
                                            fontSize: '10px',
                                            background: isActive ? 'var(--primary)' : '#f1f5f9',
                                            color: isActive ? 'white' : '#64748b',
                                            padding: '1px 6px',
                                            borderRadius: '10px',
                                            fontWeight: '800'
                                        }}>
                                            {tab.count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right: Sort dropdown & View switchers */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {/* Sort Selector */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <ArrowUpDown size={14} color="var(--text-muted)" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={{
                                        padding: '5px 8px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                        background: 'white',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'var(--text)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <option value="code">{language === 'zh' ? '季別編號 (預設)' : 'Season Code'}</option>
                                    <option value="views">{language === 'zh' ? '熱門觀看量' : 'Most Viewed'}</option>
                                    <option value="title">{language === 'zh' ? '書名字首 (A-Z)' : 'Title (A-Z)'}</option>
                                    <option value="author">{language === 'zh' ? '作者姓名' : 'Author'}</option>
                                </select>
                            </div>

                            {/* View Switcher: Grid vs List */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: '#f1f5f9',
                                padding: '3px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-light)'
                            }}>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    title={language === 'zh' ? '網格卡片視圖' : 'Grid View'}
                                    style={{
                                        padding: '5px 8px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: viewMode === 'grid' ? 'white' : 'transparent',
                                        color: viewMode === 'grid' ? 'var(--primary)' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        boxShadow: viewMode === 'grid' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    <LayoutGrid size={15} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    title={language === 'zh' ? '精簡列表視圖' : 'List View'}
                                    style={{
                                        padding: '5px 8px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        background: viewMode === 'list' ? 'white' : 'transparent',
                                        color: viewMode === 'list' ? 'var(--primary)' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                                    }}
                                >
                                    <List size={15} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active Filter Chips bar (if filtering) */}
                    {isDeepFiltering && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '8px',
                            marginBottom: '16px',
                            padding: '10px 14px',
                            background: '#f0fdf4',
                            borderRadius: '10px',
                            border: '1px solid #bbf7d0'
                        }}>
                            <span style={{ fontSize: '12px', fontWeight: '750', color: '#166534' }}>
                                {language === 'zh' ? '目前篩選：' : 'Active Filters:'}
                            </span>

                            {filters.search && (
                                <span style={{
                                    fontSize: '11px',
                                    background: 'white',
                                    color: '#166534',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    border: '1px solid #bbf7d0'
                                }}>
                                    <span>搜尋: "{filters.search}"</span>
                                    <button onClick={() => handleFiltersChange({ ...filters, search: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            {filters.playlist && (
                                <span style={{
                                    fontSize: '11px',
                                    background: 'white',
                                    color: '#166534',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    border: '1px solid #bbf7d0'
                                }}>
                                    <span>季別: {filters.playlist}</span>
                                    <button onClick={() => handleFiltersChange({ ...filters, playlist: '' })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                        <X size={12} />
                                    </button>
                                </span>
                            )}

                            {(filters.tags || []).map(tag => (
                                <span key={tag} style={{
                                    fontSize: '11px',
                                    background: 'white',
                                    color: '#166534',
                                    padding: '3px 8px',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    border: '1px solid #bbf7d0'
                                }}>
                                    <span>#{tag}</span>
                                    <button onClick={() => handleFiltersChange({ ...filters, tags: filters.tags.filter(t => t !== tag) })} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}

                            <button
                                onClick={() => handleFiltersChange({ search: '', tags: [], playlist: '', status: 'all' })}
                                style={{
                                    marginLeft: 'auto',
                                    fontSize: '11px',
                                    color: '#166534',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '750',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}
                            >
                                <RotateCcw size={12} />
                                <span>{language === 'zh' ? '重設所有條件' : 'Reset All'}</span>
                            </button>
                        </div>
                    )}

                    {/* Book Cards Grid / List Rendering */}
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '120px 20px', color: 'var(--text-muted)' }}>
                            <div className="shimmer" style={{ width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 16px', background: '#e0d8cc' }} />
                            <div style={{ fontSize: '16px', fontWeight: '700' }}>
                                {language === 'zh' ? '正在載入 597 本說書典藏...' : 'Loading 597 book summaries...'}
                            </div>
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--border-light)',
                            boxShadow: 'var(--card-shadow)'
                        }}>
                            <div style={{ fontSize: '36px', marginBottom: '12px' }}>📖</div>
                            <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 8px 0', color: 'var(--text)' }}>
                                {t('noBooks')}
                            </h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
                                {language === 'zh' ? '嘗試更換搜尋關鍵字、清除標籤或切換閱讀狀態' : 'Try different keywords, clear tags, or change status filter.'}
                            </p>
                            <button
                                onClick={() => handleFiltersChange({ search: '', tags: [], playlist: '', status: 'all' })}
                                style={{
                                    padding: '9px 18px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    fontWeight: '750',
                                    fontSize: '13px',
                                    cursor: 'pointer'
                                }}
                            >
                                {language === 'zh' ? '清除所有篩選' : 'Clear Filters'}
                            </button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="book-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '24px',
                        }}>
                            {paginatedBooks.map((book, i) => (
                                <BookCard key={book.id} book={book} index={i} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {paginatedBooks.map((book, i) => (
                                <BookListItem key={book.id} book={book} index={i} />
                            ))}
                        </div>
                    )}

                    {/* Pagination Controls */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(p) => {
                            setCurrentPage(p);
                            scrollToTop();
                        }}
                        pageSize={pageSize}
                        onPageSizeChange={(sz) => {
                            setPageSize(sz);
                            setCurrentPage(1);
                        }}
                        totalItems={filteredBooks.length}
                    />
                </main>
            </div>

            {/* Floating Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    title={language === 'zh' ? '回到頁首' : 'Back to Top'}
                    style={{
                        position: 'fixed',
                        bottom: '80px',
                        right: '28px',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 4px 16px rgba(45, 102, 72, 0.4)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99,
                        transition: 'all 0.2s ease',
                        animation: 'fadeInUp 0.3s ease both'
                    }}
                >
                    <ArrowUp size={20} />
                </button>
            )}

            <BottomNavbar />
        </div>
    );
}
