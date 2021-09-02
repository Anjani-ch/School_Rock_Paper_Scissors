import playAudio from './audio.js'

const startView = document.querySelector('#start-view')
const gameView = document.querySelector('#game-view')

const playerGameWinText = 'Du vant runden!'
const computerGameWinText = 'Du tapte runden!'
const drawGameText = 'Runden ble uavgjort!'

const show = callback => {
    startView.style.display = 'none'
    gameView.style.display = 'block'

    callback()
}

const checkGameResult = (feedback, playerRoundsWon, computerRoundsWon) => {
    if (playerRoundsWon > computerRoundsWon) {
        feedback.textContent = playerGameWinText
        playAudio(true)
    } else if (playerRoundsWon < computerRoundsWon) {
        feedback.textContent = computerGameWinText
        playAudio(false)
    } else {
        feedback.textContent = drawGameText
        playAudio(false)
    }
}

export { show, checkGameResult }