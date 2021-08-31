const playAudio = isPlayerWin => {
    const audio = new Audio(`../audio/${isPlayerWin ? 'win.mp3' : 'defeat.mp3'}`)

    audio.play()
}

export default playAudio