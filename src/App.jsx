import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom' 
import Home from './pages/Home'
import Profile from './pages/Profile'
import Video from './pages/Video'
import AIScriptGenerator from './pages/AIScriptGenerator';
import { fetchNicheVideos } from './services/api/api' // 🔥 ИМПОРТ НАШЕГО НОВОГО API
import AviatorLogo from './assets/logo.svg';

// --- SVG-КОМПОНЕНТЫ ДЛЯ ИКОНОК ---
const Icon = ({ children }) => (
    <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
    </div>
);

const HomeIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2zm0 3.71l5 5V18h-2v-6H9v6H7v-7.29l5-5z"/>
        </svg>
    </Icon>
);

const ScriptIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 15h-10v-2h10v2zm0-4H7v-2h10v2zm0-4H7V8h10v2z"/>
        </svg>
    </Icon>
);

const ProfileIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.38 0 2.5 1.12 2.5 2.5S13.38 10 12 10 9.5 8.88 9.5 7.5 10.62 5 12 5zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
    </Icon>
);

function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">
            <img src={AviatorLogo} alt="Aviator Logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
        </div>
        <div>
          <div style={{fontWeight:700}}>Aviator</div>
          <div style={{fontSize:12,color:'var(--muted)'}}>Reels Analytics</div>
        </div>
      </div>
      <nav className="menu">
        <NavLink to="/" end>
            <HomeIcon />
            <span>Главная</span>
        </NavLink>
        
        <NavLink to="/AIScriptGenerator">
            <ScriptIcon />
            <span>Генератор сценариев</span>
        </NavLink>
        
        <NavLink to="/profile">
            <ProfileIcon />
            <span>Профиль</span>
        </NavLink>
      </nav>
      <div style={{marginTop:'auto',fontSize:12,color:'var(--muted)'}}>v0.1 • Alpha</div>
    </aside>
  )
}

export default function App(){
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isHomePage = location.pathname === '/';

  // 🔥 СОСТОЯНИЯ ДЛЯ РАБОТЫ С API
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || ''); // Берем запрос из URL или пустую строку
  const [videos, setVideos] = useState({ topPopular: [], latest: [], fastGrowing: [] });
  const [isLoading, setIsLoading] = useState(false);

  // 🔥 ФУНКЦИЯ ЗАПУСКА ПОИСКА
  const executeSearch = async (query) => {
    if (!query) return;
    setIsLoading(true);
    
    const data = await fetchNicheVideos(query);
    if (data) {
      setVideos(data);
    }
    
    setIsLoading(false);
  };

  // 🔥 СРАБАТЫВАЕТ ПРИ ЗАГРУЗКЕ (если в ссылке есть ?q=спорт, он сразу найдет видео)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
      executeSearch(q);
    } else {
      // Ищем дефолтную нишу при пустом входе, чтобы экран не был пустым
      executeSearch('бизнес'); 
    }
  }, [searchParams]);

  // Обработчик кнопки "Найти" и Enter
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Меняем URL без перезагрузки страницы
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
        <div className="header panel" style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',    
            width: '100%',
            padding: 15 
        }}>
          <div style={{display:'flex',alignItems:'center',gap:12, width: '100%', maxWidth: '800px'}}>
            <div style={{fontSize:20,fontWeight:700, marginRight: '20px'}}>Aviator</div>
            
            {/* 🔥 ОБНОВЛЕННЫЙ ПОИСК НА REACT-ВЕЙ */}
            {isHomePage && (
                <div className="search" style={{display: 'flex', flex: 1, gap: '10px'}}>
                  <input 
                    placeholder="Введите нишу: фитнес, рецепты, путешествия..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ flex: 1 }}
                  />
                  <button 
                    className="btn" 
                    onClick={handleSearchSubmit}
                    disabled={isLoading}
                    style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                  >
                    {isLoading ? 'Ищем...' : 'Найти'}
                  </button>
                </div>
            )}
          </div>
        </div>

        <Routes>
          {/* 🔥 ПЕРЕДАЕМ ДАННЫЕ В ГЛАВНУЮ СТРАНИЦУ */}
          <Route path='/' element={<Home videos={videos} isLoading={isLoading} />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/video/:id' element={<Video/>} />
          <Route path="/AIScriptGenerator" element={<AIScriptGenerator />} />
        </Routes>
      </main>
    </div>
  )
}