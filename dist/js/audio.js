const playAudio = isWin => {
    const audio = new Audio(`audio/${isWin ? 'win' : 'defeat'}.mp3`)

    audio.play()
}

export default playAudio