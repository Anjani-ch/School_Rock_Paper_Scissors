import * as interval from './interval.js'
import * as popup from './popup.js'
import * as score from './score.js'
import playAudio from './audio.js'

const startView = document.querySelector('#start-view')
const gameView = document.querySelector('#game-view')
const playerScore = document.querySelector('#player-score')
const computerScore = document.querySelector('#computer-score')
const feedback = document.querySelector('#feedback')

const playerRoundWinText = 'Du Vant!'
const computerRoundWinText = 'Du Tapte!'
const drawMatchText = 'Det ble uavgjort'

const playerGameWinText = 'Du vant runden!'
const computerGameWinText = 'Du tapte runden!'
const drawGameText = 'Runden ble uavgjort!'

let roundsPlayed = 0
let playerRoundsWon = 0
let computerRoundsWon = 0

const show = () => {
    startView.style.display = 'none'
    gameView.style.display = 'block'

    startNewGame()
}

const stopGameRound = () => {
    interval.stopCountdownInterval()
    interval.stopChangeHandsInterval()
}

const startNewGame = () => {
    movesMade = []

    currentGame++

    roundsPlayed = 0
    playerRoundsWon = score.update(playerRoundsWon, true)
    computerRoundsWon = score.update(computerRoundsWon, true)

    playerScore.textContent = playerRoundsWon
    computerScore.textContent = computerRoundsWon

    startGameRound()
}

const startGameRound = () => {
    viewRoundsBtn.style.display = 'none'
    restartBtn.style.display = 'none'

    feedback.textContent = ''

    playerMove = ''
    countdownCount = 3

    interval.runCountdownInterval()
    interval.runChangeHandsInterval()
}

const checkGameResult = () => {
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

const checkRoundResult = () => {
    let isGameOver = null

    const hasPlayerWon = playerMove === paper && computerMove === rock || playerMove === scissors && computerMove === paper || playerMove === rock && computerMove === scissors

    const hasComputerWon = computerMove === paper && playerMove === rock || computerMove === scissors && playerMove === paper || computerMove === rock && playerMove === scissors

    const isDraw = playerMove === computerMove

    const isInvalidChoice = countdownCount > 1 || !playerMove

    if (isInvalidChoice) {
        feedback.textContent = computerRoundWinText

        computerRoundsWon = score.update(computerRoundsWon)
        score.updateEl(computerScore, computerRoundsWon)
    } else if (hasPlayerWon) {
        feedback.textContent = playerRoundWinText

        playerRoundsWon = score.update(playerRoundsWon)
        score.updateEl(playerScore, playerRoundsWon)
    } else if (hasComputerWon) {
        feedback.textContent = computerRoundWinText

        computerRoundsWon = score.update(computerRoundsWon)
        score.updateEl(computerScore, computerRoundsWon)
    } else if (isDraw) {
        feedback.textContent = drawMatchText
    }

    isGameOver = roundsPlayed === 2 || playerRoundsWon === 2 && computerRoundsWon === 0 || computerRoundsWon === 2 && playerRoundsWon === 0

    roundsPlayed++

    stopGameRound()

    movesMade.push({
        player: playerMove ? playerMove : tempPlayerMove,
        computer: computerMove ? computerMove : tempPlayerMove
    })

    if (isGameOver) {
        viewRoundsBtn.style.display = 'inline-block'
        restartBtn.style.display = 'inline-block'

        checkGameResult()
        popup.update()
    } else {
        setTimeout(startGameRound, 1000)
    }
}

export { show, checkGameResult, startNewGame, checkRoundResult }