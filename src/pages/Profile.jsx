import React from 'react'

// Компонент-заглушка для стилизованного элемента/кнопки
const ProfileAction = ({ title, value, icon, onClick }) => (
    <div 
        onClick={onClick}
        className="profile-action" // Можно добавить класс для CSS-стилизации кнопок
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 15px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 10,
            cursor: onClick ? 'pointer' : 'default',
            transition: 'background 0.2s',
            // Стиль при наведении (можно реализовать через CSS-класс profile-action:hover)
            // ':hover': onClick ? { background: 'rgba(255, 255, 255, 0.06)' } : {}
        }}
    >
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
            {icon && <span style={{color: 'var(--accent)'}}>{icon}</span>}
            <span style={{fontWeight: 500}}>{title}</span>
        </div>
        <span style={{color: 'var(--muted)', fontSize: 14}}>{value}</span>
    </div>
);

// Компонент для отображения метрик (мини-дашборда)
const MetricCard = ({ title, value, color, icon }) => (
    <div 
        style={{
            padding: 15,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 80
        }}
    >
        <div style={{color, fontSize: 24}}>{icon}</div>
        <div style={{fontSize: 22, fontWeight: 700, color: 'white'}}>{value}</div>
        <div style={{fontSize: 12, color: 'var(--muted)', marginTop: 4}}>{title}</div>
    </div>
);


export default function Профиль(){
  const AVATAR_URL = 'https://i.pravatar.cc/84?img=15' 
    
    // Моковые данные для профиля
    const mockData = {
        reelsAnalyzed: '240',
        viralIdeasFound: '15',
        scriptsGenerated: '48',
        bestResult: '1.2 млн просмотров',
        currentPlan: 'Pro',
        planEndDate: '2025-12-31',
        contentFormat: 'Образовательный',
    };

  return (
    <div>
      <h2>Профиль</h2>
      
      <div className="panel" style={{marginTop:12,display:'flex',gap:12,alignItems:'center'}}>
        
        {/* Блок аватара */}
        <div 
          style={{
            width:84,
            height:84,
            borderRadius:16,
            backgroundImage: `url(${AVATAR_URL})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            flexShrink: 0 
          }}
        >
        </div>
        
        {/* Информация о пользователе */}
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:18}}>Глеб Шкредов</div>
          <div style={{color:'var(--muted)'}}>parokksetin@gmail.com</div>
        </div>
      </div>

        {/* ========================================================= */}
        {/* ГЛАВНЫЙ КОНТЕЙНЕР ДЛЯ РАЗДЕЛОВ ПРОФИЛЯ */}
        {/* ========================================================= */}
        <div style={{marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>

            {/* КОЛОНКА 1 (ЛЕВАЯ): СТАТИСТИКА, ФОРМАТ И ТАРИФ */}
            <div>
                {/* 1. СТАТИСТИКА ПОЛЬЗОВАТЕЛЯ (МИНИ-ДАШБОРД) */}
                <h3>📊 Ваша активность</h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20}}>
                    <MetricCard title="Проанализировано Reels" value={mockData.reelsAnalyzed} color="#4ade80" icon="📈"/>
                    <MetricCard title="Сгенерировано сценариев" value={mockData.scriptsGenerated} color="#f97316" icon="💡"/>
                    <MetricCard title="Найдено вирусных идей" value={mockData.viralIdeasFound} color="#38bdf8" icon="🔥"/>
                    <MetricCard title="Лучший результат" value={mockData.bestResult} color="#facc15" icon="⭐"/>
                </div>

                {/* 2. ФОРМАТ КОНТЕНТА */}
                <h3>Формат контента</h3>
                <div style={{marginBottom: 20}}>
                    <ProfileAction 
                        title="Основной фокус" 
                        value={mockData.contentFormat}
                        icon="🎯"
                    />
                </div>
                
                {/* 3. ТАРИФ И СТАТУС */}
                <h3>Тариф и статус</h3>
                <ProfileAction 
                    title="Текущий тариф" 
                    value={mockData.currentPlan}
                    icon="💳"
                    onClick={() => alert('Показать сравнение тарифов')}
                />
                <ProfileAction 
                    title="Дата окончания" 
                    value={mockData.planEndDate}
                    icon="⏳"
                />
                <div style={{marginTop: 15}}>
                    <button className="btn" onClick={() => alert('Переход к оплате')}>
                        Обновить тариф
                    </button>
                    <button className="copy" style={{marginLeft: 10}} onClick={() => alert('Показать сравнение Free/Pro')}>
                        Сравнение возможностей
                    </button>
                </div>
                
            </div>


            {/* КОЛОНКА 2 (ПРАВАЯ): АККАУНТЫ, ИЗБРАННОЕ И ВЫХОД */}
            <div>
                {/* 1. ПОДКЛЮЧЕННЫЕ АККАУНТЫ */}
                <h3>🔗 Подключённые аккаунты</h3>
                <ProfileAction 
                    title="Instagram" 
                    value="Подключен" 
                    icon="📸"
                    onClick={() => alert('Настройки Instagram')}
                />
                <ProfileAction 
                    title="TikTok" 
                    value="Подключить" 
                    icon="🎶"
                    onClick={() => alert('Подключение TikTok')}
                />
                <ProfileAction 
                    title="YouTube Shorts" 
                    value="Подключен" 
                    icon="▶️"
                    onClick={() => alert('Настройки YouTube')}
                />

                {/* 2. ИСТОРИЯ И ИЗБРАННОЕ */}
                <h3 style={{marginTop: 20}}>История и избранное</h3>
                <ProfileAction 
                    title="Сохраненные идеи" 
                    value="3" 
                    icon="⭐️"
                    onClick={() => alert('Переход к сохраненным идеям')}
                />
                <ProfileAction 
                    title="Избранные ниши" 
                    value="Фитнес, Рецепты" 
                    icon="📁"
                    onClick={() => alert('Переход к избранным нишам')}
                />
                <ProfileAction 
                    title="История анализов" 
                    value="Перейти" 
                    icon="🕒"
                    onClick={() => alert('Переход к истории анализов')}
                />
                
                {/* Кнопка "Выйти" */}
                <div style={{marginTop: 30}}>
                    <button className="btn" style={{background: '#ef4444'}} onClick={() => alert('Выход из аккаунта')}>
                        Выйти
                    </button>
                </div>
            </div>

        </div>

    </div>
  )
}