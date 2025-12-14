import React from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Video from './pages/Video'
import AIScriptGenerator from './pages/AIScriptGenerator';
import ContentPlanner from './pages/ContentPlanner'
import { generateMockVideos } from './services/api/mockApi'

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
        <NavLink to="/" end>Главная</NavLink>
        <NavLink to="/AIScriptGenerator">Генератор сценариев</NavLink>
        <NavLink to="/ContentPlanner">Планировщик</NavLink>
        <NavLink to="/profile">Профиль</NavLink>
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
            <button className="copy">Light</button>
            <div style={{width:40,height:40,borderRadius:10,background:'linear-gradient(135deg,var(--accent), #ff964b)'}}></div>
          </div>
        </div>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/video/:id' element={<Video/>} />
          <Route path="/AIScriptGenerator" element={<AIScriptGenerator />} />
          <Route path="/ContentPlanner" element={<ContentPlanner />} />
        </Routes>
      </main>
    </div>
  )
}
