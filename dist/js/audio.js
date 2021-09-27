const playAudio = isPlayerWin => {
    const audio = new Audio(`../audio/${isPlayerWin ? 'win' : 'defeat'}.mp3`)

    audio.play()
}

export default playAudio