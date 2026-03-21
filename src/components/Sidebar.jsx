import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ChevronDown, ChevronRight, X, Flame, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Sidebar({ books, filters, onFiltersChange, isOpen, onClose }) {
    const { language, t, toggleLanguage, translateTag } = useLanguage();
    const [tagsOpen, setTagsOpen] = useState(true);
    const [playlistsOpen, setPlaylistsOpen] = useState(true);

    const allTags = [...new Set((books || []).flatMap(b => b.tags || []))].sort();
    const allPlaylists = [...new Set((books || []).map(b => b.playlist).filter(Boolean))].sort((a, b) => a.localeCompare(b));

    const toggleTag = (tag) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag];
        onFiltersChange({ ...filters, tags: newTags });
    };

    const togglePlaylist = (playlist) => {
        onFiltersChange({ ...filters, playlist: filters.playlist === playlist ? '' : playlist });
    };

    const clearAll = () => onFiltersChange({ search: '', tags: [], playlist: '' });
    const hasFilters = filters.search || filters.tags.length > 0 || filters.playlist;

    return (
        <>
            {/* Mobile overlay backdrop */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            <aside className={`sidebar-desktop ${isOpen ? 'open' : ''}`} style={{
                width: '260px',
                flexShrink: 0,
                background: 'var(--sidebar-bg)',
                backdropFilter: 'blur(var(--sidebar-blur))',
                WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                height: '100dvh', /* Use dynamic viewport height for mobile */
                maxHeight: '100vh', 
                position: 'sticky',
                top: 0,
                bottom: 0, /* Help fixed positioning stretch properly */
                zIndex: 90,
                overflowY: 'auto',
                overflowX: 'hidden',
                overscrollBehavior: 'contain', /* Prevent body scroll when scrolling menu */
                WebkitOverflowScrolling: 'touch', /* Smooth scrolling for iOS Safari */
                padding: '24px 0',
                transition: 'all var(--transition-med)',
            }}>
                {/* Logo + mobile close */}
                <div style={{ padding: '0 24px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--text)' }}>
                        <div style={{
                            width: '40px', height: '40px', background: 'var(--primary)', 
                            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 12px var(--primary-glow)'
                        }}>
                            <BookOpen size={20} color="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: '800', fontSize: '18px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{t('siteTitle')}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: '500' }}>
                                {books ? (language === 'zh' ? `發現 ${books.length} 本精選書籍` : `Discover ${books.length} curated books`) : t('siteSubtitle')}
                            </div>
                        </div>
                    </Link>
                    {/* Close button for mobile */}
                    <button
                        className="mobile-menu-btn"
                        onClick={onClose}
                        style={{ flexShrink: 0 }}
                    >
                        <X size={20} color="#2d2a24" />
                    </button>
                </div>

                {/* Popular link */}
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link to="/popular" onClick={onClose} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                        borderRadius: '12px', textDecoration: 'none',
                        background: 'linear-gradient(135deg, #fff9f0, #fff3e0)',
                        border: '1px solid #ffe0b2',
                        color: '#e65100', fontWeight: '650', fontSize: '14px',
                        transition: 'all var(--transition-fast)',
                    }}>
                        <Flame size={18} color="#ef6c00" />
                        {language === 'zh' ? '熱門書籍' : 'Popular Books'}
                        <span style={{ marginLeft: 'auto', fontSize: '10px', background: '#ffe0b2', padding: '2px 6px', borderRadius: '4px', color: '#e65100', fontWeight: '800' }}>GO</span>
                    </Link>
                    <Link to="/authors" onClick={onClose} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px',
                        borderRadius: '12px', textDecoration: 'none',
                        background: 'linear-gradient(135deg, #f0f7f7, #e0f2f1)',
                        border: '1px solid #b2dfdb',
                        color: '#00695c', fontWeight: '650', fontSize: '14px',
                        transition: 'all var(--transition-fast)',
                    }}>
                        <Users size={18} color="#00796b" />
                        {t('authorsList')}
                        <span style={{ marginLeft: 'auto', fontSize: '10px', background: '#b2dfdb', padding: '2px 6px', borderRadius: '4px', color: '#00695c', fontWeight: '800' }}>TOP</span>
                    </Link>
                </div>
                <div style={{ padding: '8px 20px 24px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            value={filters.search}
                            onChange={e => onFiltersChange({ ...filters, search: e.target.value })}
                            placeholder={t('search')}
                            style={{
                                width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px',
                                border: '1px solid var(--border)', background: 'white', fontSize: '14px',
                                outline: 'none', color: 'var(--text)', transition: 'all var(--transition-fast)',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                            }}
                            onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 0 4px var(--primary-glow)'; }}
                            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.02)'; }}
                        />
                        {filters.search && (
                            <button onClick={() => onFiltersChange({ ...filters, search: '' })}
                                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <X size={14} color="#888" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Clear filters */}
                {hasFilters && (
                    <div style={{ padding: '8px 16px' }}>
                        <button onClick={clearAll} style={{
                            fontSize: '12px', color: '#0097a7', background: 'none', border: 'none',
                            cursor: 'pointer', padding: 0, textDecoration: 'underline',
                        }}>
                            {language === 'zh' ? '清除所有篩選' : 'Clear all filters'}
                        </button>
                    </div>
                )}

                {/* Tags section */}
                <div style={{ borderTop: '1px solid var(--border-light)' }}>
                    <button
                        onClick={() => setTagsOpen(o => !o)}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em',
                        }}
                    >
                        {t('tags')}
                        {tagsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {tagsOpen && (
                        <div style={{ padding: '4px 16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {allTags.map(tag => {
                                const active = filters.tags.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            padding: '5px 8px', borderRadius: '6px', border: 'none',
                                            background: active ? '#e0f2f1' : 'transparent',
                                            color: active ? '#00796b' : '#2d2a24',
                                            cursor: 'pointer', fontSize: '13px', textAlign: 'left',
                                            fontWeight: active ? '600' : '400',
                                            transition: 'background 0.1s',
                                        }}
                                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#e8f0ee'; }}
                                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                                    >
                                        {translateTag(tag)}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Playlists section */}
                <div>
                    <button
                        onClick={() => setPlaylistsOpen(o => !o)}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '12px', fontWeight: '700', color: '#6b6459', textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}
                    >
                        {t('playlists')}
                        {playlistsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {playlistsOpen && (
                        <div style={{ padding: '4px 16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <button
                                onClick={() => onFiltersChange({ ...filters, playlist: '' })}
                                style={{
                                    display: 'flex', alignItems: 'center', padding: '5px 8px', borderRadius: '6px',
                                    border: 'none', background: !filters.playlist ? '#e0f2f1' : 'transparent',
                                    color: !filters.playlist ? '#00796b' : '#2d2a24',
                                    cursor: 'pointer', fontSize: '13px', textAlign: 'left',
                                    fontWeight: !filters.playlist ? '600' : '400',
                                }}
                            >
                                {t('all')}
                            </button>
                            {allPlaylists.map(pl => {
                                const active = filters.playlist === pl;
                                return (
                                    <button
                                        key={pl}
                                        onClick={() => togglePlaylist(pl)}
                                        style={{
                                            display: 'flex', alignItems: 'center', padding: '5px 8px', borderRadius: '6px',
                                            border: 'none', background: active ? '#e0f2f1' : 'transparent',
                                            color: active ? '#00796b' : '#2d2a24',
                                            cursor: 'pointer', fontSize: '12px', textAlign: 'left',
                                            fontWeight: active ? '600' : '400',
                                            lineHeight: '1.3',
                                        }}
                                        onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#e8f0ee'; }}
                                        onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                                    >
                                        {pl}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}
