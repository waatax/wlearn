import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Compass, Home as HomeIcon, ArrowLeft, Globe, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'var(--bg-gradient)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Ambient Background Circles */}
            <div style={{
                position: 'absolute',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'rgba(45, 102, 72, 0.08)',
                filter: 'blur(60px)',
                top: '10%',
                left: '15%'
            }} />
            <div style={{
                position: 'absolute',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'rgba(202, 122, 44, 0.08)',
                filter: 'blur(60px)',
                bottom: '10%',
                right: '15%'
            }} />

            <div style={{
                maxWidth: '520px',
                width: '100%',
                background: 'white',
                borderRadius: '24px',
                padding: '48px 36px',
                textAlign: 'center',
                boxShadow: '0 20px 40px -15px rgba(35, 55, 45, 0.12)',
                border: '1px solid var(--border-light)',
                position: 'relative',
                zIndex: 1,
                animation: 'fadeInUp 0.5s ease both'
            }}>
                <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    border: '1px solid #86efac',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 8px 20px -6px rgba(22, 163, 74, 0.25)'
                }}>
                    <Compass size={36} color="var(--primary)" />
                </div>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--tag-bg)',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: '800',
                    color: 'var(--primary)',
                    marginBottom: '14px'
                }}>
                    <Sparkles size={12} />
                    <span>404 COSMIC ANOMALY</span>
                </div>

                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '900',
                    color: 'var(--text)',
                    margin: '0 0 10px',
                    letterSpacing: '-0.02em'
                }}>
                    {language === 'zh' ? '迷航於知識宇宙邊境' : 'Lost at the Edge of Cosmos'}
                </h1>

                <p style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: '0 0 32px'
                }}>
                    {language === 'zh'
                        ? '這顆知識星體尚未被探索，或者座標已在時空中位移。請返回主星圖重新啟程。'
                        : 'This knowledge celestial body has not been charted yet, or its coordinates have shifted. Please return to the prime starmap.'}
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            padding: '11px 20px',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            background: 'white',
                            color: 'var(--text)',
                            fontSize: '13px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <ArrowLeft size={16} />
                        <span>{language === 'zh' ? '返回上一頁' : 'Go Back'}</span>
                    </button>

                    <Link
                        to="/"
                        style={{
                            padding: '11px 22px',
                            borderRadius: '12px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: '750',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 14px rgba(45, 102, 72, 0.3)',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <HomeIcon size={16} />
                        <span>{language === 'zh' ? '回到首頁典藏' : 'Return Home'}</span>
                    </Link>

                    <Link
                        to="/universe"
                        style={{
                            padding: '11px 20px',
                            borderRadius: '12px',
                            border: '1px solid #c4b5fd',
                            background: '#f5f3ff',
                            color: '#6d28d9',
                            fontSize: '13px',
                            fontWeight: '750',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <Globe size={16} />
                        <span>{language === 'zh' ? '6 大星系' : 'Cosmic Realms'}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
