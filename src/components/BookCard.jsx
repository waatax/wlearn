import React, { useState } from 'react';
import { Play, CheckCircle2, Bookmark, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';

export default function BookCard({ book, index = 0 }) {
    const { language, translateTag, t } = useLanguage();
    const { state, toggleBookmark, toggleReadBook } = useGamification();
    const navigate = useNavigate();
    const [imgLoaded, setImgLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);

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

    const delay = Math.min(index * 30, 300);

    return (
        <div
            onClick={() => navigate(`/book/${book.id}`)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: isRead ? '1px solid #86efac' : '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all var(--transition-med)',
                boxShadow: hovered ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                animation: `fadeInUp 0.5s var(--transition-med) ${delay}ms both`,
                position: 'relative'
            }}
        >
            {/* Thumbnail Container */}
            <div style={{
                position: 'relative', aspectRatio: '16/9', overflow: 'hidden',
                background: 'linear-gradient(135deg, #e8e4dc, #d4cfc5)',
            }}>
                <img
                    src={thumbnail}
                    alt={title}
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                    style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform var(--transition-slow), opacity var(--transition-med)',
                        transform: hovered ? 'scale(1.06)' : 'scale(1)',
                        opacity: imgLoaded ? 1 : 0,
                    }}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4cb8c0?w=400&q=80'; }}
                />

                {/* Read Status Ribbon */}
                {isRead && (
                    <div style={{
                        position: 'absolute', top: '10px', left: '10px',
                        background: 'rgba(22, 163, 74, 0.9)',
                        color: 'white',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '800',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(4px)'
                    }}>
                        <CheckCircle2 size={12} />
                        <span>{language === 'zh' ? '已研讀' : 'COMPLETED'}</span>
                    </div>
                )}

                {/* Bookmark Toggle Button */}
                <button
                    onClick={handleBookmark}
                    title={isBookmarked ? t('inBookmarks') : t('addToBookmarks')}
                    style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: isBookmarked ? 'rgba(202, 122, 44, 0.95)' : 'rgba(0, 0, 0, 0.45)',
                        border: 'none',
                        borderRadius: '8px',
                        width: '30px', height: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white',
                        cursor: 'pointer',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }}
                >
                    <Bookmark size={15} fill={isBookmarked ? 'white' : 'none'} />
                </button>

                {/* Audio icon */}
                <div style={{
                    position: 'absolute', bottom: '12px', right: '12px',
                    background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '50%',
                    width: '32px', height: '32px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    transition: 'all var(--transition-med)',
                    transform: hovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                    boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.73-3.37-1.9-4.5l-1.42 1.42C14.63 10.04 15 10.98 15 12s-.37 1.96-.82 2.08l1.42 1.42C16.77 14.37 16.5 12.77 16.5 12z" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Title + Code */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <h3 style={{
                        margin: 0, fontSize: '15px', fontWeight: '750', lineHeight: '1.4',
                        color: 'var(--text)', display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        letterSpacing: '-0.02em',
                    }}>
                        {title}
                    </h3>
                    {book.code && (
                        <span style={{
                            background: isRead ? '#dcfce7' : 'var(--badge-bg)',
                            color: isRead ? '#15803d' : 'var(--badge-text)',
                            fontSize: '10px', fontWeight: '800', padding: '2px 7px',
                            borderRadius: '6px', flexShrink: 0, letterSpacing: '0.04em',
                        }}>
                            {book.code}
                        </span>
                    )}
                </div>

                {/* Author */}
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
                    {language === 'zh' ? (book.author || book.author_en) : (book.author_en || book.author)}
                </div>

                {/* Tags & EXP reward */}
                <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {(book.tags || []).slice(0, 2).map((tag, idx) => (
                            <span key={idx} style={{
                                background: 'var(--tag-bg)', color: 'var(--tag-text)',
                                fontSize: '11px', fontWeight: '600', padding: '2px 7px',
                                borderRadius: '5px',
                            }}>
                                #{translateTag(tag)}
                            </span>
                        ))}
                    </div>

                    <div style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        color: isRead ? '#16a34a' : 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                    }}>
                        <Sparkles size={11} />
                        <span>{isRead ? '+50 EXP' : '+50 EXP'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
