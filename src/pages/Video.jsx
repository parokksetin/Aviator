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
      <div className="panel" style={{marginTop:12}}>
        <div className="video-layout">
          <div className="video-player">
            <div style={{color:'var(--muted)'}}>Video preview</div>
          </div>
          <div className="side-stats">
            <div className="kv"><div>Views</div><div>{video.views.toLocaleString()}</div></div>
            <div className="kv"><div>Likes</div><div>{video.likes.toLocaleString()}</div></div>
            <div className="kv"><div>Comments</div><div>{video.comments.toLocaleString()}</div></div>
            <div className="kv"><div>Saves</div><div>{video.saves.toLocaleString()}</div></div>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <button className="btn" onClick={handleTranscribe}>{loadingT ? 'Transcribing...' : 'Transcribe'}</button>
              <button className="btn" onClick={handleGenerate}>{loadingS ? 'Generating...' : 'Сгенерировать сценарий'}</button>
            </div>
          </div>
        </div>

        <div style={{marginTop:14,display:'grid',gridTemplateColumns:'1fr 460px',gap:12}}>
          <div>
            <h4>Transcription</h4>
            <div style={{whiteSpace:'pre-wrap',background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10}}>{transcription || 'No transcription yet. Click Transcribe.'}</div>

            <h4 style={{marginTop:12}}>Generated Script</h4>
            <div style={{whiteSpace:'pre-wrap',background:'rgba(255,255,255,0.02)',padding:12,borderRadius:10,minHeight:120}}>{script || 'No script yet. Click "Сгенерировать сценарий".'}</div>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <button className="copy" onClick={()=>navigator.clipboard.writeText(script || '')}>Скопировать сценарий</button>
            </div>
          </div>
          <div>
            <h4>Quick Insights</h4>
            <div className="kv">Engagement: <strong>{((video.likes+video.comments+video.saves)/video.views*100).toFixed(2)}%</strong></div>
            <div style={{height:12}}></div>
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
  )
}
