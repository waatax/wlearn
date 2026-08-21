import React, { useState, useEffect } from 'react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Sparkles, ArrowRight, RefreshCw, BookOpen, Shuffle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RandomDiscoveryModal() {
    const { activeModal, closeModal, recordSerendipityPick } = useGamification();
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [shuffling, setShuffling] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        if (activeModal === 'roulette' || activeModal === 'random_discovery') {
            fetch(import.meta.env.BASE_URL + 'books.json')
                .then(r => r.json())
                .then(data => {
                    setBooks(data);
                    if (data.length > 0 && !selectedBook) {
                        const random = data[Math.floor(Math.random() * data.length)];
                        setSelectedBook(random);
                    }
                })
                .catch(() => {});
        }
    }, [activeModal]);

    if (activeModal !== 'roulette' && activeModal !== 'random_discovery') return null;

    const handleShuffle = () => {
        if (shuffling || books.length === 0) return;

        setShuffling(true);

        // Rapid cycling through books animation
        const interval = setInterval(() => {
            const tempRandom = books[Math.floor(Math.random() * books.length)];
            setSelectedBook(tempRandom);
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            const finalBook = books[Math.floor(Math.random() * books.length)];
            setSelectedBook(finalBook);
            setShuffling(false);
            if (recordSerendipityPick) {
                recordSerendipityPick(finalBook);
            }
        }, 1200);
    };

    const handleGoToBook = () => {
        if (selectedBook) {
            closeModal();
            navigate(`/book/${selectedBook.id}`);
        }
    };

    const title = selectedBook
        ? (language === 'zh' ? (selectedBook.title_cn || selectedBook.title_en) : (selectedBook.title_en || selectedBook.title_cn))
        : '';
    const author = selectedBook
        ? (language === 'zh' ? (selectedBook.author || selectedBook.author_en) : (selectedBook.author_en || selectedBook.author))
        : '';
    const description = selectedBook
        ? (language === 'zh' ? (selectedBook.description_cn || selectedBook.description) : (selectedBook.description_en || selectedBook.description))
        : '';

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '520px',
                padding: '32px',
                position: 'relative',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255,255,255,0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                {/* Close Button */}
                <button
                    onClick={closeModal}
                    style={{
                        position: 'absolute',
                        top: '18px',
                        right: '18px',
                        background: '#f1f5f9',
                        border: 'none',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#64748b'
                    }}
                >
                    <X size={18} />
                </button>

                {/* Header Icon */}
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                    boxShadow: '0 8px 20px rgba(2, 132, 199, 0.35)',
                    color: 'white'
                }}>
                    <Shuffle size={28} className={shuffling ? 'animate-spin' : ''} />
                </div>

                <h3 style={{ fontSize: '21px', fontWeight: '850', color: '#0f172a', margin: '0 0 6px 0' }}>
                    {language === 'zh' ? '🎲 靈感偶遇 · 隨選好書' : '🎲 Serendipity · Random Discovery'}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 22px 0', lineHeight: 1.5 }}>
                    {language === 'zh'
                        ? '打破演算法同溫層與資訊繭房（知識隨機漫步）。讓未知的思維模型開拓您的跨領域視野！'
                        : 'Escape your filter bubble through serendipitous discovery across 700+ curated summaries.'}
                </p>

                {/* Book Card Display */}
                {selectedBook && (
                    <div style={{
                        width: '100%',
                        background: 'white',
                        borderRadius: '16px',
                        padding: '16px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center',
                        textAlign: 'left',
                        marginBottom: '24px',
                        opacity: shuffling ? 0.6 : 1,
                        transition: 'opacity 0.2s ease'
                    }}>
                        <img
                            src={selectedBook.cover_url || `https://img.youtube.com/vi/${selectedBook.video_id}/hqdefault.jpg`}
                            alt={title}
                            style={{
                                width: '70px',
                                height: '95px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                flexShrink: 0,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                            }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: '800',
                                    color: '#0284c7',
                                    background: '#e0f2fe',
                                    padding: '2px 6px',
                                    borderRadius: '6px'
                                }}>
                                    {selectedBook.code || 'PICK'}
                                </span>
                                {(selectedBook.tags || []).slice(0, 2).map((t, idx) => (
                                    <span key={idx} style={{
                                        fontSize: '10px',
                                        color: '#475569',
                                        background: '#f1f5f9',
                                        padding: '2px 6px',
                                        borderRadius: '6px'
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <h4 style={{
                                fontSize: '15px',
                                fontWeight: '750',
                                color: '#1e293b',
                                margin: '0 0 2px 0',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {title}
                            </h4>
                            <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 6px 0' }}>
                                {author}
                            </p>
                            <p style={{
                                fontSize: '11px',
                                color: '#94a3b8',
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                lineHeight: 1.4
                            }}>
                                {description}
                            </p>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                    <button
                        onClick={handleShuffle}
                        disabled={shuffling}
                        style={{
                            flex: 1,
                            padding: '12px 18px',
                            borderRadius: '14px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                            color: 'white',
                            fontWeight: '750',
                            fontSize: '14px',
                            cursor: shuffling ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 15px rgba(2, 132, 199, 0.3)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <RefreshCw size={16} className={shuffling ? 'animate-spin' : ''} />
                        {shuffling ? (language === 'zh' ? '正在探索新書目...' : 'Exploring...') : (language === 'zh' ? '換一本隨選 (+15 EXP)' : 'Surprise Me (+15 EXP)')}
                    </button>

                    <button
                        onClick={handleGoToBook}
                        disabled={shuffling || !selectedBook}
                        style={{
                            padding: '12px 20px',
                            borderRadius: '14px',
                            border: '1px solid #cbd5e1',
                            background: 'white',
                            color: '#1e293b',
                            fontWeight: '700',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <span>{language === 'zh' ? '前往研讀' : 'Study Now'}</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
