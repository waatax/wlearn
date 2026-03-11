import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Users, BookOpen, Award, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Authors() {
        const navigate = useNavigate();
        const { language } = useLanguage();
        const [authors, setAuthors] = useState([]);
        const [loading, setLoading] = useState(true);
        const [search, setSearch] = useState('');
        const [sortBy, setSortBy] = useState('books');

        useEffect(() => {
                fetch('authors.json')
                        .then(r => r.json())
                        .then(data => { setAuthors(data); setLoading(false); })
                        .catch(() => setLoading(false));
        }, []);

        const filtered = useMemo(() => {
                let arr = [...authors];
                if (search) {
                        const q = search.toLowerCase();
                        arr = arr.filter(a =>
                                a.name.toLowerCase().includes(q) ||
                                (a.name_en || '').toLowerCase().includes(q) ||
                                (a.name_zh || '').toLowerCase().includes(q) ||
                                (a.career || '').toLowerCase().includes(q)
                        );
                }
                if (sortBy === 'books') arr.sort((a, b) => b.book_count - a.book_count);
                else if (sortBy === 'name') arr.sort((a, b) => a.name.localeCompare(b.name));
                return arr;
        }, [authors, search, sortBy]);

        const totalBooks = authors.reduce((s, a) => s + a.book_count, 0);

        // Color palette for avatar backgrounds
        const avatarColors = [
                '#0097a7', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
                '#009688', '#ff5722', '#795548', '#607d8b', '#ff8f00',
                '#2e7d32', '#c62828', '#283593', '#00695c', '#ad1457'
        ];
        const getColor = (name) => avatarColors[name.charCodeAt(0) % avatarColors.length];

        return (
                <div style={{ background: '#f5f0e8', minHeight: '100vh' }}>
                        {/* Top nav */}
                        <div style={{
                                padding: '12px 24px', borderBottom: '1px solid #e0d8cc',
                                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                                <button onClick={() => navigate('/')} style={{
                                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                                        borderRadius: '8px', border: '1px solid #e0d8cc', background: 'white',
                                        cursor: 'pointer', fontSize: '14px', color: '#2d2a24', fontWeight: '500',
                                }}>
                                        <ArrowLeft size={16} /> 返回
                                </button>
                                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', color: '#2d2a24' }}>
                                        <Users size={20} color="#0097a7" /> 作者專區
                                </h1>
                                <div style={{ width: '80px' }} />
                        </div>

                        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
                                {loading ? (
                                        <div style={{ textAlign: 'center', padding: '80px', color: '#888' }}>載入中...</div>
                                ) : (
                                        <>
                                                {/* Summary cards */}
                                                <div style={{
                                                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                        gap: '16px', marginBottom: '24px',
                                                }}>
                                                        <div style={{
                                                                background: 'linear-gradient(135deg, #0097a7, #00bcd4)',
                                                                borderRadius: '16px', padding: '24px', color: 'white',
                                                                boxShadow: '0 8px 24px rgba(0,151,167,0.25)',
                                                                animation: 'fadeInUp 0.4s ease both',
                                                        }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                                        <Users size={18} style={{ opacity: 0.8 }} />
                                                                        <span style={{ fontSize: '12px', fontWeight: '600', opacity: 0.85, textTransform: 'uppercase' }}>作者總數</span>
                                                                </div>
                                                                <div style={{ fontSize: '32px', fontWeight: '800' }}>{authors.length}</div>
                                                        </div>
                                                        <div style={{
                                                                background: 'white', borderRadius: '16px', padding: '24px',
                                                                border: '1px solid #e0d8cc', animation: 'fadeInUp 0.4s ease 0.1s both',
                                                        }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                                        <BookOpen size={18} color="#ff8f00" />
                                                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b6459', textTransform: 'uppercase' }}>收錄書籍</span>
                                                                </div>
                                                                <div style={{ fontSize: '32px', fontWeight: '800', color: '#ff8f00' }}>{totalBooks}</div>
                                                        </div>
                                                        <div style={{
                                                                background: 'white', borderRadius: '16px', padding: '24px',
                                                                border: '1px solid #e0d8cc', animation: 'fadeInUp 0.4s ease 0.2s both',
                                                        }}>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                                                        <Award size={18} color="#9c27b0" />
                                                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#6b6459', textTransform: 'uppercase' }}>詳細簡介</span>
                                                                </div>
                                                                <div style={{ fontSize: '32px', fontWeight: '800', color: '#9c27b0' }}>{authors.filter(a => a.has_detailed_bio).length}</div>
                                                        </div>
                                                </div>

                                                {/* Search & sort */}
                                                <div style={{
                                                        display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
                                                        flexWrap: 'wrap',
                                                }}>
                                                        <div style={{ position: 'relative', flex: 1, minWidth: '200px', maxWidth: '400px' }}>
                                                                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                                                                <input
                                                                        value={search}
                                                                        onChange={e => setSearch(e.target.value)}
                                                                        placeholder="搜尋作者..."
                                                                        style={{
                                                                                width: '100%', padding: '10px 12px 10px 34px', borderRadius: '10px',
                                                                                border: '1px solid #e0d8cc', background: 'white', fontSize: '14px',
                                                                                outline: 'none', color: '#2d2a24',
                                                                        }}
                                                                />
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '8px' }}>
                                                                {[{ key: 'books', label: '書籍數量' }, { key: 'name', label: '名稱排序' }].map(btn => (
                                                                        <button key={btn.key} onClick={() => setSortBy(btn.key)} style={{
                                                                                padding: '8px 16px', borderRadius: '999px',
                                                                                border: `1px solid ${sortBy === btn.key ? '#0097a7' : '#e0d8cc'}`,
                                                                                background: sortBy === btn.key ? '#e0f7fa' : 'white',
                                                                                color: sortBy === btn.key ? '#0097a7' : '#2d2a24',
                                                                                cursor: 'pointer', fontSize: '13px', fontWeight: sortBy === btn.key ? '600' : '400',
                                                                        }}>
                                                                                {btn.label}
                                                                        </button>
                                                                ))}
                                                        </div>
                                                        <span style={{ fontSize: '13px', color: '#9e9486', marginLeft: 'auto' }}>
                                                                顯示 {filtered.length} 位作者
                                                        </span>
                                                </div>

                                                {/* Authors grid */}
                                                <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                                                        gap: '14px',
                                                }}>
                                                        {filtered.map((author, i) => (
                                                                <div
                                                                        key={author.id}
                                                                        onClick={() => navigate(`/author/${author.id}`)}
                                                                        style={{
                                                                                display: 'flex', alignItems: 'center', gap: '14px',
                                                                                padding: '16px 18px', background: 'white',
                                                                                borderRadius: '14px', border: '1px solid #ebe5da',
                                                                                cursor: 'pointer', transition: 'all 0.2s',
                                                                                animation: `fadeInUp 0.3s ease ${Math.min(i * 20, 400)}ms both`,
                                                                        }}
                                                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                                                                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                                                                >
                                                                        {/* Avatar */}
                                                                        <div style={{
                                                                                width: '48px', height: '48px', borderRadius: '50%',
                                                                                background: `linear-gradient(135deg, ${getColor(author.name)}, ${getColor(author.name)}dd)`,
                                                                                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                                fontWeight: '700', fontSize: '18px', flexShrink: 0,
                                                                                boxShadow: `0 4px 12px ${getColor(author.name)}30`,
                                                                        }}>
                                                                                {author.avatar_initial}
                                                                        </div>

                                                                        {/* Info */}
                                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                                                <div style={{
                                                                                        fontSize: '15px', fontWeight: '600', color: '#2d2a24',
                                                                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                                                }}>
                                                                                        {author.name}
                                                                                </div>
                                                                                <div style={{ fontSize: '12px', color: '#9e9486', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                                                        {author.career}
                                                                                </div>
                                                                        </div>

                                                                        {/* Book count + arrow */}
                                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                                                                <span style={{
                                                                                        background: '#f0ebe0', padding: '4px 10px', borderRadius: '999px',
                                                                                        fontSize: '12px', fontWeight: '600', color: '#6b6459',
                                                                                }}>
                                                                                        {author.book_count} 本
                                                                                </span>
                                                                                <ChevronRight size={16} color="#ccc" />
                                                                        </div>
                                                                </div>
                                                        ))}
                                                </div>
                                        </>
                                )}
                        </div>
                </div>
        );
}
