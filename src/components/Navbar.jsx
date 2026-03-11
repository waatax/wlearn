import React from 'react';
import { Search, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <nav className="top-navbar">
            <div className="search-bar">
                <Search size={18} color="var(--text-muted)" />
                <input type="text" placeholder={t('searchPlaceholder')} />
            </div>

            <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language">
                <Globe size={18} />
                {language === 'zh' ? 'EN' : '中文'}
            </button>
        </nav>
    );
};

export default Navbar;
