import React from 'react';
import {
    X,
    Sun,
    Moon,
    BookOpen,
    Type,
    AlignLeft,
    Check,
    RotateCcw,
    Sparkles,
    Eye
} from 'lucide-react';
import { useReadingSettings, THEME_MODES, FONT_SIZES } from '../context/ReadingSettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function ReadingSettingsModal() {
    const {
        settings,
        setTheme,
        setFontSize,
        increaseFontSize,
        decreaseFontSize,
        toggleLineSpacing,
        toggleFontFamily,
        resetSettings,
        isSettingsOpen,
        setIsSettingsOpen
    } = useReadingSettings();
    const { language } = useLanguage();

    if (!isSettingsOpen) return null;

    const isZh = language === 'zh';

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                animation: 'fadeIn 0.2s ease-out'
            }}
            onClick={() => setIsSettingsOpen(false)}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '540px',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--text)',
                    borderRadius: '24px 24px 0 0',
                    padding: '24px 20px',
                    paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
                    boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.18)',
                    border: '1px solid var(--border)',
                    borderBottom: 'none',
                    animation: 'fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    maxHeight: '90dvh',
                    overflowY: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '10px',
                            background: 'var(--sidebar-active)',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Eye size={18} />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>
                                {isZh ? '閱讀舒適度偏好' : 'Reading Preferences'}
                            </h3>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                                {isZh ? '自訂色調與字級，手機與電腦即時同步' : 'Customize palette and font scaling'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSettingsOpen(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '6px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Section 1: Themes */}
                <div style={{ marginBottom: '22px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>
                        {isZh ? '🎨 閱讀色調模式' : 'Theme Mode'}
                    </label>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '10px'
                    }}>
                        {Object.values(THEME_MODES).map((theme) => {
                            const isSelected = settings.theme === theme.id;
                            return (
                                <button
                                    key={theme.id}
                                    onClick={() => setTheme(theme.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '12px 14px',
                                        borderRadius: '14px',
                                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        background: theme.cardBg,
                                        color: theme.text,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                                        textAlign: 'left'
                                    }}
                                >
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        background: theme.previewColor,
                                        border: '2px solid rgba(255,255,255,0.8)',
                                        flexShrink: 0,
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.15)'
                                    }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: '13px', fontWeight: isSelected ? '700' : '500' }}>
                                            {isZh ? theme.nameZh : theme.nameEn}
                                        </div>
                                    </div>
                                    {isSelected && <Check size={16} color="var(--primary)" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Section 2: Font Size Adjustment */}
                <div style={{ marginBottom: '22px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                            {isZh ? '🔤 閱讀字體大小' : 'Font Size'}
                        </label>
                        <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>
                            {FONT_SIZES[settings.fontSize]?.label} ({Math.round(FONT_SIZES[settings.fontSize]?.scale * 100)}%)
                        </span>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '8px'
                    }}>
                        {Object.entries(FONT_SIZES).map(([sizeKey, sizeData]) => {
                            const isSelected = settings.fontSize === sizeKey;
                            return (
                                <button
                                    key={sizeKey}
                                    onClick={() => setFontSize(sizeKey)}
                                    style={{
                                        padding: '10px 4px',
                                        borderRadius: '12px',
                                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        background: isSelected ? 'var(--sidebar-active)' : 'transparent',
                                        color: isSelected ? 'var(--primary)' : 'var(--text)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '4px',
                                        transition: 'all 0.18s ease'
                                    }}
                                >
                                    <span style={{
                                        fontSize: sizeKey === 'sm' ? '13px' : sizeKey === 'base' ? '15px' : sizeKey === 'lg' ? '18px' : '21px',
                                        fontWeight: '700',
                                        lineHeight: 1
                                    }}>
                                        A
                                    </span>
                                    <span style={{ fontSize: '11px', opacity: 0.8 }}>
                                        {sizeData.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Section 3: Typography & Spacing */}
                <div style={{ marginBottom: '22px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>
                        {isZh ? '📐 字型風格與排版行距' : 'Font Style & Line Spacing'}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {/* Font Family Toggle */}
                        <button
                            onClick={toggleFontFamily}
                            style={{
                                padding: '12px 14px',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                                background: 'transparent',
                                color: 'var(--text)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                textAlign: 'left'
                            }}
                        >
                            <Type size={16} color="var(--primary)" />
                            <div>
                                <div style={{ fontWeight: '600' }}>
                                    {settings.fontFamily === 'serif' ? (isZh ? '雅緻宋體' : 'Serif') : (isZh ? '清晰黑體' : 'Sans-Serif')}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    {settings.fontFamily === 'serif' ? (isZh ? '書卷古典風' : 'Classic') : (isZh ? '現代簡約風' : 'Modern')}
                                </div>
                            </div>
                        </button>

                        {/* Line Spacing Toggle */}
                        <button
                            onClick={toggleLineSpacing}
                            style={{
                                padding: '12px 14px',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                                background: 'transparent',
                                color: 'var(--text)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                textAlign: 'left'
                            }}
                        >
                            <AlignLeft size={16} color="var(--primary)" />
                            <div>
                                <div style={{ fontWeight: '600' }}>
                                    {settings.lineSpacing === 'relaxed' ? (isZh ? '舒適寬行距' : 'Relaxed') : (isZh ? '標準行距' : 'Normal')}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                    {settings.lineSpacing === 'relaxed' ? '1.9x 呼吸感' : '1.68x 緊實'}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                    <button
                        onClick={resetSettings}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12px',
                            padding: '6px 8px',
                            borderRadius: '8px'
                        }}
                    >
                        <RotateCcw size={14} />
                        {isZh ? '恢復預設' : 'Reset'}
                    </button>
                    <button
                        onClick={() => setIsSettingsOpen(false)}
                        style={{
                            background: 'var(--primary)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '8px 20px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px var(--primary-glow)'
                        }}
                    >
                        {isZh ? '完成' : 'Done'}
                    </button>
                </div>
            </div>
        </div>
    );
}
