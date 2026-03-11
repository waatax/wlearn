import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Popular from './pages/Popular';
import Trends from './pages/Trends';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename="/wlearn">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/trends" element={<Trends />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
