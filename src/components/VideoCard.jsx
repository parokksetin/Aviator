import React from 'react'
import { Link } from 'react-router-dom'

export default function VideoCard({video}){
  return (
    <Link to={'/video/' + video.id} style={{textDecoration:'none'}}>
      <div className="card">
        <div className="thumb" style={{backgroundImage:`url(${video.thumbnail})`, backgroundSize:'cover', backgroundPosition:'center'}}>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div style={{background:'rgba(0,0,0,0.5)',padding:'6px 8px',borderRadius:8,fontSize:12}}>{video.niche}</div>
          </div>
        </div>
        <div style={{fontWeight:700,fontSize:14}}>{video.title}</div>
        <div className="meta">
          <div>{(video.views/1000).toFixed(1)}k views</div>
          <div style={{color:'var(--muted)'}}>❤ {Math.round(video.likes/1000)}k</div>
        </div>
      </div>
    </Link>
  )
}
