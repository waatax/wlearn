import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import { useLanguage } from '../context/LanguageContext';
import { useGamification } from '../context/GamificationContext';
import {
    LEARNING_DIMENSIONS,
    LEARNING_MENTAL_MODELS,
    LEARNING_DIAGNOSTICS_QUESTIONS
} from '../data/learningFrameworkData';
import {
    Brain,
    Zap,
    Flame,
    Compass,
    Layers,
    Workflow,
    BookOpen,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    ArrowUpRight,
    Search,
    X,
    Menu,
    Globe,
    HelpCircle,
    RefreshCw,
    Award,
    TrendingUp,
    ChevronRight,
    AlertTriangle,
    Target,
    Activity,
    Compass as CompassIcon,
    Cpu,
    Database,
    Repeat,
    Maximize2,
    Crosshair,
    RotateCw,
    Network,
    Shuffle,
    Waves,
    MessageSquareQuote,
    Bookmark
} from 'lucide-react';

const ICON_MAP = {
    Brain,
    Zap,
    Flame,
    Compass,
    Layers,
    Workflow,
    BookOpen,
    Sparkles,
    Cpu,
    Database,
    Repeat,
    Maximize2,
    Crosshair,
    RotateCw,
    Network,
    Shuffle,
    Waves,
    MessageSquareQuote
};

export default function LearningScience() {
    const { language, t, toggleLanguage } = useLanguage();
    const { state } = useGamification();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [allBooks, setAllBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true);

    // Active Section / Tab
    const [activeTab, setActiveTab] = useState('dimensions'); // 'dimensions', 'models', 'diagnostic', 'closed_loop'
    const [selectedDimId, setSelectedDimId] = useState('neuroscience');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModelCategory, setSelectedModelCategory] = useState('all');

    // Diagnostic State
    const [answers, setAnswers] = useState({});
    const [diagnosticSubmitted, setDiagnosticSubmitted] = useState(false);

    // Ref for scrolling
    const contentRef = useRef(null);

    // Load Books Data from public/books.json
    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'books.json')
            .then(res => res.json())
            .then(data => {
                setAllBooks(data || []);
                setLoadingBooks(false);
            })
            .catch(err => {
                console.error('Failed to load books.json', err);
                setLoadingBooks(false);
            });
    }, []);

    // Currently Selected Dimension
    const activeDimension = useMemo(() => {
        return LEARNING_DIMENSIONS.find(d => d.id === selectedDimId) || LEARNING_DIMENSIONS[0];
    }, [selectedDimId]);

    // Curated Books for active dimension
    const curatedBooksForActiveDim = useMemo(() => {
        if (!allBooks.length) return [];
        const targetCodes = activeDimension.bookCodes || [];
        return targetCodes
            .map(code => allBooks.find(b => b.code === code))
            .filter(Boolean);
    }, [allBooks, activeDimension]);

    // Search filter across curated books
    const filteredCuratedBooks = useMemo(() => {
        if (!searchQuery.trim()) return curatedBooksForActiveDim;
        const q = searchQuery.toLowerCase();
        return curatedBooksForActiveDim.filter(b => {
            const titleZh = b.title_cn || '';
            const titleEn = b.title_en || '';
            const author = b.author || '';
            const desc = b.description || '';
            const tags = (b.tags || []).join(' ');
            return titleZh.toLowerCase().includes(q) ||
                titleEn.toLowerCase().includes(q) ||
                author.toLowerCase().includes(q) ||
                desc.toLowerCase().includes(q) ||
                tags.toLowerCase().includes(q);
        });
    }, [curatedBooksForActiveDim, searchQuery]);

    // Filtered Mental Models
    const filteredMentalModels = useMemo(() => {
        if (selectedModelCategory === 'all') return LEARNING_MENTAL_MODELS;
        return LEARNING_MENTAL_MODELS.filter(m => m.category === selectedModelCategory);
    }, [selectedModelCategory]);

    // Diagnostic Calculation
    const diagnosticResult = useMemo(() => {
        if (!diagnosticSubmitted) return null;
        let totalScore = 0;
        const dimScores = {
            neuroscience: 0,
            memory: 0,
            mindset: 0,
            underlying_logic: 0,
            action_systems: 0
        };

        LEARNING_DIAGNOSTICS_QUESTIONS.forEach(q => {
            const selectedOptIndex = answers[q.id];
            if (selectedOptIndex !== undefined) {
                const opt = q.options[selectedOptIndex];
                totalScore += opt.score;
                dimScores[q.dimension] = (dimScores[q.dimension] || 0) + opt.score;
            }
        });

        // Determine Archetype
        let archetype = {
            title: language === 'zh' ? '全閉環認知架構師' : 'Holistic Cognitive Architect',
            desc: language === 'zh'
                ? '您在腦科學節奏、主動提取、成長心態與實踐閉環上具備極為均衡且深厚的理解，是難得的知識複利大師！'
                : 'You possess a balanced and deep mastery across brain rhythms, active recall, growth mindset, and closed-loop execution!',
            color: '#16a34a',
            badge: 'S-Tier'
        };

        if (totalScore < 10) {
            archetype = {
                title: language === 'zh' ? '直覺型探索者 (亟需科學體系升級)' : 'Intuitive Seeker (Needs Framework)',
                desc: language === 'zh'
                    ? '您目前依賴直覺與被動輸入，容易掉入「劃重點假象」與「疲勞戰術」。建議從「主動回想」與「專注發散切換」開始改造！'
                    : 'Currently relying on intuitive habits and passive consumption. Focus on active recall and focused-diffuse rhythm switching.',
                color: '#ea580c',
                badge: 'C-Tier'
            };
        } else if (totalScore < 15) {
            archetype = {
                title: language === 'zh' ? '敏銳吸收者 (待強化輸出閉環)' : 'Keen Synthesizer (Lacks Output Loop)',
                desc: language === 'zh'
                    ? '您有良好的心態與理解力，但在「以輸出倒逼輸入」與「費曼白話教學」上仍有巨大提升空間，跨越輸出門檻即可爆發。'
                    : 'Strong comprehension and mindset, but requires deliberate output loops and the Feynman technique to compound gains.',
                color: '#0284c7',
                badge: 'B-Tier'
            };
        }

        // Recommend Books based on lowest dimension
        const sortedDims = Object.entries(dimScores).sort((a, b) => a[1] - b[1]);
        const weakestDimId = sortedDims[0][0];
        const weakestDimObj = LEARNING_DIMENSIONS.find(d => d.id === weakestDimId) || LEARNING_DIMENSIONS[0];
        const recommendedBooks = (weakestDimObj.bookCodes || [])
            .map(code => allBooks.find(b => b.code === code))
            .filter(Boolean)
            .slice(0, 3);

        return {
            totalScore,
            maxScore: LEARNING_DIAGNOSTICS_QUESTIONS.length * 4,
            archetype,
            weakestDimObj,
            recommendedBooks
        };
    }, [diagnosticSubmitted, answers, language, allBooks]);

    const handleAnswerSelect = (questionId, optionIndex) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    };

    const handleDiagnosticSubmit = () => {
        if (Object.keys(answers).length < LEARNING_DIAGNOSTICS_QUESTIONS.length) {
            alert(language === 'zh' ? '請回答全部 5 道評測題目以獲取精確報告！' : 'Please complete all 5 questions for accurate diagnostics!');
            return;
        }
        setDiagnosticSubmitted(true);
    };

    const handleResetDiagnostic = () => {
        setAnswers({});
        setDiagnosticSubmitted(false);
    };

    const scrollToSection = (tabId) => {
        setActiveTab(tabId);
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const DimensionIcon = ICON_MAP[activeDimension.icon] || Brain;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-gradient)' }}>
            {/* Sidebar integration */}
            <Sidebar
                books={allBooks}
                filters={{ search: '', tags: [], playlist: '' }}
                onFiltersChange={() => {}}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, paddingBottom: '90px' }}>
                {/* Top Navigation Bar */}
                <header style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 32px', borderBottom: '1px solid var(--border-light)',
                    background: 'var(--sidebar-bg)', backdropFilter: 'blur(var(--sidebar-blur))',
                    position: 'sticky', top: 0, zIndex: 30,
                    WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                    gap: '16px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="開啟選單"
                            style={{
                                background: 'white', border: '1px solid var(--border)',
                                borderRadius: '10px', padding: '8px', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                        >
                            <Menu size={20} color="#2d2a24" />
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '10px',
                                background: 'linear-gradient(135deg, #8b5cf6, #4f46e5)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'white', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                            }}>
                                <Brain size={20} />
                            </div>
                            <div>
                                <span style={{ fontSize: '16px', fontWeight: '850', color: 'var(--text)', display: 'block', lineHeight: 1.1 }}>
                                    {t('learningScience')}
                                </span>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                    {language === 'zh' ? '認知神經科學與底層思維體系' : 'Cognitive Science & Underlying Systems'}
                                </span>
                            </div>
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
                                fontWeight: '600', transition: 'all var(--transition-fast)'
                            }}
                        >
                            <Globe size={15} />
                            <span>{language === 'zh' ? 'EN' : '繁中'}</span>
                        </button>
                    </div>
                </header>

                {/* Hero Presentation Banner */}
                <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '32px 32px 16px 32px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1e1b4b 0%, #31104b 50%, #0f172a 100%)',
                        borderRadius: '24px',
                        padding: '40px 36px',
                        color: 'white',
                        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.25)',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        {/* Background glowing orbs */}
                        <div style={{
                            position: 'absolute', top: '-60px', right: '-40px',
                            width: '260px', height: '260px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 70%)',
                            filter: 'blur(30px)', pointerEvents: 'none'
                        }} />
                        <div style={{
                            position: 'absolute', bottom: '-40px', left: '10%',
                            width: '200px', height: '200px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, transparent 70%)',
                            filter: 'blur(30px)', pointerEvents: 'none'
                        }} />

                        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', marginBottom: '16px' }}>
                                <Sparkles size={16} color="#c4b5fd" />
                                <span style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '0.08em', color: '#e0e7ff', textTransform: 'uppercase' }}>
                                    THE SCIENCE OF LEARNING & COGNITIVE ARCHITECTURE
                                </span>
                            </div>

                            <h1 style={{ fontSize: '32px', fontWeight: '900', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '14px', color: '#ffffff' }}>
                                {language === 'zh'
                                    ? '學習科學與底層邏輯全景框架系統'
                                    : 'The Science of Learning & Cognitive Framework System'}
                            </h1>

                            <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '28px' }}>
                                {language === 'zh'
                                    ? '從大腦神經可塑性、記憶提取編碼、刻意練習心態，到蒙格多元思維模型與全閉環輸出系統。穿透 597 本館藏經典，淬煉出人類頂級學者與終身學習者的認知進化底層邏輯。'
                                    : 'Deconstruct neuroplasticity, retrieval mechanics, growth mindset, mental model latticework, and closed-loop mastery from 597 curated masterworks.'}
                            </p>

                            {/* Metrics pill strip */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
                                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '10px 18px', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Brain size={18} color="#a78bfa" />
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{language === 'zh' ? '核心科學維度' : 'Core Dimensions'}</div>
                                        <div style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>6 大領域</div>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '10px 18px', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <BookOpen size={18} color="#38bdf8" />
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{language === 'zh' ? '深度關聯館藏書籍' : 'Curated Masterworks'}</div>
                                        <div style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>35+ 本經典</div>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '10px 18px', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <CompassIcon size={18} color="#4ade80" />
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{language === 'zh' ? '底層心智模型' : 'Mental Models'}</div>
                                        <div style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>15+ 框架</div>
                                    </div>
                                </div>
                                <div style={{ background: 'rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '10px 18px', border: '1px solid rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Target size={18} color="#fb923c" />
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>{language === 'zh' ? '實踐閉環模型' : 'Closed-Loop Systems'}</div>
                                        <div style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>3:7 黃金律</div>
                                    </div>
                                </div>
                            </div>

                            {/* Section Navigation Tabs */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                <button
                                    onClick={() => scrollToSection('dimensions')}
                                    style={{
                                        padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '750',
                                        cursor: 'pointer', border: 'none', transition: 'all var(--transition-fast)',
                                        background: activeTab === 'dimensions' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                                        color: activeTab === 'dimensions' ? '#1e1b4b' : '#ffffff',
                                        boxShadow: activeTab === 'dimensions' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                                    }}
                                >
                                    🔬 {t('dimensionsNav')}
                                </button>
                                <button
                                    onClick={() => scrollToSection('models')}
                                    style={{
                                        padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '750',
                                        cursor: 'pointer', border: 'none', transition: 'all var(--transition-fast)',
                                        background: activeTab === 'models' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                                        color: activeTab === 'models' ? '#1e1b4b' : '#ffffff',
                                        boxShadow: activeTab === 'models' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                                    }}
                                >
                                    🧭 {t('mentalModelsNav')}
                                </button>
                                <button
                                    onClick={() => scrollToSection('diagnostic')}
                                    style={{
                                        padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '750',
                                        cursor: 'pointer', border: 'none', transition: 'all var(--transition-fast)',
                                        background: activeTab === 'diagnostic' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                                        color: activeTab === 'diagnostic' ? '#1e1b4b' : '#ffffff',
                                        boxShadow: activeTab === 'diagnostic' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                                    }}
                                >
                                    📊 {t('diagnosticNav')}
                                </button>
                                <button
                                    onClick={() => scrollToSection('closed_loop')}
                                    style={{
                                        padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: '750',
                                        cursor: 'pointer', border: 'none', transition: 'all var(--transition-fast)',
                                        background: activeTab === 'closed_loop' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                                        color: activeTab === 'closed_loop' ? '#1e1b4b' : '#ffffff',
                                        boxShadow: activeTab === 'closed_loop' ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                                    }}
                                >
                                    🔄 {t('closedLoopNav')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sub-container for Detailed Content */}
                <div ref={contentRef} style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '16px 32px' }}>
                    {/* TAB 1: 6 CORE DIMENSIONS */}
                    {activeTab === 'dimensions' && (
                        <div>
                            {/* Dimension Selector Pills */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                gap: '12px',
                                marginBottom: '28px'
                            }}>
                                {LEARNING_DIMENSIONS.map((dim) => {
                                    const isSelected = dim.id === selectedDimId;
                                    const IconComponent = ICON_MAP[dim.icon] || Brain;
                                    return (
                                        <button
                                            key={dim.id}
                                            onClick={() => {
                                                setSelectedDimId(dim.id);
                                                setSearchQuery('');
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '14px 16px',
                                                borderRadius: '16px',
                                                border: isSelected ? `2px solid ${dim.color}` : '1px solid var(--border-light)',
                                                background: isSelected ? 'white' : 'var(--card-bg)',
                                                cursor: 'pointer',
                                                textAlign: 'left',
                                                boxShadow: isSelected ? `0 8px 20px ${dim.color}25` : '0 2px 6px rgba(0,0,0,0.02)',
                                                transform: isSelected ? 'translateY(-2px)' : 'none',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '12px',
                                                background: isSelected ? dim.gradient : dim.accentBg,
                                                color: isSelected ? 'white' : dim.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <IconComponent size={20} />
                                            </div>
                                            <div style={{ minWidth: 0, flex: 1 }}>
                                                <div style={{ fontSize: '10px', fontWeight: '800', color: dim.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                                    {dim.code} · {dim.tag}
                                                </div>
                                                <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {dim.title[language]}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Dimension Focus Card */}
                            <div style={{
                                background: 'white',
                                borderRadius: '20px',
                                padding: '32px',
                                border: `1px solid ${activeDimension.borderColor}`,
                                boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
                                marginBottom: '32px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <div style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '16px',
                                            background: activeDimension.gradient,
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: `0 8px 16px ${activeDimension.color}35`
                                        }}>
                                            <DimensionIcon size={28} />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '12px', fontWeight: '800', color: activeDimension.color, background: activeDimension.accentBg, padding: '3px 8px', borderRadius: '6px' }}>
                                                    {activeDimension.code}
                                                </span>
                                                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                    {activeDimension.tag}
                                                </span>
                                            </div>
                                            <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text)', marginTop: '4px' }}>
                                                {activeDimension.title[language]}
                                            </h2>
                                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                                                {activeDimension.subtitle[language]}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Core Concept Banner */}
                                <div style={{
                                    background: activeDimension.accentBg,
                                    borderRadius: '14px',
                                    padding: '18px 24px',
                                    borderLeft: `5px solid ${activeDimension.color}`,
                                    marginBottom: '32px'
                                }}>
                                    <div style={{ fontSize: '12px', fontWeight: '800', color: activeDimension.color, textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>
                                        💡 {language === 'zh' ? '底層本質與核心洞見' : 'Core Philosophical Insight'}
                                    </div>
                                    <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.7, fontWeight: '500', margin: 0 }}>
                                        {activeDimension.coreConcept[language]}
                                    </p>
                                </div>

                                {/* 3 Column Deep Dive Grid: Mechanisms, Traps, Action Protocols */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                                    {/* 1. Biological & Cognitive Mechanisms */}
                                    <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                            <Cpu size={18} color={activeDimension.color} />
                                            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', margin: 0 }}>
                                                {t('biologicalMechanisms')}
                                            </h3>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                            {activeDimension.mechanisms.map((mech, idx) => (
                                                <div key={idx} style={{ background: 'white', padding: '14px', borderRadius: '12px', border: '1px solid #edf2f7' }}>
                                                    <div style={{ fontSize: '13px', fontWeight: '800', color: activeDimension.color, marginBottom: '4px' }}>
                                                        {idx + 1}. {mech.name[language]}
                                                    </div>
                                                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                                        {mech.desc[language]}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 2. Traps & Countermeasures */}
                                    <div style={{ background: '#fdfaf9', borderRadius: '16px', padding: '20px', border: '1px solid #fed7aa' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                            <AlertTriangle size={18} color="#ea580c" />
                                            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#9a3412', margin: 0 }}>
                                                {t('cognitiveTraps')}
                                            </h3>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                            {activeDimension.traps.map((tr, idx) => (
                                                <div key={idx} style={{ background: 'white', padding: '14px', borderRadius: '12px', border: '1px solid #ffedd5' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '800', color: '#c2410c', marginBottom: '6px' }}>
                                                        <span>❌ 誤區：</span>
                                                        <span>{tr.trap[language]}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '12px', color: '#166534', background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', lineHeight: 1.5 }}>
                                                        <span style={{ fontWeight: '800' }}>✅ 破局：</span>
                                                        <span>{tr.solution[language]}</span>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Action Protocols */}
                                            <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px dashed #fed7aa' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                    <Target size={16} color="#059669" />
                                                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#065f46' }}>
                                                        {t('actionProtocols')}
                                                    </span>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    {activeDimension.actionProtocols.map((act, idx) => (
                                                        <div key={idx} style={{ background: '#ecfdf5', padding: '12px', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                                                            <div style={{ fontSize: '12px', fontWeight: '800', color: '#047857', marginBottom: '2px' }}>
                                                                🎯 {act.title[language]}
                                                            </div>
                                                            <div style={{ fontSize: '12px', color: '#064e3b', lineHeight: 1.5 }}>
                                                                {act.step[language]}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Curated Library Section for Active Dimension */}
                                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '28px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                                <BookOpen size={20} color={activeDimension.color} />
                                                <span>{t('exploreBooks')} ({curatedBooksForActiveDim.length} 本精選經典)</span>
                                            </h3>
                                            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                                                {language === 'zh'
                                                    ? '點擊任一書籍卡片，可直接跳轉至本站完整深度導讀與 YouTube 影音精華'
                                                    : 'Click any book card to access the full in-depth summary and video'}
                                            </p>
                                        </div>

                                        {/* Search Filter input */}
                                        <div style={{ position: 'relative', width: '280px' }}>
                                            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder={language === 'zh' ? '在當前維度書單中搜尋...' : 'Search within dimension...'}
                                                style={{
                                                    width: '100%', padding: '8px 12px 8px 34px', borderRadius: '10px',
                                                    border: '1px solid var(--border)', fontSize: '12px', outline: 'none',
                                                    background: '#f8fafc'
                                                }}
                                            />
                                            {searchQuery && (
                                                <button
                                                    onClick={() => setSearchQuery('')}
                                                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                                                >
                                                    <X size={12} color="#94a3b8" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Book Cards Grid */}
                                    {loadingBooks ? (
                                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                            {language === 'zh' ? '正在載入學習科學經典館藏...' : 'Loading curated library...'}
                                        </div>
                                    ) : filteredCuratedBooks.length === 0 ? (
                                        <div style={{ padding: '30px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', color: 'var(--text-muted)' }}>
                                            {language === 'zh' ? '查無匹配書籍' : 'No books matching search'}
                                        </div>
                                    ) : (
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                            gap: '16px'
                                        }}>
                                            {filteredCuratedBooks.map((book) => (
                                                <div
                                                    key={book.id}
                                                    onClick={() => navigate(`/book/${book.id}`)}
                                                    style={{
                                                        background: 'white',
                                                        borderRadius: '14px',
                                                        border: '1px solid var(--border-light)',
                                                        overflow: 'hidden',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                                        e.currentTarget.style.boxShadow = `0 12px 24px ${activeDimension.color}20`;
                                                        e.currentTarget.style.borderColor = activeDimension.color;
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.currentTarget.style.transform = 'none';
                                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)';
                                                        e.currentTarget.style.borderColor = 'var(--border-light)';
                                                    }}
                                                >
                                                    {/* Cover Banner */}
                                                    <div style={{ position: 'relative', height: '140px', background: '#1e293b', overflow: 'hidden' }}>
                                                        <img
                                                            src={book.cover_url || `https://img.youtube.com/vi/${book.video_id}/hqdefault.jpg`}
                                                            alt={book.title_cn}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
                                                            onError={(e) => {
                                                                e.target.src = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop';
                                                            }}
                                                        />
                                                        <div style={{
                                                            position: 'absolute', top: '10px', left: '10px',
                                                            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
                                                            color: 'white', fontSize: '10px', fontWeight: '800',
                                                            padding: '3px 8px', borderRadius: '6px'
                                                        }}>
                                                            {book.code}
                                                        </div>
                                                        <div style={{
                                                            position: 'absolute', bottom: '10px', right: '10px',
                                                            background: activeDimension.color, color: 'white',
                                                            fontSize: '10px', fontWeight: '750', padding: '3px 8px',
                                                            borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px'
                                                        }}>
                                                            <span>導讀詳情</span>
                                                            <ArrowUpRight size={12} />
                                                        </div>
                                                    </div>

                                                    {/* Content Info */}
                                                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                                        <h4 style={{
                                                            fontSize: '15px', fontWeight: '800', color: 'var(--text)',
                                                            margin: '0 0 4px 0', lineHeight: 1.35,
                                                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                                        }}>
                                                            {book.title_cn}
                                                        </h4>
                                                        <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '500' }}>
                                                            {book.author} {book.title_en ? `· ${book.title_en}` : ''}
                                                        </div>
                                                        <p style={{
                                                            fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5,
                                                            margin: '0 0 12px 0', flex: 1,
                                                            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                                                        }}>
                                                            {book.description || '本書深度探討學習認知科學與心智模型...'}
                                                        </p>

                                                        {/* Tags */}
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'auto' }}>
                                                            {(book.tags || []).slice(0, 3).map((tag, tIdx) => (
                                                                <span key={tIdx} style={{
                                                                    fontSize: '10px', background: '#f1f5f9', color: '#475569',
                                                                    padding: '2px 6px', borderRadius: '4px', fontWeight: '600'
                                                                }}>
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: MENTAL MODELS LIBRARY */}
                    {activeTab === 'models' && (
                        <div>
                            {/* Models Header & Category Filter */}
                            <div style={{
                                background: 'white', borderRadius: '20px', padding: '28px',
                                border: '1px solid var(--border-light)', marginBottom: '24px'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                                    <div>
                                        <h2 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--text)', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <CompassIcon size={24} color="#16a34a" />
                                            <span>{t('mentalModelsNav')} (15+ 學習與思維模型速查)</span>
                                        </h2>
                                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                            {language === 'zh'
                                                ? '查理·蒙格推崇的格柵心智模型，將複雜世界歸納為簡明、可複用的思考公理。'
                                                : 'Charlie Munger\'s latticework of mental models to perceive reality without distortions.'}
                                        </p>
                                    </div>

                                    {/* Category filter buttons */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {['all', '輸出閉環', '記憶編碼', '腦科學', '心態修煉', '底層邏輯', '學習哲學'].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedModelCategory(cat)}
                                                style={{
                                                    padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                                                    border: selectedModelCategory === cat ? '1px solid #16a34a' : '1px solid var(--border-light)',
                                                    background: selectedModelCategory === cat ? '#f0fdf4' : 'white',
                                                    color: selectedModelCategory === cat ? '#166534' : 'var(--text-secondary)',
                                                    cursor: 'pointer', transition: 'all 0.15s ease'
                                                }}
                                            >
                                                {cat === 'all' ? (language === 'zh' ? '全部類別' : 'All') : cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Models Grid */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                                    gap: '18px'
                                }}>
                                    {filteredMentalModels.map((model) => {
                                        const ModelIcon = ICON_MAP[model.icon] || CompassIcon;
                                        return (
                                            <div
                                                key={model.id}
                                                style={{
                                                    background: '#f8fafc',
                                                    borderRadius: '16px',
                                                    padding: '20px',
                                                    border: '1px solid #e2e8f0',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={e => {
                                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.06)';
                                                    e.currentTarget.style.borderColor = '#86efac';
                                                }}
                                                onMouseLeave={e => {
                                                    e.currentTarget.style.transform = 'none';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <div style={{
                                                            width: '38px', height: '38px', borderRadius: '10px',
                                                            background: '#dcfce7', color: '#15803d',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                        }}>
                                                            <ModelIcon size={20} />
                                                        </div>
                                                        <div>
                                                            <h4 style={{ fontSize: '15px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                                                                {model.name[language]}
                                                            </h4>
                                                            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
                                                                {model.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#166534', background: '#bbf7d0', padding: '3px 8px', borderRadius: '6px' }}>
                                                        {model.tag}
                                                    </span>
                                                </div>

                                                {/* Action Formula */}
                                                <div style={{
                                                    background: 'white',
                                                    padding: '10px 12px',
                                                    borderRadius: '10px',
                                                    fontSize: '11px',
                                                    fontWeight: '700',
                                                    color: '#0369a1',
                                                    border: '1px solid #e0f2fe',
                                                    marginBottom: '12px',
                                                    lineHeight: 1.4
                                                }}>
                                                    ⚡ {model.formula}
                                                </div>

                                                {/* Description */}
                                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 14px 0', flex: 1 }}>
                                                    {model.description[language]}
                                                </p>

                                                {/* Source Book Reference */}
                                                <div style={{
                                                    marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #e2e8f0',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                    fontSize: '11px', color: 'var(--text-muted)'
                                                }}>
                                                    <span>📚 推薦源典：</span>
                                                    <span style={{ fontWeight: '750', color: 'var(--text)' }}>{model.sourceBook}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: DIAGNOSTIC SELF-ASSESSMENT */}
                    {activeTab === 'diagnostic' && (
                        <div style={{ background: 'white', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-light)' }}>
                            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                    <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '18px', background: '#e0f2fe', color: '#0284c7', marginBottom: '12px' }}>
                                        <Activity size={28} />
                                    </div>
                                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text)', margin: '0 0 8px 0' }}>
                                        {t('diagnosticNav')} · 個人學習體系全維度體檢
                                    </h2>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto' }}>
                                        {language === 'zh'
                                            ? '只需回答 5 道真實學習情境選擇題，系統將即時診斷您在腦科學節律、記憶提取、成長心態、底層邏輯與閉環輸出等 5 大維度的成熟度，並給予專屬書目補強建議！'
                                            : 'Answer 5 real-world learning questions to diagnose your maturity across neuroscience, active recall, mindset, logic, and output compounding.'}
                                    </p>
                                </div>

                                {!diagnosticSubmitted ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                                        {LEARNING_DIAGNOSTICS_QUESTIONS.map((q, qIdx) => {
                                            const selectedOpt = answers[q.id];
                                            return (
                                                <div
                                                    key={q.id}
                                                    style={{
                                                        background: '#f8fafc',
                                                        borderRadius: '16px',
                                                        padding: '24px',
                                                        border: '1px solid #e2e8f0'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                                        <span style={{ fontSize: '12px', fontWeight: '850', color: '#0284c7', background: '#e0f2fe', padding: '2px 8px', borderRadius: '6px' }}>
                                                            第 {qIdx + 1} 題 / 共 5 題
                                                        </span>
                                                        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
                                                            [{q.dimensionName[language]}]
                                                        </span>
                                                    </div>

                                                    <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.4 }}>
                                                        {q.question[language]}
                                                    </h3>

                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                        {q.options.map((opt, optIdx) => {
                                                            const isChecked = selectedOpt === optIdx;
                                                            return (
                                                                <button
                                                                    key={optIdx}
                                                                    onClick={() => handleAnswerSelect(q.id, optIdx)}
                                                                    style={{
                                                                        display: 'flex',
                                                                        alignItems: 'flex-start',
                                                                        gap: '12px',
                                                                        padding: '14px 16px',
                                                                        borderRadius: '12px',
                                                                        border: isChecked ? '2px solid #0284c7' : '1px solid #cbd5e1',
                                                                        background: isChecked ? '#f0f9ff' : 'white',
                                                                        textAlign: 'left',
                                                                        cursor: 'pointer',
                                                                        transition: 'all 0.15s ease'
                                                                    }}
                                                                >
                                                                    <div style={{
                                                                        width: '20px', height: '20px', borderRadius: '50%',
                                                                        border: isChecked ? '6px solid #0284c7' : '2px solid #94a3b8',
                                                                        background: 'white', flexShrink: 0, marginTop: '2px'
                                                                    }} />
                                                                    <span style={{ fontSize: '13px', color: isChecked ? '#0369a1' : 'var(--text)', fontWeight: isChecked ? '700' : '500', lineHeight: 1.5 }}>
                                                                        {opt.text[language]}
                                                                    </span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        <button
                                            onClick={handleDiagnosticSubmit}
                                            style={{
                                                padding: '16px 32px', borderRadius: '16px',
                                                background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                                color: 'white', border: 'none', fontSize: '16px', fontWeight: '850',
                                                cursor: 'pointer', boxShadow: '0 8px 24px rgba(2, 132, 199, 0.35)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                                transition: 'all 0.2s ease', marginTop: '12px'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                                        >
                                            <Award size={20} />
                                            <span>{t('startDiagnostic')}</span>
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                ) : (
                                    /* Diagnostic Result View */
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                        {/* Result Header Card */}
                                        <div style={{
                                            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                                            borderRadius: '20px', padding: '36px', color: 'white', textAlign: 'center',
                                            border: '1px solid rgba(255,255,255,0.1)'
                                        }}>
                                            <div style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: '20px', background: `${diagnosticResult.archetype.color}30`, color: diagnosticResult.archetype.color, border: `1px solid ${diagnosticResult.archetype.color}`, fontWeight: '850', fontSize: '13px', marginBottom: '12px' }}>
                                                {diagnosticResult.archetype.badge} · {diagnosticResult.archetype.title}
                                            </div>

                                            <div style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-0.03em', margin: '8px 0', color: '#ffffff' }}>
                                                {diagnosticResult.totalScore} <span style={{ fontSize: '20px', color: '#94a3b8' }}>/ {diagnosticResult.maxScore}</span>
                                            </div>

                                            <p style={{ fontSize: '15px', color: '#cbd5e1', maxWidth: '580px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
                                                {diagnosticResult.archetype.desc}
                                            </p>

                                            <button
                                                onClick={handleResetDiagnostic}
                                                style={{
                                                    background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.25)',
                                                    color: 'white', padding: '8px 20px', borderRadius: '10px', fontSize: '12px',
                                                    fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px'
                                                }}
                                            >
                                                <RefreshCw size={14} />
                                                <span>{t('retakeDiagnostic')}</span>
                                            </button>
                                        </div>

                                        {/* Breakdown of each question's feedback */}
                                        <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' }}>
                                            <h3 style={{ fontSize: '16px', fontWeight: '850', color: 'var(--text)', marginBottom: '16px' }}>
                                                📋 各維度診斷回饋與解方
                                            </h3>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                                {LEARNING_DIAGNOSTICS_QUESTIONS.map((q, idx) => {
                                                    const optIdx = answers[q.id];
                                                    const chosenOpt = q.options[optIdx];
                                                    return (
                                                        <div key={q.id} style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                                                <span style={{ fontSize: '12px', fontWeight: '800', color: '#0369a1' }}>
                                                                    維度：{q.dimensionName[language]}
                                                                </span>
                                                                <span style={{ fontSize: '12px', fontWeight: '850', color: chosenOpt.score >= 4 ? '#16a34a' : chosenOpt.score >= 2 ? '#d97706' : '#dc2626' }}>
                                                                    得分: {chosenOpt.score} / 4
                                                                </span>
                                                            </div>
                                                            <div style={{ fontSize: '13px', color: 'var(--text)', fontWeight: '600', marginBottom: '8px' }}>
                                                                選擇：{chosenOpt.text[language]}
                                                            </div>
                                                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', background: '#f1f5f9', padding: '10px', borderRadius: '8px', lineHeight: 1.5 }}>
                                                                💡 {chosenOpt.feedback[language]}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Personalized Book Recommendations */}
                                        <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '24px', border: '1px solid #86efac' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                                <Award size={20} color="#16a34a" />
                                                <h3 style={{ fontSize: '16px', fontWeight: '850', color: '#166534', margin: 0 }}>
                                                    {t('recommendedBooksForYou')} (針對弱項【{diagnosticResult.weakestDimObj.title[language]}】)
                                                </h3>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                                                {diagnosticResult.recommendedBooks.map((book) => (
                                                    <div
                                                        key={book.id}
                                                        onClick={() => navigate(`/book/${book.id}`)}
                                                        style={{
                                                            background: 'white', borderRadius: '12px', padding: '14px',
                                                            border: '1px solid #bbf7d0', cursor: 'pointer',
                                                            display: 'flex', gap: '12px', alignItems: 'center'
                                                        }}
                                                    >
                                                        <img
                                                            src={book.cover_url || `https://img.youtube.com/vi/${book.video_id}/hqdefault.jpg`}
                                                            alt={book.title_cn}
                                                            style={{ width: '56px', height: '70px', objectFit: 'cover', borderRadius: '6px' }}
                                                        />
                                                        <div>
                                                            <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: '800' }}>{book.code}</div>
                                                            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text)', lineHeight: 1.25 }}>{book.title_cn}</div>
                                                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{book.author}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* TAB 4: CLOSED-LOOP WORKFLOW MAP */}
                    {activeTab === 'closed_loop' && (
                        <div style={{ background: 'white', borderRadius: '20px', padding: '36px', border: '1px solid var(--border-light)' }}>
                            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                                    <div style={{ display: 'inline-flex', padding: '12px', borderRadius: '18px', background: '#dcfce7', color: '#166534', marginBottom: '12px' }}>
                                        <Workflow size={28} />
                                    </div>
                                    <h2 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text)', margin: '0 0 8px 0' }}>
                                        {t('closedLoopNav')} · 3:7 輸學合一終極閉環
                                    </h2>
                                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '680px', margin: '0 auto' }}>
                                        {language === 'zh'
                                            ? '真正產生終身複利的學習，絕不是單向的資訊囤積，而是經由六大工序形成閉環。唯有當反饋迴路閉合，大腦神經髓鞘才會永久鎖定新能力。'
                                            : 'True learning compounding is not passive hoarding. It requires a closed-loop engine from input to delivery.'}
                                    </p>
                                </div>

                                {/* Flow Steps */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                                    {[
                                        {
                                            step: '01',
                                            name: { zh: '輸入與篩選 (Curated Input)', en: 'Curated Input & Mental Anchoring' },
                                            ratio: '30%',
                                            color: '#0284c7',
                                            bg: '#f0f9ff',
                                            principle: { zh: '拒絕資訊垃圾，以第一性原理挑選原著經典；SQ3R 掃描目錄，帶著核心問題主動閱讀。', en: 'Curate high-signal original works. Formulate questions before reading.' },
                                            books: '《學習究竟是什麼》[S1-42]、《1% 閱讀術》[S1-50]'
                                        },
                                        {
                                            step: '02',
                                            name: { zh: '沉澱與雙模式發散 (Incubation & Diffuse Mode)', en: 'Incubation & Diffuse Reflection' },
                                            ratio: '生理調節',
                                            color: '#8b5cf6',
                                            bg: '#f5f3ff',
                                            principle: { zh: '專注 30-50 分鐘後強制切換無螢幕散步或睡眠，啟動大腦預設網絡 (DMN) 讓海馬迴與大腦皮質神經突觸固化。', en: 'Alternate focus with screen-free downtime to trigger default mode network percolation.' },
                                            books: '《學習如何學習》[S1-43]、《在大腦外思考》[S4-88]'
                                        },
                                        {
                                            step: '03',
                                            name: { zh: '提煉與外部第二大腦 (Distillation & Second Brain)', en: 'Distillation & External Memory' },
                                            ratio: '知識資產化',
                                            color: '#16a34a',
                                            bg: '#f0fdf4',
                                            principle: { zh: '運用 CODE 與 PARA 模型，將碎片筆記提煉為漸進式心智圖或金句摘要，外包記憶負擔，釋放工作記憶。', en: 'Distill insights into progressive summaries using Tiago Forte\'s CODE framework.' },
                                            books: '《打造第二大腦》[S4-32]、《心智圖大師》[S4-78]'
                                        },
                                        {
                                            step: '04',
                                            name: { zh: '費曼輸出與外行教學 (Feynman Delivery)', en: 'Feynman Articulation & Output' },
                                            ratio: '70% 核心',
                                            color: '#ea580c',
                                            bg: '#fff7ed',
                                            principle: { zh: '以最通俗白話向 8 歲小孩或外行朋友完整口述或寫成文章。卡頓之處正是知識基模的漏洞。', en: 'Teach concepts aloud using everyday vernacular. Gaps in explanation reveal gaps in mastery.' },
                                            books: '《最高學習法》[S1-06]、《超速學習》[S3-69]'
                                        },
                                        {
                                            step: '05',
                                            name: { zh: '刻意反饋與即時校準 (Deliberate Feedback Calibration)', en: 'Instant Feedback & Error Auditing' },
                                            ratio: '盲點修正',
                                            color: '#dc2626',
                                            bg: '#fef2f2',
                                            principle: { zh: '走出舒適圈邊界，尋求真實市場、行家導師或客觀測驗的無情反饋，以科學家心態修正先驗假設。', en: 'Expose hypotheses to rigorous peer audit and market reality to upgrade priors.' },
                                            books: '《刻意練習》[S1-10]、《逆思維》[S3-12]'
                                        },
                                        {
                                            step: '06',
                                            name: { zh: '系統整合與複利迭代 (Systemic Compounding)', en: 'Latticework Integration & Compounding' },
                                            ratio: '終身複利',
                                            color: '#2d6648',
                                            bg: '#eaf3ed',
                                            principle: { zh: '將新學知識編織進查理·蒙格的多元思維模型格柵，觸發跨學科靈感飛輪，產生指數級認知複利。', en: 'Weave newly validated models into your multidisciplinary cognitive latticework.' },
                                            books: '《窮查理的普通常識》[S1-38]、《底層邏輯 I》[S1-02]'
                                        }
                                    ].map((f, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'flex',
                                                gap: '20px',
                                                background: f.bg,
                                                borderRadius: '16px',
                                                padding: '22px',
                                                border: `1px solid ${f.color}35`,
                                                alignItems: 'flex-start'
                                            }}
                                        >
                                            <div style={{
                                                width: '46px', height: '46px', borderRadius: '12px',
                                                background: f.color, color: 'white', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center',
                                                fontSize: '18px', fontWeight: '900', flexShrink: 0
                                            }}>
                                                {f.step}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                                                    <h3 style={{ fontSize: '16px', fontWeight: '850', color: 'var(--text)', margin: 0 }}>
                                                        {f.name[language]}
                                                    </h3>
                                                    <span style={{ fontSize: '11px', fontWeight: '800', color: f.color, background: 'white', padding: '3px 8px', borderRadius: '6px', border: `1px solid ${f.color}40` }}>
                                                        比重：{f.ratio}
                                                    </span>
                                                </div>
                                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 10px 0' }}>
                                                    {f.principle[language]}
                                                </p>
                                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                                    <span>📖 代表書目：</span>
                                                    <span style={{ fontWeight: '700', color: 'var(--text)' }}>{f.books}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Navigation on Mobile */}
            <BottomNavbar />
        </div>
    );
}
