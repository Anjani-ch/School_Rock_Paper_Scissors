// Imports
import * as popup from './popup.js'
import Move from './move.js'
import Game from './game.js'
import Interval from './interval.js'

// DOM Elements
const closePopupBtn = document.querySelector('#close-popup')
const startBtn = document.querySelector('#start-btn')
const choices = document.querySelector('#choices')
const playerHand = document.querySelector('#player-hand')
const computerHand = document.querySelector('#computer-hand')
const countdown = document.querySelector('#countdown')

const runChangeHandsInterval = () => {
    const move = new Move()

    const playerRandomChoice = move.getRandomIndex()
    const computerRandomChoice = move.getRandomIndex()

    // Get Random Temp Move
    tempPlayerMove = allMoves[playerRandomChoice]
    tempComputerMove = allMoves[computerRandomChoice]

    // Update Hands With Temp Moves
    playerHand.className = `${tempPlayerMove} ${tempPlayerMove === scissors ? 'is-scissors' : ''}`
    computerHand.className = tempComputerMove

    if (!countdownInterval) stopChangeHandsInterval()
}

const stopChangeHandsInterval = () => {
    // Reset Temp Moves
    if (playerMove) tempPlayerMove = ''
    if (computerMove) tempComputerMove = ''

    // Update Final Result
    if (!tempPlayerMove) playerHand.className = `${playerMove} ${playerMove === scissors ? 'is-scissors' : ''}`
    if (!tempComputerMove) computerHand.className = computerMove
}

const runCountdownInterval = () => {
    // Add Animations
    playerHand.parentElement.classList.add('animate-hand')
    computerHand.parentElement.classList.add('animate-hand')
    countdown.classList.add('animate-countdown')

    countdown.textContent = countdownCount
    countdownCount--
    countdown.textContent = countdownCount

    if (countdownCount === 0) {
        const move = new Move('computer')

        computerMove = move.get()

        countdown.textContent = 'VIS!'

        // Display Final Result
        playerHand.className = `${playerMove ? playerMove : tempPlayerMove} ${playerMove === scissors || tempPlayerMove === scissors ? 'is-scissors' : ''}`

        computerHand.className = computerMove

        stopCountdownInterval()
        game.checkRoundResult()
    }
}

const stopCountdownInterval = () => {
    // Remove Animations
    playerHand.parentElement.classList.remove('animate-hand')
    computerHand.parentElement.classList.remove('animate-hand')
    countdown.classList.remove('animate-countdown')
}

// Init Game
game = new Game()

// Init Intervals
countdownInterval = new Interval(runCountdownInterval, stopCountdownInterval, 1000)
changeHandsInterval = new Interval(runChangeHandsInterval, stopChangeHandsInterval, 300)

// Event Listeners
// Game Event
choices.addEventListener('click', e => {
    if (e.target.classList.contains('fas')) {
        const move = new Move('player')

        playerMove = move.get(e)
    }
})

restartBtn.addEventListener('click', game.startGame)

// Button Event
startBtn.addEventListener('click', game.show)

// Popup Events
viewRoundsBtn.addEventListener('click', popup.showRoundsPopup)
closePopupBtn.addEventListener('click', popup.closeRoundsPopup)