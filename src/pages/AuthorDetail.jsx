import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Award, Briefcase, ExternalLink, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AuthorDetail() {
        const { id } = useParams();
        const navigate = useNavigate();
        const { language, translateTag } = useLanguage();
        const [author, setAuthor] = useState(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
                fetch(import.meta.env.BASE_URL + 'authors.json')
                        .then(r => r.json())
                        .then(data => {
                                const found = data.find(a => a.id === id);
                                setAuthor(found || null);
                                setLoading(false);
                        })
                        .catch(() => setLoading(false));
        }, [id]);

        const avatarColors = [
                '#0097a7', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
                '#009688', '#ff5722', '#795548', '#607d8b', '#ff8f00',
        ];
        const getColor = (name) => avatarColors[(name || '').charCodeAt(0) % avatarColors.length];

        if (loading) return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f0e8' }}>
                        <div style={{ fontSize: '16px', color: '#888' }}>載入中...</div>
                </div>
        );

        if (!author) return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f5f0e8' }}>
                        <p style={{ fontSize: '18px', color: '#888', marginBottom: '16px' }}>找不到此作者</p>
                        <button onClick={() => navigate('/authors')} style={{
                                padding: '10px 24px', borderRadius: '8px', border: '1px solid #e0d8cc',
                                background: 'white', cursor: 'pointer', fontSize: '14px',
                        }}>返回作者列表</button>
                </div>
        );

        const color = getColor(author.name);

        return (
                <div style={{ background: '#f5f0e8', minHeight: '100vh' }}>
                        {/* Top nav */}
                        <div style={{
                                padding: '12px 24px', borderBottom: '1px solid #e0d8cc',
                                background: 'white', display: 'flex', alignItems: 'center', gap: '12px',
                        }}>
                                <button onClick={() => navigate('/authors')} style={{
                                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                                        borderRadius: '8px', border: '1px solid #e0d8cc', background: 'white',
                                        cursor: 'pointer', fontSize: '14px', color: '#2d2a24', fontWeight: '500',
                                }}>
                                        <ArrowLeft size={16} /> 作者列表
                                </button>
                        </div>

                        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
                                {/* Author header */}
                                <div className="detail-top-section" style={{
                                        display: 'flex', gap: '28px', alignItems: 'flex-start',
                                        marginBottom: '32px', animation: 'fadeInUp 0.4s ease both',
                                }}>
                                        {/* Avatar */}
                                        <div style={{
                                                width: '100px', height: '100px', borderRadius: '50%',
                                                background: `linear-gradient(135deg, ${color}, ${color}bb)`,
                                                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: '800', fontSize: '42px', flexShrink: 0,
                                                boxShadow: `0 8px 24px ${color}30`,
                                        }}>
                                                {author.avatar_initial}
                                        </div>

                                        <div style={{ flex: 1 }}>
                                                <h1 style={{ margin: '0 0 4px', fontSize: '28px', fontWeight: '800', color: '#2d2a24', lineHeight: 1.2 }}>
                                                        {author.name}
                                                </h1>
                                                {author.name_en !== author.name && (
                                                        <div style={{ fontSize: '15px', color: '#9e9486', marginBottom: '8px' }}>
                                                                {author.name_en}
                                                        </div>
                                                )}
                                                {author.name_zh !== author.name && author.name_zh !== author.name_en && (
                                                        <div style={{ fontSize: '15px', color: '#9e9486', marginBottom: '8px' }}>
                                                                {author.name_zh}
                                                        </div>
                                                )}
                                                <div style={{
                                                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                        padding: '6px 14px', borderRadius: '999px',
                                                        background: `${color}15`, color: color,
                                                        fontSize: '13px', fontWeight: '600',
                                                }}>
                                                        <Briefcase size={14} />
                                                        {author.career}
                                                </div>

                                                {/* Stats */}
                                                <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                                                        <div>
                                                                <div style={{ fontSize: '24px', fontWeight: '800', color: '#ff8f00' }}>{author.book_count}</div>
                                                                <div style={{ fontSize: '11px', color: '#9e9486', fontWeight: '500' }}>本站書籍</div>
                                                        </div>
                                                        {author.achievements?.length > 0 && (
                                                                <div>
                                                                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#9c27b0' }}>{author.achievements.length}</div>
                                                                        <div style={{ fontSize: '11px', color: '#9e9486', fontWeight: '500' }}>主要成就</div>
                                                                </div>
                                                        )}
                                                </div>
                                        </div>
                                </div>

                                {/* Bio card */}
                                <div style={{
                                        background: 'white', borderRadius: '16px', padding: '24px',
                                        border: '1px solid #e0d8cc', marginBottom: '20px',
                                        animation: 'fadeInUp 0.4s ease 0.1s both',
                                }}>
                                        <h2 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: '#2d2a24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                📝 作者簡介
                                        </h2>
                                        <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.9', color: '#2d2a24' }}>
                                                {author.bio}
                                        </p>
                                </div>

                                {/* Achievements */}
                                {author.achievements?.length > 0 && (
                                        <div style={{
                                                background: 'white', borderRadius: '16px', padding: '24px',
                                                border: '1px solid #e0d8cc', marginBottom: '20px',
                                                animation: 'fadeInUp 0.4s ease 0.2s both',
                                        }}>
                                                <h2 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: '#2d2a24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <Award size={18} color="#ff8f00" /> 主要成就
                                                </h2>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px' }}>
                                                        {author.achievements.map((ach, i) => (
                                                                <div key={i} style={{
                                                                        display: 'flex', alignItems: 'center', gap: '8px',
                                                                        padding: '10px 14px', borderRadius: '10px', background: '#f8f5ef',
                                                                        border: '1px solid #ebe5da',
                                                                }}>
                                                                        <div style={{
                                                                                width: '6px', height: '6px', borderRadius: '50%',
                                                                                background: color, flexShrink: 0,
                                                                        }} />
                                                                        <span style={{ fontSize: '13px', color: '#2d2a24', fontWeight: '500' }}>{ach}</span>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>
                                )}

                                {/* Books section */}
                                <div style={{
                                        background: 'white', borderRadius: '16px', padding: '24px',
                                        border: '1px solid #e0d8cc',
                                        animation: 'fadeInUp 0.4s ease 0.3s both',
                                }}>
                                        <h2 style={{ margin: '0 0 20px', fontSize: '16px', fontWeight: '700', color: '#2d2a24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <BookOpen size={18} color="#0097a7" /> 收錄書籍 ({author.books.length})
                                        </h2>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                {author.books.map((book, i) => (
                                                        <Link
                                                                key={book.id}
                                                                to={`/book/${book.id}`}
                                                                style={{
                                                                        display: 'flex', alignItems: 'center', gap: '14px',
                                                                        padding: '14px 16px', borderRadius: '12px',
                                                                        background: '#faf7f1', border: '1px solid #ebe5da',
                                                                        textDecoration: 'none', color: '#2d2a24',
                                                                        transition: 'all 0.2s',
                                                                }}
                                                                onMouseEnter={e => { e.currentTarget.style.background = '#f0ebe0'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                                                onMouseLeave={e => { e.currentTarget.style.background = '#faf7f1'; e.currentTarget.style.transform = ''; }}
                                                        >
                                                                {/* Thumbnail */}
                                                                {book.video_id && (
                                                                        <img
                                                                                src={`https://img.youtube.com/vi/${book.video_id}/mqdefault.jpg`}
                                                                                alt=""
                                                                                style={{
                                                                                        width: '80px', height: '45px', objectFit: 'cover',
                                                                                        borderRadius: '8px', flexShrink: 0,
                                                                                }}
                                                                                onError={e => { e.target.style.display = 'none'; }}
                                                                        />
                                                                )}

                                                                {/* Book info */}
                                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                                        <div style={{
                                                                                fontSize: '15px', fontWeight: '600', color: '#2d2a24',
                                                                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                                        }}>
                                                                                {book.title_cn || book.title_en}
                                                                        </div>
                                                                        {book.title_en && book.title_cn && (
                                                                                <div style={{
                                                                                        fontSize: '12px', color: '#9e9486', marginTop: '2px',
                                                                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                                                }}>
                                                                                        {book.title_en}
                                                                                </div>
                                                                        )}
                                                                        {book.tags && (
                                                                                <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
                                                                                        {book.tags.slice(0, 3).map((tag, j) => (
                                                                                                <span key={j} style={{
                                                                                                        fontSize: '10px', padding: '1px 8px', borderRadius: '999px',
                                                                                                        background: '#e8f5e9', color: '#2e7d32', fontWeight: '500',
                                                                                                }}>{translateTag(tag)}</span>
                                                                                        ))}
                                                                                </div>
                                                                        )}
                                                                </div>

                                                                {/* Code badge + arrow */}
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                                                        {book.code && (
                                                                                <span style={{
                                                                                        background: '#ff8f00', color: 'white', padding: '2px 8px',
                                                                                        borderRadius: '5px', fontSize: '11px', fontWeight: '700',
                                                                                }}>{book.code}</span>
                                                                        )}
                                                                        <ExternalLink size={14} color="#0097a7" />
                                                                </div>
                                                        </Link>
                                                ))}
                                        </div>
                                </div>
                        </div>
                </div>
        );
}
