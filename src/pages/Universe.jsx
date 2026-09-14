import React, { useState } from 'react';
import { COSMIC_REALMS } from '../lib/gamification';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import Sidebar from '../components/Sidebar';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import {
    ExternalLink,
    Sparkles,
    BookOpen,
    Layers,
    Scroll,
    Compass,
    Palmtree,
    BookMarked,
    Globe,
    ArrowUpRight,
    Shield,
    Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';

const REALM_ICONS = {
    BookMarked: BookMarked,
    Layers: Layers,
    Scroll: Scroll,
    Compass: Compass,
    Palmtree: Palmtree,
    BookOpen: BookOpen
};

export default function Universe() {
    const { state, trackExternalVisit } = useGamification();
    const { language, t, toggleLanguage } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleVisitRealm = (realm) => {
        if (realm.url && realm.url !== '#') {
            trackExternalVisit(realm.id);
            window.open(realm.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
            <Sidebar
                books={[]}
                filters={{ search: '', tags: [], playlist: '' }}
                onFiltersChange={() => {}}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
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
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="開啟選單"
                        >
                            <Menu size={22} color="#2d2a24" />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '20px' }}>🌌</span>
                            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>
                                {t('universePortal')}
                            </span>
                        </div>
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

                {/* Hero Multiverse Banner */}
                <div style={{ padding: '32px 32px 16px 32px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #064e3b 100%)',
                        borderRadius: '24px',
                        padding: '40px 36px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.4)'
                    }}>
                        <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                padding: '6px 14px',
                                borderRadius: '100px',
                                fontSize: '12px',
                                fontWeight: '750',
                                color: '#fef08a',
                                marginBottom: '16px'
                            }}>
                                <Sparkles size={14} color="#fef08a" />
                                <span>THE 6 COSMIC KNOWLEDGE REALMS</span>
                            </div>
                            <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: 1.2, margin: '0 0 12px 0' }}>
                                {language === 'zh' ? '跨越文明維度的知識宇宙星系' : 'The Cross-Civilization Knowledge Multiverse'}
                            </h1>
                            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                                {language === 'zh'
                                    ? '學習不只是單一書本的記憶，而是多維文明脈絡的交融。在此探索 6 大智慧星域：聖經靈修、軟體架構、古典文史、越南與印尼語言文化，以及 WeLearn 說書大圖書館。每次跨界探索皆可累積經驗值與學者成就！'
                                    : 'Learning is multidimensional. Traverse the 6 cosmic domains—Biblical Wisdom, System Architecture, Chinese Classics, Vietnamese & Indonesian Languages, and the WeLearn YouTube Codex—to master modern polymathy.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 6 Cosmic Realms Grid */}
                <div style={{
                    padding: '16px 20px 64px 20px',
                    maxWidth: '1280px',
                    width: '100%',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                    gap: '20px'
                }}>
                    {COSMIC_REALMS.map((realm) => {
                        const IconComponent = REALM_ICONS[realm.icon] || Globe;
                        const visitCount = realm.id === 'welearn' ? (state.readBooks || []).length : (state.externalVisits?.[realm.id] || 0);
                        const isInternal = realm.id === 'welearn';

                        return (
                            <div
                                key={realm.id}
                                style={{
                                    background: 'var(--card-bg)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    border: '1px solid var(--border-light)',
                                    boxShadow: 'var(--card-shadow)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Top Accent Bar */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '5px',
                                    background: realm.gradient
                                }} />

                                <div>
                                    {/* Header info */}
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{
                                            width: '54px',
                                            height: '54px',
                                            borderRadius: '16px',
                                            background: realm.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            boxShadow: `0 8px 20px ${realm.color}40`
                                        }}>
                                            <IconComponent size={28} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                color: realm.color,
                                                background: realm.accentBg,
                                                padding: '3px 8px',
                                                borderRadius: '8px',
                                                border: `1px solid ${realm.color}20`
                                            }}>
                                                {realm.badge}
                                            </span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                {language === 'zh' ? `已探索 ${visitCount} 次` : `Explored ${visitCount} times`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Realm Name & Subtitle */}
                                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px 0' }}>
                                        {language === 'zh' ? realm.name.zh : realm.name.en}
                                    </h3>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: realm.color, marginBottom: '12px' }}>
                                        {language === 'zh' ? realm.subtitle.zh : realm.subtitle.en}
                                    </div>

                                    {/* Description */}
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                                        {language === 'zh' ? realm.description.zh : realm.description.en}
                                    </p>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                                        {realm.tags.slice(0, 4).map((tag, idx) => (
                                            <span key={idx} style={{
                                                fontSize: '11px',
                                                color: 'var(--text-secondary)',
                                                background: 'var(--bg)',
                                                padding: '3px 8px',
                                                borderRadius: '6px',
                                                fontWeight: '500'
                                            }}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div>
                                    {isInternal ? (
                                        <Link
                                            to="/"
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                                                color: 'white',
                                                fontWeight: '750',
                                                fontSize: '13px',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                boxShadow: '0 4px 12px rgba(45, 102, 72, 0.25)'
                                            }}
                                        >
                                            <BookOpen size={16} />
                                            <span>{language === 'zh' ? '進入說書大圖書館 (700+ 書籍)' : 'Browse 700+ Book Library'}</span>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleVisitRealm(realm)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: realm.gradient,
                                                color: 'white',
                                                fontWeight: '750',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                boxShadow: `0 4px 14px ${realm.color}40`,
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <span>{language === 'zh' ? `前往探索站點 (+${realm.expReward} EXP)` : `Visit Site (+${realm.expReward} EXP)`}</span>
                                            <ArrowUpRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <BottomNavbar />
        </div>
    );
}
