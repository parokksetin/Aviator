import React from 'react'

export default function Профиль(){
  return (
    <div>
      <h2>Профиль</h2>
      <div className="panel" style={{marginTop:12,display:'flex',gap:12,alignItems:'center'}}>
        <div style={{width:84,height:84,borderRadius:16,background:'linear-gradient(135deg,var(--accent), #ff964b)'}}></div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:18}}>Иван Иванов</div>
          <div style={{color:'var(--muted)'}}>ivan@example.com</div>
          <div style={{marginTop:10}}>
            <div style={{display:'flex',gap:8}}>
              <input placeholder="API Key" style={{flex:1,padding:8,borderRadius:8,background:'transparent',border:'1px solid rgba(255,255,255,0.04)'}} value="sk_live_mock_123456" readOnly/>
              <button className="copy" onClick={()=>navigator.clipboard.writeText('sk_live_mock_123456')}>Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
