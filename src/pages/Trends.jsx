import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ArrowLeft, BarChart3, Play, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Trends() {
    const navigate = useNavigate();
    const { language, t } = useLanguage();
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

    const renderChart = (key, name, color, colorEnd) => (
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
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
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
            {/* Top nav bar */}
            <div style={{
                padding: '16px 32px', borderBottom: '1px solid var(--border-light)',
                background: 'var(--sidebar-bg)', backdropFilter: 'blur(var(--sidebar-blur))',
                WebkitBackdropFilter: 'blur(var(--sidebar-blur))',
                display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100,
            }}>
                <button
                    onClick={() => navigate('/popular')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white',
                        cursor: 'pointer', fontSize: '14px', color: 'var(--text)', fontWeight: '600',
                        transition: 'all var(--transition-fast)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(-4px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
                >
                    <ArrowLeft size={16} />
                    {language === 'zh' ? '返回排行' : 'Back to Rankings'}
                </button>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '850', color: 'var(--text)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <BarChart3 size={22} color="#6366f1" />
                        {language === 'zh' ? '全站數據趨勢' : 'Global Data Trends'}
                    </h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                        padding: '6px 12px', borderRadius: '999px', background: '#e8f5e9', 
                        color: '#2e7d32', fontSize: '12px', fontWeight: '800', display: 'flex', 
                        alignItems: 'center', gap: '6px' 
                    }}>
                        <Activity size={14} />
                        Live
                    </div>
                    <button
                        onClick={toggleLanguage}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
                            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white',
                            cursor: 'pointer', fontSize: '14px', fontWeight: '700', color: 'var(--text)',
                            transition: 'all var(--transition-fast)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}
                    >
                        <Globe size={16} color="var(--primary)" />
                        {language === 'zh' ? 'EN' : '中文'}
                    </button>
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
                
                <div style={{ 
                    marginTop: '48px', padding: '24px', background: 'rgba(0,0,0,0.03)', 
                    borderRadius: 'var(--radius-md)', textAlign: 'center', fontSize: '13px', 
                    color: 'var(--text-muted)', fontWeight: '500' 
                }}>
                    💡 {language === 'zh' ? '數據為模擬統計資料，僅用於 UI 呈現參考' : 'Data is simulated for UI presentation purposes only.'}
                </div>
            </div>
        </div>
    );
}
