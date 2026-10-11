import React, { useState } from 'react';
import { COSMIC_REALMS } from '../lib/gamification';
import { useGamification } from '../context/GamificationContext';
import { useLanguage } from '../context/LanguageContext';
import GlobalHeader from '../components/GlobalHeader';
import Sidebar from '../components/Sidebar';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import ReadingComfortControls from '../components/ReadingComfortControls';
import {
    ExternalLink,
    Sparkles,
    BookOpen,
    Layers,
    Scroll,
    Compass,
    Palmtree,
    BookMarked,
    Globe,
    ArrowUpRight,
    Shield,
    Menu,
    Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';

const REALM_ICONS = {
    BookMarked: BookMarked,
    Layers: Layers,
    Scroll: Scroll,
    Compass: Compass,
    Palmtree: Palmtree,
    BookOpen: BookOpen
};

export default function Universe() {
    const { state, trackExternalVisit } = useGamification();
    const { language, t, toggleLanguage } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleVisitRealm = (realm) => {
        if (realm.url && realm.url !== '#') {
            trackExternalVisit(realm.id);
            window.open(realm.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
            <GlobalHeader />

            <div style={{ display: 'flex', flex: 1 }}>
                <Sidebar
                    books={[]}
                    filters={{ search: '', tags: [], playlist: '' }}
                    onFiltersChange={() => {}}
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: '90px' }}>

                {/* Hero Multiverse Banner */}
                <div style={{ padding: '32px 32px 16px 32px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #064e3b 100%)',
                        borderRadius: '24px',
                        padding: '40px 36px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.4)'
                    }}>
                        <div style={{ position: 'relative', zIndex: 2, maxWidth: '750px' }}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                padding: '6px 14px',
                                borderRadius: '100px',
                                fontSize: '12px',
                                fontWeight: '750',
                                color: '#fef08a',
                                marginBottom: '16px'
                            }}>
                                <Sparkles size={14} color="#fef08a" />
                                <span>THE 6 COSMIC KNOWLEDGE REALMS</span>
                            </div>
                            <h1 style={{ fontSize: '28px', fontWeight: '900', lineHeight: 1.2, margin: '0 0 12px 0' }}>
                                {language === 'zh' ? '跨越文明維度的知識宇宙星系' : 'The Cross-Civilization Knowledge Multiverse'}
                            </h1>
                            <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                                {language === 'zh'
                                    ? '學習不只是單一書本的記憶，而是多維文明脈絡的交融。在此探索 6 大智慧星域：聖經靈修、軟體架構、古典文史、越南與印尼語言文化，以及 WeLearn 說書大圖書館。每次跨界探索皆可累積經驗值與學者成就！'
                                    : 'Learning is multidimensional. Traverse the 6 cosmic domains—Biblical Wisdom, System Architecture, Chinese Classics, Vietnamese & Indonesian Languages, and the WeLearn YouTube Codex—to master modern polymathy.'}
                            </p>

                            {/* Learning Science Portal Banner */}
                            <Link to="/learning-science" style={{
                                display: 'inline-flex', alignItems: 'center', gap: '10px',
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                                padding: '12px 22px', borderRadius: '14px', color: 'white',
                                textDecoration: 'none', fontWeight: '800', fontSize: '14px',
                                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <Brain size={18} />
                                <span>{language === 'zh' ? '探索全新旗艦：學習科學與底層邏輯全景框架 ➔' : 'Explore Science of Learning Framework ➔'}</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 6 Cosmic Realms Grid */}
                <div style={{
                    padding: '16px 20px 64px 20px',
                    maxWidth: '1280px',
                    width: '100%',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                    gap: '20px'
                }}>
                    {COSMIC_REALMS.map((realm) => {
                        const IconComponent = REALM_ICONS[realm.icon] || Globe;
                        const visitCount = realm.id === 'welearn' ? (state.readBooks || []).length : (state.externalVisits?.[realm.id] || 0);
                        const isInternal = realm.id === 'welearn';

                        return (
                            <div
                                key={realm.id}
                                style={{
                                    background: 'var(--card-bg)',
                                    borderRadius: '20px',
                                    padding: '28px',
                                    border: '1px solid var(--border-light)',
                                    boxShadow: 'var(--card-shadow)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden'
                                }}
                            >
                                {/* Top Accent Bar */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '5px',
                                    background: realm.gradient
                                }} />

                                <div>
                                    {/* Header info */}
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div style={{
                                            width: '54px',
                                            height: '54px',
                                            borderRadius: '16px',
                                            background: realm.gradient,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            boxShadow: `0 8px 20px ${realm.color}40`
                                        }}>
                                            <IconComponent size={28} />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                color: realm.color,
                                                background: realm.accentBg,
                                                padding: '3px 8px',
                                                borderRadius: '8px',
                                                border: `1px solid ${realm.color}20`
                                            }}>
                                                {realm.badge}
                                            </span>
                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                {language === 'zh' ? `已探索 ${visitCount} 次` : `Explored ${visitCount} times`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Realm Name & Subtitle */}
                                    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', margin: '0 0 4px 0' }}>
                                        {language === 'zh' ? realm.name.zh : realm.name.en}
                                    </h3>
                                    <div style={{ fontSize: '12px', fontWeight: '600', color: realm.color, marginBottom: '12px' }}>
                                        {language === 'zh' ? realm.subtitle.zh : realm.subtitle.en}
                                    </div>

                                    {/* Description */}
                                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                                        {language === 'zh' ? realm.description.zh : realm.description.en}
                                    </p>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                                        {realm.tags.slice(0, 4).map((tag, idx) => (
                                            <span key={idx} style={{
                                                fontSize: '11px',
                                                color: 'var(--text-secondary)',
                                                background: 'var(--bg)',
                                                padding: '3px 8px',
                                                borderRadius: '6px',
                                                fontWeight: '500'
                                            }}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div>
                                    {isInternal ? (
                                        <Link
                                            to="/"
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #2d6648, #1b452e)',
                                                color: 'white',
                                                fontWeight: '750',
                                                fontSize: '13px',
                                                textDecoration: 'none',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                boxShadow: '0 4px 12px rgba(45, 102, 72, 0.25)'
                                            }}
                                        >
                                            <BookOpen size={16} />
                                            <span>{language === 'zh' ? '進入說書大圖書館 (700+ 書籍)' : 'Browse 700+ Book Library'}</span>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleVisitRealm(realm)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 16px',
                                                borderRadius: '12px',
                                                border: 'none',
                                                background: realm.gradient,
                                                color: 'white',
                                                fontWeight: '750',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                boxShadow: `0 4px 14px ${realm.color}40`,
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <span>{language === 'zh' ? `前往探索站點 (+${realm.expReward} EXP)` : `Visit Site (+${realm.expReward} EXP)`}</span>
                                            <ArrowUpRight size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 1. Polymath Evolution Roadmap Diagram */}
                <div style={{ padding: '0 20px 32px 20px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '28px',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Sparkles size={18} color="#8b5cf6" />
                                    <span>{language === 'zh' ? '跨界通才 4 階段演化天梯 (Polymath Progression Roadmap)' : 'Polymath Progression Roadmap'}</span>
                                </h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                                    {language === 'zh' ? '從單一領域專業，升維為查理·蒙格多元思維模型格柵的現代博雅通才' : 'From singular specialization to multidisciplinary latticework mastery'}
                                </p>
                            </div>
                            <span style={{ fontSize: '11px', color: '#6d28d9', background: '#f5f3ff', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
                                EVOLUTION PATH
                            </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                            {[
                                { step: 'STAGE 01', title: { zh: '單點深耕 (T型豎軸)', en: 'Singular Depth' }, desc: { zh: '在單一專業領域建立不可替代的深度，掌握行業第一性原理與底層技術細節。', en: 'Master single-domain fundamentals and vertical competence.' }, color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd' },
                                { step: 'STAGE 02', title: { zh: '雙域穿透 (概念移轉)', en: 'Dual Penetration' }, desc: { zh: '跨足相鄰或對立學科（如商業遇上心理學），發現底層結構同構性，觸發跨界類比。', en: 'Bridge adjacent fields to recognize structural isomorphisms.' }, color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
                                { step: 'STAGE 03', title: { zh: '格柵成網 (多元模型)', en: 'Latticework Mesh' }, desc: { zh: '吸收數學、生物學、物理學、神學與人文的 100+ 核心模型，構築查理·蒙格心智格柵。', en: 'Weave 100+ multidisciplinary mental models into an interlocking mesh.' }, color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
                                { step: 'STAGE 04', title: { zh: '全息融通 (跨界通才)', en: 'Holistic Polymath' }, desc: { zh: '破除學科藩籬，面對任何全新複雜局勢皆能由底層邏輯推導出前瞻性槓桿解。', en: 'Effortlessly synthesize disparate civilizational wisdom to solve complex reality.' }, color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' }
                            ].map((st, i) => (
                                <div key={i} style={{ background: st.bg, borderRadius: '14px', padding: '18px', border: `1.5px solid ${st.border}` }}>
                                    <div style={{ fontSize: '10px', fontWeight: '850', color: st.color, letterSpacing: '0.05em', marginBottom: '6px' }}>{st.step}</div>
                                    <h4 style={{ fontSize: '15px', fontWeight: '850', color: '#1e293b', margin: '0 0 8px 0' }}>{st.title[language]}</h4>
                                    <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.55, margin: 0 }}>{st.desc[language]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Cosmic Realms Comparative Matrix Table */}
                <div style={{ padding: '0 20px 48px 20px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '28px',
                        border: '1px solid var(--border-light)',
                        boxShadow: 'var(--card-shadow)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>🌌</span>
                                    <span>{language === 'zh' ? '六大宇宙星域文明底蘊與跨界綜效矩陣表' : '6 Cosmic Realms Civilizational Matrix'}</span>
                                </h3>
                                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
                                    {language === 'zh' ? '多元文明的交匯點：心靈、科技、文史與地緣語言的穿透綜效' : 'Comparative analysis of the 6 civilization learning domains'}
                                </p>
                            </div>
                            <span style={{ fontSize: '11px', color: '#0369a1', background: '#e0f2fe', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
                                MULTIVERSE MATRIX
                            </span>
                        </div>

                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                            <table style={{ width: '100%', minWidth: '760px', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', color: '#334155' }}>星域領域</th>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', color: '#334155' }}>文明維度</th>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', color: '#0284c7' }}>核心心智模型</th>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', color: '#334155' }}>實戰應用場景</th>
                                        <th style={{ padding: '12px 14px', fontWeight: '800', color: '#16a34a' }}>跨界穿透指數</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'WeLearn 說書大圖書館', civil: '現代商業與個體成長', model: '費曼學習閉環、不對稱風險、刻意練習', app: '商業投資、職場進階、自我認知升級', score: '★★★★★ (5.0)' },
                                        { name: '聖經靈修 (Bible Insights)', civil: '希伯來信仰與靈性根基', model: '盟約精神、恩典意識、終極審判與謙卑', app: '心靈安頓、道德錨定、逆境韌性與僕人領導', score: '★★★★★ (5.0)' },
                                        { name: '軟體架構 (System Architecture)', civil: '數位系統論與工程公理', model: '高內聚低耦合、抽象屏障、狀態機與解耦', app: '組織管理、流程自動化、複雜系統治理', score: '★★★★☆ (4.8)' },
                                        { name: '古典文史 (Chinese Classics)', civil: '華夏三千年歷史興衰演化', model: '興衰週期律、王霸之道、經世致用與資治通鑑', app: '地緣政治、戰略大勢判斷、人性與權力博弈', score: '★★★★☆ (4.7)' },
                                        { name: '印尼文化 (Bahasa Indonesia)', civil: '南島語系與東南亞最大經濟體', model: '高語境人際和諧 (Gotong Royong)、地緣文化穿透', app: '新南向商務考察、跨文化協作、區域貿易出海', score: '★★★★☆ (4.5)' },
                                        { name: '越南文化 (Tiếng Việt)', civil: '東亞漢文化圈與東南亞製造重鎮', model: '文化韌性 (Dẻo dai)、快速工業化與雙重身分認同', app: '供應鏈轉移、東協新興市場投資、跨國人際拓展', score: '★★★★☆ (4.6)' },
                                    ].map((row, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? 'white' : '#fcfcfc' }}>
                                            <td style={{ padding: '12px 14px', fontWeight: '850', color: '#1e293b' }}>{row.name}</td>
                                            <td style={{ padding: '12px 14px', color: '#64748b' }}>{row.civil}</td>
                                            <td style={{ padding: '12px 14px', color: '#0369a1', fontWeight: '700' }}>{row.model}</td>
                                            <td style={{ padding: '12px 14px', color: '#334155' }}>{row.app}</td>
                                            <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: '800' }}>{row.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BottomNavbar />
    </div>
);
}
