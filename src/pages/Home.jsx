// src/pages/Home.jsx
import React, { useState } from 'react';
// Импортируй свои карточки видео, если они у тебя в отдельном компоненте

export default function Home({ videos, isLoading }) {
  const [activeTab, setActiveTab] = useState('fastGrowing');

  if (isLoading) {
    return <div style={{ padding: 20 }}>Сканируем Instagram... Загрузка данных ⏳</div>;
  }

  // Берем массив видео в зависимости от выбранной вкладки
  const currentVideos = videos[activeTab] || [];

  return (
    <div className="page home-page">
      
      {/* Навигация по сортировке (как на твоем макете) */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <div 
          onClick={() => setActiveTab('topPopular')}
          style={{ cursor: 'pointer', fontWeight: activeTab === 'topPopular' ? 'bold' : 'normal', color: activeTab === 'topPopular' ? '#ff6b00' : '#888' }}
        >
          Популярные ролики
        </div>
        <div 
          onClick={() => setActiveTab('fastGrowing')}
          style={{ cursor: 'pointer', fontWeight: activeTab === 'fastGrowing' ? 'bold' : 'normal', color: activeTab === 'fastGrowing' ? '#ff6b00' : '#888' }}
        >
          Быстрорастущие (Высокий ER)
        </div>
        <div 
          onClick={() => setActiveTab('latest')}
          style={{ cursor: 'pointer', fontWeight: activeTab === 'latest' ? 'bold' : 'normal', color: activeTab === 'latest' ? '#ff6b00' : '#888' }}
        >
          Последние
        </div>
      </div>

      {/* Отрисовка твоих карточек */}
      <div className="grid">
        {currentVideos.length > 0 ? (
          currentVideos.map(video => (
            // Здесь вставь верстку своей карточки, которую ты скидывал на скриншоте.
            // Подставляй туда video.thumbnail, video.shortCaption, video.views и video.engagement
            <div key={video.id} className="video-card" style={{ background: '#222', borderRadius: '8px', padding: '10px' }}>
              <img src={video.thumbnail} alt="cover" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}/>
              <p style={{ margin: '10px 0', fontSize: '14px' }}>{video.shortCaption}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', fontSize: '12px' }}>
                <span>{video.views} views</span>
                <span style={{ color: '#00e676' }}>⚡ {video.engagement}% ER</span>
              </div>
            </div>
          ))
        ) : (
          <div>По вашему запросу ничего не найдено.</div>
        )}
      </div>
    </div>
  );
}