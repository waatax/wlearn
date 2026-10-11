import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowLeft, BarChart3, Play, Activity, Globe, TrendingUp, Sparkles, Brain } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import GlobalHeader from '../components/GlobalHeader';
import GamificationHUD from '../components/GamificationHUD';
import BottomNavbar from '../components/BottomNavbar';
import ReadingComfortControls from '../components/ReadingComfortControls';

export default function Trends() {
    const navigate = useNavigate();
    const { language, t, toggleLanguage } = useLanguage();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(import.meta.env.BASE_URL + 'analytics.json')
            .then(r => r.json())
            .then(d => {
                const formatted = d.map(item => ({
                    ...item,
                    total: item.cn + item.en,
                    displayDate: item.date.split('-').slice(1).join('/')
                }));
                setData(formatted);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ 
                    background: 'rgba(26, 25, 23, 0.95)', 
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    padding: '16px', 
                    borderRadius: '12px', 
                    color: '#fff', 
                    fontSize: '13px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}>
                    <p style={{ margin: '0 0 10px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px', fontWeight: '700', opacity: 0.8 }}>{label}</p>
                    {payload.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', margin: '4px 0' }}>
                            <span style={{ color: p.color, fontWeight: '700' }}>{p.name}</span>
                            <span style={{ fontWeight: '800' }}>{p.value.toLocaleString()}</span>
                        </div>
                    ))}
                    {data.find(d => d.date === label || d.displayDate === label)?.published && (
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#ffca28', fontWeight: '700' }}>
                            <Play size={10} fill="#ffca28" />
                            {language === 'zh' ? '當日發布影片' : 'Video Published'}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    const renderChart = (key, name, color, colorEnd = color) => (
        <div style={{ 
            height: '340px', width: '100%', marginBottom: '48px', 
            background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)'
        }}>
            <h3 style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '24px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '3px', height: '14px', background: color, borderRadius: '2px' }} />
                {name}
            </h3>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                            <stop offset="95%" stopColor={colorEnd} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                    <XAxis 
                        dataKey="displayDate" 
                        stroke="var(--text-muted)" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false}
                        interval={Math.ceil(data.length / 8)}
                        dy={10}
                    />
                    <YAxis 
                        stroke="var(--text-muted)" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false}
                        domain={[0, 'auto']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey={key} 
                        stroke={color} 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill={`url(#grad-${key})`} 
                        name={name}
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
            <div className="loader"></div>
        </div>
    );

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            <GlobalHeader />

            {/* Sub Bar */}
            <div style={{
                padding: '10px 24px',
                borderBottom: '1px solid var(--border-light)',
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                position: 'sticky',
                top: 0,
                zIndex: 40,
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                        onClick={() => navigate('/popular')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px',
                            borderRadius: '8px', border: '1px solid var(--border)', background: 'white',
                            cursor: 'pointer', fontSize: '13px', color: 'var(--text)', fontWeight: '650'
                        }}
                    >
                        <ArrowLeft size={14} />
                        <span>{language === 'zh' ? '返回排行' : 'Back to Rankings'}</span>
                    </button>
                    <span style={{ fontSize: '13px', fontWeight: '750', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BarChart3 size={15} color="#6366f1" />
                        <span>{language === 'zh' ? '全站數據趨勢' : 'Global Data Trends'}</span>
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                        padding: '4px 10px', borderRadius: '999px', background: '#e8f5e9', 
                        border: '1px solid #c8e6c9', color: '#2e7d32', fontSize: '11px', 
                        fontWeight: '750', display: 'flex', alignItems: 'center', gap: '5px' 
                    }}>
                        <Activity size={13} className="animate-pulse" />
                        <span>{language === 'zh' ? '實時數據' : 'Live Tracking'}</span>
                    </div>
                    <ReadingComfortControls compact />
                </div>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 32px' }}>
                {/* Header Section */}
                <div style={{ marginBottom: '48px', animation: 'fadeInUp 0.6s var(--transition-med) both' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '850', color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
                        {language === 'zh' ? '數據增長分析' : 'Data Growth Analysis'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px', margin: 0, fontWeight: '500' }}>
                        {language === 'zh' ? '回顧過去 30 天內的全站觀看次數變化與影片發布影響。' : 'Review view count changes and publishing impact over the last 30 days.'}
                    </p>
                </div>

                {/* Summary Totals */}
                <div style={{ 
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '24px', marginBottom: '40px',
                    animation: 'fadeInUp 0.6s var(--transition-med) 0.1s both'
                }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase' }}>{t('totalViews') || (language === 'zh' ? '總觀看次數' : 'Total Views')}</div>
                        <div style={{ fontSize: '32px', fontWeight: '900', color: '#6366f1' }}>{data.reduce((s, d) => s + d.total, 0).toLocaleString()}</div>
                    </div>
                    <div style={{ background: 'white', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)' }}>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '700', textTransform: 'uppercase' }}>{language === 'zh' ? '活躍觀看時間' : 'Watch Time (Hrs)'}</div>
                        <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)' }}>1,245.8</div>
                    </div>
                </div>

                {/* Charts */}
                <div style={{ animation: 'fadeInUp 0.6s var(--transition-med) 0.2s both' }}>
                    {renderChart('total', language === 'zh' ? '總觀看趨勢' : 'Total Views Trend', '#6366f1')}
                    {renderChart('cn', language === 'zh' ? '中文版增長' : 'Chinese Growth', 'var(--primary)')}
                    {renderChart('en', language === 'zh' ? '英文版增長' : 'English Growth', 'var(--accent)')}
                </div>

                {/* 1. Compounding Learning Growth Curve */}
                <div style={{
                    background: 'white', padding: '28px', borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                    marginBottom: '48px', animation: 'fadeInUp 0.6s var(--transition-med) 0.3s both'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <TrendingUp size={20} color="#16a34a" />
                                <span>{language === 'zh' ? '學習複利幾何增益效應 (The Compounding Effect)' : 'The Compounding Learning Effect'}</span>
                            </h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                {language === 'zh' ? '詹姆斯·克利爾定律：每天微進步 1% (1.01^365 ≈ 37.8x) vs 被動退步 1% (0.99^365 ≈ 0.03x)' : 'Daily 1% improvement compounds to 37.8x annually'}
                            </p>
                        </div>
                        <span style={{ fontSize: '11px', color: '#166534', background: '#dcfce7', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
                            EXPONENTIAL GAINS
                        </span>
                    </div>

                    <div style={{ height: '240px', width: '100%', marginBottom: '16px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={[
                                    { month: language === 'zh' ? '第 1 個月' : 'M1', growth: 1.35, decay: 0.74 },
                                    { month: language === 'zh' ? '第 2 個月' : 'M2', growth: 1.82, decay: 0.55 },
                                    { month: language === 'zh' ? '第 4 個月' : 'M4', growth: 3.32, decay: 0.30 },
                                    { month: language === 'zh' ? '第 6 個月' : 'M6', growth: 6.05, decay: 0.16 },
                                    { month: language === 'zh' ? '第 8 個月' : 'M8', growth: 11.02, decay: 0.09 },
                                    { month: language === 'zh' ? '第 10 個月' : 'M10', growth: 20.08, decay: 0.05 },
                                    { month: language === 'zh' ? '第 12 個月' : 'M12', growth: 37.78, decay: 0.03 },
                                ]}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                            >
                                <defs>
                                    <linearGradient id="compGrowGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0.02} />
                                    </linearGradient>
                                    <linearGradient id="compDecGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} unit="x" />
                                <Tooltip
                                    formatter={(v, n) => [`${v}x`, n === 'growth' ? (language === 'zh' ? '每日+1% 累積複利' : 'Daily +1%') : (language === 'zh' ? '每日-1% 認知衰退' : 'Daily -1%')]}
                                    contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="decay" stroke="#ef4444" strokeWidth={2} fill="url(#compDecGrad)" />
                                <Area type="monotone" dataKey="growth" stroke="#16a34a" strokeWidth={3} fill="url(#compGrowGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', background: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                        <span>📉 每日停滯或微退步 1%：一年後能力僅剩 <strong>0.03x (歸零)</strong></span>
                        <span>📈 每日主動閱讀提取 1%：一年後能力爆發至 <strong>37.8x (幾何級數)</strong></span>
                    </div>
                </div>

                {/* 2. Knowledge Domain Compounding Matrix Table */}
                <div style={{
                    background: 'white', padding: '28px', borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)', boxShadow: 'var(--card-shadow)',
                    marginBottom: '48px', animation: 'fadeInUp 0.6s var(--transition-med) 0.35s both'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: '850', color: 'var(--text)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>📊</span>
                                <span>{language === 'zh' ? '六大核心知識領域半衰期與複利轉化矩陣表' : 'Knowledge Half-Life & Compounding Matrix'}</span>
                            </h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                                {language === 'zh' ? '不同領域的知識具備不同的保鮮期與槓桿率，合理分配學習資產組合' : 'Optimize your intellectual asset portfolio across domain half-lives'}
                            </p>
                        </div>
                        <span style={{ fontSize: '11px', color: '#0369a1', background: '#e0f2fe', padding: '4px 10px', borderRadius: '8px', fontWeight: '800' }}>
                            PORTFOLIO MATRIX
                        </span>
                    </div>

                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '12px 14px', fontWeight: '800', color: '#334155' }}>知識領域</th>
                                    <th style={{ padding: '12px 14px', fontWeight: '800', color: '#0284c7' }}>知識半衰期</th>
                                    <th style={{ padding: '12px 14px', fontWeight: '800', color: '#16a34a' }}>實踐轉化率</th>
                                    <th style={{ padding: '12px 14px', fontWeight: '800', color: '#7c3aed' }}>複利槓桿度</th>
                                    <th style={{ padding: '12px 14px', fontWeight: '800', color: '#334155' }}>推薦資產比重</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { domain: '底層邏輯與心智模型', halfLife: '50+ 年 (永不過期)', rate: '高 (85%)', leverage: '★★★★★ (頂級槓桿)', weight: '35% (核心壓艙石)' },
                                    { domain: '神經科學與認知心理', halfLife: '30+ 年 (生理規律)', rate: '極高 (90%)', leverage: '★★★★★ (個人升級)', weight: '25% (基石配比)' },
                                    { domain: '商業策略與投資心法', halfLife: '10-20 年 (週期律)', rate: '中高 (75%)', leverage: '★★★★☆ (財務倍增)', weight: '20% (資產擴張)' },
                                    { domain: '溝通談判與人際協作', halfLife: '終身適用 (人性不變)', rate: '極高 (92%)', leverage: '★★★★☆ (人際飛輪)', weight: '10% (高頻實用)' },
                                    { domain: '系統架構與數位科技', halfLife: '5-10 年 (快速迭代)', rate: '中 (70%)', leverage: '★★★★☆ (生產力工具)', weight: '10% (敏捷升級)' },
                                ].map((item, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 0 ? 'white' : '#fcfcfc' }}>
                                        <td style={{ padding: '12px 14px', fontWeight: '850', color: '#1e293b' }}>{item.domain}</td>
                                        <td style={{ padding: '12px 14px', color: '#0369a1', fontWeight: '700' }}>{item.halfLife}</td>
                                        <td style={{ padding: '12px 14px', color: '#16a34a', fontWeight: '750' }}>{item.rate}</td>
                                        <td style={{ padding: '12px 14px', color: '#7c3aed', fontWeight: '800' }}>{item.leverage}</td>
                                        <td style={{ padding: '12px 14px', color: '#334155', fontWeight: '800' }}>{item.weight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                
                <div style={{ 
                    marginTop: '48px', padding: '24px', background: 'rgba(0,0,0,0.03)', 
                    borderRadius: 'var(--radius-md)', textAlign: 'center', fontSize: '13px', 
                    color: 'var(--text-muted)', fontWeight: '500' 
                }}>
                    💡 {language === 'zh' ? '數據為模擬統計資料，僅用於 UI 呈現參考' : 'Data is simulated for UI presentation purposes only.'}
                </div>
            </div>
            <BottomNavbar />
        </div>
    );
}
