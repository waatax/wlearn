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
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all var(--transition-med)',
                boxShadow: hovered ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
                transform: hovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                animation: `fadeInUp 0.4s ease ${delay}ms both`,
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
                        ? 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)'
                        : 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 30%)',
                    transition: 'all var(--transition-med)',
                }} />
                {/* Audio icon */}
                <div style={{
                    position: 'absolute', bottom: '8px', right: '8px',
                    background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
                    borderRadius: '50%',
                    width: '28px', height: '28px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                    transform: hovered ? 'scale(1.1)' : 'scale(1)',
                }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-.73-3.37-1.9-4.5l-1.42 1.42C14.63 10.04 15 10.98 15 12s-.37 1.96-.82 2.08l1.42 1.42C16.77 14.37 16.5 12.77 16.5 12z" />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Title + Badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                    <h3 style={{
                        margin: 0, fontSize: '14px', fontWeight: '650', lineHeight: '1.45',
                        color: 'var(--text)', display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        letterSpacing: '-0.01em',
                    }}>
                        {title}
                    </h3>
                    {book.code && (
                        <span style={{
                            flexShrink: 0, background: 'var(--badge-bg)',
                            color: 'white', fontSize: '10px', fontWeight: '800',
                            padding: '2px 7px', borderRadius: '5px', whiteSpace: 'nowrap',
                            letterSpacing: '0.02em',
                            boxShadow: '0 2px 6px rgba(255,143,0,0.3)',
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
                        ✍️ {book.author}
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
