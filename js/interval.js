import * as moves from './moves.js'
import * as game from './game.js'

const playerHand = document.querySelector('#player-hand')
const computerHand = document.querySelector('#computer-hand')
const countdown = document.querySelector('#countdown')

const runChangeHandsInterval = () => {
    changeHandsInterval = setInterval(() => {
        const playerRandomChoice = moves.getRandomMoveIndex()
        const computerRandomChoice = moves.getRandomMoveIndex()

        tempPlayerMove = allMoves[playerRandomChoice]
        tempComputerMove = allMoves[computerRandomChoice]

        playerHand.className = `${tempPlayerMove} ${tempPlayerMove === scissors ? 'is-scissors' : ''}`
        computerHand.className = tempComputerMove

        if (!countdownInterval) stopChangeHandsInterval()
    }, 300)
}

const stopChangeHandsInterval = () => {
    clearInterval(changeHandsInterval)
    changeHandsInterval = null

    if (!tempPlayerMove) playerHand.className = `${playerMove} ${playerMove === scissors ? 'is-scissors' : ''}`
    if (!tempComputerMove) computerHand.className = computerMove
}

const runCountdownInterval = () => {
    countdown.textContent = countdownCount

    countdownInterval = setInterval(() => {
        countdownCount--
        countdown.textContent = countdownCount

        if (countdownCount === 0) {
            computerMove = moves.getComputerMove()

            countdown.textContent = 'VIS!'

            playerHand.className = `${playerMove ? playerMove : tempPlayerMove} ${playerMove === scissors || tempPlayerMove === scissors ? 'is-scissors' : ''}`

            computerHand.className = computerMove

            stopCountdownInterval()
            game.checkRoundResult()
        }
    }, 1000)
}

const stopCountdownInterval = () => {
    clearInterval(countdownInterval)
    countdownInterval = null
}

export { runChangeHandsInterval, stopChangeHandsInterval, runCountdownInterval, stopCountdownInterval }