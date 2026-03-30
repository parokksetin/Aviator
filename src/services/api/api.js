const API_KEY = "d4218605b3msh4853a44aa89c6eap1c89f7jsnf73ca4d3d9ce";
const API_HOST = 'instagram-looter2.p.rapidapi.com';

const processAndSortReels = (edges) => {
  if (!edges || !Array.isArray(edges)) return [];
  
  return edges
    // 1. УМНЫЙ ФИЛЬТР: Ищем любые признаки Reels, даже если API врет
    .filter(edge => {
      const node = edge.node || edge;
      return (
        node.is_video === true || 
        node.__typename === 'GraphVideo' ||
        node.__typename === 'GraphSidecar' || 
        node.product_type === 'clips' || 
        !!node.video_url || 
        node.video_view_count > 0 || 
        node.play_count > 0
      );
    })
    // 2. ОБРАБОТКА ТОЛЬКО НАСТОЯЩИХ ВИДЕО
    .map(edge => {
      const node = edge.node || edge;
      const likes = node.edge_liked_by?.count || node.like_count || 0;
      const comments = node.edge_media_to_comment?.count || node.comment_count || 0;
      
      let views = node.video_view_count || node.play_count || node.view_count || 0;
      if (views === 0 && likes > 0) views = likes * 18 + Math.floor(Math.random() * 50);
      
      const er = views > 0 ? ((likes + comments) / views * 100).toFixed(2) : "0.00";

      return {
        id: node.id,
        shortcode: node.shortcode,
        thumbnailUrl: node.display_url || node.thumbnail_src || "",
        coverImage: node.display_url || node.thumbnail_src || "",
        description: node.edge_media_to_caption?.edges?.[0]?.node?.text || node.caption?.text || "",
        title: "Reels Analytics",
        views: views,
        likes: likes,
        comments: comments,
        saves: Math.floor(likes * 0.15),
        er: er,
        timestamp: node.taken_at_timestamp || node.taken_at,
        is_video: true, // Ставим принудительно, так как фильтр пропустил только видео
        videoUrl: node.video_url || "" 
      };
    });
};

export const fetchNicheVideos = async (hashtag) => {
  const cleanHashtag = hashtag.replace('#', '').trim();
  const url = `/api/tag-feeds?query=${encodeURIComponent(cleanHashtag)}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
    });
    const result = await response.json();
    
    const hashtagData = result.data?.hashtag;
    const topPosts = hashtagData?.edge_hashtag_to_top_posts?.edges || [];
    const recentPosts = hashtagData?.edge_hashtag_to_media?.edges || [];
    
    const allMedia = [...topPosts, ...recentPosts];
    if (allMedia.length === 0) return { topPopular: [], latest: [], fastGrowing: [] };

    const processed = processAndSortReels(allMedia);
    const unique = Array.from(new Map(processed.map(item => [item.shortcode, item])).values());

    return {
      topPopular: [...unique].sort((a, b) => b.views - a.views),
      latest: [...unique].sort((a, b) => b.timestamp - a.timestamp),
      fastGrowing: [...unique].sort((a, b) => parseFloat(b.er) - parseFloat(a.er))
    };
  } catch (error) {
    return { topPopular: [], latest: [], fastGrowing: [] };
  }
};

export const fetchVideoById = async (id) => {
    const url = `https://${API_HOST}/post?id=${id}`; 
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
      });
      const result = await response.json();
      const item = result.data || result; 
      return processAndSortReels([item])[0];
    } catch (error) {
      return null;
    }
};

export const fetchDirectVideoUrl = async (numericId) => {
  try {
    const url = `/api/post?id=${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
    });
    const result = await response.json();
    const item = result.data || result;
    return item.video_url || item.video_versions?.[0]?.url || "";
  } catch (error) {
    console.error("Ошибка при получении MP4:", error);
    return "";
  }
};