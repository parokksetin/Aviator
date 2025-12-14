import React from 'react'

const tools = [
  {id:'ai-script', title:'AI Script Generator', desc:'Generate viral scripts from transcription'},
  {id:'ai-analyze', title:'', desc:'Analyze a video and extract insights'},
  {id:'hashtag', title:'Hashtag Finder', desc:'Suggest hashtags for your niche'},
  {id:'planner', title:'Content Planner', desc:'Plan a week of content'}
]

export default function Инструменты(){
  return (
    <div>
      <h2>Инструменты</h2>
      <div className="panel" style={{marginTop:12}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
          {tools.map(t=> (
            <div className="card" key={t.id}>
              <div style={{fontWeight:700}}>{t.title}</div>
              <div style={{color:'var(--muted)'}}>{t.desc}</div>
              <div style={{marginTop:'auto',display:'flex',justifyContent:'flex-end'}}>
                <button className="btn" onClick={()=>alert(t.title + ' — mock action')}>Открыть</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
