// 播放清單翻譯
export const PLAYLIST_TRANSLATIONS: Record<string, Record<string, string>> = {
  'Book TALK - DeepDive Podcast S1': {
    en: 'Book TALK - DeepDive Podcast S1',
    zh: 'Book TALK - DeepDive Podcast S1'
  },
  'Book TALK - DeepDive Podcast S2': {
    en: 'Book TALK - DeepDive Podcast S2',
    zh: 'Book TALK - DeepDive Podcast S2'
  },
  'Book TALK - DeepDive Podcast S3': {
    en: 'Book TALK - DeepDive Podcast S3',
    zh: 'Book TALK - DeepDive Podcast S3'
  },
  'Book TALK - DeepDive Podcast S4': {
    en: 'Book TALK - DeepDive Podcast S4',
    zh: 'Book TALK - DeepDive Podcast S4'
  },
  '2025 Summer VS Explainer': {
    en: '2025 Summer VS Explainer',
    zh: '2025 Summer VS Explainer'
  },
  '2025 Summer VS+': {
    en: '2025 Summer VS+',
    zh: '2025 Summer VS+'
  },
  'S1C 聊聊書 - DeepDive Podcast AI Book TALK': {
    en: 'S1 Chinese - Chat About Books - DeepDive Podcast AI Book TALK',
    zh: 'S1C 聊聊書 - DeepDive Podcast AI Book TALK'
  },
  'S2C 聊聊書 - DeepDive Podcast AI Book TALK': {
    en: 'S2 Chinese - Chat About Books - DeepDive Podcast AI Book TALK',
    zh: 'S2C 聊聊書 - DeepDive Podcast AI Book TALK'
  },
  'S3C 聊聊書 - DeepDive Podcast AI Book TALK': {
    en: 'S3 Chinese - Chat About Books - DeepDive Podcast AI Book TALK',
    zh: 'S3C 聊聊書 - DeepDive Podcast AI Book TALK'
  },
  '2025 Summer+': {
    en: '2025 Summer+',
    zh: '2025 Summer+'
  },
  '2025/26 Winter+': {
    en: '2025/26 Winter+',
    zh: '2025/26 Winter+'
  },
};

export function translatePlaylist(playlist: string, language: string): string {
  const translation = PLAYLIST_TRANSLATIONS[playlist];
  if (!translation) {
    return playlist;
  }
  return translation[language === 'zh' ? 'zh' : 'en'] || playlist;
}
