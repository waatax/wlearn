import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { Flame, Sparkles, Trophy, Gift, CheckCircle2 } from 'lucide-react';
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
                    right: '20px',
                    zIndex: 9999,
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                    color: '#f8fafc',
                    padding: '10px 18px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    backdropFilter: 'blur(12px)',
                    maxWidth: 'calc(100vw - 40px)'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                        color: '#78350f',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '900',
                        fontSize: '13px',
                        flexShrink: 0,
                        boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)'
                    }}>
                        ⚡
                    </div>
                    <div>
                        <div style={{ fontWeight: '800', fontSize: '14px', color: '#fef08a' }}>
                            +{expNotification.amount} EXP
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.2 }}>
                            {expNotification.reason || '獲得智慧修煉經驗！'}
                        </div>
                    </div>
                </div>
            )}

            {/* HUD Status Bar */}
            <div className="hud-container" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.92)',
                padding: '4px 8px',
                borderRadius: '16px',
                border: '1px solid rgba(45, 102, 72, 0.15)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                backdropFilter: 'blur(10px)',
                flexWrap: 'nowrap'
            }}>
                {/* Level & Rank Badge */}
                <Link to="/quests" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '3px 6px',
                    borderRadius: '8px',
                    background: 'rgba(45, 102, 72, 0.06)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                }} title={t('questsCenter')}>
                    <div style={{
                        background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                        color: 'white',
                        fontWeight: '850',
                        fontSize: '11px',
                        padding: '2px 7px',
                        borderRadius: '6px',
                        letterSpacing: '0.02em',
                        boxShadow: '0 2px 5px rgba(45, 102, 72, 0.3)'
                    }}>
                        Lv.{levelInfo.level}
                    </div>
                    <div className="hud-level-text" style={{ display: 'flex', flexDirection: 'column', minWidth: '60px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '750', color: 'var(--primary-dark)', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                            {titleText}
                        </div>
                        {/* Mini progress bar */}
                        <div style={{
                            width: '100%',
                            height: '3px',
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
                        gap: '4px',
                        padding: '5px 8px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: isCheckedInToday ? 'default' : 'pointer',
                        background: isCheckedInToday
                            ? 'linear-gradient(135deg, #fff7ed, #ffedd5)'
                            : 'linear-gradient(135deg, #f97316, #ea580c)',
                        color: isCheckedInToday ? '#c2410c' : '#ffffff',
                        fontWeight: '750',
                        fontSize: '11px',
                        boxShadow: isCheckedInToday ? 'none' : '0 2px 8px rgba(234, 88, 12, 0.35)',
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                    }}
                >
                    <Flame size={13} color={isCheckedInToday ? '#ea580c' : '#ffffff'} fill={isCheckedInToday ? '#ea580c' : '#ffffff'} />
                    <span>{state.streak || 0}</span>
                    {isCheckedInToday && <CheckCircle2 size={11} color="#ea580c" />}
                </button>

                {/* Wisdom Sparks */}
                <div className="hud-sparks" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    padding: '3px 6px',
                    borderRadius: '6px',
                    background: 'rgba(202, 122, 44, 0.08)',
                    color: '#ca7a2c',
                    fontWeight: '750',
                    fontSize: '11px',
                    flexShrink: 0
                }} title={t('sparks')}>
                    <Sparkles size={12} color="#ca7a2c" />
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
                        borderRadius: '8px',
                        padding: '5px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '11px',
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                    }}
                >
                    <Gift size={13} color="#7c3aed" />
                    <span className="hud-btn-text">{language === 'zh' ? '靈感' : 'Seed'}</span>
                </button>

                {/* 滄海一粟 (Serendipity Random Pick) */}
                <button
                    onClick={() => openModal('random_discovery')}
                    title={t('serendipityPick')}
                    style={{
                        background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                        border: '1px solid #bae6fd',
                        color: '#0284c7',
                        borderRadius: '8px',
                        padding: '5px 8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '11px',
                        transition: 'all 0.2s ease',
                        flexShrink: 0
                    }}
                >
                    <Sparkles size={13} color="#0284c7" />
                    <span className="hud-btn-text">{language === 'zh' ? '一粟' : 'Grain'}</span>
                </button>
            </div>
        </>
    );
}
