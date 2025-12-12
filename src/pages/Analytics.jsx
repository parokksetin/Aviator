import React, {useEffect, useState} from 'react'
import { fetchVideosByNiche } from '../services/api/mockApi'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Аналитика(){
  const [videos,setVideos] = useState([])
  useEffect(()=>{ fetchVideosByNiche('', 20).then(setVideos) },[])

  const labels = videos.slice(0,8).map(v=>v.title)
 const data = {
  labels,
  datasets: [{
    label: 'Просмотры',
    data: videos.slice(0,8).map(v => v.views),
    tension: 0.3,
    borderWidth: 2,
    borderColor: 'rgba(255, 140, 0, 1)',        // мягкий оранжевый акцент
    backgroundColor: 'rgba(255, 140, 0, 0.3)',
  }]
}



  return (
    <div>
      <h2>Аналитика</h2>
      <div className="panel" style={{marginTop:12}}>
        <div style={{display:'flex',gap:12}}>
          <div style={{flex:1}}>
            <h4>Таблица роликов</h4>
            <div style={{overflow:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead style={{color:'var(--muted)'}}><tr><th>Title</th><th>Views</th><th>Likes</th></tr></thead>
                <tbody>
                  {videos.map(v=> <tr key={v.id}><td style={{padding:8}}>{v.title}</td><td style={{padding:8}}>{v.views.toLocaleString()}</td><td style={{padding:8}}>{v.likes.toLocaleString()}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{width:480}}>
            <h4>Trend — просмотры</h4>
            <div className="panel" style={{padding:12}}>
              <Line data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
