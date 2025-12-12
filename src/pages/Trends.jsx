import React, {useEffect, useState} from 'react'
import VideoCard from '../components/VideoCard'
import { fetchVideosByNiche, generateMockVideos } from '../services/api/mockApi'

export default function Тренды(){
  const [videos,setVideos] = useState([])
  const [niche,setNiche] = useState('')
  const [filter,setFilter] = useState('all')

  useEffect(()=>{
    // small demo: use the global mock
    setVideos(window.__AVIATOR_MOCK__ || generateMockVideos(18))
  },[])

  const filtered = videos.filter(v=>!niche || v.niche.includes(niche)).slice(0,18)

  return (
    <div>
      <h2>Тренды — Trending Reels</h2>
      <div className="panel" style={{marginTop:12}}>
        <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
          <input placeholder="Filter by niche..." value={niche} onChange={e=>setNiche(e.target.value)} style={{padding:8,borderRadius:8,background:'transparent',border:'1px solid rgba(255,255,255,0.04)'}}/>
          <select value={filter} onChange={e=>setFilter(e.target.value)} style={{padding:8,borderRadius:8,background:'transparent',border:'1px solid rgba(255,255,255,0.04)'}}>
            <option value="all">All</option>
            <option value="week">Last week</option>
            <option value="high">High engagement</option>
          </select>
        </div>
        <div className="grid">
          {filtered.map(v=> <VideoCard key={v.id} video={v} />)}
        </div>
      </div>
    </div>
  )
}
