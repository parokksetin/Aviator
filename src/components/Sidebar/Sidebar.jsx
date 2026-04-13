import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { HomeIcon, ScriptIcon, ProfileIcon } from '../Icons/Icons';
import AviatorLogo from '../../assets/logo.svg';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">
            <img src={AviatorLogo} alt="Aviator Logo" style={{width: '100%', height: '100%', objectFit: 'contain'}} />
        </div>
        <div>
          <div style={{fontWeight: 700}}>Aviator</div>
          <div style={{fontSize: 12, color: 'var(--muted)'}}>Reels Analytics</div>
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
      <div style={{marginTop: 'auto', fontSize: 12, color: 'var(--muted)'}}>v0.1 • Alpha</div>
    </aside>
  );
}