/**
 * 書籍資料類型定義
 */

export interface Book {
  id: string;
  code?: string;
  title_cn: string | null;
  title_en: string | null;
  playlist: string;
  youtube_url: string;
  english_url?: string;
  video_id: string;
  video_title: string;
  tags: string[];
  description: string;
  description_cn?: string;
  description_en?: string;
  author: string;
  cover_url?: string | null;
}

export interface BooksData {
  books: Book[];
}

export type Language = 'zh' | 'en';

export interface FilterOptions {
  tags: string[];
  playlist: string | null;
  searchQuery: string;
}
