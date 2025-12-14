import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { fetchVideoById } from '../services/api/mockApi'
import { transcribeVideo, generateScript } from '../services/ai/mockAi'

export default function Video(){
  const { id } = useParams()
  const [video,setVideo] = useState(null)
  const [transcription, setTranscription] = useState('')
  const [script, setScript] = useState('')
  const [loadingT,setLoadingT] = useState(false)
  const [loadingS,setLoadingS] = useState(false)

  useEffect(()=>{
    fetchVideoById(id).then(setVideo)
  },[id])

  function handleTranscribe(){
    setLoadingT(true)
    transcribeVideo(id).then(res=>{ setTranscription(res.transcription); setLoadingT(false) })
  }

  function handleGenerate(){
    setLoadingS(true)
    generateScript(transcription || 'short sample transcription').then(res=>{ setScript(res.script); setLoadingS(false) })
  }

  if(!video) return <div className="panel">Loading...</div>

  return (
    <div>
      <h2>Video — {video.title}</h2>
      
        {/* 🔥 ГЛАВНЫЙ GRID: Две большие колонки. Видео (460px) слева, ВСЁ ОСТАЛЬНОЕ (1fr) справа. */}
      <div className="panel" style={{
            marginTop: 12, 
            display: 'grid', 
            gridTemplateColumns: '460px 1fr', 
            gap: 100
        }}>
            
            {/* ========================================================= */}
            {/* 🔥 КОЛОНКА 1 (СЛЕВА): ТОЛЬКО ВИДЕОПЛЕЕР */}
            {/* ========================================================= */}
            <div className="video-player" style={{display: 'flex', flexDirection: 'column'}}>
                <video 
                    key={video.id}
                    controls 
                    autoPlay 
                    loop
                    poster={video.coverImage}
                    style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:10}}
                >
                    <source src={video.videoUrl} type="video/mp4" />
                    Ваш браузер не поддерживает тег video.
                </video>
            </div>


            {/* ========================================================= */}
            {/* 🔥 КОЛОНКА 2 (СПРАВА): ВСЁ ОСТАЛЬНОЕ (МЕТРИКИ, КНОПКИ, ТЕКСТ) */}
            {/* ========================================================= */}
            <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>

                {/* 1. БЛОК С МЕТРИКАМИ И КНОПКАМИ */}
                <div style={{display:'flex', gap: 200}}>
                    
                    
                    {/* Основная статистика (справа в правой колонке) */}
                    <div className="side-stats" style={{flexGrow: 1}}>
                        <h4 style={{marginBottom: 4}}>Основные метрики</h4>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}}>
                            <div className="kv"><div>Views</div><div>{video.views.toLocaleString()}</div></div>
                            <div className="kv"><div>Likes</div><div>{video.likes.toLocaleString()}</div></div>
                            <div className="kv"><div>Comments</div><div>{video.comments.toLocaleString()}</div></div>
                            <div className="kv"><div>Saves</div><div>{video.saves.toLocaleString()}</div></div>
                        </div>
                    </div>
                </div>

                {/* Кнопки Transcribe/Generate (слева в правой колонке) */}
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, height:'50px'}}>
                        <button className="btn" style={{fontSize: '20px'}} onClick={handleTranscribe}>{loadingT ? 'Transcribing...' : 'Transcribe'}</button>
                        <button className="btn" style={{fontSize: '20px'}} onClick={handleGenerate}>{loadingS ? 'Generating...' : 'Сгенерировать сценарий'}</button>
                    </div>


                {/* 2. ТРАНСКРИПЦИЯ И СЦЕНАРИЙ (под метриками) */}
                <div style={{display:'grid', gridTemplateColumns: '1fr', gap: 12}}>
                    
                    {/* ТРАНСКРИПЦИЯ */}
                    <div>
                        <h4>Transcription</h4>
                        <div style={{whiteSpace:'pre-wrap',background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10, minHeight: 100}}>{transcription || 'No transcription yet. Click Transcribe.'}</div>
                    </div>

                    {/* СЦЕНАРИЙ */}
                    <div>
                        <h4 style={{marginTop:12}}>Generated Script</h4>
                        <div style={{whiteSpace:'pre-wrap',background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10,minHeight:200}}>{script || 'No script yet. Click "Сгенерировать сценарий".'}</div>
                        <div style={{display:'flex',gap:8,marginTop:8}}>
                            <button className="copy" onClick={()=>navigator.clipboard.writeText(script || '')}>Скопировать сценарий</button>
                        </div>
                    </div>
                </div>

                {/* 3. INSIGHTS И ХЭШТЕГИ (в самом низу правой колонки) */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 10}}>
                    <div>
                        <h4>Quick Insights</h4>
                        <div className="kv">Engagement: <strong>{((video.likes+video.comments+video.saves)/video.views*100).toFixed(2)}%</strong></div>
                    </div>
                    <div>
                        <h4>Suggested Hashtags</h4>
                        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                            <div className="copy">#viral</div>
                            <div className="copy">#{video.niche}</div>
                            <div className="copy">#reels</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
  )
}