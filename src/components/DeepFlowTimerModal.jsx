import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Sparkles, CheckCircle2, Brain, Coffee, Volume2, VolumeX } from 'lucide-react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';

export default function DeepFlowTimerModal({ isOpen, onClose }) {
    const { addExp, addSparks } = useGamification();
    const { language } = useLanguage();

    const [mode, setMode] = useState('focus'); // 'focus' (25m) or 'break' (5m)
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [showRewardBanner, setShowRewardBanner] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            if (mode === 'focus') {
                // Award points
                if (addExp) addExp(50, language === 'zh' ? '完成 25 分鐘深度專注心流' : 'Completed 25-min Deep Focus Flow');
                if (addSparks) addSparks(20);
                setCompletedSessions(prev => prev + 1);
                setShowRewardBanner(true);
                // Switch to break
                setMode('break');
                setTimeLeft(5 * 60);
            } else {
                setMode('focus');
                setTimeLeft(25 * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode, addExp, addSparks, language]);

    if (!isOpen) return null;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSwitchMode = (newMode) => {
        setIsRunning(false);
        setMode(newMode);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
        setShowRewardBanner(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const progressPercent = mode === 'focus'
        ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
        : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            padding: '20px',
            animation: 'fadeIn 0.2s ease'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '460px',
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        right: '20px',
                        top: '20px',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid var(--border-light)',
                        background: 'var(--bg)',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                    }}
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        background: mode === 'focus' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: mode === 'focus' ? '#7c3aed' : '#059669',
                        fontSize: '12px',
                        fontWeight: '800',
                        marginBottom: '8px'
                    }}>
                        {mode === 'focus' ? <Brain size={14} /> : <Coffee size={14} />}
                        <span>{mode === 'focus' ? (language === 'zh' ? '前額葉專注模式' : 'Deep Focus Mode') : (language === 'zh' ? '預設模式網絡 (DMN) 發散放空' : 'Diffuse Recovery Mode')}</span>
                    </div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '22px', fontWeight: '850', color: 'var(--text)' }}>
                        {language === 'zh' ? '沉浸式心流研讀計時器' : 'Deep Flow Study Timer'}
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                        {mode === 'focus'
                            ? (language === 'zh' ? '專注於一本書或一項思維模型，完成可獲得 +50 EXP 獎勵' : 'Zero distractions. Complete 25 min to earn +50 EXP.')
                            : (language === 'zh' ? '請起立伸展、漫步深呼吸，讓大腦潛意識重組突觸' : 'Stand up, breathe, and let your subconscious connect dots.')}
                    </p>
                </div>

                {/* Mode Selector Tabs */}
                <div style={{
                    display: 'flex',
                    background: 'var(--bg)',
                    borderRadius: '12px',
                    padding: '4px',
                    marginBottom: '28px',
                    border: '1px solid var(--border-light)'
                }}>
                    <button
                        onClick={() => handleSwitchMode('focus')}
                        style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            background: mode === 'focus' ? 'white' : 'transparent',
                            color: mode === 'focus' ? '#7c3aed' : 'var(--text-secondary)',
                            fontWeight: '800',
                            fontSize: '13px',
                            cursor: 'pointer',
                            boxShadow: mode === 'focus' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        🎯 {language === 'zh' ? '專注 25 分鐘' : 'Focus (25m)'}
                    </button>
                    <button
                        onClick={() => handleSwitchMode('break')}
                        style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            background: mode === 'break' ? 'white' : 'transparent',
                            color: mode === 'break' ? '#059669' : 'var(--text-secondary)',
                            fontWeight: '800',
                            fontSize: '13px',
                            cursor: 'pointer',
                            boxShadow: mode === 'break' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        ☕ {language === 'zh' ? '發散休息 5 分鐘' : 'Break (5m)'}
                    </button>
                </div>

                {/* Circular Timer Visual Display */}
                <div style={{
                    position: 'relative',
                    width: '210px',
                    height: '210px',
                    margin: '0 auto 28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: mode === 'focus'
                        ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0.02) 70%)'
                        : 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 70%)',
                    border: `6px solid ${mode === 'focus' ? '#ede9fe' : '#d1fae5'}`,
                    boxShadow: isRunning ? `0 0 35px ${mode === 'focus' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(16, 185, 129, 0.25)'}` : 'none',
                    transition: 'box-shadow 0.5s ease'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '48px',
                            fontWeight: '900',
                            fontFamily: 'monospace',
                            color: mode === 'focus' ? '#5b21b6' : '#065f46',
                            letterSpacing: '-0.03em',
                            lineHeight: 1
                        }}>
                            {formatTime(timeLeft)}
                        </div>
                        <div style={{
                            fontSize: '11px',
                            fontWeight: '750',
                            color: 'var(--text-muted)',
                            marginTop: '6px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em'
                        }}>
                            {isRunning ? (language === 'zh' ? '心流進行中...' : 'FLOW ACTIVE') : (language === 'zh' ? '準備就緒' : 'READY')}
                        </div>
                    </div>
                </div>

                {/* Reward Banner */}
                {showRewardBanner && (
                    <div style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        padding: '10px 16px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        fontWeight: '800',
                        animation: 'fadeInUp 0.3s ease'
                    }}>
                        <Sparkles size={16} />
                        <span>{language === 'zh' ? '恭喜完成心流！已獲得 +50 EXP 與 +20 靈感點！' : 'Session Complete! +50 EXP & +20 Sparks Earned!'}</span>
                    </div>
                )}

                {/* Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                    <button
                        onClick={() => setIsRunning(!isRunning)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 32px',
                            borderRadius: '14px',
                            background: isRunning
                                ? '#ea580c'
                                : (mode === 'focus' ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : 'linear-gradient(135deg, #059669, #047857)'),
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: '850',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        {isRunning ? <Pause size={18} /> : <Play size={18} />}
                        <span>{isRunning ? (language === 'zh' ? '暫停計時' : 'Pause') : (language === 'zh' ? '開啟心流' : 'Start Flow')}</span>
                    </button>

                    <button
                        onClick={handleReset}
                        title={language === 'zh' ? '重設時間' : 'Reset'}
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '14px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg)',
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                        }}
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>

                {/* Footer stats */}
                <div style={{
                    marginTop: '24px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: 'var(--text-muted)'
                }}>
                    <span>{language === 'zh' ? '今日完成心流' : 'Completed Today'}: <strong style={{ color: 'var(--primary)' }}>{completedSessions} 次</strong></span>
                    <span>{language === 'zh' ? '累積專注' : 'Focus Time'}: <strong style={{ color: 'var(--primary)' }}>{completedSessions * 25} 分鐘</strong></span>
                </div>
            </div>
        </div>
    );
}
