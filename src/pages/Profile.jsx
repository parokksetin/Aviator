import React from 'react'

export default function Профиль(){
  // URL для визуального отображения (любая заглушка из интернета)
  const AVATAR_URL = 'https://i.pravatar.cc/84?img=15' 

  return (
    <div>
      <h2>Профиль</h2>
      <div className="panel" style={{marginTop:12,display:'flex',gap:12,alignItems:'center'}}>
        
        {/* Блок аватара с использованием готовой картинки */}
        <div 
          style={{
            width:84,
            height:84,
            borderRadius:16,
            // Замена градиента на фоновое изображение с помощью URL
            backgroundImage: `url(${AVATAR_URL})`,
            backgroundSize: 'cover', // Чтобы изображение заполнило весь блок
            backgroundPosition: 'center', // Центрирование изображения
            flexShrink: 0 // Чтобы аватар не сжимался
          }}
        >
        </div>
        
        {/* Информация о пользователе */}
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:18}}>Глеб Шкредов</div>
          <div style={{color:'var(--muted)'}}>parokksetin@gmail.com</div>
          <div style={{marginTop:10}}>
            <div style={{display:'flex',gap:8}}>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}