import React from 'react';
import './Header.css';

export default function Header({ 
  isHomePage, 
  searchQuery, 
  setSearchQuery, 
  handleKeyDown, 
  handleSearchSubmit, 
  isLoading 
}) {
  return (
    <div className="header panel">
      <div style={{display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: '800px'}}>
        <div style={{fontSize: 20, fontWeight: 700, marginRight: '20px'}}>Aviator</div>
        
        {isHomePage && (
            <div className="search">
              <input 
                placeholder="Введите нишу: фитнес, рецепты, путешествия..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
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
  );
}