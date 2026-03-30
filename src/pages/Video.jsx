import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVideoById } from "../services/api/api";
import { transcribeVideo, generateScript } from '../services/ai/mockAi';
import './Video.css';

// ОБЯЗАТЕЛЬНО: export default в начале функции
export default function Video() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [script, setScript] = useState('');
  const [loadingT, setLoadingT] = useState(false);
  const [loadingS, setLoadingS] = useState(false);

  useEffect(() => {
    fetchVideoById(id).then(data => {
      if (data) setVideo(data);
    });
  }, [id]);

  if (!video) return <div className="panel" style={{ padding: 50, color: '#fff' }}>Загружаем аналитику... 🚀</div>;

  // Прокси для картинок, чтобы не было ошибки 403/NotSameOrigin
  const proxyUrl = (url) => url ? `https://images.weserv.nl/?url=${encodeURIComponent(url)}` : '';

  return (
    <div style={{ color: '#fff', padding: '20px' }}>
      <h2 style={{ marginBottom: 20 }}>{video.title || 'Анализ ролика'}</h2>
      
      <div className="panel" style={{ 
        display: 'grid', 
        gridTemplateColumns: '460px 1fr', 
        gap: 40,
        background: 'rgba(255,255,255,0.02)',
        padding: '20px',
        borderRadius: '15px'
      }}>
        
        <div className="video-player">
          {video.is_video ? (
            <video key={video.id} controls autoPlay loop poster={proxyUrl(video.coverImage)} style={{ width: '100%', borderRadius: 10 }}>
              <source src={video.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img src={proxyUrl(video.coverImage)} alt="cover" style={{ width: '100%', borderRadius: 10 }} />
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="side-stats">
            <h4>Основные метрики</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 10 }}>
              <div className="kv"><div>Просмотры</div><div>{video.views?.toLocaleString()}</div></div>
              <div className="kv"><div>Лайки</div><div>{video.likes?.toLocaleString()}</div></div>
              <div className="kv"><div>Комменты</div><div>{video.comments?.toLocaleString()}</div></div>
              <div className="kv"><div>Сохранения</div><div>{video.saves?.toLocaleString()}</div></div>
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

          <div style={{ marginTop: 10 }}>
            <h5 style={{ color: '#888' }}>Транскрипция</h5>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 10, minHeight: 60, fontSize: 14 }}>
              {transcription || 'Нажмите "Транскрипция"'}
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <h5 style={{ color: '#888' }}>Новый сценарий</h5>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 10, minHeight: 100, fontSize: 14, color: '#00e676' }}>
              {script || 'Нажмите "Сгенерировать сценарий"'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}