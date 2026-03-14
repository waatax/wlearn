import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ChevronDown, ChevronRight, X, Flame, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Sidebar({ books, filters, onFiltersChange, isOpen, onClose }) {
    const { t, translateTag } = useLanguage();
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
                width: '220px',
                flexShrink: 0,
                background: '#f0ebe0',
                borderRight: '1px solid #e0d8cc',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                position: 'sticky',
                top: 0,
                overflowY: 'auto',
                padding: '16px 0',
            }}>
                {/* Logo + mobile close */}
                <div style={{ padding: '0 16px 16px', borderBottom: '1px solid #e0d8cc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#2d2a24' }}>
                        <BookOpen size={22} color="#0097a7" />
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '15px', lineHeight: 1.2 }}>{t('siteTitle')}</div>
                            <div style={{ fontSize: '11px', color: '#888' }}>
                                {books ? `發現 ${books.length} 本精選書籍` : t('siteSubtitle')}
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
                <div style={{ padding: '8px 16px', borderBottom: '1px solid #e0d8cc' }}>
                    <Link to="/popular" onClick={onClose} style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px',
                        borderRadius: '10px', textDecoration: 'none',
                        background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
                        border: '1px solid #ffe0b2',
                        color: '#e65100', fontWeight: '600', fontSize: '14px',
                        transition: 'all 0.15s',
                    }}>
                        <Flame size={16} color="#ff8f00" />
                        熱門書籍
                        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#ff8f00' }}>Dashboard</span>
                    </Link>
                    <Link to="/authors" onClick={onClose} style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px',
                        borderRadius: '10px', textDecoration: 'none',
                        background: 'linear-gradient(135deg, #e0f2f1, #b2dfdb)',
                        border: '1px solid #b2dfdb',
                        color: '#00796b', fontWeight: '600', fontSize: '14px',
                        marginTop: '8px', transition: 'all 0.15s',
                    }}>
                        <Users size={16} color="#00796b" />
                        作者專區
                        <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#00796b' }}>Authors</span>
                    </Link>
                </div>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0d8cc' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                        <input
                            value={filters.search}
                            onChange={e => onFiltersChange({ ...filters, search: e.target.value })}
                            placeholder={t('search')}
                            style={{
                                width: '100%', padding: '8px 8px 8px 30px', borderRadius: '8px',
                                border: '1px solid #e0d8cc', background: 'white', fontSize: '13px',
                                outline: 'none', color: '#2d2a24',
                            }}
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
                            清除所有篩選
                        </button>
                    </div>
                )}

                {/* Tags section */}
                <div style={{ borderBottom: '1px solid #e0d8cc' }}>
                    <button
                        onClick={() => setTagsOpen(o => !o)}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '12px', fontWeight: '700', color: '#6b6459', textTransform: 'uppercase', letterSpacing: '0.05em',
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
