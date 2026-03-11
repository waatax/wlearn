import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronDown, Search, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// 標籤翻譯
const TAG_TRANSLATIONS: Record<string, Record<string, string>> = {
  '個人成長': { en: 'Personal Growth', zh: '個人成長' },
  '職場工作': { en: 'Workplace & Work', zh: '職場工作' },
  '投資理財': { en: 'Investment & Finance', zh: '投資理財' },
  '提高生產力': { en: 'Productivity', zh: '提高生產力' },
  '商業與創業': { en: 'Business & Entrepreneurship', zh: '商業與創業' },
  '品牌與行銷': { en: 'Branding & Marketing', zh: '品牌與行銷' },
  '人文與科學': { en: 'Humanities & Science', zh: '人文與科學' },
  '自傳與小說': { en: 'Biography & Fiction', zh: '自傳與小說' },
  '健康與生活': { en: 'Health & Lifestyle', zh: '健康與生活' },
  '心理學': { en: 'Psychology', zh: '心理學' },
  '思維方式': { en: 'Thinking & Mindset', zh: '思維方式' },
  '推薦書籍': { en: 'Recommended Books', zh: '推薦書籍' },
  '心智與思維': { en: 'Mind & Thinking', zh: '心智與思維' },
  '職場與領導': { en: 'Workplace & Leadership', zh: '職場與領導' },
  '寫作與表達': { en: 'Writing & Expression', zh: '寫作與表達' },
  '生產力與時間': { en: 'Productivity & Time', zh: '生產力與時間' },
  '科學與人文': { en: 'Science & Humanities', zh: '科學與人文' },
  '投資與理財': { en: 'Investment & Finance', zh: '投資與理財' },
  '藝術與文化': { en: 'Art & Culture', zh: '藝術與文化' },
  '傳記與故事': { en: 'Biography & Stories', zh: '傳記與故事' },
  '健康與運動': { en: 'Health & Sports', zh: '健康與運動' },
  '行銷與品牌': { en: 'Marketing & Branding', zh: '行銷與品牌' },
};

function translateTag(tag: string, language: string): string {
  const translation = TAG_TRANSLATIONS[tag];
  if (!translation) {
    return tag;
  }
  return translation[language === 'zh' ? 'zh' : 'en'] || tag;
}

interface FilterSidebarProps {
  allTags: string[];
  allPlaylists: string[];
  selectedTags: string[];
  selectedPlaylist: string | null;
  searchQuery: string;
  onTagToggle: (tag: string) => void;
  onPlaylistChange: (playlist: string | null) => void;
  onSearchChange: (query: string) => void;
  onReset: () => void;
}

export function FilterSidebar({
  allTags,
  allPlaylists,
  selectedTags,
  selectedPlaylist,
  searchQuery,
  onTagToggle,
  onSearchChange,
  onPlaylistChange,
  onReset,
}: FilterSidebarProps) {
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    tags: true,
    playlists: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedPlaylist || searchQuery;

  return (
    <div className="w-full md:w-64 flex-shrink-0 space-y-4">
      {/* 搜尋 */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('search')}
          className="flex items-center justify-between w-full text-sm font-semibold text-card-foreground hover:text-primary transition-colors"
        >
          <span>{language === 'zh' ? '搜尋' : 'Search'}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${expandedSections.search ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.search && (
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={language === 'zh' ? '搜尋書籍...' : 'Search books...'}
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
      </div>

      {/* 標籤篩選 */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('tags')}
          className="flex items-center justify-between w-full text-sm font-semibold text-card-foreground hover:text-primary transition-colors"
        >
          <span>{language === 'zh' ? '標籤' : 'Tags'}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${expandedSections.tags ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.tags && (
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                } px-3 py-1 rounded-full text-xs font-medium`}
              >
                {translateTag(tag, language)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 播放清單篩選 */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection('playlists')}
          className="flex items-center justify-between w-full text-sm font-semibold text-card-foreground hover:text-primary transition-colors"
        >
          <span>{language === 'zh' ? '播放清單' : 'Playlists'}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${expandedSections.playlists ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.playlists && (
          <div className="space-y-2">
            <button
              onClick={() => onPlaylistChange(null)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                selectedPlaylist === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {language === 'zh' ? '全部' : 'All'}
            </button>
            {allPlaylists.map(playlist => (
              <button
                key={playlist}
                onClick={() => onPlaylistChange(playlist)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                  selectedPlaylist === playlist
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {playlist}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 重置按鈕 */}
      {hasActiveFilters && (
        <Button
          onClick={onReset}
          variant="outline"
          size="sm"
          className="w-full gap-2"
        >
          <X size={14} />
          {language === 'zh' ? '重置篩選' : 'Reset Filters'}
        </Button>
      )}
    </div>
  );
}
