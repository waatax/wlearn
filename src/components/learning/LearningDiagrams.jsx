import React, { useState } from 'react';
import {
    Brain,
    Zap,
    Repeat,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
    Flame,
    Compass,
    Target
} from 'lucide-react';
import {
    ResponsiveContainer,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

/**
 * 1. 雙模式大腦思考圖解 (專注模式 vs 發散模式)
 */
export function BrainModesDiagram({ language = 'zh' }) {
    const [activeMode, setActiveMode] = useState('both'); // 'focused', 'diffuse', 'both'

    return (
        <div style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid var(--border-light, #e2e8f0)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '24px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Brain size={20} />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '850', color: 'var(--text, #1e293b)' }}>
                            {language === 'zh' ? '大腦雙模式思考切換圖解 (Dual-Thinking Architecture)' : 'Brain Dual-Thinking Modes Architecture'}
                        </h4>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>
                            {language === 'zh' ? '芭芭拉·歐克莉《學習如何學習》底層腦科學機制' : 'Barbara Oakley\'s core neurological mechanism'}
                        </p>
                    </div>
                </div>

                {/* Filter buttons */}
                <div style={{ display: 'flex', gap: '6px' }}>
                    {[
                        { id: 'both', label: language === 'zh' ? '全景對比' : 'All' },
                        { id: 'focused', label: language === 'zh' ? '專注模式' : 'Focused' },
                        { id: 'diffuse', label: language === 'zh' ? '發散模式' : 'Diffuse' }
                    ].map(btn => (
                        <button
                            key={btn.id}
                            onClick={() => setActiveMode(btn.id)}
                            style={{
                                padding: '5px 12px',
                                borderRadius: '8px',
                                fontSize: '11px',
                                fontWeight: '700',
                                border: activeMode === btn.id ? '1px solid #7c3aed' : '1px solid #cbd5e1',
                                background: activeMode === btn.id ? '#f5f3ff' : 'transparent',
                                color: activeMode === btn.id ? '#6d28d9' : 'var(--text-secondary, #475569)',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease'
                            }}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Visual SVG Diagram */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: activeMode === 'both' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
                gap: '16px',
                marginBottom: '16px'
            }}>
                {(activeMode === 'both' || activeMode === 'focused') && (
                    <div style={{
                        background: 'linear-gradient(145deg, #eff6ff 0%, #dbeafe 100%)',
                        borderRadius: '14px',
                        padding: '18px',
                        border: '1.5px solid #93c5fd'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '850', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Target size={16} />
                                {language === 'zh' ? '專注模式 (Focused Mode)' : 'Focused Mode'}
                            </span>
                            <span style={{ fontSize: '10px', background: '#bfdbfe', color: '#1e3a8a', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
                                {language === 'zh' ? '前額葉緊繃' : 'Prefrontal Cortex'}
                            </span>
                        </div>

                        {/* Focused Mode Schematic SVG */}
                        <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="240" height="110" viewBox="0 0 240 110">
                                <circle cx="120" cy="55" r="45" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" />
                                <circle cx="120" cy="55" r="28" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
                                {/* Tight beam arrows */}
                                <line x1="85" y1="55" x2="155" y2="55" stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#arrow)" />
                                <line x1="120" y1="25" x2="120" y2="85" stroke="#1d4ed8" strokeWidth="3" />
                                <circle cx="120" cy="55" r="8" fill="#1e40af" />
                                <text x="120" y="59" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">焦點</text>
                                <text x="120" y="102" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">
                                    {language === 'zh' ? '高能耗 · 直線邏輯攻堅' : 'High energy, linear solving'}
                                </text>
                            </svg>
                        </div>

                        <div style={{ fontSize: '12px', color: '#1e3a8a', lineHeight: 1.5, marginTop: '8px' }}>
                            <strong>{language === 'zh' ? '特點：' : 'Traits: '}</strong>
                            {language === 'zh'
                                ? '調動前額葉皮質進行嚴密邏輯計算與已知路徑推演。能攻克微觀細節，但容易陷入「思維定勢 (Einstellung Effect)」無法跳出盲區。'
                                : 'Prefrontal cortex handles rigorous linear logic. Great for details, but prone to the Einstellung effect blind spots.'}
                        </div>
                    </div>
                )}

                {(activeMode === 'both' || activeMode === 'diffuse') && (
                    <div style={{
                        background: 'linear-gradient(145deg, #f5f3ff 0%, #ede9fe 100%)',
                        borderRadius: '14px',
                        padding: '18px',
                        border: '1.5px solid #c4b5fd'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '850', color: '#5b21b6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Sparkles size={16} />
                                {language === 'zh' ? '發散模式 (Diffuse Mode)' : 'Diffuse Mode'}
                            </span>
                            <span style={{ fontSize: '10px', background: '#ddd6fe', color: '#4c1d95', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
                                {language === 'zh' ? '預設模式網絡 DMN' : 'Default Mode Network'}
                            </span>
                        </div>

                        {/* Diffuse Mode Schematic SVG */}
                        <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="240" height="110" viewBox="0 0 240 110">
                                <circle cx="50" cy="35" r="14" fill="#a78bfa" fillOpacity="0.4" stroke="#7c3aed" strokeWidth="1.5" />
                                <circle cx="190" cy="40" r="16" fill="#a78bfa" fillOpacity="0.4" stroke="#7c3aed" strokeWidth="1.5" />
                                <circle cx="120" cy="80" r="18" fill="#a78bfa" fillOpacity="0.4" stroke="#7c3aed" strokeWidth="1.5" />
                                <circle cx="70" cy="85" r="10" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="1" />
                                <circle cx="170" cy="85" r="12" fill="#c4b5fd" stroke="#8b5cf6" strokeWidth="1" />
                                {/* Cross-network curved connections */}
                                <path d="M 50 35 Q 120 20 190 40" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
                                <path d="M 50 35 Q 85 85 120 80" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
                                <path d="M 190 40 Q 155 85 120 80" fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 3" />
                                <text x="120" y="48" textAnchor="middle" fill="#6d28d9" fontSize="9" fontWeight="bold">跨腦區共振</text>
                                <text x="120" y="104" textAnchor="middle" fill="#5b21b6" fontSize="10" fontWeight="bold">
                                    {language === 'zh' ? '散步 · 發呆 · 頓悟尤里卡' : 'Walk, shower, eureka jumps'}
                                </text>
                            </svg>
                        </div>

                        <div style={{ fontSize: '12px', color: '#4c1d95', lineHeight: 1.5, marginTop: '8px' }}>
                            <strong>{language === 'zh' ? '特點：' : 'Traits: '}</strong>
                            {language === 'zh'
                                ? '在洗澡、散步、放鬆或小睡時啟動。各個神經群進行廣泛跨界突觸連結，誕生顛覆性的「尤里卡 (Eureka!)」頓悟式突破。'
                                : 'Activates during relaxation, walks, or naps. Connects distant neural territories for breakthrough eureka insights.'}
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Practice Tip */}
            <div style={{
                background: '#f8fafc',
                borderRadius: '10px',
                padding: '10px 14px',
                border: '1px dashed #cbd5e1',
                fontSize: '12px',
                color: 'var(--text-secondary, #475569)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}>
                <span style={{ fontSize: '14px' }}>💡</span>
                <span>
                    <strong>{language === 'zh' ? '大師心法：' : 'Master Protocol: '}</strong>
                    {language === 'zh'
                        ? '遇到卡關時千萬不要死磕硬撐！立即強制切換 10 分鐘無螢幕漫步，讓發散模式在後台自動計算，往往能柳暗花明。'
                        : 'When hitting a roadblock, pause immediately for a 10-minute screen-free walk. Let the subconscious diffuse engine resolve it.'}
                </span>
            </div>
        </div>
    );
}

/**
 * 2. 艾賓浩斯遺忘曲線 vs 間隔提取強化圖表
 */
export function EbbinghausCurveChart({ language = 'zh' }) {
    const data = [
        { day: language === 'zh' ? '當下 (Day 0)' : 'Day 0', forgetting: 100, spaced: 100 },
        { day: language === 'zh' ? '20分鐘' : '20m', forgetting: 58, spaced: 98 },
        { day: language === 'zh' ? '1小時' : '1h', forgetting: 44, spaced: 95 },
        { day: language === 'zh' ? '第 1 天' : 'Day 1', forgetting: 33, spaced: 92 },
        { day: language === 'zh' ? '第 3 天' : 'Day 3', forgetting: 26, spaced: 90 },
        { day: language === 'zh' ? '第 7 天' : 'Day 7', forgetting: 22, spaced: 88 },
        { day: language === 'zh' ? '第 15 天' : 'Day 15', forgetting: 18, spaced: 86 },
        { day: language === 'zh' ? '第 30 天' : 'Day 30', forgetting: 15, spaced: 85 },
    ];

    return (
        <div style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid var(--border-light, #e2e8f0)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '24px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #0284c7, #0369a1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Repeat size={20} />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '850', color: 'var(--text, #1e293b)' }}>
                            {language === 'zh' ? '艾賓浩斯遺忘曲線 vs 間隔提取留存率對照' : 'Ebbinghaus Forgetting Curve vs Spaced Retrieval'}
                        </h4>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>
                            {language === 'zh' ? '自然遺忘 (紅) vs 間隔重複提取 (綠) 之神經固化對比' : 'Natural forgetting (Red) vs Spaced retrieval consolidation (Green)'}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', fontSize: '11px', fontWeight: '700' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444' }}>
                        <span style={{ width: '12px', height: '4px', background: '#ef4444', borderRadius: '2px' }} />
                        <span>{language === 'zh' ? '被動閱讀 (自然遺忘)' : 'Passive (Decay)'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981' }}>
                        <span style={{ width: '12px', height: '4px', background: '#10b981', borderRadius: '2px' }} />
                        <span>{language === 'zh' ? '間隔主動提取 (神經固化)' : 'Spaced Recall (85%+)'}</span>
                    </div>
                </div>
            </div>

            <div style={{ height: '240px', width: '100%', marginBottom: '16px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="forgetGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="spacedGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
                        <Tooltip
                            formatter={(val, name) => [
                                `${val}%`,
                                name === 'forgetting'
                                    ? (language === 'zh' ? '自然遺忘留存' : 'Natural decay')
                                    : (language === 'zh' ? '間隔提取留存' : 'Spaced retrieval')
                            ]}
                            contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="forgetting" stroke="#ef4444" strokeWidth={2.5} fill="url(#forgetGrad)" />
                        <Area type="monotone" dataKey="spaced" stroke="#10b981" strokeWidth={3} fill="url(#spacedGrad)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Quick Interval Reference Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '8px 12px', fontWeight: '800', color: '#475569' }}>{language === 'zh' ? '提取節點' : 'Interval'}</th>
                            <th style={{ padding: '8px 12px', fontWeight: '800', color: '#475569' }}>{language === 'zh' ? '大腦神經狀態' : 'Neural State'}</th>
                            <th style={{ padding: '8px 12px', fontWeight: '800', color: '#475569' }}>{language === 'zh' ? '推薦實操協議' : 'Protocol'}</th>
                            <th style={{ padding: '8px 12px', fontWeight: '800', color: '#16a34a' }}>{language === 'zh' ? '預期保留率' : 'Retention'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { day: 'Day 0', state: '突觸初期發射', action: 'SQ3R 掃描框架、提煉 3 個核心問句', rate: '100%' },
                            { day: 'Day 1', state: '急速衰退臨界點', action: '白紙閉卷自檢默繪心智模型骨架', rate: '92%' },
                            { day: 'Day 3', state: '突觸重構期', action: 'Anki 閃卡或費曼通俗口述給外行', rate: '90%' },
                            { day: 'Day 7', state: '神經髓鞘增生', action: '交錯練習實戰難題、修復盲點', rate: '88%' },
                            { day: 'Day 30', state: '大腦皮質長效固化', action: '編入多元思維格柵，形成直覺', rate: '85%+' },
                        ].map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '8px 12px', fontWeight: '750', color: '#0284c7' }}>{row.day}</td>
                                <td style={{ padding: '8px 12px', color: '#334155' }}>{row.state}</td>
                                <td style={{ padding: '8px 12px', color: '#475569' }}>{row.action}</td>
                                <td style={{ padding: '8px 12px', fontWeight: '800', color: '#16a34a' }}>{row.rate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/**
 * 3. 學習金字塔留存率圖表 (Learning Pyramid Hierarchy)
 */
export function LearningPyramidDiagram({ language = 'zh' }) {
    const levels = [
        { name: language === 'zh' ? '被動聽講 (Lecture)' : 'Lecture', rate: 5, color: '#ef4444', type: '被動輸入', desc: '純聽課，注意力半衰期極快' },
        { name: language === 'zh' ? '閱讀劃線 (Reading)' : 'Reading', rate: 10, color: '#f97316', type: '被動輸入', desc: '反覆劃線容易產生「看懂了」的流暢假象' },
        { name: language === 'zh' ? '視聽影音 (Audio-Visual)' : 'Audio-Visual', rate: 20, color: '#f59e0b', type: '被動輸入', desc: '雙模態刺激，但仍偏向被動吸收' },
        { name: language === 'zh' ? '示範觀摩 (Demonstration)' : 'Demonstration', rate: 30, color: '#eab308', type: '示範理解', desc: '看高手操作，理解運作流程' },
        { name: language === 'zh' ? '小組討論 (Discussion)' : 'Discussion', rate: 50, color: '#10b981', type: '主動參與', desc: '思維碰撞，被迫組織語言輸出' },
        { name: language === 'zh' ? '實作演練 (Practice Doing)' : 'Practice', rate: 75, color: '#06b6d4', type: '主動實踐', desc: '動手操練，遭遇真實阻力並修正' },
        { name: language === 'zh' ? '外行教學 / 費曼法 (Teaching)' : 'Teaching Others', rate: 90, color: '#6366f1', type: '終極輸出', desc: '用大白話教懂 8 歲小孩，以教代學閉環' },
    ];

    return (
        <div style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid var(--border-light, #e2e8f0)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '24px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '850', color: 'var(--text, #1e293b)' }}>
                            {language === 'zh' ? '學習金字塔留存率階梯 (The Learning Pyramid)' : 'The Learning Pyramid Retention Ladder'}
                        </h4>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>
                            {language === 'zh' ? '美國緬因州國家訓練實驗室 (NTL) 學習效果實證' : 'National Training Laboratories research'}
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: '700' }}>
                    <span style={{ color: '#ef4444', background: '#fee2e2', padding: '3px 8px', borderRadius: '6px' }}>
                        {language === 'zh' ? '被動學習 (留存 < 30%)' : 'Passive (<30%)'}
                    </span>
                    <span style={{ color: '#166534', background: '#dcfce7', padding: '3px 8px', borderRadius: '6px' }}>
                        {language === 'zh' ? '主動輸出 (留存達 90%)' : 'Active Output (up to 90%)'}
                    </span>
                </div>
            </div>

            {/* Pyramid Funnel Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {levels.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '130px', fontSize: '12px', fontWeight: '800', color: 'var(--text, #1e293b)', textAlign: 'right', flexShrink: 0 }}>
                            {item.name}
                        </div>
                        <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '10px', height: '26px', position: 'relative', overflow: 'hidden' }}>
                            <div
                                style={{
                                    width: `${item.rate}%`,
                                    height: '100%',
                                    background: `linear-gradient(90deg, ${item.color}cc, ${item.color})`,
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    paddingRight: '10px',
                                    color: 'white',
                                    fontSize: '11px',
                                    fontWeight: '850',
                                    boxShadow: `0 2px 6px ${item.color}40`,
                                    transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                            >
                                {item.rate}%
                            </div>
                        </div>
                        <div style={{ width: '180px', fontSize: '11px', color: 'var(--text-muted, #64748b)', flexShrink: 0, display: 'none' }} className="pyramid-desc-desktop">
                            {item.desc}
                        </div>
                    </div>
                ))}
            </div>

            {/* Core Law Takeaway */}
            <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7ec 100%)',
                borderRadius: '12px',
                padding: '12px 18px',
                border: '1px solid #86efac',
                fontSize: '12px',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0 }} />
                <span>
                    <strong>{language === 'zh' ? '輸學合一定律：' : 'Golden Rule: '}</strong>
                    {language === 'zh'
                        ? '最高效的學習者，永遠將 70% 的時間分配在「以教代學、動手實作、費曼闡述」的主動輸出端，而非無止盡地被動囤書。'
                        : 'Allocate 70% of study time to active teaching, building, and Feynman articulation.'}
                </span>
            </div>
        </div>
    );
}

/**
 * 4. 認知負荷三維分配圖 (Cognitive Load Allocation)
 */
export function CognitiveLoadDiagram({ language = 'zh' }) {
    return (
        <div style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid var(--border-light, #e2e8f0)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '24px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Zap size={20} />
                </div>
                <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '850', color: 'var(--text, #1e293b)' }}>
                        {language === 'zh' ? '認知負荷理論與心智頻寬調度 (Cognitive Load Theory)' : 'Cognitive Load Allocation Architecture'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>
                        {language === 'zh' ? '工作記憶容量僅有 4±1 組塊，如何分配心智資源？' : 'Working memory capacity is strictly 4±1 chunks'}
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: '#fef2f2', borderRadius: '14px', padding: '16px', border: '1px solid #fecaca' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '850', color: '#b91c1c' }}>1. 外在負荷 (Extraneous)</span>
                        <span style={{ fontSize: '10px', background: '#fee2e2', color: '#991b1b', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>全力消滅</span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#7f1d1d', margin: 0, lineHeight: 1.5 }}>
                        手機通知、環境噪音、混亂排版與資訊雜訊。這些非學習目標本身的能耗會掠奪寶貴工作記憶，必須透過無干擾環境徹底歸零。
                    </p>
                </div>

                <div style={{ background: '#fffbeb', borderRadius: '14px', padding: '16px', border: '1px solid #fde68a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '850', color: '#b45309' }}>2. 內在負荷 (Intrinsic)</span>
                        <span style={{ fontSize: '10px', background: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>拆解降載</span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#78350f', margin: 0, lineHeight: 1.5 }}>
                        主題本身的固有難度。策略是將龐大艱澀概念拆解為微組塊 (Micro-chunks)，由易入難漸進吸收，不超過大腦瞬時承載上限。
                    </p>
                </div>

                <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '16px', border: '1px solid #bbf7d0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '850', color: '#15803d' }}>3. 關聯負荷 (Germane)</span>
                        <span style={{ fontSize: '10px', background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>最大化投資</span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#14532d', margin: 0, lineHeight: 1.5 }}>
                        大腦將新知編織為心智基模 (Schema) 的神經構建能量。把釋放出的心智頻寬全數投入此處，實現深度理解與永久固化。
                    </p>
                </div>
            </div>
        </div>
    );
}

/**
 * 5. 書籍專屬認知能力雷達圖 (Book Cognitive Radar)
 */
export function BookCognitiveRadar({ book, language = 'zh' }) {
    if (!book) return null;

    // Derive scores based on book tags & characteristics
    const tags = book.tags || [];
    const isBusiness = tags.some(t => t.includes('business') || t.includes('商業') || t.includes('投資') || t.includes('管理'));
    const isPsych = tags.some(t => t.includes('psychology') || t.includes('心理') || t.includes('心靈'));
    const isGrowth = tags.some(t => t.includes('personalGrowth') || t.includes('成長') || t.includes('習慣'));
    const isComm = tags.some(t => t.includes('communication') || t.includes('溝通') || t.includes('談判'));

    // Dynamic radar metrics
    const radarData = [
        { subject: language === 'zh' ? '商業決策' : 'Business', value: isBusiness ? 95 : 70 },
        { subject: language === 'zh' ? '心理認知' : 'Psychology', value: isPsych ? 95 : (isGrowth ? 85 : 75) },
        { subject: language === 'zh' ? '實戰執行' : 'Actionability', value: isGrowth ? 95 : 80 },
        { subject: language === 'zh' ? '溝通協作' : 'Communication', value: isComm ? 95 : 72 },
        { subject: language === 'zh' ? '底層框架' : 'Mental Model', value: 90 },
    ];

    return (
        <div style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid var(--border-light, #e2e8f0)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Compass size={18} color="#16a34a" />
                    <span style={{ fontSize: '14px', fontWeight: '850', color: 'var(--text, #1e293b)' }}>
                        {language === 'zh' ? '本書認知維度評估雷達' : 'Cognitive Dimension Radar'}
                    </span>
                </div>
                <span style={{ fontSize: '11px', color: '#166534', background: '#dcfce7', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
                    5D ANALYSIS
                </span>
            </div>

            <div style={{ height: '220px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" stroke="#475569" fontSize={11} tick={{ fontWeight: 700 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={9} />
                        <Radar name="Score" dataKey="value" stroke="#16a34a" fill="#22c55e" fillOpacity={0.45} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '11px', color: 'var(--text-muted, #64748b)', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                <div>綜合認知深度：<strong style={{ color: '#16a34a' }}>92/100</strong></div>
                <div>行動落地係數：<strong style={{ color: '#0284c7' }}>88/100</strong></div>
            </div>
        </div>
    );
}

/**
 * 6. 原子習慣四步迴路圖解 (Habit Loop Diagram)
 */
export function HabitLoopDiagram({ language = 'zh' }) {
    return (
        <div style={{
            background: 'var(--card-bg, #ffffff)',
            borderRadius: '18px',
            padding: '24px',
            border: '1px solid var(--border-light, #e2e8f0)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: '24px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #16a34a, #15803d)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Flame size={20} />
                </div>
                <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '850', color: 'var(--text, #1e293b)' }}>
                        {language === 'zh' ? '原子習慣四步反饋迴路 (Atomic Habit Feedback Loop)' : 'Atomic Habit Feedback Loop'}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted, #64748b)' }}>
                        {language === 'zh' ? '詹姆斯·克利爾《原子習慣》：以環境設計取代意志力消耗' : 'James Clear\'s behavioral design architecture'}
                    </p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', position: 'relative' }}>
                {[
                    { step: '1. 提示 (Cue)', law: '讓提示顯而易見', action: '將書本翻開放在書桌正中央、設定固定鬧鐘', color: '#0284c7', bg: '#f0f9ff', border: '#bae6fd' },
                    { step: '2. 渴望 (Craving)', law: '讓動機極具吸引', action: '誘惑綑綁：唯有讀完章節才喝喜愛的精品咖啡', color: '#8b5cf6', bg: '#f5f3ff', border: '#ddd6fe' },
                    { step: '3. 回應 (Response)', law: '讓阻力極度減小', action: '兩分鐘法則：先讀 1 頁書或只看 3 分鐘影音', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
                    { step: '4. 獎勵 (Reward)', law: '讓回饋令人滿足', action: '在學習紀錄表打勾、累積經驗值解鎖新成就', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' }
                ].map((item, idx) => (
                    <div key={idx} style={{
                        background: item.bg,
                        borderRadius: '12px',
                        padding: '16px',
                        border: `1.5px solid ${item.border}`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <div>
                            <div style={{ fontSize: '12px', fontWeight: '850', color: item.color, marginBottom: '4px' }}>
                                {item.step}
                            </div>
                            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text, #1e293b)', marginBottom: '8px' }}>
                                ✨ {item.law}
                            </div>
                            <p style={{ fontSize: '11px', color: 'var(--text-secondary, #475569)', lineHeight: 1.5, margin: 0 }}>
                                <strong>實操：</strong>{item.action}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
