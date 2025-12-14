/**
 * Simple mock data generator for videos
 */
export function randomInt(min, max){ return Math.floor(Math.random()*(max-min+1))+min }

const sampleTitles = [
  '5-минут тренировки и жир пропадёт',
  'Как приготовить идеальный смузи',
  'Top 10 travel hacks you need',
  'Cute cat does a funny trick',
  'Quick recipe: 3-ingredient dessert',
  'Viral dance challenge explained'
]

const videoUrls = [
  '/assets/video/video-1.mp4',
  '/assets/video/video-2.mp4',
  '/assets/video/video-3.mp4',
  '/assets/video/video-4.mp4',
  '/assets/video/video-5.mp4',
  '/assets/video/video-6.mp4',
]

const coverImages = [
  '/assets/cover/cover-1.jpg',
  '/assets/cover/cover-2.jpg',
  '/assets/cover/cover-3.jpg',
  '/assets/cover/cover-4.jpg',
  '/assets/cover/cover-5.jpg',
  '/assets/cover/cover-6.jpg',
]


export function generateMockVideos(count=12){
  const arr = []
  for(let i=0;i<count;i++){
    const id = 'vid_' + (i+1)
    const title = sampleTitles[i % sampleTitles.length] + ' #' + (i+1)
    const views = randomInt(5_000, 900_000)
    const likes = Math.floor(views * (0.03 + Math.random()*0.12))
    const comments = Math.floor(likes * (0.05+Math.random()*0.4))
    const saves = Math.floor(likes * (0.02+Math.random()*0.2))
    const created = Date.now() - randomInt(1,40)*24*3600*1000
    
    // Индекс для циклирования через моковые медиа-файлы
    const mediaIndex = i % videoUrls.length 
    
    arr.push({
      id, title, views, likes, comments, saves, created,
      
      // Использование нового поля coverImage вместо thumbnail,
      // или просто добавление новых полей.
      thumbnail: `/src/assets/thumb-${(i%6)+1}.jpg`, // Оставлено старое поле
      coverImage: coverImages[mediaIndex],            // НОВОЕ ПОЛЕ: Обложка
      videoUrl: videoUrls[mediaIndex],                // НОВОЕ ПОЛЕ: Ссылка на видео
      
      niche: ['fitness','recipes','travel','pets','food','dance'][i%6]
    })
  }
  return arr
}

// Оставшиеся функции без изменений, так как они используют generateMockVideos
export function fetchVideosByNiche(niche, limit=12){
  const all = window.__AVIATOR_MOCK__ || generateMockVideos(20)
  return new Promise((res)=>{
    setTimeout(()=>{
      const filtered = niche ? all.filter(v=>v.niche.includes(niche.toLowerCase())) : all
      res(filtered.slice(0,limit))
    }, 400 + Math.random()*300)
  })
}

export function fetchVideoById(id){
  const all = window.__AVIATOR_MOCK__ || generateMockVideos(20)
  const v = all.find(x=>x.id===id)
  return new Promise((res)=> setTimeout(()=>res(v),200))
}