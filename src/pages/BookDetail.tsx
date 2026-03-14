import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Book } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Play, Globe, ArrowLeft } from 'lucide-react';

export default function BookDetail() {
  const { language } = useLanguage();
  const [, navigate] = useLocation();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  const bookId = new URLSearchParams(window.location.search).get('id');

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'books.json')
      .then(res => res.json())
      .then(data => {
        const foundBook = data.find((b: Book) => b.id === bookId);
        setBook(foundBook || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load book:', err);
        setLoading(false);
      });
  }, [bookId]);

  if (loading || !book) {
    return (
      <div className="min-h-screen bg-[#f5f1e8] flex items-center justify-center">
        <p className="text-muted-foreground">...</p>
      </div>
    );
  }

  const title = language === 'zh' ? book.title_cn : book.title_en;
  const displayTitle = title || (language === 'zh' ? book.title_en : book.title_cn) || 'Untitled';
  const description = language === 'zh' ? book.description_cn : book.description_en;

  return (
    <div className="min-h-screen bg-[#f5f1e8] py-8 px-4 font-sans text-gray-900">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium hover:text-gray-600 transition-colors"
        >
          <ArrowLeft size={16} />
          {language === 'zh' ? '返回' : 'Back'}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* 左側：編號、標題、封面圖 */}
          <div className="md:col-span-1 flex flex-col items-start">
            {book.code && (
              <span className="bg-[#f2b96e] text-black font-semibold text-sm px-4 py-1 rounded-full mb-4">
                {book.code}
              </span>
            )}

            <h1 className="text-3xl font-bold mb-6 mt-2 leading-tight">
              {displayTitle}
            </h1>

            {book.cover_url && (
              <img
                src={book.cover_url}
                alt={displayTitle}
                className="w-full rounded-xl shadow-sm object-cover"
                style={{ aspectRatio: '16/9' }}
              />
            )}
          </div>

          {/* 右側：按鈕、標籤、播放清單、簡介 */}
          <div className="md:col-span-2 space-y-4 pt-14">

            {/* 播放按鈕列 */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mb-8">
              <a
                href={book.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#0e7b89] text-white font-medium hover:bg-[#0b626d] transition-colors"
              >
                <Play size={18} />
                <span>{language === 'zh' ? '播放' : 'Play'}</span>
              </a>
              {book.english_url && (
                <a
                  href={book.english_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#e6ddd2] text-[#2c2b29] font-medium hover:bg-[#d8cebf] transition-colors"
                >
                  <Globe size={18} />
                  <span>{language === 'zh' ? '英文版' : 'English'}</span>
                </a>
              )}
            </div>

            {/* 標籤區 */}
            <div>
              <h2 className="text-sm font-semibold text-gray-600 mb-2">
                {language === 'zh' ? '標籤' : 'Tags'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {book.tags.map(tag => (
                  <span key={tag} className="bg-[#ede7dd] text-gray-800 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 播放清單區 */}
            <div className="bg-[#ede7dd] rounded-xl p-5 mt-4">
              <h3 className="text-xs text-gray-500 mb-1">
                {language === 'zh' ? '播放清單' : 'Playlist'}
              </h3>
              <p className="text-base text-gray-900 font-medium">{book.playlist}</p>
            </div>

            {/* 作者與簡介 */}
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
              {book.author && book.author !== 'Unknown' && (
                <div>
                  <h3 className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                    <span className="material-icons text-sm" />
                    {language === 'zh' ? '作者' : 'Author'}
                  </h3>
                  <p className="text-base text-gray-800 leading-relaxed font-semibold">
                    {book.author}
                  </p>
                </div>
              )}
              {description && (
                <div>
                  <h3 className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <span className="material-icons text-sm"></span>
                    {language === 'zh' ? '簡介' : 'Description'}
                  </h3>
                  <p className="text-[15px] text-gray-700 leading-relaxed max-w-none break-words">
                    {description}
                  </p>
                </div>
              )}
            </div>

            {/* YouTube Links */}
            <div className="bg-[#f0ebe0] rounded-xl p-6">
              <h3 className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <Play size={14} className="text-gray-400" />
                YouTube
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-gray-500 shrink-0" />
                  <span className="text-xs text-gray-500 shrink-0 w-12">{language === 'zh' ? '中文版' : 'Chinese'}</span>
                  <a href={book.youtube_url} target="_blank" rel="noreferrer" className="text-[#0e7b89] hover:underline truncate text-sm">
                    {book.youtube_url}
                  </a>
                </div>
                {book.english_url && (
                  <>
                    <div className="border-t border-[#e2dacb] my-2"></div>
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-gray-500 shrink-0" />
                      <span className="text-xs text-gray-500 shrink-0 w-12">{language === 'zh' ? '英文版' : 'English'}</span>
                      <a href={book.english_url} target="_blank" rel="noreferrer" className="text-[#0e7b89] hover:underline truncate text-sm">
                        {book.english_url}
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
