import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Globe, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { language, translateTag } = useLanguage();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('books.json')
            .then(r => r.json())
            .then(data => {
                const found = data.find(b => String(b.id) === String(id));
                setBook(found || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f0e8' }}>
            <div style={{ fontSize: '16px', color: '#888' }}>ËºâÂÖ•‰∏?..</div>
        </div>
    );

    if (!book) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f0e8' }}>
            <p style={{ fontSize: '18px', color: '#888', marginBottom: '16px' }}>?æ‰??∞Ê≠§?∏Á?</p>
            <button onClick={() => navigate('/')} style={{
                padding: '10px 24px', borderRadius: '8px', border: '1px solid #e0d8cc',
                background: 'white', cursor: 'pointer', fontSize: '14px',
            }}>ËøîÂ?È¶ñÈ?</button>
        </div>
    );

    const title = language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn);
    const description = language === 'zh' ? (book.description_cn || book.description_en || book.description) : (book.description_en || book.description_cn || book.description);
    const thumbnail = book.cover_url || (book.video_id
        ? `https://img.youtube.com/vi/${book.video_id}/maxresdefault.jpg`
        : null);

    return (
        <div style={{ background: '#f5f0e8', minHeight: '100vh' }}>
            {/* Top nav bar */}
            <div style={{
                padding: '12px 24px', borderBottom: '1px solid #e0d8cc',
                background: 'white', display: 'flex', alignItems: 'center',
            }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                        borderRadius: '8px', border: '1px solid #e0d8cc', background: 'white',
                        cursor: 'pointer', fontSize: '14px', color: '#2d2a24', fontWeight: '500',
                    }}
                >
                    <ArrowLeft size={16} />
                    ËøîÂ?
                </button>
            </div>

            {/* Main content */}
            <div className="detail-main" style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px' }}>
                {/* Top section: badge + title + action buttons */}
                <div className="detail-top-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                    <div style={{ minWidth: 0 }}>
                        {book.code && (
                            <span style={{
                                display: 'inline-block', background: '#ff8f00', color: 'white',
                                fontSize: '14px', fontWeight: '700', padding: '4px 14px',
                                borderRadius: '6px', marginBottom: '12px',
                            }}>
                                {book.code}
                            </span>
                        )}
                        <h1 className="detail-title" style={{ margin: '8px 0 0', fontSize: '32px', fontWeight: '800', color: '#2d2a24', lineHeight: 1.3 }}>
                            {title}
                        </h1>
                        {book.author && (
                            <p style={{ margin: '8px 0 0', fontSize: '15px', color: '#6b6459' }}>
                                ?çÔ? {book.author}
                            </p>
                        )}
                    </div>
                    <div className="detail-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0, marginLeft: '24px' }}>
                        {book.youtube_url && (
                            <a
                                href={book.youtube_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    padding: '12px 28px', borderRadius: '10px',
                                    background: '#0097a7', color: 'white', textDecoration: 'none',
                                    fontSize: '15px', fontWeight: '600', minWidth: '120px',
                                    transition: 'background 0.15s',
                                }}
                            >
                                <Play size={16} fill="white" />
                                ?≠Êîæ
                            </a>
                        )}
                        {book.english_url && (
                            <a
                                href={book.english_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    padding: '12px 28px', borderRadius: '10px',
                                    border: '2px solid #e0d8cc', color: '#2d2a24', textDecoration: 'none',
                                    fontSize: '15px', fontWeight: '600', background: '#faf6ef', minWidth: '120px',
                                }}
                            >
                                <Globe size={16} />
                                ?±Ê???
                            </a>
                        )}
                    </div>
                </div>

                {/* Two-column layout: cover + info */}
                <div className="detail-content-columns" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                    {/* Left: cover image */}
                    <div className="detail-cover" style={{ flexShrink: 0, width: '280px' }}>
                        {thumbnail && (
                            <img
                                src={thumbnail}
                                alt={title}
                                style={{
                                    width: '100%', borderRadius: '12px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                }}
                                onError={e => { e.target.src = `https://img.youtube.com/vi/${book.video_id}/hqdefault.jpg`; }}
                            />
                        )}
                    </div>

                    {/* Right: details */}
                    <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Tags */}
                        <div>
                            <h3 style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: '700', color: '#6b6459', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Ê®ôÁ±§
                            </h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {(book.tags || []).map((tag, i) => (
                                    <span key={i} style={{
                                        fontSize: '13px', padding: '5px 14px', borderRadius: '999px',
                                        background: '#f0ebe0', color: '#2d2a24', fontWeight: '500',
                                        border: '1px solid #e0d8cc',
                                    }}>
                                        {translateTag(tag)}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Playlist card */}
                        <div style={{
                            background: '#f0ebe0', borderRadius: '12px', padding: '16px 20px',
                        }}>
                            <div style={{ fontSize: '12px', color: '#6b6459', fontWeight: '600', marginBottom: '4px' }}>?≠ÊîæÊ∏ÖÂñÆ</div>
                            <div style={{ fontSize: '15px', color: '#2d2a24', fontWeight: '600' }}>{book.playlist}</div>
                        </div>

                        {/* Description card */}
                        {description && (
                            <div style={{
                                background: 'white', borderRadius: '12px', padding: '20px',
                                border: '1px solid #e0d8cc',
                            }}>
                                <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: '700', color: '#2d2a24' }}>
                                    ?? Á∞°‰?
                                </h3>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.8', color: '#2d2a24' }}>
                                    {description}
                                </p>
                            </div>
                        )}

                        {/* YouTube links card */}
                        <div style={{
                            background: 'white', borderRadius: '12px', padding: '20px',
                            border: '1px solid #e0d8cc',
                        }}>
                            <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '700', color: '#2d2a24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Youtube size={18} /> YouTube
                            </h3>

                            {/* Chinese version */}
                            {book.youtube_url && (
                                <div style={{ marginBottom: book.english_url ? '16px' : '0' }}>
                                    <div style={{ fontSize: '12px', color: '#6b6459', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                        <Globe size={12} /> ‰∏≠Ê???
                                    </div>
                                    <a
                                        href={book.youtube_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontSize: '14px', color: '#0097a7', wordBreak: 'break-all' }}
                                    >
                                        {book.youtube_url}
                                    </a>
                                    {book.english_url && (
                                        <div style={{ borderBottom: '1px solid #e8e2d8', margin: '16px 0 0' }} />
                                    )}
                                </div>
                            )}

                            {/* English version */}
                            {book.english_url && (
                                <div>
                                    <div style={{ fontSize: '12px', color: '#6b6459', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                        <Globe size={12} /> ?±Ê???
                                    </div>
                                    <a
                                        href={book.english_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ fontSize: '14px', color: '#0097a7', wordBreak: 'break-all' }}
                                    >
                                        {book.english_url}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
