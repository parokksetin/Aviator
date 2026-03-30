import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { transcribeVideo, generateScript } from '../services/ai/mockAi';
import { fetchDirectVideoUrl } from "../services/api/api"; 
import './Video.css';

export default function Video() {
  const { id } = useParams(); 
  const [video, setVideo] = useState(null);
  const [realVideoUrl, setRealVideoUrl] = useState('');
  const [isSearchingVideo, setIsSearchingVideo] = useState(true); // Флаг поиска
  
  const [transcription, setTranscription] = useState('');
  const [script, setScript] = useState('');
  const [loadingT, setLoadingT] = useState(false);
  const [loadingS, setLoadingS] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('cachedVideo');
    
    if (savedData) {
      const parsedVideo = JSON.parse(savedData);
      
      if (parsedVideo.shortcode === id || parsedVideo.id === id) {
        setVideo(parsedVideo);
        setIsSearchingVideo(true); // Начинаем поиск mp4
        
        // МЯТЕЖНЫЙ ПУТЬ: Игнорируем is_video = false. 
        // ВСЕГДА пытаемся вытащить прямую ссылку на .mp4 через /post
        fetchDirectVideoUrl(parsedVideo.id).then(mp4Url => {
          if (mp4Url) {
            console.log("Видео найдено! Ссылка:", mp4Url);
            setRealVideoUrl(mp4Url);
          } else {
            console.log("Это действительно просто фото, видео нет.");
          }
          setIsSearchingVideo(false); // Заканчиваем поиск
        });
        return; 
      }
    }
    console.error("Данные видео не найдены в кэше.");
  }, [id]);

  if (!video) return <div className="panel" style={{ padding: 50, color: '#fff' }}>Загружаем аналитику... 🚀</div>;

  const proxyUrl = (url) => url ? `https://images.weserv.nl/?url=${encodeURIComponent(url)}` : '';

  return (
    <div className="video-page-container" style={{ color: '#fff', padding: '20px' }}>
      <h2 style={{ marginBottom: 20 }}>
        {video.title && video.title !== "Video" && video.title !== "Reels Analytics" 
          ? video.title 
          : (video.description ? video.description.substring(0, 50) + '...' : 'Анализ поста')}
      </h2>
      
      <div className="panel" style={{ 
        display: 'grid', 
        gridTemplateColumns: '460px 1fr', 
        gap: 40,
        background: 'rgba(255,255,255,0.02)',
        padding: '20px',
        borderRadius: '15px'
      }}>
        
        <div className="video-player-container">
          {realVideoUrl ? (
            // Если мы нашли реальную ссылку на .mp4 - показываем видеоплеер
            <video 
              key={realVideoUrl} 
              controls 
              autoPlay 
              loop 
              playsInline
              poster={proxyUrl(video.coverImage)} 
              style={{ width: '100%', borderRadius: 10, backgroundColor: '#000' }}
            >
              <source src={realVideoUrl} type="video/mp4" />
            </video>
          ) : (
            // Пока ищем видео ИЛИ если его реально нет - показываем картинку
            <div style={{ position: 'relative' }}>
              <img 
                src={proxyUrl(video.coverImage)} 
                alt="cover" 
                style={{ width: '100%', borderRadius: 10, filter: isSearchingVideo ? 'brightness(0.6)' : 'none' }} 
              />
              {isSearchingVideo && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                  Проверяем наличие видео... ⏳
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="side-stats">
            <h4>Основные метрики</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 10 }}>
              <div className="kv"><div>Просмотры</div><div className="value">{Number(video.views).toLocaleString()}</div></div>
              <div className="kv"><div>Лайки</div><div className="value">{Number(video.likes).toLocaleString()}</div></div>
              <div className="kv"><div>Комменты</div><div className="value">{Number(video.comments).toLocaleString()}</div></div>
              <div className="kv"><div>ER</div><div className="value" style={{color: '#00e676'}}>{video.er}%</div></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <button className="btn" onClick={() => {
                setLoadingT(true);
                transcribeVideo(id).then(res => { setTranscription(res.transcription); setLoadingT(false); });
            }}>{loadingT ? 'Транскрибируем...' : 'Транскрипция'}</button>
            
            <button className="btn" onClick={() => {
                setLoadingS(true);
                generateScript(transcription || video.description).then(res => { setScript(res.script); setLoadingS(false); });
            }}>{loadingS ? 'Генерируем...' : 'Сгенерировать сценарий'}</button>
          </div>

          <div className="text-block">
            <h5 style={{ color: '#888', marginBottom: 5 }}>Текст поста / Транскрипция</h5>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 10, minHeight: 60, fontSize: 14, whiteSpace: 'pre-wrap' }}>
              {transcription || video.description || 'Нет текста'}
            </div>
          </div>

          <div className="text-block">
            <h5 style={{ color: '#888', marginBottom: 5 }}>Новый сценарий</h5>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 10, minHeight: 100, fontSize: 14, color: '#00e676' }}>
              {script || 'Нажмите "Сгенерировать сценарий"'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}