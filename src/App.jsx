import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './App.css'; // Импортируем стили каркаса
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Video from './pages/Video';
import AIScriptGenerator from './pages/AIScriptGenerator';
import { fetchNicheVideos } from './services/api/api';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isHomePage = location.pathname === '/';

  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [videos, setVideos] = useState({ topPopular: [], latest: [], fastGrowing: [] });
  const [isLoading, setIsLoading] = useState(false);

  const executeSearch = async (query) => {
    if (!query) return;
    setIsLoading(true);
    
    const data = await fetchNicheVideos(query);
    if (data) {
      setVideos(data);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
      executeSearch(q);
    } else {
      executeSearch('бизнес'); 
    }
  }, [searchParams]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
      executeSearch(searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Header 
          isHomePage={isHomePage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleKeyDown={handleKeyDown}
          handleSearchSubmit={handleSearchSubmit}
          isLoading={isLoading}
        />

        <Routes>
          <Route path='/' element={<Home videos={videos} isLoading={isLoading} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/video/:id' element={<Video />} />
          <Route path="/AIScriptGenerator" element={<AIScriptGenerator />} />
        </Routes>
      </main>
    </div>
  );
}