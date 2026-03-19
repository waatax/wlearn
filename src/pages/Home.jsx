import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import BookCard from '../components/BookCard';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu } from 'lucide-react';

export default function Home() {
    const { language, t, toggleLanguage } = useLanguage();
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

    // Close sidebar on navigation or filter change on mobile
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

        // Special sorting for playlists (like VS series)
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
                                    {language === 'zh' ? '顯示' : 'Showing'} <span style={{ color: 'var(--primary)' }}>{filteredBooks.length}</span> / {books.length} {language === 'zh' ? '本書籍' : 'books'}
                                </span>
                            )}
                        </span>
                    </div>
                    <button
                        onClick={toggleLanguage}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                            borderRadius: '20px', border: '1px solid #e0d8cc', background: 'white',
                            cursor: 'pointer', fontSize: '13px', fontWeight: '500', color: '#2d2a24',
                            transition: 'background 0.15s', flexShrink: 0,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#e0f2f1'}
                        onMouseLeave={e => e.currentTarget.style.background = 'white'}
                    >
                        <Globe size={15} />
                        <span style={{ letterSpacing: '0.05em' }}>{language === 'zh' ? 'EN' : '中文'}</span>
                    </button>
                </div>

                {/* Book grid */}
                <div style={{ padding: '32px', flex: 1 }}>
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
        </div>
    );
}
