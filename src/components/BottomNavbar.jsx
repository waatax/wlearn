import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Flame, BarChart3, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNavbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const path = location.pathname;

    const navItems = [
        { path: '/', label: language === 'zh' ? '探索書籍' : 'Explore', icon: <BookOpen size={20} /> },
        { path: '/popular', label: language === 'zh' ? '熱門排行' : 'Popular', icon: <Flame size={20} /> },
        { path: '/trends', label: language === 'zh' ? '數據趨勢' : 'Trends', icon: <BarChart3 size={20} /> },
        { path: '/authors', label: language === 'zh' ? '作者名冊' : 'Authors', icon: <Users size={20} /> },
    ];

    return (
        <nav className="bottom-navbar" style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '66px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border)',
            display: 'none', /* Display managed by media query in index.css */
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 99,
            paddingBottom: 'env(safe-area-inset-bottom)',
            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.04)',
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
                            width: '22%',
                            height: '100%',
                            cursor: 'pointer',
                            padding: '4px 0',
                            gap: '4px',
                            color: active ? 'var(--primary)' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px 16px',
                            borderRadius: '16px',
                            background: active ? 'var(--sidebar-active)' : 'transparent',
                            color: active ? 'var(--primary)' : 'var(--text-secondary)',
                            transition: 'all 0.2s ease',
                            transform: active ? 'scale(1.05)' : 'scale(1)',
                        }}>
                            {item.icon}
                        </div>
                        <span style={{
                            fontSize: '10px',
                            fontWeight: active ? '700' : '500',
                            letterSpacing: '0.02em',
                            opacity: active ? 1 : 0.8,
                        }}>
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}
