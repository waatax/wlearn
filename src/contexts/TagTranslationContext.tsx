import React, { createContext, useContext } from 'react';

// 標籤翻譯映射
const TAG_TRANSLATIONS: Record<string, Record<string, string>> = {
  '個人成長': { en: 'Personal Growth', zh: '個人成長' },
  '職場工作': { en: 'Workplace & Work', zh: '職場工作' },
  '投資理財': { en: 'Investment & Finance', zh: '投資理財' },
  '提高生產力': { en: 'Productivity', zh: '提高生產力' },
  '商業與創業': { en: 'Business & Entrepreneurship', zh: '商業與創業' },
  '品牌與行銷': { en: 'Branding & Marketing', zh: '品牌與行銷' },
  '閱讀筆記與寫作': { en: 'Reading Notes & Writing', zh: '閱讀筆記與寫作' },
  '人文與科學': { en: 'Humanities & Science', zh: '人文與科學' },
  '自傳與小說': { en: 'Biography & Fiction', zh: '自傳與小說' },
  '健康與生活': { en: 'Health & Lifestyle', zh: '健康與生活' },
  '心理學': { en: 'Psychology', zh: '心理學' },
  '思維方式': { en: 'Thinking & Mindset', zh: '思維方式' },
  '推薦書籍': { en: 'Recommended Books', zh: '推薦書籍' },
  '心智與思維': { en: 'Mind & Thinking', zh: '心智與思維' },
  '職場與領導': { en: 'Workplace & Leadership', zh: '職場與領導' },
};

interface TagTranslationContextType {
  translateTag: (tag: string, language: 'zh' | 'en') => string;
}

const TagTranslationContext = createContext<TagTranslationContextType | undefined>(undefined);

export function TagTranslationProvider({ children }: { children: React.ReactNode }) {
  const translateTag = (tag: string, language: 'zh' | 'en'): string => {
    const translation = TAG_TRANSLATIONS[tag];
    if (!translation) {
      return tag; // 如果沒有翻譯，返回原始標籤
    }
    return translation[language] || tag;
  };

  return (
    <TagTranslationContext.Provider value={{ translateTag }}>
      {children}
    </TagTranslationContext.Provider>
  );
}

export function useTagTranslation() {
  const context = useContext(TagTranslationContext);
  if (!context) {
    throw new Error('useTagTranslation must be used within TagTranslationProvider');
  }
  return context;
}
