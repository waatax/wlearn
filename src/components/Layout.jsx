import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content">
                <Navbar />
                <div className="view-container animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
