import { useLanguage } from '@/contexts/LanguageContext';
import { Play, BookOpen } from 'lucide-react';
import { Badge } from './ui/badge';
import { useLocation } from 'wouter';

// 標籤翻譯
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

interface BookCardProps {
  book: Book;
}

function translateTag(tag: string, language: string): string {
  const translation = TAG_TRANSLATIONS[tag];
  if (!translation) {
    return tag;
  }
  return translation[language === 'zh' ? 'zh' : 'en'] || tag;
}

export function BookCard({ book }: BookCardProps) {
  const { language } = useLanguage();
  const [, navigate] = useLocation();

  const title = language === 'zh' ? book.title_cn : book.title_en;
  const displayTitle = title || (language === 'zh' ? book.title_en : book.title_cn) || 'Untitled';

  const handleCardClick = () => {
    navigate(`/book?id=${book.id}`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();