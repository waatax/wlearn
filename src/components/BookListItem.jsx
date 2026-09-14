import React from 'react';
import { Play, CheckCircle2, Bookmark, Sparkles, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';

export default function BookListItem({ book, index = 0 }) {
    const { language, translateTag, t } = useLanguage();
    const { state, toggleBookmark, toggleReadBook } = useGamification();
    const navigate = useNavigate();

    const isRead = (state.readBooks || []).includes(book.id);
    const isBookmarked = (state.bookmarkedBooks || []).includes(book.id);

    const title = language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn);
    const thumbnail = book.cover_url || (book.video_id
        ? `https://img.youtube.com/vi/${book.video_id}/mqdefault.jpg`
        : 'https://images.unsplash.com/photo-1544716278-ca5e3f4cb8c0?w=400&q=80');

    const handlePlay = (e) => {
        e.stopPropagation();
        if (book.youtube_url) window.open(book.youtube_url, '_blank');
    };

    const handleBookmark = (e) => {
        e.stopPropagation();
        toggleBookmark(book.id);
    };

    const delay = Math.min(index * 20, 200);

    return (
        <div
            onClick={() => navigate(`/book/${book.id}`)}
            style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                border: isRead ? '1px solid #86efac' : '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: 'var(--card-shadow)',
                animation: `fadeInUp 0.4s ease ${delay}ms both`,
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--card-shadow)';
            }}
        >
            {/* Left info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
                {/* Thumbnail */}
                <div style={{
                    width: '70px',
                    height: '46px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#e2e8f0',
                    position: 'relative'
                }}>
                    <img
                        src={thumbnail}
                        alt={title}
                        loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4cb8c0?w=400&q=80'; }}
                    />
                </div>

                {/* Title & metadata */}
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {book.code && (
                            <span style={{
                                background: isRead ? '#dcfce7' : 'var(--badge-bg)',
                                color: isRead ? '#15803d' : 'var(--badge-text)',
                                fontSize: '10px',
                                fontWeight: '800',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                flexShrink: 0
                            }}>
                                {book.code}
                            </span>
                        )}
                        <h4 style={{
                            margin: 0,
                            fontSize: '14px',
                            fontWeight: '750',
                            color: 'var(--text)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {title}
                        </h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' }}>
                            {language === 'zh' ? (book.author || book.author_en) : (book.author_en || book.author)}
                        </span>

                        {(book.tags || []).slice(0, 2).map((tag, idx) => (
                            <span key={idx} style={{
                                background: 'var(--tag-bg)',
                                color: 'var(--tag-text)',
                                fontSize: '10px',
                                fontWeight: '600',
                                padding: '1px 6px',
                                borderRadius: '4px',
                            }}>
                                #{translateTag(tag)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                {/* Read toggle */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleReadBook(book.id);
                    }}
                    title={isRead ? (language === 'zh' ? '標記為未研讀' : 'Mark as unread') : (language === 'zh' ? '標記為已研讀' : 'Mark as read')}
                    style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: isRead ? '1px solid #86efac' : '1px solid var(--border-light)',
                        background: isRead ? '#f0fdf4' : '#f8fafc',
                        color: isRead ? '#16a34a' : 'var(--text-muted)',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '750',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <CheckCircle2 size={13} color={isRead ? '#16a34a' : '#94a3b8'} />
                    <span>{isRead ? (language === 'zh' ? '已研讀' : 'Done') : (language === 'zh' ? '未讀' : 'Unread')}</span>
                </button>

                {/* Bookmark */}
                <button
                    onClick={handleBookmark}
                    title={isBookmarked ? t('inBookmarks') : t('addToBookmarks')}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)',
                        background: isBookmarked ? '#fff7ed' : 'white',
                        color: isBookmarked ? '#ea580c' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Bookmark size={14} fill={isBookmarked ? '#ea580c' : 'none'} />
                </button>

                {/* Play Button */}
                <button
                    onClick={handlePlay}
                    title={language === 'zh' ? '播放導讀' : 'Play summary'}
                    style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        border: 'none',
                        background: 'var(--primary)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Play size={13} fill="white" />
                </button>

                <ChevronRight size={16} color="var(--text-muted)" />
            </div>
        </div>
    );
}
