import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { GamificationProvider } from './context/GamificationContext';
import Home from './pages/Home';
import Universe from './pages/Universe';
import Quests from './pages/Quests';
import Profile from './pages/Profile';
import BookDetail from './pages/BookDetail';
import Popular from './pages/Popular';
import Trends from './pages/Trends';
import Authors from './pages/Authors';
import AuthorDetail from './pages/AuthorDetail';
import LearningScience from './pages/LearningScience';
import NotFound from './pages/NotFound';
import RandomDiscoveryModal from './components/RandomDiscoveryModal';
import DailyCapsuleModal from './components/DailyCapsuleModal';
import LevelUpModal from './components/LevelUpModal';

function App() {
  return (
    <LanguageProvider>
      <GamificationProvider>
        <BrowserRouter basename="/wlearn">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning-science" element={<LearningScience />} />
            <Route path="/framework" element={<LearningScience />} />
            <Route path="/universe" element={<Universe />} />
            <Route path="/quests" element={<Quests />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/authors" element={<Authors />} />
            <Route path="/author/:id" element={<AuthorDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* Global Gamification Modals */}
          <RandomDiscoveryModal />
          <DailyCapsuleModal />
          <LevelUpModal />
        </BrowserRouter>
      </GamificationProvider>
    </LanguageProvider>
  );
}

export default App;
