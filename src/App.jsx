import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Popular from './pages/Popular';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/popular" element={<Popular />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
