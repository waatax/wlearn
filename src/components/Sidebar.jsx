import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    BookOpen,
    Search,
    ChevronDown,
    ChevronRight,
    X,
    Flame,
    Users,
    Globe,
    Compass,
    Trophy,
    User,
    Layers,
    Scroll,
    BookMarked,
    Palmtree,
    Sparkles,
    ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';
import { COSMIC_REALMS } from '../lib/gamification';

export default function Sidebar({ books, filters, onFiltersChange, isOpen, onClose }) {
    const { language, t, translateTag } = useLanguage();
    const { state, trackExternalVisit } = useGamification();
    const location = useLocation();

    const [tagsOpen, setTagsOpen] = useState(false);
    const [playlistsOpen, setPlaylistsOpen] = useState(false);
    const [realmsOpen, setRealmsOpen] = useState(true);

    const allTags = [...new Set((books || []).flatMap(b => b.tags || []))].sort();
    const allPlaylists = [...new Set((books || []).map(b => b.playlist).filter(Boolean))].sort((a, b) => a.localeCompare(b));

    const toggleTag = (tag) => {
        const newTags = filters.tags.includes(tag)
            ? filters.tags.filter(t => t !== tag)
            : [...filters.tags, tag];
        onFiltersChange({ ...filters, tags: newTags });
        if (window.innerWidth <= 768 && onClose) onClose();
    };

    const togglePlaylist = (playlist) => {
        onFiltersChange({ ...filters, playlist: filters.playlist === playlist ? '' : playlist });
        if (window.innerWidth <= 768 && onClose) onClose();
    };

    const clearAll = () => {
        onFiltersChange({ search: '', tags: [], playlist: '' });
        if (window.innerWidth <= 768 && onClose) onClose();
    };
    const hasFilters = filters.search || filters.tags.length > 0 || filters.playlist;

    const handleExternalRealmClick = (realm) => {
        trackExternalVisit(realm.id);
        window.open(realm.url, '_blank', 'noopener,noreferrer');
        if (window.innerWidth <= 768 && onClose) onClose();
    };

    const isCurrentPath = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile overlay backdrop */}
            <div
                className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
            />

            <aside className={`sidebar-desktop ${isOpen ? 'open' : ''}`} style={{
                width: '270px',
                flexShrink: 0,
                background: 'var(--sidebar-bg)',
                backdropFilter: 'blur(var(--sidebar-blur))',
                WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                height: '100dvh',
                maxHeight: '100vh',
                position: 'sticky',
                top: 0,
                bottom: 0,
                zIndex: 90,
                overflowY: 'auto',
                overflowX: 'hidden',
                touchAction: 'pan-y',
                WebkitOverflowScrolling: 'touch',
                padding: '24px 0 80px 0',
                transition: 'all var(--transition-med)',
            }}>
                {/* Logo + mobile close */}
                <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link to="/" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'var(--text)' }}>
                        <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '22px',
                            boxShadow: '0 4px 12px rgba(45, 102, 72, 0.3)',
                            flexShrink: 0
                        }}>
                            🌌
                        </div>
                        <div>
                            <div style={{ fontWeight: '850', fontSize: '17px', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                                {t('siteTitle')}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', fontWeight: '600' }}>
                                {t('siteSubtitle')}
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

                {/* Primary Navigation Hub */}
                <div style={{ padding: '16px 16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {/* 0. Universe Portal (6 Realms) */}
                    <Link to="/universe" onClick={onClose} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                        borderRadius: '12px', textDecoration: 'none',
                        background: isCurrentPath('/universe') ? 'linear-gradient(135deg, #ede9fe, #ddd6fe)' : 'rgba(139, 92, 246, 0.08)',
                        border: isCurrentPath('/universe') ? '1px solid #c4b5fd' : '1px solid rgba(139, 92, 246, 0.15)',
                        color: '#6d28d9', fontWeight: '750', fontSize: '13px',
                        transition: 'all var(--transition-fast)',
                    }}>
                        <Globe size={18} color="#7c3aed" />
                        <span>{t('universePortal')}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '9px', background: '#ddd6fe', padding: '2px 6px', borderRadius: '4px', color: '#5b21b6', fontWeight: '800' }}>6 REALMS</span>
                    </Link>

                    {/* 1. Quests & Badges */}
                    <Link to="/quests" onClick={onClose} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                        borderRadius: '12px', textDecoration: 'none',
                        background: isCurrentPath('/quests') ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)' : 'rgba(45, 102, 72, 0.06)',
                        border: isCurrentPath('/quests') ? '1px solid #86efac' : '1px solid var(--border-light)',
                        color: 'var(--primary-dark)', fontWeight: '750', fontSize: '13px',
                        transition: 'all var(--transition-fast)',
                    }}>
                        <Trophy size={18} color="var(--primary)" />
                        <span>{t('questsCenter')}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '9px', background: '#dcfce7', padding: '2px 6px', borderRadius: '4px', color: '#166534', fontWeight: '800' }}>QUESTS</span>
                    </Link>

                    {/* 2. Scholar Profile */}
                    <Link to="/profile" onClick={onClose} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
                        borderRadius: '12px', textDecoration: 'none',
                        background: isCurrentPath('/profile') ? 'linear-gradient(135deg, #e0f2fe, #bae6fd)' : 'rgba(2, 132, 199, 0.06)',
                        border: isCurrentPath('/profile') ? '1px solid #7dd3fc' : '1px solid var(--border-light)',
                        color: '#0369a1', fontWeight: '750', fontSize: '13px',
                        transition: 'all var(--transition-fast)',
                    }}>
                        <User size={18} color="#0284c7" />
                        <span>{t('scholarProfile')}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '9px', background: '#e0f2fe', padding: '2px 6px', borderRadius: '4px', color: '#0369a1', fontWeight: '800' }}>DATA</span>
                    </Link>

                    {/* 3. Popular & Authors */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '2px' }}>
                        <Link to="/popular" onClick={onClose} style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 10px',
                            borderRadius: '10px', textDecoration: 'none',
                            background: isCurrentPath('/popular') ? '#ffe0b2' : '#fff9f0',
                            border: '1px solid #ffe0b2',
                            color: '#e65100', fontWeight: '700', fontSize: '12px',
                            transition: 'all var(--transition-fast)',
                        }}>
                            <Flame size={15} color="#ef6c00" />
                            <span>{language === 'zh' ? '熱門' : 'Popular'}</span>
                        </Link>
                        <Link to="/authors" onClick={onClose} style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 10px',
                            borderRadius: '10px', textDecoration: 'none',
                            background: isCurrentPath('/authors') ? '#b2dfdb' : '#f0f7f7',
                            border: '1px solid #b2dfdb',
                            color: '#00695c', fontWeight: '700', fontSize: '12px',
                            transition: 'all var(--transition-fast)',
                        }}>
                            <Users size={15} color="#00796b" />
                            <span>{language === 'zh' ? '作者' : 'Authors'}</span>
                        </Link>
                    </div>
                </div>

                {/* Search Box */}
                <div style={{ padding: '4px 16px 16px' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            value={filters.search}
                            onChange={e => onFiltersChange({ ...filters, search: e.target.value })}
                            placeholder={t('search')}
                            style={{
                                width: '100%', padding: '10px 10px 10px 36px', borderRadius: '10px',
                                border: '1px solid var(--border)', background: 'white', fontSize: '13px',
                                outline: 'none', color: 'var(--text)', transition: 'all var(--transition-fast)',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                            }}
                        />
                        {filters.search && (
                            <button onClick={() => onFiltersChange({ ...filters, search: '' })}
                                style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                                <X size={13} color="#888" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Clear filters */}
                {hasFilters && (
                    <div style={{ padding: '0 16px 8px' }}>
                        <button onClick={clearAll} style={{
                            fontSize: '11px', color: '#0097a7', background: 'none', border: 'none',
                            cursor: 'pointer', padding: 0, textDecoration: 'underline', fontWeight: '600'
                        }}>
                            {language === 'zh' ? '清除所有篩選' : 'Clear all filters'}
                        </button>
                    </div>
                )}

                {/* External Realms Portals (The 5 Sister Sites) */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '4px' }}>
                    <button
                        onClick={() => setRealmsOpen(o => !o)}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '11px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}
                    >
                        <span>🌟 {language === 'zh' ? '6 大星系外聯傳送門' : 'Cosmic Realms'}</span>
                        {realmsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {realmsOpen && (
                        <div style={{ padding: '0 14px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {COSMIC_REALMS.filter(r => r.url !== '#').map(realm => {
                                const visitCount = state.externalVisits?.[realm.id] || 0;
                                return (
                                    <button
                                        key={realm.id}
                                        onClick={() => handleExternalRealmClick(realm)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '8px 10px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: 'transparent',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'background 0.15s ease'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = realm.accentBg}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: realm.color, flexShrink: 0 }} />
                                            <span style={{ fontSize: '12px', fontWeight: '650', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {language === 'zh' ? realm.name.zh : realm.name.en}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                                            {visitCount > 0 && (
                                                <span style={{ fontSize: '10px', color: realm.color, fontWeight: '800', background: 'white', padding: '1px 5px', borderRadius: '4px', border: `1px solid ${realm.color}40` }}>
                                                    {visitCount}
                                                </span>
                                            )}
                                            <ArrowUpRight size={13} color={realm.color} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Tags section */}
                <div style={{ borderTop: '1px solid var(--border-light)' }}>
                    <button
                        onClick={() => setTagsOpen(o => !o)}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '11px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}
                    >
                        {t('tags')}
                        {tagsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {tagsOpen && (
                        <div style={{ padding: '4px 14px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
                                            cursor: 'pointer', fontSize: '12px', textAlign: 'left',
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
                <div style={{ borderTop: '1px solid var(--border-light)' }}>
                    <button
                        onClick={() => setPlaylistsOpen(o => !o)}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '11px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}
                    >
                        {t('playlists')}
                        {playlistsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {playlistsOpen && (
                        <div style={{ padding: '4px 14px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <button
                                onClick={() => onFiltersChange({ ...filters, playlist: '' })}
                                style={{
                                    display: 'flex', alignItems: 'center', padding: '5px 8px', borderRadius: '6px',
                                    border: 'none', background: !filters.playlist ? '#e0f2f1' : 'transparent',
                                    color: !filters.playlist ? '#00796b' : '#2d2a24',
                                    cursor: 'pointer', fontSize: '12px', textAlign: 'left',
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
                                            cursor: 'pointer', fontSize: '11px', textAlign: 'left',
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
