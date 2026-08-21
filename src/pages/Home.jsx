import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import BookCard from '../components/BookCard';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';
import { COSMIC_REALMS } from '../lib/gamification';
import {
    Globe,
    Menu,
    Sparkles,
    Compass,
    Gift,
    ArrowRight,
    Flame,
    Layers,
    BookMarked,
    Scroll
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
    const { language, t, toggleLanguage } = useLanguage();
    const { state, openModal, claimDailyCapsule } = useGamification();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ search: '', tags: [], playlist: '' });
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'books.json')
            .then(r => r.json())
            .then(data => { setBooks(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredBooks = useMemo(() => {
        const filtered = books.filter(book => {
            if (filters.search) {
                const q = filters.search.toLowerCase();
                const matchTitle = (book.title_cn || '').toLowerCase().includes(q) ||
                    (book.title_en || '').toLowerCase().includes(q);
                const matchAuthor = (book.author || '').toLowerCase().includes(q) ||
                    (book.author_en || '').toLowerCase().includes(q);
                const matchTags = (book.tags || []).some(t => t.toLowerCase().includes(q));
                if (!matchTitle && !matchAuthor && !matchTags) return false;
            }
            if (filters.tags.length > 0) {
                const bookTags = book.tags || [];
                if (!filters.tags.some(ft => bookTags.includes(ft))) return false;
            }
            if (filters.playlist && book.playlist !== filters.playlist) return false;
            return true;
        });

        if (filters.playlist) {
            return filtered.sort((a, b) => {
                const codeA = a.code || '';
                const codeB = b.code || '';
                return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
            });
        }

        return filtered;
    }, [books, filters]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
            <Sidebar
                books={books}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Top bar */}
                <div className="top-bar" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 32px', borderBottom: '1px solid var(--border-light)',
                    background: 'var(--sidebar-bg)', backdropFilter: 'blur(var(--sidebar-blur))',
                    position: 'sticky', top: 0, zIndex: 10,
                    WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                    gap: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Hamburger menu for mobile */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="開啟選單"
                        >
                            <Menu size={22} color="#2d2a24" />
                        </button>

                        <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: '600', letterSpacing: '-0.01em' }}>
                            {loading ? (language === 'zh' ? '載入中...' : 'Loading...') : (
                                <span>
                                    {language === 'zh' ? '顯示' : 'Showing'} <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{filteredBooks.length}</span> / {books.length} {language === 'zh' ? '本書籍' : 'books'}
                                </span>
                            )}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <GamificationHUD />
                        <button
                            onClick={toggleLanguage}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                                borderRadius: '12px', border: '1px solid var(--border)', background: 'white',
                                cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)',
                                fontWeight: '600', transition: 'all var(--transition-fast)'
                            }}
                        >
                            <Globe size={15} />
                            <span>{language === 'zh' ? 'EN' : '繁中'}</span>
                        </button>
                    </div>
                </div>

                {/* Hero Gamification & Multiverse Banner (Only when not deeply filtering) */}
                {!filters.search && filters.tags.length === 0 && !filters.playlist && (
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
                                    <span>GAMIFIED MULTIVERSE LEARNING NEXUS</span>
                                </div>
                                <h1 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0', lineHeight: 1.25 }}>
                                    {language === 'zh' ? '探索知識宇宙 · 跨界多維修行' : 'Explore the Multiverse · Master Modern Polymathy'}
                                </h1>
                                <p style={{ fontSize: '13px', color: '#d1fae5', margin: '0 0 20px 0', lineHeight: 1.5 }}>
                                    {language === 'zh'
                                        ? '涵蓋 700+ 精選書籍影音導讀，並全面串聯聖經靈修、軟體架構、文史哲學、越南與印尼語言學習 6 大星系。每一步研讀皆可累積 EXP 與學者成就！'
                                        : 'Traverse 700+ book summaries and seamlessly connect to Biblical Wisdom, Software Architecture, Chinese Classics, and ASEAN Languages.'}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
                                        onClick={() => openModal('roulette')}
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
                                        <Compass size={15} />
                                        <span>{t('destinyWheel')}</span>
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

                {/* Book grid */}
                <div style={{ padding: '24px 32px 64px 32px', flex: 1 }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '120px 20px', color: 'var(--text-muted)' }}>
                            <div className="shimmer" style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '0 auto 16px', background: '#e0d8cc' }} />
                            <div style={{ fontSize: '16px', fontWeight: '500' }}>{language === 'zh' ? '載入書籍中...' : 'Loading books...'}</div>
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '120px 20px', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '18px', fontWeight: '500' }}>{t('noBooks')}</div>
                            <div style={{ fontSize: '14px', marginTop: '8px' }}>{language === 'zh' ? '嘗試更換搜尋關鍵字或標籤' : 'Try different keywords or tags'}</div>
                        </div>
                    ) : (
                        <div className="book-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                            gap: '24px',
                        }}>
                            {filteredBooks.map((book, i) => (
                                <BookCard key={book.id} book={book} index={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <BottomNavbar />
        </div>
    );
}
