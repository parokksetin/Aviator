import React, {useEffect, useState} from 'react'
import VideoCard from '../components/VideoCard'
import { fetchVideosByNiche } from '../services/api/mockApi'
import { useLocation } from 'react-router-dom'

function useQuery(){ return new URLSearchParams(useLocation().search) }

export default function Главная(){
  const [videos,setVideos] = useState([])
  const [loading,setLoading] = useState(false)
  const q = useQuery().get('q') || ''
  const [niche,setNiche] = useState(q)

  useEffect(()=>{
    setLoading(true)
    fetchVideosByNiche(niche, 16).then(v=>{ setVideos(v); setLoading(false) })
  },[niche])

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Главная</h2>
        
      </div>

      <div className="panel" style={{marginTop:12}}>
        <h3 style={{marginTop:0}}>Популярные ролики</h3>
        {loading ? <div style={{padding:20}}>Загрузка...</div> : <div className="grid">
          {videos.map(v => <VideoCard key={v.id} video={v} />)}
        </div>}
      </div>
    </div>
  )
}
