import * as popup from './popup.js'
import * as game from './game.js'
import * as moves from './moves.js'
import * as score from './score.js'

const closePopupBtn = document.querySelector('#close-popup')
const startBtn = document.querySelector('#start-btn')
const playerScore = document.querySelector('#player-score')
const computerScore = document.querySelector('#computer-score')
const viewRoundsBtn = document.querySelector('#view-rounds')
const choices = document.querySelector('#choices')
const playerHand = document.querySelector('#player-hand')
const countdown = document.querySelector('#countdown')
const computerHand = document.querySelector('#computer-hand')
const feedback = document.querySelector('#feedback')
const restartBtn = document.querySelector('#restart-btn')

const playerRoundWinText = 'Du Vant!'
const computerRoundWinText = 'Du Tapte!'
const drawMatchText = 'Det ble uavgjort'

const rock = 'fas fa-hand-rock'
const paper = 'fas fa-hand-paper'
const scissors = 'fas fa-hand-scissors'

const allMoves = [rock, paper, scissors]

let movesMade = []

let currentGame = 0

let roundsPlayed = 0
let playerRoundsWon = 0
let computerRoundsWon = 0

let countdownCount = 3

let tempPlayerMove = ''
let tempComputerMove = ''

let playerMove = ''
let computerMove = null

let countdownInterval = null
let changeHandsInterval = null

const runChangeHandsInterval = () => {
    changeHandsInterval = setInterval(() => {
        const playerRandomChoice = moves.getRandomMoveIndex(allMoves)
        const computerRandomChoice = moves.getRandomMoveIndex(allMoves)

        tempPlayerMove = allMoves[playerRandomChoice]
        tempComputerMove = allMoves[computerRandomChoice]

        playerHand.className = `${tempPlayerMove} ${tempPlayerMove === scissors ? 'is-scissors' : ''}`
        computerHand.className = allMoves[computerRandomChoice]

        if (!countdownInterval) stopChangeHandsInterval()
    }, 300)
}

const stopChangeHandsInterval = () => {
    clearInterval(changeHandsInterval)
    changeHandsInterval = null
    playerHand.className = playerMove ? playerMove : tempPlayerMove
    computerHand.className = computerMove ? computerMove : tempComputerMove
}

const runCountdownInterval = () => {
    countdown.textContent = countdownCount

    countdownInterval = setInterval(() => {
        countdownCount--
        countdown.textContent = countdownCount

        if (countdownCount === 0) {
            computerMove = moves.getComputerMove(allMoves)

            countdown.textContent = 'VIS!'

            playerHand.className = `${playerMove ? playerMove : tempPlayerMove} ${playerMove === scissors || tempPlayerMove === scissors ? 'is-scissors' : ''}`

            computerHand.className = computerMove

            stopCountdownInterval()
            checkRoundResult()
        }
    }, 1000);
}

const stopCountdownInterval = () => {
    clearInterval(countdownInterval)
    countdownInterval = null
}

const stopGameRound = () => {
    stopCountdownInterval()
    stopChangeHandsInterval()
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

    runCountdownInterval()
    runChangeHandsInterval()
}

const checkRoundResult = () => {
    const isGameOver = roundsPlayed === 2 || playerRoundsWon === 2 && computerRoundsWon === 0 || computerRoundsWon === 2 && playerRoundsWon === 0

    const hasPlayerWon = playerMove === paper && computerMove === rock || playerMove === scissors && computerMove === paper || playerMove === rock && computerMove === scissors

    const hasComputerWon = computerMove === paper && playerMove === rock || computerMove === scissors && playerMove === paper || computerMove === rock && playerMove === scissors

    const isDraw = playerMove === computerMove

    const isInvalidChoice = countdownCount > 1 || !playerMove

    if (isInvalidChoice) {
        feedback.textContent = computerRoundWinText
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

    roundsPlayed++

    stopGameRound()

    if (!isGameOver) {
        movesMade.push({
            player: playerMove ? playerMove : tempPlayerMove,
            computer: computerMove ? computerMove : tempPlayerMove
        })
    }

    if (isGameOver) {
        viewRoundsBtn.style.display = 'inline-block'
        restartBtn.style.display = 'inline-block'

        game.checkGameResult(feedback, playerRoundsWon, computerRoundsWon)
        popup.update(currentGame, movesMade, scissors)
    } else {
        setTimeout(startGameRound, 1000)
    }
}

restartBtn.addEventListener('click', startNewGame)
viewRoundsBtn.addEventListener('click', popup.show)
closePopupBtn.addEventListener('click', popup.close)
startBtn.addEventListener('click', () => game.show(startNewGame))
choices.addEventListener('click', e => e.target.classList.contains('fas') ? playerMove = moves.getPlayerMove(e, countdownInterval, countdownCount, checkRoundResult) : '')