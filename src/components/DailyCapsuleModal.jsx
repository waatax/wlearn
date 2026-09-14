import React from 'react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Gift, Sparkles, Quote, Check, ExternalLink } from 'lucide-react';
import { COSMIC_REALMS } from '../lib/gamification';

export default function DailyCapsuleModal() {
    const { activeModal, modalData, closeModal, trackExternalVisit } = useGamification();
    const { language } = useLanguage();

    if (activeModal !== 'capsule' || !modalData?.capsule) return null;

    const { capsule, alreadyClaimed } = modalData;
    const realm = COSMIC_REALMS.find(r => r.id === capsule.realm) || COSMIC_REALMS[5];

    const quoteText = language === 'zh' ? capsule.quote.zh : capsule.quote.en;
    const realmName = language === 'zh' ? realm.name.zh : realm.name.en;

    const handleVisitRealm = () => {
        if (realm && realm.url && realm.url !== '#') {
            trackExternalVisit(realm.id);
            window.open(realm.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '480px',
                maxHeight: 'calc(100dvh - 40px)',
                overflowY: 'auto',
                padding: '32px 24px',
                position: 'relative',
                boxShadow: '0 25px 60px -15px rgba(124, 58, 237, 0.3), 0 0 0 1px rgba(255,255,255,0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    style={{
                        position: 'absolute',
                        top: '18px',
                        right: '18px',
                        background: '#f3e8ff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#7c3aed'
                    }}
                >
                    <X size={18} />
                </button>

                {/* Gift Icon */}
                <div style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '22px',
                    background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 10px 25px rgba(124, 58, 237, 0.4)',
                    color: 'white'
                }}>
                    <Gift size={36} />
                </div>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    background: '#ede9fe',
                    color: '#6d28d9',
                    fontSize: '11px',
                    fontWeight: '800',
                    marginBottom: '8px'
                }}>
                    <Sparkles size={12} color="#7c3aed" />
                    <span>{alreadyClaimed ? (language === 'zh' ? '今日已領取靈感' : 'Claimed Today') : (language === 'zh' ? '獲得 +20 EXP & +15 智慧點數' : '+20 EXP & +15 Sparks')}</span>
                </div>

                <h3 style={{ fontSize: '20px', fontWeight: '850', color: '#1e1b4b', margin: '0 0 6px 0' }}>
                    {language === 'zh' ? '今日大師智慧靈感盲盒' : 'Daily Wisdom Capsule'}
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 20px 0' }}>
                    {language === 'zh' ? '每日啟迪心智，跨越時空的思維共振' : 'Daily philosophical inspiration across civilizations.'}
                </p>

                {/* Quote Card */}
                <div style={{
                    width: '100%',
                    background: 'white',
                    borderRadius: '18px',
                    padding: '24px 20px',
                    border: '1px solid #e9d5ff',
                    boxShadow: '0 8px 25px rgba(124, 58, 237, 0.08)',
                    position: 'relative',
                    marginBottom: '20px',
                    textAlign: 'left'
                }}>
                    <Quote size={28} color="#c084fc" style={{ opacity: 0.4, marginBottom: '8px' }} />
                    <p style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1f2937',
                        lineHeight: 1.6,
                        margin: '0 0 14px 0',
                        fontStyle: 'italic'
                    }}>
                        {quoteText}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3e8ff', paddingTop: '12px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '750', color: '#6b21a8' }}>
                            —— {capsule.source}
                        </span>
                        <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: realm.accentBg,
                            color: realm.color
                        }}>
                            {realmName}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                    {realm.url !== '#' && (
                        <button
                            onClick={handleVisitRealm}
                            style={{
                                flex: 1,
                                padding: '12px 16px',
                                borderRadius: '14px',
                                border: '1px solid #ddd6fe',
                                background: '#f5f3ff',
                                color: '#6d28d9',
                                fontWeight: '750',
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <ExternalLink size={15} />
                            <span>{language === 'zh' ? `探索 ${realm.name.zh}` : `Explore ${realm.name.en}`}</span>
                        </button>
                    )}

                    <button
                        onClick={closeModal}
                        style={{
                            flex: 1,
                            padding: '12px 18px',
                            borderRadius: '14px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                            color: 'white',
                            fontWeight: '750',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.35)'
                        }}
                    >
                        <Check size={16} />
                        <span>{language === 'zh' ? '領悟並收藏' : 'Absorbed & Close'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
