import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { Trophy, Award, Sparkles, X, Check, Star } from 'lucide-react';

export default function LevelUpModal() {
    const { activeModal, modalData, closeModal } = useGamification();
    const { language } = useLanguage();

    if (activeModal !== 'levelup' && activeModal !== 'badge') return null;

    const isLevelUp = activeModal === 'levelup';
    const badge = !isLevelUp ? modalData?.badge : null;
    const levelInfo = isLevelUp ? modalData?.levelInfo : null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fffbf0 100%)',
                borderRadius: '28px',
                width: '100%',
                maxWidth: '460px',
                maxHeight: 'calc(100dvh - 40px)',
                overflowY: 'auto',
                padding: '36px 24px',
                position: 'relative',
                boxShadow: '0 25px 70px -10px rgba(202, 122, 44, 0.4), 0 0 0 1px rgba(255,255,255,0.9)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                animation: 'fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '2px solid #fed7aa'
            }}>
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    style={{
                        position: 'absolute',
                        top: '18px',
                        right: '18px',
                        background: '#fef3c7',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#92400e'
                    }}
                >
                    <X size={18} />
                </button>

                {isLevelUp ? (
                    <>
                        {/* Level Up Icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '26px',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: '0 12px 30px rgba(217, 119, 6, 0.45)',
                            color: 'white',
                            animation: 'bounce 1s infinite'
                        }}>
                            <Trophy size={42} />
                        </div>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 14px',
                            borderRadius: '100px',
                            background: '#fef3c7',
                            color: '#b45309',
                            fontSize: '12px',
                            fontWeight: '800',
                            marginBottom: '8px'
                        }}>
                            <Sparkles size={13} color="#d97706" />
                            <span>LEVEL UP PROMOTION</span>
                        </div>

                        <h3 style={{ fontSize: '26px', fontWeight: '900', color: '#78350f', margin: '0 0 8px 0' }}>
                            {language === 'zh' ? `晉升為 Lv.${levelInfo?.level || modalData?.newLevel}！` : `Promoted to Lv.${levelInfo?.level || modalData?.newLevel}!`}
                        </h3>

                        <div style={{
                            fontSize: '18px',
                            fontWeight: '800',
                            color: '#ca7a2c',
                            background: 'white',
                            padding: '10px 24px',
                            borderRadius: '14px',
                            border: '1px solid #fed7aa',
                            boxShadow: '0 4px 12px rgba(202, 122, 44, 0.1)',
                            margin: '10px 0 20px 0'
                        }}>
                            ✨ {language === 'zh' ? levelInfo?.title?.zh : levelInfo?.title?.en}
                        </div>

                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 24px 0', lineHeight: 1.5 }}>
                            {language === 'zh'
                                ? '知識宇宙因您的修行而更顯浩瀚！解鎖了更高階的思維心智與星系探索加成。'
                                : 'Your continuous devotion enriches the Knowledge Multiverse! Keep exploring to unlock higher ranks.'}
                        </p>
                    </>
                ) : (
                    <>
                        {/* Badge Unlock Icon */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '26px',
                            background: badge?.rarity === 'legendary'
                                ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                                : badge?.rarity === 'epic'
                                ? 'linear-gradient(135deg, #8b5cf6, #ec4899)'
                                : 'linear-gradient(135deg, #0284c7, #22c55e)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                            color: 'white'
                        }}>
                            <Award size={44} />
                        </div>

                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 14px',
                            borderRadius: '100px',
                            background: '#fef3c7',
                            color: '#92400e',
                            fontSize: '11px',
                            fontWeight: '800',
                            marginBottom: '8px',
                            textTransform: 'uppercase'
                        }}>
                            <Star size={12} color="#d97706" />
                            <span>{badge?.rarity} ACHIEVEMENT</span>
                        </div>

                        <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b', margin: '0 0 6px 0' }}>
                            {language === 'zh' ? badge?.name?.zh : badge?.name?.en}
                        </h3>

                        <p style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#475569',
                            margin: '0 0 20px 0',
                            lineHeight: 1.5
                        }}>
                            {language === 'zh' ? badge?.desc?.zh : badge?.desc?.en}
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            marginBottom: '20px',
                            fontSize: '12px',
                            fontWeight: '750',
                            color: '#059669',
                            background: '#ecfdf5',
                            padding: '8px 16px',
                            borderRadius: '10px'
                        }}>
                            <span>+50 EXP</span>
                            <span>•</span>
                            <span>+20 智慧點數</span>
                        </div>
                    </>
                )}

                <button
                    onClick={closeModal}
                    style={{
                        width: '100%',
                        padding: '14px 20px',
                        borderRadius: '16px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                        color: 'white',
                        fontWeight: '800',
                        fontSize: '15px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 15px rgba(45, 102, 72, 0.35)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <Check size={18} />
                    <span>{language === 'zh' ? '繼續探索修行' : 'Continue Journey'}</span>
                </button>
            </div>
        </div>
    );
}
