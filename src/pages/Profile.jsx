import React, { useState, useEffect } from 'react';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import { COSMIC_REALMS, BADGES_CATALOG } from '../lib/gamification';
import Sidebar from '../components/Sidebar';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import {
    User,
    Sparkles,
    Flame,
    BookOpen,
    Bookmark,
    Edit3,
    Trophy,
    Globe,
    Download,
    Upload,
    RotateCcw,
    Copy,
    Check,
    Menu,
    Trash2,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
    const {
        state,
        levelInfo,
        exportData,
        importData,
        resetProgress
    } = useGamification();
    const { language, t, toggleLanguage } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [allBooks, setAllBooks] = useState([]);
    const [activeTab, setActiveTab] = useState('notes'); // notes, bookmarks, read
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'books.json')
            .then(r => r.json())
            .then(data => setAllBooks(data))
            .catch(() => {});
    }, []);

    const bookmarkedBooksList = allBooks.filter(b => (state.bookmarkedBooks || []).includes(b.id));
    const readBooksList = allBooks.filter(b => (state.readBooks || []).includes(b.id));
    const notesEntries = Object.entries(state.notes || {}).filter(([_, text]) => (text || '').trim().length > 0);

    const handleSharePassport = () => {
        const title = language === 'zh' ? levelInfo.title.zh : levelInfo.title.en;
        const text = `🌌【WeLearn 知識宇宙 · 學者冒險證書】\n` +
            `👤 稱號：Lv.${levelInfo.level} ${title}\n` +
            `⚡ 累積經驗：${state.exp} EXP | 靈感點數：${state.sparks} Sparks\n` +
            `🔥 連勝天數：${state.streak || 0} 天\n` +
            `📚 已研讀書籍：${(state.readBooks || []).length} 本\n` +
            `🏆 已解鎖徽章：${(state.unlockedBadges || []).length} 個\n` +
            `🚀 探索知識宇宙：https://waatax.github.io/wlearn`;

        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result);
                if (importData(json)) {
                    alert(language === 'zh' ? '學習進度匯入成功！' : 'Progress imported successfully!');
                } else {
                    alert(language === 'zh' ? '無效的備份檔案格式' : 'Invalid backup file format');
                }
            } catch (err) {
                alert(language === 'zh' ? '解析備份檔案失敗' : 'Failed to parse backup file');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
            <Sidebar
                books={[]}
                filters={{ search: '', tags: [], playlist: '' }}
                onFiltersChange={() => {}}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Top bar */}
                <div className="top-bar" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 32px', borderBottom: '1px solid var(--border-light)',
                    background: 'var(--sidebar-bg)', backdropFilter: 'blur(var(--sidebar-blur))',
                    position: 'sticky', top: 0, zIndex: 10,
                    WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                    gap: '16px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="開啟選單"
                        >
                            <Menu size={22} color="#2d2a24" />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '20px' }}>👤</span>
                            <span style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)' }}>
                                {t('scholarProfile')}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <GamificationHUD />
                        <button
                            onClick={toggleLanguage}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                                borderRadius: '12px', border: '1px solid var(--border)', background: 'white',
                                cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)',
                                fontWeight: '600'
                            }}
                        >
                            <Globe size={15} />
                            <span>{language === 'zh' ? 'EN' : '繁中'}</span>
                        </button>
                    </div>
                </div>

                <div style={{ padding: '28px 32px 64px 32px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
                    {/* Scholar Passport Card */}
                    <div style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #134e4a 100%)',
                        borderRadius: '24px',
                        padding: '36px',
                        color: 'white',
                        marginBottom: '32px',
                        boxShadow: '0 20px 45px -12px rgba(15, 23, 42, 0.4)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{
                                    width: '76px',
                                    height: '76px',
                                    borderRadius: '24px',
                                    background: 'linear-gradient(135deg, #2dd4bf, #0f766e)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '32px',
                                    boxShadow: '0 10px 25px rgba(45, 212, 191, 0.3)'
                                }}>
                                    🌌
                                </div>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                        <span style={{
                                            fontSize: '11px',
                                            fontWeight: '800',
                                            color: '#99f6e4',
                                            background: 'rgba(20, 184, 166, 0.2)',
                                            padding: '2px 8px',
                                            borderRadius: '6px'
                                        }}>
                                            SCHOLAR PASSPORT
                                        </span>
                                        <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                            RANK: {levelInfo.rank}
                                        </span>
                                    </div>
                                    <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 4px 0' }}>
                                        Lv.{levelInfo.level} {language === 'zh' ? levelInfo.title.zh : levelInfo.title.en}
                                    </h2>
                                    <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0 }}>
                                        {language === 'zh' ? '跨領域知識宇宙探索者' : 'Cross-Disciplinary Cosmic Polymath'}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleSharePassport}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
                                <span>{copied ? t('copied') : t('sharePassport')}</span>
                            </button>
                        </div>

                        {/* 4 Stats Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: '16px',
                            marginTop: '28px',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            paddingTop: '24px'
                        }}>
                            <div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>⚡ {t('exp')}</div>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: '#fef08a' }}>{state.exp}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>🔥 {t('streak')}</div>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: '#fed7aa' }}>{state.streak || 0} 天</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>📖 {t('booksReadCount')}</div>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: '#99f6e4' }}>{(state.readBooks || []).length} 本</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>🏆 解鎖勳章</div>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: '#fbcfe8' }}>{(state.unlockedBadges || []).length} 個</div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Scholar Knowledge Vault Tabs */}
                    <div style={{ marginBottom: '36px' }}>
                        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
                            {[
                                { id: 'notes', label: { zh: `📝 研讀筆記 (${notesEntries.length})`, en: `📝 Notes (${notesEntries.length})` } },
                                { id: 'bookmarks', label: { zh: `📌 收藏書籤 (${bookmarkedBooksList.length})`, en: `📌 Bookmarks (${bookmarkedBooksList.length})` } },
                                { id: 'read', label: { zh: `✅ 已研讀書目 (${readBooksList.length})`, en: `✅ Read (${readBooksList.length})` } }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{
                                        padding: '8px 18px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                                        color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                                        fontWeight: '750',
                                        fontSize: '13px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {language === 'zh' ? tab.label.zh : tab.label.en}
                                </button>
                            ))}
                        </div>

                        {/* Content for Tabs */}
                        {activeTab === 'notes' && (
                            notesEntries.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
                                    <Edit3 size={36} style={{ opacity: 0.4, marginBottom: '12px' }} />
                                    <p style={{ fontSize: '14px', margin: 0 }}>
                                        {language === 'zh' ? '目前尚無書籍筆記。在任何書籍詳情頁記錄書摘即可在此累積！' : 'No scholar notes yet. Record key insights in book detail pages to collect them here!'}
                                    </p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                                    {notesEntries.map(([bookId, noteText]) => {
                                        const book = allBooks.find(b => String(b.id) === String(bookId));
                                        const bookTitle = book ? (language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn)) : `書籍 #${bookId}`;

                                        return (
                                            <div key={bookId} style={{
                                                background: 'var(--card-bg)',
                                                borderRadius: '16px',
                                                padding: '20px',
                                                border: '1px solid var(--border-light)',
                                                boxShadow: 'var(--card-shadow)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                        <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', background: 'var(--tag-bg)', padding: '2px 8px', borderRadius: '6px' }}>
                                                            {book?.code || 'NOTE'}
                                                        </span>
                                                        <Link to={`/book/${bookId}`} style={{ fontSize: '12px', color: 'var(--primary)', textDecoration: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                            <span>查看書籍</span>
                                                            <ArrowRight size={12} />
                                                        </Link>
                                                    </div>
                                                    <h4 style={{ fontSize: '15px', fontWeight: '750', margin: '0 0 10px 0', color: 'var(--text)' }}>
                                                        {bookTitle}
                                                    </h4>
                                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
                                                        {noteText}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )
                        )}

                        {activeTab === 'bookmarks' && (
                            bookmarkedBooksList.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
                                    <Bookmark size={36} style={{ opacity: 0.4, marginBottom: '12px' }} />
                                    <p style={{ fontSize: '14px', margin: 0 }}>
                                        {language === 'zh' ? '目前尚無收藏書籍。' : 'No bookmarked books yet.'}
                                    </p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                                    {bookmarkedBooksList.map(book => {
                                        const title = language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn);
                                        return (
                                            <Link key={book.id} to={`/book/${book.id}`} style={{
                                                background: 'var(--card-bg)',
                                                borderRadius: '14px',
                                                padding: '16px',
                                                border: '1px solid var(--border-light)',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                display: 'flex',
                                                gap: '12px',
                                                alignItems: 'center'
                                            }}>
                                                <img
                                                    src={book.cover_url || `https://img.youtube.com/vi/${book.video_id}/hqdefault.jpg`}
                                                    alt={title}
                                                    style={{ width: '50px', height: '68px', objectFit: 'cover', borderRadius: '8px' }}
                                                />
                                                <div>
                                                    <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)' }}>{book.code}</div>
                                                    <div style={{ fontSize: '14px', fontWeight: '750', color: 'var(--text)' }}>{title}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{book.author}</div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )
                        )}

                        {activeTab === 'read' && (
                            readBooksList.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
                                    <BookOpen size={36} style={{ opacity: 0.4, marginBottom: '12px' }} />
                                    <p style={{ fontSize: '14px', margin: 0 }}>
                                        {language === 'zh' ? '目前尚無已完成研讀的書籍。' : 'No completed books yet.'}
                                    </p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                                    {readBooksList.map(book => {
                                        const title = language === 'zh' ? (book.title_cn || book.title_en) : (book.title_en || book.title_cn);
                                        return (
                                            <Link key={book.id} to={`/book/${book.id}`} style={{
                                                background: 'var(--card-bg)',
                                                borderRadius: '14px',
                                                padding: '16px',
                                                border: '1px solid var(--border-light)',
                                                textDecoration: 'none',
                                                color: 'inherit',
                                                display: 'flex',
                                                gap: '12px',
                                                alignItems: 'center'
                                            }}>
                                                <img
                                                    src={book.cover_url || `https://img.youtube.com/vi/${book.video_id}/hqdefault.jpg`}
                                                    alt={title}
                                                    style={{ width: '50px', height: '68px', objectFit: 'cover', borderRadius: '8px' }}
                                                />
                                                <div>
                                                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#16a34a' }}>✓ COMPLETED</div>
                                                    <div style={{ fontSize: '14px', fontWeight: '750', color: 'var(--text)' }}>{title}</div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{book.author}</div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )
                        )}
                    </div>

                    {/* Section: Data Backup & Management */}
                    <div style={{
                        background: 'var(--card-bg)',
                        borderRadius: '20px',
                        padding: '28px',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 6px 0' }}>
                            💾 {language === 'zh' ? '本機學習資產備份與管理' : 'Local Data Backup & Management'}
                        </h3>
                        <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
                            {language === 'zh' ? '所有等級、筆記、徽章與連勝天數均保存在您的瀏覽器中。隨時匯出備份以利跨裝置同步。' : 'All progress, notes, and badges are stored locally. Export backups to sync across devices.'}
                        </p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            <button
                                onClick={exportData}
                                style={{
                                    padding: '10px 18px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--border)',
                                    background: 'white',
                                    color: 'var(--text)',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <Download size={16} />
                                <span>{t('exportData')}</span>
                            </button>

                            <label style={{
                                padding: '10px 18px',
                                borderRadius: '10px',
                                border: '1px solid var(--border)',
                                background: 'white',
                                color: 'var(--text)',
                                fontWeight: '700',
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}>
                                <Upload size={16} />
                                <span>{t('importData')}</span>
                                <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                            </label>

                            <button
                                onClick={() => {
                                    if (confirm(language === 'zh' ? '確定要重置所有學習進度與經驗值嗎？此動作無法復原。' : 'Are you sure you want to reset all progress?')) {
                                        resetProgress();
                                    }
                                }}
                                style={{
                                    padding: '10px 18px',
                                    borderRadius: '10px',
                                    border: '1px solid #fecaca',
                                    background: '#fef2f2',
                                    color: '#dc2626',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginLeft: 'auto'
                                }}
                            >
                                <Trash2 size={16} />
                                <span>{t('resetData')}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BottomNavbar />
        </div>
    );
}
