import React, { useState } from 'react';

function Header({ onSearch, isLoading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: 'flex', 
          width: '100%', 
          maxWidth: '700px', 
          backgroundColor: '#1c1c1c', 
          borderRadius: '8px', 
          overflow: 'hidden',
          border: '1px solid #333'
        }}
      >
        <div style={{ padding: '12px 20px', fontWeight: 'bold', borderRight: '1px solid #333', display: 'flex', alignItems: 'center' }}>
          Aviator
        </div>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Введите нишу: фитнес, рецепты, путешествия..."
          style={{ 
            flex: 1, 
            backgroundColor: 'transparent', 
            border: 'none', 
            color: '#fff', 
            padding: '0 15px',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            backgroundColor: '#ff6b00', 
            color: '#fff', 
            border: 'none', 
            padding: '0 25px', 
            fontWeight: 'bold', 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1
          }}
        >
          {isLoading ? 'Поиск...' : 'Найти'}
        </button>
      </form>
    </header>
  );
}

export default Header;