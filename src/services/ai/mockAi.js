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
