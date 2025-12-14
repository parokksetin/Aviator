export function transcribeVideo(videoId){
  // fake transcription based on id
  return new Promise(res=>{
    setTimeout(()=>{
      res({transcription: 'This is a mock transcription for video '+videoId+'. It summarizes the speech in the reel and highlights key moments.'})
    }, 600 + Math.random()*400)
  })
}

export function generateScript(transcription){
  return new Promise(res=>{
    setTimeout(()=>{
      res({script: `Here is a short viral-style script based on the video transcription:\n\n${transcription.slice(0,120)}...\n\n1) Hook (0-3s): Start with surprising statement\n2) Main (4-25s): Show the technique or reveal\n3) CTA (26-30s): Ask viewers to like & save.`})
    }, 700 + Math.random()*400)
  })
}

export function generateScriptByNiche(niche){
  return new Promise(res=>{
    setTimeout(()=>{
      // Генерируем моковый сценарий, используя переданную нишу
      res({script: `## 🚀 Сценарий Reels по НИШЕ (Мок)

**Ниша:** ${niche}
**Цель:** Виральность

**0:00 - 0:03 (Крючок):** Появляется текст "Три вещи, которые вы не знали о ${niche}". Резкий звук, быстрое движение.

**0:03 - 0:10 (Пункт 1 и 2):** Демонстрация первого и второго "секрета" в ускоренном режиме.

**0:10 - 0:20 (Пункт 3 - Решение):** Медленный, драматичный зум на экран, где показан лучший совет по ${niche}.
* Текст на экране: "Самое важное: ZZZZ!"

**0:20 - 0:25 (Призыв к действию):** Завершение с просьбой о сохранении.
* Голос за кадром:* "Подпишись на меня для ежедневных советов по ${niche}."

(Сгенерировано заглушкой на основе ниши: ${niche})`})
    }, 700 + Math.random()*400)
  })
}
