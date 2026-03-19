import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
    const navigate = useNavigate();
    const context = useLanguage() as any;
    const language = context?.language || 'zh';
    const t = context?.t || ((k: string) => k);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg)',
            padding: '24px',
            textAlign: 'center'
        }}>
            <div style={{
                maxWidth: '400px',
                width: '100%',
                animation: 'fadeInUp 0.8s var(--transition-med) both'
            }}>
                <div style={{
                    fontSize: '120px',
                    fontWeight: '900',
                    lineHeight: 1,
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '20px',
                    letterSpacing: '-0.05em',
                    opacity: 0.2
                }}>
                    404
                </div>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '850',
                    color: 'var(--text)',
                    marginBottom: '12px',
                    letterSpacing: '-0.02em'
                }}>
                    {language === 'zh' ? '迷失在書海中？' : 'Lost in the Sea of Books?'}
                </h1>
                <p style={{
                    fontSize: '16px',
                    color: 'var(--text-muted)',
                    marginBottom: '32px',
                    fontWeight: '500'
                }}>
                    {language === 'zh' 
                        ? '我們找不到您請求的頁面，或許它已被移至更深處的架位。' 
                        : 'We can\'t seem to find the page you\'re looking for.'}
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', background: 'white',
                            cursor: 'pointer', fontSize: '15px', color: 'var(--text)', fontWeight: '700',
                            transition: 'all var(--transition-fast)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; }}
                    >
                        <ArrowLeft size={18} />
                        {language === 'zh' ? '返回上頁' : 'Go Back'}
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                            borderRadius: 'var(--radius-sm)', border: 'none', background: 'var(--primary)',
                            cursor: 'pointer', fontSize: '15px', color: 'white', fontWeight: '700',
                            transition: 'all var(--transition-fast)',
                            boxShadow: '0 8px 20px var(--primary-glow)'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px var(--primary-glow)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 20px var(--primary-glow)'; }}
                    >
                        <Home size={18} />
                        {language === 'zh' ? '回到首頁' : 'Back Home'}
                    </button>
                </div>
            </div>
        </div>
    );
}
