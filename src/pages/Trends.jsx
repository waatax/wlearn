import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ArrowLeft, TrendingUp, BarChart3, Play, Globe } from 'lucide-react';

export default function Trends() {
    const navigate = useNavigate();
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
                <div style={{ background: '#212121', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '13px' }}>
                    <p style={{ margin: '0 0 8px 0', borderBottom: '1px solid #333', paddingBottom: '4px', opacity: 0.7 }}>{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} style={{ margin: '2px 0', color: p.color, fontWeight: '600' }}>
                            {p.name}: {p.value}
                        </p>
                    ))}
                    {data.find(d => d.date === label || d.displayDate === label)?.published && (
                        <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#aaa' }}>🎥 已發布 1 部影片</p>
                    )}
                </div>
            );
        }
        return null;
    };

    const renderChart = (key, name, color, colorEnd) => (
        <div style={{ height: '300px', width: '100%', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '14px', color: '#aaa', marginBottom: '16px', fontWeight: '500' }}>{name}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={colorEnd || color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis 
                        dataKey="displayDate" 
                        stroke="#888" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false}
                        interval={Math.ceil(data.length / 6)}
                    />
                    <YAxis 
                        stroke="#888" 
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
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill={`url(#grad-${key})`} 
                        name={name}
                    />
                </AreaChart>
            </ResponsiveContainer>
            {/* Play icons for published videos line */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px 0 40px', marginTop: '10px' }}>
                {data.filter((_, i) => i % Math.ceil(data.length / 20) === 0).map((d, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         {d.published ? <div style={{ width: '16px', height: '16px', background: '#333', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Play size={10} color="#888" fill="#888" />
                         </div> : <div style={{ height: '16px' }} />}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ background: '#121212', color: '#fff', minHeight: '100vh', padding: '24px' }}>
            {/* Header */}
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                <button 
                    onClick={() => navigate('/popular')} 
                    style={{ 
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
                        borderRadius: '8px', background: '#1a1a1a', border: '1px solid #333',
                        color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: '500'
                    }}
                >
                    <ArrowLeft size={16} /> 返回排行
                </button>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <BarChart3 color="#a18aff" /> 觀看趨勢分析
                    </h1>
                </div>
                <div style={{ width: '100px' }} />
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>分析數據中...</div>
                ) : (
                    <>
                        <div style={{ background: '#1a1a1a', borderRadius: '16px', border: '1px solid #333', padding: '32px', boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}>
                            {/* Summary Totals */}
                            <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '24px' }}>
                                <div>
                                    <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>總觀看次數</div>
                                    <div style={{ fontSize: '28px', fontWeight: '700' }}>{data.reduce((s, d) => s + d.total, 0).toLocaleString()}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>觀看時間 (小時)</div>
                                    <div style={{ fontSize: '28px', fontWeight: '700' }}>1,245.8</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '13px', color: '#aaa', marginBottom: '4px' }}>訂閱人數</div>
                                    <div style={{ fontSize: '28px', fontWeight: '700', color: '#4caf50' }}>+124</div>
                                </div>
                            </div>

                            {/* Charts Wrapper */}
                            {renderChart('total', '觀看次數 (總計: 中文 + 英文)', '#a18aff', '#6366f1')}
                            {renderChart('cn', '中文版 觀看次數', '#00bcd4')}
                            {renderChart('en', '英文版 觀看次數', '#ff9100')}
                        </div>
                        
                        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
                             數據為模擬統計資料，僅用於 UI 呈現參考
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
