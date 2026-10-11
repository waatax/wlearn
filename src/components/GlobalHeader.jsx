import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    BookOpen,
    Brain,
    Globe,
    Trophy,
    TrendingUp,
    Users,
    Search,
    Clock,
    Menu,
    X,
    Sparkles,
    ChevronDown,
    Flame,
    Compass,
    Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import GamificationHUD from './GamificationHUD';
import ReadingComfortControls from './ReadingComfortControls';

export default function GlobalHeader({ onOpenSearch, onOpenTimer, onToggleSidebar }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, toggleLanguage, t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { path: '/', label: language === 'zh' ? '說書庫' : 'Codex', icon: BookOpen },
        { path: '/learning-science', label: language === 'zh' ? '學習科學' : 'Science', icon: Brain, badge: 'HOT' },
        { path: '/universe', label: language === 'zh' ? '知識宇宙' : 'Multiverse', icon: Compass },
        { path: '/quests', label: language === 'zh' ? '修行任務' : 'Quests', icon: Trophy },
        { path: '/popular', label: language === 'zh' ? '熱門榜單' : 'Popular', icon: Flame },
        { path: '/trends', label: language === 'zh' ? '趨勢分析' : 'Trends', icon: TrendingUp },
        { path: '/authors', label: language === 'zh' ? '名家作者' : 'Authors', icon: Users },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/' || location.pathname === '/wlearn' || location.pathname === '/wlearn/';
        return location.pathname.startsWith(path);
    };

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'var(--sidebar-bg)',
            backdropFilter: 'blur(var(--sidebar-blur))',
            WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
            borderBottom: '1px solid var(--border-light)',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
            transition: 'all var(--transition-fast)'
        }}>
            <div style={{
                maxWidth: '1500px',
                margin: '0 auto',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
            }}>
                {/* Left Brand + Sidebar toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {onToggleSidebar && (
                        <button
                            onClick={onToggleSidebar}
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                border: '1px solid var(--border)',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: 'var(--text)'
                            }}
                            title={language === 'zh' ? '展開分類側邊欄' : 'Toggle Categories'}
                        >
                            <Menu size={18} />
                        </button>
                    )}

                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            boxShadow: '0 4px 10px rgba(45, 102, 72, 0.25)',
                            flexShrink: 0
                        }}>
                            🌌
                        </div>
                        <div className="brand-text">
                            <div style={{ fontWeight: '850', fontSize: '16px', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)' }}>
                                {t('siteTitle')}
                            </div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                知識宇宙 · 深度研讀
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Center Nav Links (Desktop) */}
                <nav className="desktop-nav-links" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    {navLinks.map((item) => {
                        const active = isActive(item.path);
                        const IconComponent = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '7px 12px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    fontSize: '13px',
                                    fontWeight: active ? '800' : '650',
                                    color: active ? 'var(--primary)' : 'var(--text-secondary)',
                                    background: active ? 'var(--sidebar-active)' : 'transparent',
                                    border: active ? '1px solid var(--border-light)' : '1px solid transparent',
                                    transition: 'all 0.15s ease',
                                    position: 'relative'
                                }}
                            >
                                <IconComponent size={15} color={active ? 'var(--primary)' : 'var(--text-muted)'} />
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span style={{
                                        fontSize: '9px',
                                        padding: '1px 5px',
                                        borderRadius: '999px',
                                        background: '#ef4444',
                                        color: 'white',
                                        fontWeight: '900',
                                        lineHeight: 1
                                    }}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Action Tools: Search, Timer, HUD, Comfort, Language */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Command Palette Trigger */}
                    {onOpenSearch && (
                        <button
                            onClick={onOpenSearch}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                borderRadius: '10px',
                                border: '1px solid var(--border)',
                                background: 'white',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '600',
                                transition: 'all 0.15s ease'
                            }}
                            title={language === 'zh' ? '全站搜尋 (Ctrl+K)' : 'Search (Ctrl+K)'}
                        >
                            <Search size={14} color="var(--primary)" />
                            <span className="search-pill-text" style={{ fontSize: '12px' }}>
                                {language === 'zh' ? '搜尋...' : 'Search...'}
                            </span>
                            <kbd className="search-kbd" style={{
                                padding: '1px 5px',
                                borderRadius: '4px',
                                background: 'var(--bg)',
                                border: '1px solid var(--border)',
                                fontSize: '10px',
                                fontWeight: '800',
                                color: 'var(--text-muted)'
                            }}>
                                ⌘K
                            </kbd>
                        </button>
                    )}

                    {/* Flow Timer Trigger */}
                    {onOpenTimer && (
                        <button
                            onClick={onOpenTimer}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '7px 12px',
                                borderRadius: '10px',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.08))',
                                color: '#7c3aed',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '800',
                                transition: 'all 0.15s ease'
                            }}
                            title={language === 'zh' ? '開啟沉浸專注心流番茄鐘' : 'Open Focus Flow Timer'}
                        >
                            <Clock size={14} />
                            <span className="timer-pill-text">{language === 'zh' ? '心流鐘' : 'Timer'}</span>
                        </button>
                    )}

                    {/* Gamification HUD */}
                    <GamificationHUD />

                    {/* Reading Comfort */}
                    <ReadingComfortControls compact />

                    {/* Language Switch */}
                    <button
                        onClick={toggleLanguage}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '6px 10px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'white',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '750',
                            color: 'var(--text)',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <Globe size={14} color="var(--primary)" />
                        <span>{language === 'zh' ? 'EN' : '中文'}</span>
                    </button>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            borderRadius: '10px',
                            border: '1px solid var(--border)',
                            background: 'white',
                            color: 'var(--text)',
                            cursor: 'pointer'
                        }}
                    >
                        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Drawer Dropdown */}
            {mobileMenuOpen && (
                <div style={{
                    padding: '12px 20px 20px',
                    borderTop: '1px solid var(--border-light)',
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    animation: 'fadeIn 0.2s ease'
                }}>
                    {navLinks.map((item) => {
                        const active = isActive(item.path);
                        const IconComponent = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 14px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    fontWeight: active ? '800' : '650',
                                    color: active ? 'var(--primary)' : 'var(--text)',
                                    background: active ? 'var(--sidebar-active)' : 'transparent',
                                }}
                            >
                                <IconComponent size={18} color={active ? 'var(--primary)' : 'var(--text-muted)'} />
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span style={{
                                        fontSize: '9px',
                                        padding: '1px 5px',
                                        borderRadius: '999px',
                                        background: '#ef4444',
                                        color: 'white',
                                        fontWeight: '900',
                                        marginLeft: 'auto'
                                    }}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            )}
        </header>
    );
}
