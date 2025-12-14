import React from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Video from './pages/Video'
import AIScriptGenerator from './pages/AIScriptGenerator';
import { generateMockVideos } from './services/api/mockApi'

// --- SVG-КОМПОНЕНТЫ ДЛЯ ИКОНОК ---
// Эти иконки будут менять цвет, наследуя 'currentColor' от родительского NavLink.

const Icon = ({ children }) => (
    <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
    </div>
);

// Иконка Главной 
const HomeIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2zm0 3.71l5 5V18h-2v-6H9v6H7v-7.29l5-5z"/>
        </svg>
    </Icon>
);

// Иконка Генератора 
const ScriptIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 15h-10v-2h10v2zm0-4H7v-2h10v2zm0-4H7V8h10v2z"/>
        </svg>
    </Icon>
);

// Иконка Профиля 
const ProfileIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.38 0 2.5 1.12 2.5 2.5S13.38 10 12 10 9.5 8.88 9.5 7.5 10.62 5 12 5zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
    </Icon>
);
// ------------------------------------


function Sidebar(){
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">A</div>
        <div>
          <div style={{fontWeight:700}}>Aviator</div>
          <div style={{fontSize:12,color:'var(--muted)'}}>Reels Analytics</div>
        </div>
      </div>
      <nav className="menu">
            {/* NavLink теперь включает иконку */}
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
      <div style={{marginTop:'auto',fontSize:12,color:'var(--muted)'}}>v0.1 • Mock</div>
    </aside>
  )
}

export default function App(){
  // Pre-generate some mock data and attach to window for dev convenience
  if(!window.__AVIATOR_MOCK__) window.__AVIATOR_MOCK__ = generateMockVideos(24)

  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <div className="header panel">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{fontSize:20,fontWeight:700}}>Aviator</div>
            <div className="search">
              <input placeholder="Введите нишу: фитнес, рецепты, путешествия..." id="globalSearch" />
              <button className="btn" onClick={()=>{
                const q = document.getElementById('globalSearch').value
                const nav = document.querySelector('[data-nav]')
                // naive: go to home with query param
                window.location.href = '/?q='+encodeURIComponent(q)
              }}>Найти</button>
            </div>
          </div>
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            
            <div style={{width:40,height:40,borderRadius:10,background:'linear-gradient(135deg,var(--accent), #ff964b)'}}></div>
          </div>
        </div>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/video/:id' element={<Video/>} />
          <Route path="/AIScriptGenerator" element={<AIScriptGenerator />} />
        </Routes>
      </main>
    </div>
  )
}