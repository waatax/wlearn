import React, { createContext, useContext, useState, useEffect } from 'react';

const ReadingSettingsContext = createContext(null);

const STORAGE_KEY = 'welearn_reading_settings_v2';

export const THEME_MODES = {
    forest: {
        id: 'forest',
        nameZh: '自然墨綠 (經典)',
        nameEn: 'Sage Forest',
        bg: '#f2f7f3',
        bgGradient: 'linear-gradient(to bottom, #f3f8f4 0%, #e5ede7 100%)',
        cardBg: '#ffffff',
        text: '#1f2923',
        textSecondary: '#48544d',
        textMuted: '#728277',
        border: '#d2ded5',
        primary: '#2d6648',
        primaryLight: '#42825d',
        accent: '#ca7a2c',
        previewColor: '#2d6648'
    },
    warm: {
        id: 'warm',
        nameZh: '暖紙羊皮 (護眼)',
        nameEn: 'Warm Paper',
        bg: '#faf6ee',
        bgGradient: 'linear-gradient(to bottom, #fbf7ef 0%, #f3ece0 100%)',
        cardBg: '#fffdf9',
        text: '#2c2520',
        textSecondary: '#5a4d43',
        textMuted: '#8c7b6e',
        border: '#e6dac8',
        primary: '#854d0e',
        primaryLight: '#a16207',
        accent: '#c2410c',
        previewColor: '#d97706'
    },
    pure: {
        id: 'pure',
        nameZh: '澄澈雅白 (明亮)',
        nameEn: 'Pure Slate',
        bg: '#f8fafc',
        bgGradient: 'linear-gradient(to bottom, #ffffff 0%, #f1f5f9 100%)',
        cardBg: '#ffffff',
        text: '#0f172a',
        textSecondary: '#334155',
        textMuted: '#64748b',
        border: '#e2e8f0',
        primary: '#2563eb',
        primaryLight: '#3b82f6',
        accent: '#0d9488',
        previewColor: '#3b82f6'
    },
    night: {
        id: 'night',
        nameZh: '星夜深邃 (暗黑)',
        nameEn: 'Deep Night',
        bg: '#111815',
        bgGradient: 'linear-gradient(to bottom, #131c17 0%, #0d1310 100%)',
        cardBg: '#18241e',
        text: '#e6ede8',
        textSecondary: '#b1c4b8',
        textMuted: '#768c7e',
        border: '#283c30',
        primary: '#4ade80',
        primaryLight: '#86efac',
        accent: '#fbbf24',
        previewColor: '#10b981'
    }
};

export const FONT_SIZES = {
    sm: { id: 'sm', label: '標準小', scale: 0.92, basePx: 14.5 },
    base: { id: 'base', label: '舒適適中', scale: 1.0, basePx: 16 },
    lg: { id: 'lg', label: '清晰大字', scale: 1.12, basePx: 18 },
    xl: { id: 'xl', label: '特大護眼', scale: 1.25, basePx: 20 }
};

const DEFAULT_SETTINGS = {
    theme: 'forest',
    fontSize: 'base',
    lineSpacing: 'normal', // 'normal' (1.65) or 'relaxed' (1.9)
    fontFamily: 'sans', // 'sans' or 'serif'
    contentWidth: 'normal' // 'normal' (max 880px) or 'wide' (full)
};

export function ReadingSettingsProvider({ children }) {
    const [settings, setSettings] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
            }
        } catch {
            // fallback
        }
        return DEFAULT_SETTINGS;
    });

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Sync settings to localStorage and DOM root
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            console.error('Failed to save reading settings', e);
        }

        const root = document.documentElement;
        const currentTheme = THEME_MODES[settings.theme] || THEME_MODES.forest;
        const currentFont = FONT_SIZES[settings.fontSize] || FONT_SIZES.base;

        root.setAttribute('data-theme', settings.theme);
        root.setAttribute('data-font-size', settings.fontSize);
        root.setAttribute('data-font-family', settings.fontFamily);
        root.setAttribute('data-line-spacing', settings.lineSpacing);

        // Apply CSS Variables directly for instant response
        root.style.setProperty('--bg', currentTheme.bg);
        root.style.setProperty('--bg-gradient', currentTheme.bgGradient);
        root.style.setProperty('--card-bg', currentTheme.cardBg);
        root.style.setProperty('--text', currentTheme.text);
        root.style.setProperty('--text-secondary', currentTheme.textSecondary);
        root.style.setProperty('--text-muted', currentTheme.textMuted);
        root.style.setProperty('--border', currentTheme.border);
        root.style.setProperty('--primary', currentTheme.primary);
        root.style.setProperty('--primary-light', currentTheme.primaryLight);
        root.style.setProperty('--accent', currentTheme.accent);

        // Font scaling
        root.style.setProperty('--reading-font-scale', `${currentFont.scale}`);
        root.style.setProperty('--reading-font-base', `${currentFont.basePx}px`);
        root.style.setProperty(
            '--reading-line-height',
            settings.lineSpacing === 'relaxed' ? '1.9' : '1.68'
        );
        root.style.setProperty(
            '--reading-font-family',
            settings.fontFamily === 'serif'
                ? `'Noto Serif TC', 'Songti TC', 'SimSun', Georgia, serif`
                : `'Inter', 'Noto Sans TC', -apple-system, BlinkMacSystemFont, sans-serif`
        );
    }, [settings]);

    const setTheme = (themeId) => {
        if (THEME_MODES[themeId]) {
            setSettings(prev => ({ ...prev, theme: themeId }));
        }
    };

    const setFontSize = (sizeId) => {
        if (FONT_SIZES[sizeId]) {
            setSettings(prev => ({ ...prev, fontSize: sizeId }));
        }
    };

    const increaseFontSize = () => {
        const order = ['sm', 'base', 'lg', 'xl'];
        const currentIdx = order.indexOf(settings.fontSize);
        if (currentIdx < order.length - 1) {
            setFontSize(order[currentIdx + 1]);
        }
    };

    const decreaseFontSize = () => {
        const order = ['sm', 'base', 'lg', 'xl'];
        const currentIdx = order.indexOf(settings.fontSize);
        if (currentIdx > 0) {
            setFontSize(order[currentIdx - 1]);
        }
    };

    const toggleLineSpacing = () => {
        setSettings(prev => ({
            ...prev,
            lineSpacing: prev.lineSpacing === 'relaxed' ? 'normal' : 'relaxed'
        }));
    };

    const toggleFontFamily = () => {
        setSettings(prev => ({
            ...prev,
            fontFamily: prev.fontFamily === 'serif' ? 'sans' : 'serif'
        }));
    };

    const toggleContentWidth = () => {
        setSettings(prev => ({
            ...prev,
            contentWidth: prev.contentWidth === 'wide' ? 'normal' : 'wide'
        }));
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
    };

    return (
        <ReadingSettingsContext.Provider
            value={{
                settings,
                setTheme,
                setFontSize,
                increaseFontSize,
                decreaseFontSize,
                toggleLineSpacing,
                toggleFontFamily,
                toggleContentWidth,
                resetSettings,
                isSettingsOpen,
                setIsSettingsOpen
            }}
        >
            {children}
        </ReadingSettingsContext.Provider>
    );
}

export function useReadingSettings() {
    const context = useContext(ReadingSettingsContext);
    if (!context) {
        throw new Error('useReadingSettings must be used within a ReadingSettingsProvider');
    }
    return context;
}
