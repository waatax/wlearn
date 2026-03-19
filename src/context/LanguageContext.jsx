import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
    zh: {
        siteTitle: '📚 WLearn',
        siteSubtitle: '發現精選書籍',
        search: '搜尋書籍...',
        tags: '標籤',
        playlists: '播放清單',
        all: '全部',
        play: '播放',
        booksFound: '本書籍',
        showing: '顯示',
        outOf: '/',
        backToList: '返回書單',
        playEpisode: '播放',
        englishVersion: '英文版',
        noBooks: '找不到符合條件的書籍',
        aboutAuthor: '關於作者',
        authorBio: '作者介紹',
        achievements: '主要成就',
        booksCollected: '收錄書籍',
        career: '專業領域',
        stats: '數據統計',
        back: '返回',
        viewProfile: '查看完整專頁',
        publishingInfo: '書籍出版資訊',
        originalLanguage: '原著語言',
        isbnEn: '英文版 ISBN-13',
        isbnZh: '中文版 ISBN-13',
        authorsList: '作者列表',
        booksByAuthor: '本站書籍',
    },
    en: {
        siteTitle: '📚 WLearn',
        siteSubtitle: 'Discover curated books',
        search: 'Search books...',
        tags: 'Tags',
        playlists: 'Playlists',
        all: 'All',
        play: 'Play',
        booksFound: 'books',
        showing: 'Showing',
        outOf: '/',
        backToList: 'Back to list',
        playEpisode: 'Play',
        englishVersion: 'English Version',
        noBooks: 'No books found',
        aboutAuthor: 'About Author',
        authorBio: 'Author Biography',
        achievements: 'Key Achievements',
        booksCollected: 'Curated Books',
        career: 'Career',
        stats: 'Statistics',
        back: 'Back',
        viewProfile: 'View Profile',
        publishingInfo: 'Publishing Information',
        originalLanguage: 'Original Language',
        isbnEn: 'English ISBN-13',
        isbnZh: 'Chinese ISBN-13',
        authorsList: 'Authors List',
        booksByAuthor: 'Books in Site',
    },
};

const tagTranslations = {
    '人文與科學': 'Humanities & Science',
    '個人成長': 'Personal Growth',
    '心理學': 'Psychology',
    '商業': 'Business',
    '投資理財': 'Finance',
    '健康與生活': 'Health & Life',
    '文學與故事': 'Literature',
    '科技': 'Technology',
    '社會與文化': 'Society & Culture',
    '職場工作': 'Career',
    '哲學思維': 'Philosophy',
    '溝通表達': 'Communication',
    '教育學習': 'Education',
    '歷史': 'History',
    '親子教養': 'Parenting',
    '心智與思維': 'Mindset',
    '自我認識': 'Self-awareness',
    '環境閱讀': 'Environment',
    '飲食健康': 'Food & Health',
    '行旅閱讀': 'Travel',
    '創業': 'Entrepreneurship',
    '設計': 'Design',
    '運動健身': 'Sports & Fitness',
    '管理領導': 'Leadership',
    '音樂': 'Music',
    '電影': 'Film',
    '政治': 'Politics',
    '法律': 'Law',
    '數學': 'Math',
    '物理': 'Physics',
    '生物': 'Biology',
    '工作效率': 'Productivity',
    '思考技術': 'Critical Thinking',
    '未來趨勢': 'Future Trends',
    '心靈平靜': 'Mindfulness',
    '創業經營': 'Management',
    '溝通談判': 'Negotiation',
    '閱讀學習': 'Learning',
    '財富自由': 'Financial Freedom'
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('zh');

    const t = (key) => translations[language][key] || key;
    const toggleLanguage = () => setLanguage(l => l === 'zh' ? 'en' : 'zh');
    const translateTag = (tag) => language === 'en' ? (tagTranslations[tag] || tag) : tag;

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage, translateTag }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
