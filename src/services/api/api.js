// 1. Функция сортировки и подсчета ER
const processAndSortReels = (edges) => {
  const now = Math.floor(Date.now() / 1000);

  return edges
    .filter(edge => edge.node.is_video === true)
    .map(edge => {
      const node = edge.node;
      const views = node.video_view_count || 0;
      const likes = node.edge_liked_by?.count || 0;
      const comments = node.edge_media_to_comment?.count || 0;
      const timestamp = node.taken_at_timestamp;
      
      const engagement = views > 0 ? ((likes + comments) / views) * 100 : 0;
      const hoursAgo = (now - timestamp) / 3600;
      
      const viralScore = (views * 0.1) + (engagement * 1000) - (hoursAgo * 5);

      return {
        id: node.id,
        thumbnail: node.display_url,
        url: `https://www.instagram.com/reels/${node.shortcode}/`,
        views: views,
        likes: likes,
        comments: comments,
        engagement: parseFloat(engagement.toFixed(2)),
        viralScore: viralScore,
        timestamp: timestamp,
        shortCaption: (node.edge_media_to_caption?.edges[0]?.node.text || "Описание отсутствует").substring(0, 60) + "..."
      };
    });
};

// 2. Главная функция поиска по нишам
export const fetchNicheVideos = async (hashtag) => {
  const cleanHashtag = hashtag.replace('#', '').trim();
  const url = `https://instagram-looter2.p.rapidapi.com/tag-feeds?query=${cleanHashtag}`;
  
  // ВСТАВЬ СВОЙ КЛЮЧ СЮДА (в кавычках)
  const API_KEY = "d4218605b3msh4853a44aa89c6eap1c89f7jsnf73ca4d3d9ce"; 

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY, // Используем переменную напрямую
      'x-rapidapi-host': 'instagram-looter2.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    
    // Добавим лог самого ответа, чтобы видеть, что пришло
    console.log("Ответ сервера:", response.status); 

    if (!response.ok) throw new Error(`Ошибка API: ${response.status}`);
    
    const result = await response.json();
    console.log("СТРУКТУРА ДАННЫХ:", result);
    
    if (!result.data?.hashtag?.edge_hashtag_to_media) {
      console.warn("Данные не найдены");
      return null;
    }

    const allMedia = result.data.hashtag.edge_hashtag_to_media.edges;
    const processedVideos = processAndSortReels(allMedia);

    return {
      topPopular: [...processedVideos].sort((a, b) => b.views - a.views),
      latest: [...processedVideos].sort((a, b) => b.timestamp - a.timestamp),
      fastGrowing: [...processedVideos].sort((a, b) => b.viralScore - a.viralScore)
    };
  } catch (error) {
    console.error("Ошибка при загрузке:", error);
    return null;
  }
};

// 3. ФУНКЦИЯ ДЛЯ СТРАНИЦЫ ОДНОГО ВИДЕО (которую мы забыли)
export const fetchVideoById = async (id) => {
  // Пока что это заглушка, чтобы страница Video.jsx не выдавала ошибку белого экрана
  return {
    id: id,
    shortcode: id,
    views: 125000,
    likes: 8500,
    comments: 320,
    engagement: 7.05,
    caption: "Пример текста для генерации ИИ-сценария. Скоро мы подключим сюда реальный текст ролика.",
    thumbnail: "https://via.placeholder.com/400x600?text=Video+Preview",
    url: `https://www.instagram.com/reels/${id}/`
  };
};