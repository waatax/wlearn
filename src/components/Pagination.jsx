import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    pageSize,
    onPageSizeChange,
    totalItems
}) {
    const { language } = useLanguage();

    if (totalPages <= 1) return null;

    // Calculate visible page range with ellipses
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                start = 2;
                end = 4;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
                end = totalPages - 1;
            }

            pages.push(1);
            if (start > 2) pages.push('...');
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            if (end < totalPages - 1) pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            marginTop: '36px',
            padding: '16px 20px',
            background: 'white',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--card-shadow)'
        }}>
            {/* Total items info */}
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                {language === 'zh' ? (
                    <span>
                        顯示第 <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{startItem} - {endItem}</span> 筆，共 <span style={{ fontWeight: '800' }}>{totalItems}</span> 筆
                    </span>
                ) : (
                    <span>
                        Showing <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{startItem} - {endItem}</span> of <span style={{ fontWeight: '800' }}>{totalItems}</span>
                    </span>
                )}
            </div>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {/* First Page */}
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    title={language === 'zh' ? '第一頁' : 'First page'}
                    style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)',
                        background: currentPage === 1 ? '#f8fafc' : 'white',
                        color: currentPage === 1 ? '#94a3b8' : 'var(--text)',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease'
                    }}
                >
                    <ChevronsLeft size={16} />
                </button>

                {/* Previous Page */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    title={language === 'zh' ? '上一頁' : 'Previous page'}
                    style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)',
                        background: currentPage === 1 ? '#f8fafc' : 'white',
                        color: currentPage === 1 ? '#94a3b8' : 'var(--text)',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease'
                    }}
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Numbered buttons */}
                {getPageNumbers().map((p, idx) => {
                    if (p === '...') {
                        return (
                            <span key={`dots-${idx}`} style={{ padding: '0 4px', color: 'var(--text-muted)', fontSize: '13px' }}>
                                ...
                            </span>
                        );
                    }

                    const isActive = p === currentPage;
                    return (
                        <button
                            key={p}
                            onClick={() => onPageChange(p)}
                            style={{
                                minWidth: '34px',
                                height: '34px',
                                padding: '0 8px',
                                borderRadius: '8px',
                                border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                                background: isActive ? 'var(--primary)' : 'white',
                                color: isActive ? 'white' : 'var(--text)',
                                fontWeight: isActive ? '800' : '600',
                                fontSize: '13px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease',
                                boxShadow: isActive ? '0 2px 8px rgba(45, 102, 72, 0.3)' : 'none'
                            }}
                        >
                            {p}
                        </button>
                    );
                })}

                {/* Next Page */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    title={language === 'zh' ? '下一頁' : 'Next page'}
                    style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)',
                        background: currentPage === totalPages ? '#f8fafc' : 'white',
                        color: currentPage === totalPages ? '#94a3b8' : 'var(--text)',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease'
                    }}
                >
                    <ChevronRight size={16} />
                </button>

                {/* Last Page */}
                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    title={language === 'zh' ? '最後一頁' : 'Last page'}
                    style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        border: '1px solid var(--border-light)',
                        background: currentPage === totalPages ? '#f8fafc' : 'white',
                        color: currentPage === totalPages ? '#94a3b8' : 'var(--text)',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s ease'
                    }}
                >
                    <ChevronsRight size={16} />
                </button>
            </div>

            {/* Page Size Selector */}
            {onPageSizeChange && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                        {language === 'zh' ? '每頁：' : 'Per page:'}
                    </span>
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'white',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: 'var(--text)',
                            cursor: 'pointer'
                        }}
                    >
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                        <option value={96}>96</option>
                    </select>
                </div>
            )}
        </div>
    );
}
