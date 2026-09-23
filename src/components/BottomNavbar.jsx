import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Globe, Trophy, User, Users, Brain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const path = location.pathname;

    const navItems = [
        { path: '/', label: language === 'zh' ? '說書庫' : 'Codex', icon: <BookOpen size={19} /> },
        { path: '/learning-science', label: language === 'zh' ? '學習科學' : 'Science', icon: <Brain size={19} /> },
        { path: '/universe', label: language === 'zh' ? '知識宇宙' : 'Multiverse', icon: <Globe size={19} /> },
        { path: '/quests', label: language === 'zh' ? '修行任務' : 'Quests', icon: <Trophy size={19} /> },
        { path: '/profile', label: language === 'zh' ? '學者名片' : 'Passport', icon: <User size={19} /> },
    ];

    return (
        <nav className="bottom-navbar" style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '66px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border)',
            display: 'none',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 99,
            paddingBottom: 'env(safe-area-inset-bottom)',
            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.05)',
        }}>
            {navItems.map(item => {
                const isHome = item.path === '/';
                const active = isHome
                    ? path === '/' || path === '/wlearn/' || path === '/wlearn'
                    : path.startsWith(item.path);

                return (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'none',
                            border: 'none',
                            width: '20%',
                            height: '100%',
                            cursor: 'pointer',
                            padding: '4px 0',
                            gap: '3px',
                            color: active ? 'var(--primary)' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '3px 12px',
                            borderRadius: '12px',
                            background: active ? 'var(--sidebar-active)' : 'transparent',
                            color: active ? 'var(--primary)' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                            transform: active ? 'scale(1.05)' : 'scale(1)',
                        }}>
                            {item.icon}
                        </div>
                        <span style={{
                            fontSize: '10px',
                            fontWeight: active ? '750' : '500',
                            letterSpacing: '0.02em',
                            opacity: active ? 1 : 0.75,
                        }}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
