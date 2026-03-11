import { useEffect, useState, useMemo } from 'react';
import { Book } from '@/../../shared/types';
import { BookCard } from '@/components/BookCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export default function Home() {
  const { language, toggleLanguage } = useLanguage();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 載入書籍資料
  useEffect(() => {
    fetch('books.json')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load books:', err);
        setLoading(false);
      });
  }, []);

  // 獲取所有唯一的標籤和播放清單
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    books.forEach(book => {
      book.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [books]);

  const allPlaylists = useMemo(() => {
    const playlists = new Set<string>();
    books.forEach(book => {
      playlists.add(book.playlist);
    });
    return Array.from(playlists).sort();
  }, [books]);

  // 篩選書籍
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // 標籤篩選
      if (selectedTags.length > 0) {
        const hasAnyTag = selectedTags.some(tag => book.tags.includes(tag));
        if (!hasAnyTag) return false;
      }

      // 播放清單篩選
      if (selectedPlaylist && book.playlist !== selectedPlaylist) {
        return false;
      }

      // 搜尋篩選
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const titleMatch = (book.title_cn?.toLowerCase().includes(query) || false) ||
                          (book.title_en?.toLowerCase().includes(query) || false);
        if (!titleMatch) return false;
      }

      return true;
    });
  }, [books, selectedTags, selectedPlaylist, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handlePlaylistChange = (playlist: string | null) => {
    setSelectedPlaylist(playlist);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleReset = () => {
    setSelectedTags([]);
    setSelectedPlaylist(null);
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          <p className="mt-4 text-muted-foreground">
            {language === 'zh' ? '載入中...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 頁頭 */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {language === 'zh' ? '📚 WLearn' : '📚 WLearn'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {language === 'zh' 
                ? `發現 ${books.length} 本精選書籍` 
                : `Discover ${books.length} curated books`}
            </p>
          </div>
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Globe size={16} />
            <span>{language === 'zh' ? 'EN' : '中文'}</span>
          </Button>
        </div>
      </header>

      {/* 主內容 */}
      <main className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 側邊欄 */}
          <FilterSidebar
            allTags={allTags}
            allPlaylists={allPlaylists}
            selectedTags={selectedTags}
            selectedPlaylist={selectedPlaylist}
            searchQuery={searchQuery}
            onTagToggle={handleTagToggle}
            onPlaylistChange={handlePlaylistChange}
            onSearchChange={handleSearchChange}
            onReset={handleReset}
          />

          {/* 書籍網格 */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                {language === 'zh'
                  ? `顯示 ${filteredBooks.length} / ${books.length} 本書籍`
                  : `Showing ${filteredBooks.length} / ${books.length} books`}
              </p>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {language === 'zh' ? '沒有找到符合條件的書籍' : 'No books found'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
