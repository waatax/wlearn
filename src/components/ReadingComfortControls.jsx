import React from 'react';
import { Minus, Plus, Settings2, Sliders, Type, Palette } from 'lucide-react';
import { useReadingSettings } from '../context/ReadingSettingsContext';
import { useLanguage } from '../context/LanguageContext';

export default function ReadingComfortControls({ compact = false }) {
    const {
        settings,
        increaseFontSize,
        decreaseFontSize,
        setIsSettingsOpen
    } = useReadingSettings();
    const { language } = useLanguage();
    const isZh = language === 'zh';

    if (compact) {
        return (
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '2px 4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
                <button
                    onClick={decreaseFontSize}
                    title={isZh ? '縮小字體' : 'Decrease font size'}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        padding: '4px 6px',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '700'
                    }}
                >
                    A-
                </button>
                <div style={{ width: '1px', height: '12px', background: 'var(--border)' }} />
                <button
                    onClick={increaseFontSize}
                    title={isZh ? '放大字體' : 'Increase font size'}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        padding: '4px 6px',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '700'
                    }}
                >
                    A+
                </button>
                <div style={{ width: '1px', height: '12px', background: 'var(--border)' }} />
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    title={isZh ? '閱讀舒適度設定 (色調/行距/字型)' : 'Reading preferences'}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        padding: '4px 6px',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Palette size={14} />
                </button>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '4px 8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
        }}>
            <button
                onClick={decreaseFontSize}
                title={isZh ? '縮小字體 (A-)' : 'Decrease font'}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    padding: '4px 6px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '700'
                }}
            >
                A-
            </button>

            <span style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                fontWeight: '600',
                padding: '0 2px',
                userSelect: 'none'
            }}>
                {settings.fontSize.toUpperCase()}
            </span>

            <button
                onClick={increaseFontSize}
                title={isZh ? '放大字體 (A+)' : 'Increase font'}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    padding: '4px 6px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '700'
                }}
            >
                A+
            </button>

            <div style={{ width: '1px', height: '14px', background: 'var(--border)', margin: '0 2px' }} />

            <button
                onClick={() => setIsSettingsOpen(true)}
                style={{
                    background: 'var(--sidebar-active)',
                    border: 'none',
                    color: 'var(--primary)',
                    padding: '5px 8px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                }}
            >
                <Palette size={13} />
                <span className="hidden sm:inline">{isZh ? '閱讀模式' : 'Reader'}</span>
            </button>
        </div>
    );
}
