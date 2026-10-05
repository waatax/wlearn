import React, { useState } from 'react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { BADGES_CATALOG, COSMIC_REALMS } from '../lib/gamification';
import Sidebar from '../components/Sidebar';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import ReadingComfortControls from '../components/ReadingComfortControls';
import { HabitLoopDiagram } from '../components/learning/LearningDiagrams';
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
    ArrowRight,
    Target
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Quests() {
    const {
        state,
        levelInfo,
        dailyQuests,
        checkIn,
        claimDailyCapsule,
        openModal
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
        } else if (quest.type === 'serendipity') {
            openModal('random_discovery');
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

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <GamificationHUD />
                        <ReadingComfortControls compact />
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

                <div style={{ padding: '20px 16px 64px 16px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
                    {/* Scholar Level Banner */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1b452e 0%, #2d6648 100%)',
                        borderRadius: '24px',
                        padding: '28px 24px',
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
                            <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 6px 0' }}>
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
                        </div>

                        {/* Quick Stats in Banner */}
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 18px', borderRadius: '14px', textAlign: 'center', minWidth: '85px' }}>
                                <div style={{ fontSize: '11px', color: '#a7f3d0', fontWeight: '600' }}>{t('streak')}</div>
                                <div style={{ fontSize: '20px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                    <Flame size={18} color="#fb923c" fill="#fb923c" />
                                    <span>{state.streak || 0}</span>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 18px', borderRadius: '14px', textAlign: 'center', minWidth: '85px' }}>
                                <div style={{ fontSize: '11px', color: '#a7f3d0', fontWeight: '600' }}>{t('sparks')}</div>
                                <div style={{ fontSize: '20px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                    <Sparkles size={18} color="#fde047" />
                                    <span>{state.sparks || 0}</span>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px 18px', borderRadius: '14px', textAlign: 'center', minWidth: '85px' }}>
                                <div style={{ fontSize: '11px', color: '#a7f3d0', fontWeight: '600' }}>{language === 'zh' ? '勳章' : 'Badges'}</div>
                                <div style={{ fontSize: '20px', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                    <Trophy size={18} color="#fef08a" />
                                    <span>{(state.unlockedBadges || []).length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daily Quests Section */}
                    <div style={{ marginBottom: '48px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0' }}>
                                    ⚡ {language === 'zh' ? '今日修行任務（每日重置）' : 'Daily Quests (Refreshes Daily)'}
                                </h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                    {language === 'zh' ? '建立每日研讀微習慣（Octalysis CD8 & CD2），領取豐厚經驗與靈感點數。' : 'Cultivate daily study habits to earn extra EXP and Wisdom Sparks.'}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
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

                    {/* Habit Loop Diagram */}
                    <HabitLoopDiagram language={language} />

                    {/* Deliberate Practice: 3 Zones of Mastery */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '28px',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--card-shadow)',
                        marginBottom: '36px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Target size={18} color="#059669" />
                                    <span>{language === 'zh' ? '刻意練習三區模型 (Comfort vs Learning vs Panic Zone)' : '3 Zones of Deliberate Practice'}</span>
                                </h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                                    {language === 'zh' ? '安德斯·艾利克森《刻意練習》：大師的進步永遠發生在 +4% 難度的學習區邊界' : 'Progress happens strictly at the 4% stretch boundary'}
                                </p>
                            </div>
                            <span style={{ fontSize: '11px', color: '#166534', background: '#dcfce7', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
                                LEARNING ZONE
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                            <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '18px', border: '1.5px solid #e2e8f0' }}>
                                <div style={{ fontSize: '11px', fontWeight: '850', color: '#64748b', marginBottom: '6px' }}>ZONE 1 · 舒適區 (Comfort Zone)</div>
                                <h4 style={{ fontSize: '15px', fontWeight: '850', color: '#334155', margin: '0 0 6px 0' }}>做已知而熟悉的事</h4>
                                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                                    能耗極低、無痛苦，但<strong>完全不會刺激突觸增生</strong>。停留此區只會進入自動化平台期（平庸天花板）。
                                </p>
                            </div>

                            <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '18px', border: '1.5px solid #86efac' }}>
                                <div style={{ fontSize: '11px', fontWeight: '850', color: '#15803d', marginBottom: '6px' }}>ZONE 2 · 學習區 (Sweet Spot +4%)</div>
                                <h4 style={{ fontSize: '15px', fontWeight: '850', color: '#166534', margin: '0 0 6px 0' }}>剛好在能力邊緣微幅拉伸</h4>
                                <p style={{ fontSize: '12px', color: '#14532d', lineHeight: 1.55, margin: 0 }}>
                                    有微小阻力與卡頓感。大腦釋放乙醯膽鹼標記神經元，<strong>髓鞘質快速增生，認知飛速晉級！</strong>
                                </p>
                            </div>

                            <div style={{ background: '#fef2f2', borderRadius: '14px', padding: '18px', border: '1.5px solid #fecaca' }}>
                                <div style={{ fontSize: '11px', fontWeight: '850', color: '#b91c1c', marginBottom: '6px' }}>ZONE 3 · 恐慌區 (Panic Zone)</div>
                                <h4 style={{ fontSize: '15px', fontWeight: '850', color: '#991b1b', margin: '0 0 6px 0' }}>難度過高引發崩潰</h4>
                                <p style={{ fontSize: '12px', color: '#7f1d1d', lineHeight: 1.55, margin: 0 }}>
                                    超出工作記憶乘載上限，杏仁核觸發焦慮癱瘓。策略是拆解為微任務，先退回學習區逐一擊破。
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Scholar Level Hierarchy & Privileges Table */}
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '28px',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--card-shadow)',
                        marginBottom: '36px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Trophy size={18} color="#eab308" />
                                    <span>{language === 'zh' ? '學者天梯晉升等級與特權對照表' : 'Scholar Hierarchy & Privileges Table'}</span>
                                </h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                                    {language === 'zh' ? '透過每日閱讀打卡與星際探索累積經驗值，解鎖更高階的心智特權' : 'Level up by daily active recall and cosmic exploration to unlock privileges'}
                                </p>
                            </div>
                            <span style={{ fontSize: '11px', color: '#b45309', background: '#fef3c7', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
                                SCHOLAR TIERS
                            </span>
                        </div>

                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                            <table style={{ width: '100%', minWidth: '680px', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '10px 14px', fontWeight: '800', color: '#334155' }}>等級階位</th>
                                        <th style={{ padding: '10px 14px', fontWeight: '800', color: '#334155' }}>稱號稱謂</th>
                                        <th style={{ padding: '10px 14px', fontWeight: '800', color: '#0284c7' }}>所需 EXP</th>
                                        <th style={{ padding: '10px 14px', fontWeight: '800', color: '#16a34a' }}>每日火花加成</th>
                                        <th style={{ padding: '10px 14px', fontWeight: '800', color: '#7c3aed' }}>解鎖特權</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { lv: 'Lv.1', title: '求知學徒 (Novice Seeker)', exp: '0 EXP', spark: '1.0x', priv: '基礎書庫檢索、章節打卡、筆記導出' },
                                        { lv: 'Lv.2', title: '知識探索者 (Explorer)', exp: '300 EXP', spark: '1.2x', priv: '每日隨機膠囊、跨星系探索經驗翻倍' },
                                        { lv: 'Lv.3', title: '思維築基者 (Synthesizer)', exp: '800 EXP', spark: '1.5x', priv: '專屬白紙閉卷自檢協議、個人閱讀雷達' },
                                        { lv: 'Lv.4', title: '格柵學人 (Scholar)', exp: '1,500 EXP', spark: '1.8x', priv: '心智模型公式一鍵複製、第二大腦外包模板' },
                                        { lv: 'Lv.5', title: '認知大師 (Master Polymath)', exp: '3,000+ EXP', spark: '2.5x', priv: '全星域全息融通徽章、永久登錄賢者榜' },
                                    ].map((row, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? 'white' : '#fcfcfc' }}>
                                            <td style={{ padding: '10px 14px', fontWeight: '900', color: '#0284c7' }}>{row.lv}</td>
                                            <td style={{ padding: '10px 14px', fontWeight: '800', color: '#1e293b' }}>{row.title}</td>
                                            <td style={{ padding: '10px 14px', color: '#64748b' }}>{row.exp}</td>
                                            <td style={{ padding: '10px 14px', color: '#15803d', fontWeight: '800' }}>{row.spark}</td>
                                            <td style={{ padding: '10px 14px', color: '#475569', fontWeight: '600' }}>{row.priv}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
