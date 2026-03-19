import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function BookCard({ book, index = 0 }) {
    const { language, translateTag, t } = useLanguage();
    const navigate = useNavigate();
    const [imgLoaded, setImgLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);

    const title = language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn);
    const thumbnail = book.video_id
        ? `https://img.youtube.com/vi/${book.video_id}/mqdefault.jpg`
        : 'https://images.unsplash.com/photo-1544716278-ca5e3f4cb8c0?w=400&q=80';

    const handlePlay = (e) => {
        e.stopPropagation();
        if (book.youtube_url) window.open(book.youtube_url, '_blank');
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
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all var(--transition-med)',
                boxShadow: hovered ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
                transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                animation: `fadeInUp 0.5s var(--transition-med) ${delay}ms both`,
            }}
        >
            {/* Thumbnail */}
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
                {/* Gradient overlay on hover */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: hovered
                        ? 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 40%)',
                    transition: 'all var(--transition-med)',
                }} />
                {/* Audio icon */}
                <div style={{
                    position: 'absolute', bottom: '12px', right: '12px',
                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
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
            <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Title + Badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
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
                            flexShrink: 0, background: 'var(--badge-bg)',
                            color: 'white', fontSize: '10px', fontWeight: '800',
                            padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap',
                            letterSpacing: '0.04em',
                            boxShadow: '0 4px 10px rgba(239, 108, 0, 0.3)',
                            marginTop: '2px'
                        }}>
                            {book.code}
                        </span>
                    )}
                </div>

                {/* Author */}
                {book.author && (
                    <p style={{
                        margin: 0, fontSize: '11px', color: 'var(--text-muted)',
                        fontWeight: '500', letterSpacing: '0.01em',
                    }}>
                        ✍️ {language === 'en' ? (book.author_en || book.author) : book.author}
                    </p>
                )}

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {(book.tags || []).slice(0, 3).map((tag, i) => (
                        <span key={i} style={{
                            fontSize: '10px', padding: '2px 8px', borderRadius: '999px',
                            background: 'var(--tag-bg)', color: 'var(--tag-text)',
                            fontWeight: '500', letterSpacing: '0.01em',
                        }}>
                            {translateTag(tag)}
                        </span>
                    ))}
                    {book.tags && book.tags.length > 3 && (
                        <span style={{
                            fontSize: '10px', padding: '2px 8px', borderRadius: '999px',
                            background: '#f5f2ec', color: 'var(--text-muted)',
                        }}>
                            +{book.tags.length - 3}
                        </span>
                    )}
                </div>

                {/* Playlist */}
                <p style={{
                    margin: 0, fontSize: '10px', color: 'var(--text-muted)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    fontWeight: '400',
                }}>
                    {book.playlist}
                </p>

                {/* Play button */}
                <button
                    onClick={handlePlay}
                    style={{
                        marginTop: 'auto', width: '100%', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '6px', padding: '9px',
                        background: hovered ? 'var(--primary-light)' : 'var(--primary)',
                        color: 'white', border: 'none',
                        borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                        transition: 'all var(--transition-fast)',
                        boxShadow: hovered ? '0 4px 14px var(--primary-glow)' : '0 2px 8px var(--primary-glow)',
                        letterSpacing: '0.02em',
                    }}
                >
                    <Play size={13} fill="white" />
                    {t('play')}
                </button>
            </div>
        </div>
    );
}
