import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { BADGES_CATALOG, COSMIC_REALMS } from '../lib/gamification';
import Sidebar from '../components/Sidebar';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import {
    Trophy,
    Flame,
    Sparkles,
    CheckCircle2,
    Lock,
    Award,
    Star,
    Shield,
    Globe,
    BookOpen,
    Menu,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Quests() {
    const {
        state,
        levelInfo,
        dailyQuests,
        isCheckedInToday,
        checkIn,
        claimDailyCapsule,
        openModal,
        buyStreakFreeze
    } = useGamification();
    const { language, t, toggleLanguage } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [badgeFilter, setBadgeFilter] = useState('all'); // all, learning, streak, exploration, curiosity
    const navigate = useNavigate();

    const unlockedSet = new Set(state.unlockedBadges || []);

    const filteredBadges = BADGES_CATALOG.filter(b => {
        if (badgeFilter === 'all') return true;
        return b.category === badgeFilter;
    });

    const handleQuestAction = (quest) => {
        if (quest.type === 'checkin') {
            checkIn();
        } else if (quest.type === 'read_book') {
            navigate('/');
        } else if (quest.type === 'explore_realm') {
            navigate('/universe');
        } else if (quest.type === 'capsule') {
            claimDailyCapsule();
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
                            <span style={{ fontSize: '20px' }}>🎯</span>
                            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>
                                {t('questsCenter')}
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
                                fontWeight: '600'
                            }}
                        >
                            <Globe size={15} />
                            <span>{language === 'zh' ? 'EN' : '繁中'}</span>
                        </button>
                    </div>
                </div>

                <div style={{ padding: '28px 32px 64px 32px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
                    {/* Scholar Level Banner */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1b452e 0%, #2d6648 100%)',
                        borderRadius: '24px',
                        padding: '32px 36px',
                        color: 'white',
                        marginBottom: '32px',
                        boxShadow: '0 15px 35px -10px rgba(27, 69, 46, 0.4)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '24px'
                    }}>
                        <div style={{ maxWidth: '480px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                padding: '4px 12px',
                                borderRadius: '100px',
                                fontSize: '12px',
                                fontWeight: '750',
                                color: '#a7f3d0',
                                marginBottom: '12px'
                            }}>
                                <span>RANK: {levelInfo.rank.toUpperCase()}</span>
                            </div>
                            <h2 style={{ fontSize: '26px', fontWeight: '900', margin: '0 0 6px 0' }}>
                                Lv.{levelInfo.level} {language === 'zh' ? levelInfo.title.zh : levelInfo.title.en}
                            </h2>
                            <p style={{ fontSize: '13px', color: '#d1fae5', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                                {language === 'zh'
                                    ? `累計累積 ${state.exp} EXP。距離下一等級還需 ${levelInfo.nextLevelExp - state.exp} EXP。`
                                    : `Total ${state.exp} EXP earned. ${levelInfo.nextLevelExp - state.exp} EXP to next level promotion.`}
                            </p>

                            {/* Progress bar */}
                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${levelInfo.percentage}%`,
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #34d399, #fde047)',
                                    borderRadius: '4px'
                                }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#a7f3d0', marginTop: '6px', fontWeight: '600' }}>
                                <span>{state.exp} EXP</span>
                                <span>{levelInfo.percentage}%</span>
                                <span>{levelInfo.nextLevelExp} EXP</span>
                            </div>
                        </div>

                        {/* Quick Stats & Freeze Card */}
                        <div style={{
                            display: 'flex',
                            gap: '16px',
                            background: 'rgba(0, 0, 0, 0.2)',
                            padding: '20px',
                            borderRadius: '18px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ textAlign: 'center', padding: '0 12px' }}>
                                <div style={{ fontSize: '11px', color: '#a7f3d0', fontWeight: '700', marginBottom: '4px' }}>🔥 {t('streak')}</div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: '#fef08a' }}>{state.streak || 0}</div>
                            </div>
                            <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)' }} />
                            <div style={{ textAlign: 'center', padding: '0 12px' }}>
                                <div style={{ fontSize: '11px', color: '#a7f3d0', fontWeight: '700', marginBottom: '4px' }}>✨ {t('sparks')}</div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: '#fed7aa' }}>{state.sparks || 0}</div>
                            </div>
                            <div style={{ width: '1px', background: 'rgba(255,255,255,0.15)' }} />
                            <div style={{ textAlign: 'center', padding: '0 12px' }}>
                                <div style={{ fontSize: '11px', color: '#a7f3d0', fontWeight: '700', marginBottom: '4px' }}>🛡️ 護盾</div>
                                <div style={{ fontSize: '24px', fontWeight: '900', color: '#93c5fd' }}>{state.streakFreezes || 0}</div>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Daily Quests */}
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0' }}>
                                    ⚡ {language === 'zh' ? '今日修行任務（每日重置）' : 'Daily Quests (Refreshes Daily)'}
                                </h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                    {language === 'zh' ? '建立每日研讀微習慣（Octalysis CD8 & CD2），領取豐厚經驗與靈感點數。' : 'Cultivate daily study habits to earn extra EXP and Wisdom Sparks.'}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                            {dailyQuests.map((quest) => (
                                <div
                                    key={quest.id}
                                    style={{
                                        background: quest.isCompleted ? 'linear-gradient(135deg, #f0fdf4, #ffffff)' : 'var(--card-bg)',
                                        borderRadius: '16px',
                                        padding: '20px',
                                        border: quest.isCompleted ? '1px solid #86efac' : '1px solid var(--border-light)',
                                        boxShadow: 'var(--card-shadow)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                color: quest.isCompleted ? '#16a34a' : '#2d6648',
                                                background: quest.isCompleted ? '#dcfce7' : '#eaf3ed',
                                                padding: '3px 8px',
                                                borderRadius: '6px'
                                            }}>
                                                +{quest.exp} EXP / +{quest.sparks} Sparks
                                            </span>
                                            {quest.isCompleted && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#16a34a', fontSize: '12px', fontWeight: '800' }}>
                                                    <CheckCircle2 size={16} />
                                                    <span>{t('questCompleted')}</span>
                                                </div>
                                            )}
                                        </div>

                                        <h4 style={{ fontSize: '15px', fontWeight: '750', color: 'var(--text)', margin: '0 0 6px 0' }}>
                                            {language === 'zh' ? quest.title.zh : quest.title.en}
                                        </h4>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                                            {language === 'zh' ? quest.desc.zh : quest.desc.en}
                                        </p>
                                    </div>

                                    {!quest.isCompleted && (
                                        <button
                                            onClick={() => handleQuestAction(quest)}
                                            style={{
                                                width: '100%',
                                                padding: '9px 14px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                                                color: 'white',
                                                fontWeight: '700',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <span>{language === 'zh' ? '前往修行' : 'Start Quest'}</span>
                                            <ArrowRight size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Badges & Achievements Showcase */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0' }}>
                                    🏆 {language === 'zh' ? '學者成就勳章圖鑑' : 'Scholar Achievements Showcase'}
                                </h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                    {language === 'zh' ? `已解鎖 ${unlockedSet.size} / ${BADGES_CATALOG.length} 個成就徽章` : `Unlocked ${unlockedSet.size} of ${BADGES_CATALOG.length} badges`}
                                </p>
                            </div>

                            {/* Filter Tabs */}
                            <div style={{ display: 'flex', gap: '6px', background: 'var(--card-bg)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                                {[
                                    { id: 'all', label: { zh: '全部', en: 'All' } },
                                    { id: 'learning', label: { zh: '研讀', en: 'Study' } },
                                    { id: 'exploration', label: { zh: '星際探索', en: 'Realms' } },
                                    { id: 'streak', label: { zh: '連勝毅力', en: 'Streak' } },
                                    { id: 'curiosity', label: { zh: '未知好奇', en: 'Curiosity' } }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setBadgeFilter(tab.id)}
                                        style={{
                                            padding: '6px 12px',
                                            borderRadius: '8px',
                                            border: 'none',
                                            background: badgeFilter === tab.id ? 'var(--primary)' : 'transparent',
                                            color: badgeFilter === tab.id ? 'white' : 'var(--text-secondary)',
                                            fontWeight: '700',
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {language === 'zh' ? tab.label.zh : tab.label.en}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                            {filteredBadges.map((badge) => {
                                const isUnlocked = unlockedSet.has(badge.id);

                                return (
                                    <div
                                        key={badge.id}
                                        style={{
                                            background: isUnlocked ? 'var(--card-bg)' : '#f8fafc',
                                            borderRadius: '16px',
                                            padding: '20px',
                                            border: isUnlocked
                                                ? (badge.rarity === 'legendary' ? '2px solid #f59e0b' : '1px solid var(--border)')
                                                : '1px dashed #cbd5e1',
                                            boxShadow: isUnlocked ? 'var(--card-shadow)' : 'none',
                                            display: 'flex',
                                            gap: '16px',
                                            alignItems: 'center',
                                            opacity: isUnlocked ? 1 : 0.6,
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {/* Icon Container */}
                                        <div style={{
                                            width: '52px',
                                            height: '52px',
                                            borderRadius: '16px',
                                            background: isUnlocked
                                                ? (badge.rarity === 'legendary'
                                                    ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                                                    : badge.rarity === 'epic'
                                                    ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                                                    : 'linear-gradient(135deg, #0284c7, #22c55e)')
                                                : '#e2e8f0',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: isUnlocked ? 'white' : '#94a3b8',
                                            flexShrink: 0,
                                            boxShadow: isUnlocked ? '0 6px 16px rgba(0,0,0,0.12)' : 'none'
                                        }}>
                                            {isUnlocked ? <Award size={26} /> : <Lock size={22} />}
                                        </div>

                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                                <span style={{
                                                    fontSize: '9px',
                                                    fontWeight: '800',
                                                    textTransform: 'uppercase',
                                                    color: badge.rarity === 'legendary' ? '#b45309' : badge.rarity === 'epic' ? '#6d28d9' : '#0369a1',
                                                    background: badge.rarity === 'legendary' ? '#fef3c7' : badge.rarity === 'epic' ? '#ede9fe' : '#e0f2fe',
                                                    padding: '1px 5px',
                                                    borderRadius: '4px'
                                                }}>
                                                    {badge.rarity}
                                                </span>
                                            </div>
                                            <h4 style={{ fontSize: '14px', fontWeight: '750', color: isUnlocked ? 'var(--text)' : '#64748b', margin: '0 0 4px 0' }}>
                                                {language === 'zh' ? badge.name.zh : badge.name.en}
                                            </h4>
                                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                                                {language === 'zh' ? badge.desc.zh : badge.desc.en}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <BottomNavbar />
        </div>
    );
}
