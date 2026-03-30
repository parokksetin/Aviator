import React from 'react';

// Утилита для красивого отображения чисел (например, 876000 -> 876k)
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num;
};

function Dashboard({ videos, isLoading, activeTab, setActiveTab }) {
  
  if (isLoading) {
    return <div style={{ color: '#888', marginTop: '50px' }}>Загрузка данных из Instagram...</div>;
  }

  const currentVideos = videos[activeTab] || [];

  return (
    <div>
      {/* Вкладки сортировки */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <span 
          onClick={() => setActiveTab('topPopular')}
          style={{ cursor: 'pointer', fontWeight: 'bold', color: activeTab === 'topPopular' ? '#ff6b00' : '#888' }}
        >
          Популярные ролики
        </span>
        <span 
          onClick={() => setActiveTab('fastGrowing')}
          style={{ cursor: 'pointer', fontWeight: 'bold', color: activeTab === 'fastGrowing' ? '#ff6b00' : '#888' }}
        >
          Быстрорастущие (Высокий ER)
        </span>
        <span 
          onClick={() => setActiveTab('latest')}
          style={{ cursor: 'pointer', fontWeight: 'bold', color: activeTab === 'latest' ? '#ff6b00' : '#888' }}
        >
          Последние
        </span>
      </div>

      {/* Сетка карточек */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {currentVideos.map((video) => (
          <a 
            key={video.id} 
            href={video.url} 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              backgroundColor: '#161616', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              textDecoration: 'none', 
              color: '#fff',
              border: '1px solid #222',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {/* Превью видео */}
            <div style={{ position: 'relative', height: '200px' }}>
              <img 
                src={video.thumbnail} 
                alt="thumbnail" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              {/* Бейдж ER */}
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: '#00e676' }}>
                ⚡ ER: {video.engagement}%
              </div>
            </div>

            {/* Информация */}
            <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '15px', opacity: 0.9 }}>
                {video.shortCaption}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
                <span>{formatNumber(video.views)} views</span>
                <span>❤️ {formatNumber(video.likes)}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      {currentVideos.length === 0 && !isLoading && (
        <div style={{ color: '#888' }}>Видео по данному запросу не найдены. Попробуйте ввести другое слово.</div>
      )}
    </div>
  );
}

export default Dashboard;