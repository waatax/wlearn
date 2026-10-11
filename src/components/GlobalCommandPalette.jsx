import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Brain, Sparkles, ArrowRight, Compass, Landmark, Trophy, TrendingUp, Layers, Hash } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { KNOWLEDGE_DOMAINS, LEARNING_ROADMAPS } from '../data/knowledgeTaxonomy';

export default function GlobalCommandPalette({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { language, t } = useLanguage();
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    // Fetch books on mount
    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'books.json')
            .then(r => r.json())
            .then(data => setBooks(data || []))
            .catch(() => {});
    }, []);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
        }
    }, [isOpen]);

    // Keyboard shortcut Ctrl+K / Cmd+K listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (isOpen) onClose();
                else {
                    // Open triggered from outside
                }
            }
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Flatten knowledge concepts for searching
    const allConcepts = useMemo(() => {
        const list = [];
        KNOWLEDGE_DOMAINS.forEach(domain => {
            domain.subcategories.forEach(sub => {
                sub.concepts.forEach(c => {
                    list.push({
                        ...c,
                        domainTitle: domain.title[language] || domain.title.zh,
                        domainColor: domain.color,
                        subName: sub.name[language] || sub.name.zh
                    });
                });
            });
        });
        return list;
    }, [language]);

    // Quick navigation shortcuts
    const quickNavs = useMemo(() => [
        { title: language === 'zh' ? '說書庫總覽' : 'Book Codex', path: '/', icon: BookOpen, type: 'nav' },
        { title: language === 'zh' ? '學習科學旗艦中心' : 'Learning Science Hub', path: '/learning-science', icon: Brain, type: 'nav' },
        { title: language === 'zh' ? '知識宇宙星系' : 'Knowledge Multiverse', path: '/universe', icon: Compass, type: 'nav' },
        { title: language === 'zh' ? '認知修行任務' : 'Cognitive Quests', path: '/quests', icon: Trophy, type: 'nav' },
        { title: language === 'zh' ? '熱門排行榜' : 'Popular Rankings', path: '/popular', icon: TrendingUp, type: 'nav' },
        { title: language === 'zh' ? '全站趨勢大數據' : 'Global Trends', path: '/trends', icon: Layers, type: 'nav' },
        { title: language === 'zh' ? '名家作者導覽' : 'Renowned Authors', path: '/authors', icon: Landmark, type: 'nav' },
    ], [language]);

    // Filter results based on query
    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) {
            // Default suggestions: quick navs + top 4 roadmaps
            return [
                ...quickNavs.slice(0, 4).map(item => ({ ...item, category: language === 'zh' ? '快捷導航' : 'Quick Navigation' })),
                ...LEARNING_ROADMAPS.slice(0, 3).map(r => ({
                    title: r.title[language] || r.title.zh,
                    subtitle: r.subtitle[language] || r.subtitle.zh,
                    path: '/universe',
                    icon: Compass,
                    type: 'roadmap',
                    color: r.color,
                    category: language === 'zh' ? '通關學習路徑' : 'Learning Tracks'
                }))
            ];
        }

        const items = [];

        // 1. Matched Books (up to 5)
        const matchedBooks = books.filter(b => {
            const titleCn = (b.title_cn || '').toLowerCase();
            const titleEn = (b.title_en || '').toLowerCase();
            const author = (b.author || '').toLowerCase();
            const code = (b.code || '').toLowerCase();
            const tags = (b.tags || []).join(' ').toLowerCase();
            return titleCn.includes(q) || titleEn.includes(q) || author.includes(q) || code.includes(q) || tags.includes(q);
        }).slice(0, 5);

        matchedBooks.forEach(b => {
            items.push({
                id: b.id,
                title: language === 'zh' ? (b.title_cn || b.title_en) : (b.title_en || b.title_cn),
                subtitle: `${b.author || ''} · ${b.code || ''}`,
                path: `/book/${b.id}`,
                icon: BookOpen,
                type: 'book',
                category: language === 'zh' ? '推薦典籍' : 'Books'
            });
        });

        // 2. Matched Concepts (up to 4)
        const matchedConcepts = allConcepts.filter(c => {
            return c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.domainTitle.toLowerCase().includes(q);
        }).slice(0, 4);

        matchedConcepts.forEach(c => {
            items.push({
                title: c.name,
                subtitle: `${c.domainTitle} · ${c.desc.slice(0, 45)}...`,
                path: `/learning-science`,
                icon: Brain,
                type: 'concept',
                color: c.domainColor,
                category: language === 'zh' ? '核心思維模型' : 'Mental Models'
            });
        });

        // 3. Matched Quick Navs
        quickNavs.forEach(nav => {
            if (nav.title.toLowerCase().includes(q)) {
                items.push({
                    ...nav,
                    category: language === 'zh' ? '站點導航' : 'Navigation'
                });
            }
        });

        return items;
    }, [query, books, allConcepts, quickNavs, language]);

    // Handle keydown for selection
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results[selectedIndex]) {
                handleSelect(results[selectedIndex]);
            }
        }
    };

    const handleSelect = (item) => {
        onClose();
        if (item.path) {
            navigate(item.path);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '12vh',
                paddingLeft: '16px',
                paddingRight: '16px',
                animation: 'fadeIn 0.15s ease'
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    width: '100%',
                    maxWidth: '640px',
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
                    border: '1px solid var(--border-light)',
                    overflow: 'hidden',
                    animation: 'scaleUp 0.15s ease'
                }}
            >
                {/* Search Bar Input */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px 20px',
                    borderBottom: '1px solid var(--border-light)',
                    gap: '12px',
                    background: 'var(--bg)'
                }}>
                    <Search size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value);
                            setSelectedIndex(0);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={language === 'zh' ? '搜尋書名、作者、思維模型、知識點 (例如：快思慢想、第一性原理、習慣)...' : 'Search books, authors, mental models, concepts...'}
                        style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontSize: '15px',
                            fontWeight: '600',
                            color: 'var(--text)'
                        }}
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                color: 'var(--text-muted)'
                            }}
                        >
                            <X size={16} />
                        </button>
                    )}
                    <kbd style={{
                        padding: '2px 8px',
                        background: 'white',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: 'var(--text-muted)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        ESC
                    </kbd>
                </div>

                {/* Results List */}
                <div style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '12px'
                }}>
                    {results.length === 0 ? (
                        <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)' }}>
                                {language === 'zh' ? '查無符合條件的內容' : 'No results found'}
                            </div>
                            <div style={{ fontSize: '12px', marginTop: '4px' }}>
                                {language === 'zh' ? '試試搜尋「查理·蒙格」、「反脆弱」、「原子習慣」或「決策」' : 'Try searching for Munger, Antifragility, Habits, or Decisions'}
                            </div>
                        </div>
                    ) : (
                        results.map((item, idx) => {
                            const isSelected = idx === selectedIndex;
                            const IconComponent = item.icon || BookOpen;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => handleSelect(item)}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '14px',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        background: isSelected ? 'var(--sidebar-active)' : 'transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.1s ease',
                                        border: isSelected ? '1px solid var(--border-light)' : '1px solid transparent'
                                    }}
                                >
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        background: item.color ? `${item.color}15` : 'var(--tag-bg)',
                                        color: item.color || 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <IconComponent size={18} />
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.title}
                                            </span>
                                            {item.category && (
                                                <span style={{
                                                    fontSize: '10px',
                                                    padding: '2px 8px',
                                                    borderRadius: '6px',
                                                    background: 'var(--bg)',
                                                    border: '1px solid var(--border-light)',
                                                    color: 'var(--text-muted)',
                                                    fontWeight: '700'
                                                }}>
                                                    {item.category}
                                                </span>
                                            )}
                                        </div>
                                        {item.subtitle && (
                                            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {item.subtitle}
                                            </div>
                                        )}
                                    </div>

                                    <ArrowRight size={14} color={isSelected ? 'var(--primary)' : 'var(--border)'} style={{ flexShrink: 0 }} />
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer hints */}
                <div style={{
                    padding: '10px 18px',
                    background: 'var(--bg)',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    fontWeight: '600'
                }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <span>↑↓ {language === 'zh' ? '選擇' : 'Navigate'}</span>
                        <span>↵ {language === 'zh' ? '跳轉' : 'Open'}</span>
                        <span>ESC {language === 'zh' ? '關閉' : 'Close'}</span>
                    </div>
                    <span>⚡ WeLearn 快捷指令樞紐</span>
                </div>
            </div>
        </div>
    );
}
