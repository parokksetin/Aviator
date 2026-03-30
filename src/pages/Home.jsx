import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Добавили импорт

export default function Home({ videos, isLoading }) {
  const [activeTab, setActiveTab] = useState('topPopular');

  if (isLoading) {
    return <div style={{ padding: 20, color: '#fff' }}>Сканируем Instagram... Загрузка данных ⏳</div>;
  }

  const currentVideos = videos[activeTab] || [];

  return (
    <div className="page home-page" style={{ padding: '20px', color: '#fff' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <div onClick={() => setActiveTab('topPopular')} style={{ cursor: 'pointer', fontWeight: activeTab === 'topPopular' ? 'bold' : 'normal', color: activeTab === 'topPopular' ? '#ff6b00' : '#888' }}>
          Популярные ролики
        </div>
        <div onClick={() => setActiveTab('fastGrowing')} style={{ cursor: 'pointer', fontWeight: activeTab === 'fastGrowing' ? 'bold' : 'normal', color: activeTab === 'fastGrowing' ? '#ff6b00' : '#888' }}>
          Быстрорастущие (Высокий ER)
        </div>
        <div onClick={() => setActiveTab('latest')} style={{ cursor: 'pointer', fontWeight: activeTab === 'latest' ? 'bold' : 'normal', color: activeTab === 'latest' ? '#ff6b00' : '#888' }}>
          Последние
        </div>
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {currentVideos.length > 0 ? (
          currentVideos.map(video => (
            // ОБЕРНУЛИ КАРТОЧКУ В LINK
            <Link to={`/video/${video.shortcode}`} key={video.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="video-card" style={{ background: '#1a1a1a', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', transition: 'transform 0.2s' }}>
                <div style={{ position: 'relative', width: '100%', paddingTop: '125%', background: '#222' }}>
                  <img 
                    src={`https://images.weserv.nl/?url=${encodeURIComponent(video.thumbnailUrl)}`} 
                    alt="cover" 
                    referrerPolicy="no-referrer"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '12px' }}>
                  <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#eee', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '38px' }}>
                    {video.description || "Без названия"}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ color: '#aaa' }}>{video.views.toLocaleString()} views</span>
                    <span style={{ color: '#00e676', fontWeight: '600' }}>⚡ {video.er}% ER</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ color: '#888' }}>Ничего не найдено.</div>
        )}
      </div>
    </div>
  );
}