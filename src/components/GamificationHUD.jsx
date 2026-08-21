import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { Flame, Sparkles, Trophy, Gift, Compass, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GamificationHUD() {
    const {
        state,
        levelInfo,
        isCheckedInToday,
        checkIn,
        claimDailyCapsule,
        openModal,
        expNotification
    } = useGamification();
    const { language, t } = useLanguage();

    const titleText = language === 'zh' ? levelInfo.title.zh : levelInfo.title.en;

    return (
        <>
            {/* Floating EXP Toast Notification */}
            {expNotification && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '24px',
                    zIndex: 9999,
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                    color: '#f8fafc',
                    padding: '12px 20px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    backdropFilter: 'blur(12px)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        color: '#78350f',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        fontSize: '14px',
                        boxShadow: '0 0 12px rgba(245, 158, 11, 0.5)'
                    }}>
                        ⚡
                    </div>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '15px', color: '#fef08a' }}>
                            +{expNotification.amount} EXP
                        </div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {expNotification.reason || '獲得智慧修煉經驗！'}
                        </div>
                    </div>
                </div>
            )}

            {/* HUD Status Bar Header Item */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '6px 14px',
                borderRadius: '16px',
                border: '1px solid rgba(45, 102, 72, 0.15)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                backdropFilter: 'blur(8px)',
                flexWrap: 'nowrap'
            }}>
                {/* Level & Rank Badge */}
                <Link to="/quests" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '4px 8px',
                    borderRadius: '10px',
                    background: 'rgba(45, 102, 72, 0.06)',
                    transition: 'all 0.2s ease'
                }} title={t('questsCenter')}>
                    <div style={{
                        background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                        color: 'white',
                        fontWeight: '800',
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '8px',
                        letterSpacing: '0.02em',
                        boxShadow: '0 2px 6px rgba(45, 102, 72, 0.3)'
                    }}>
                        Lv.{levelInfo.level}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '70px' }}>
                        <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--primary-dark)', lineHeight: 1.2 }}>
                            {titleText}
                        </div>
                        {/* Mini progress bar */}
                        <div style={{
                            width: '100%',
                            height: '4px',
                            background: '#e2e8f0',
                            borderRadius: '2px',
                            marginTop: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${levelInfo.percentage}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #2d6648, #ca7a2c)',
                                borderRadius: '2px'
                            }} />
                        </div>
                    </div>
                </Link>

                {/* Streak Counter */}
                <button
                    onClick={checkIn}
                    disabled={isCheckedInToday}
                    title={isCheckedInToday ? t('checkedIn') : t('checkIn')}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 10px',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: isCheckedInToday ? 'default' : 'pointer',
                        background: isCheckedInToday
                            ? 'linear-gradient(135deg, #fff7ed, #ffedd5)'
                            : 'linear-gradient(135deg, #f97316, #ea580c)',
                        color: isCheckedInToday ? '#c2410c' : '#ffffff',
                        fontWeight: '700',
                        fontSize: '12px',
                        boxShadow: isCheckedInToday ? 'none' : '0 3px 10px rgba(234, 88, 12, 0.35)',
                        transition: 'all 0.2s ease',
                        animation: isCheckedInToday ? 'none' : 'pulse 2s infinite'
                    }}
                >
                    <Flame size={15} color={isCheckedInToday ? '#ea580c' : '#ffffff'} fill={isCheckedInToday ? '#ea580c' : '#ffffff'} />
                    <span>{state.streak || 0} {t('streak')}</span>
                    {isCheckedInToday && <CheckCircle2 size={13} color="#ea580c" />}
                </button>

                {/* Wisdom Sparks */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    background: 'rgba(202, 122, 44, 0.08)',
                    color: '#ca7a2c',
                    fontWeight: '750',
                    fontSize: '12px'
                }} title={t('sparks')}>
                    <Sparkles size={14} color="#ca7a2c" />
                    <span>{state.sparks || 0}</span>
                </div>

                {/* Wisdom Inspiration Capsule Trigger */}
                <button
                    onClick={claimDailyCapsule}
                    title={t('wisdomCapsule')}
                    style={{
                        background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
                        border: '1px solid #ddd6fe',
                        color: '#7c3aed',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        fontWeight: '650',
                        fontSize: '12px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <Gift size={15} color="#7c3aed" />
                    <span className="hidden sm:inline">{language === 'zh' ? '每日靈感' : 'Inspiration'}</span>
                </button>

                {/* Serendipity Random Pick Trigger */}
                <button
                    onClick={() => openModal('random_discovery')}
                    title={t('serendipityPick')}
                    style={{
                        background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                        border: '1px solid #bae6fd',
                        color: '#0284c7',
                        borderRadius: '10px',
                        padding: '6px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        fontWeight: '650',
                        fontSize: '12px',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <Sparkles size={15} color="#0284c7" />
                    <span className="hidden sm:inline">{language === 'zh' ? '隨選好書' : 'Surprise Me'}</span>
                </button>
            </div>
        </>
    );
}
