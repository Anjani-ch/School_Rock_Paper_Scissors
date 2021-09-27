// Imports
import * as popup from './popup.js'
import Score from './score.js'
import playAudio from './audio.js'

// DOM Elements
const startView = document.querySelector('#start-view')
const gameView = document.querySelector('#game-view')
const playerScore = document.querySelector('#player-score')
const computerScore = document.querySelector('#computer-score')
const feedback = document.querySelector('#feedback')

// Game Class
export default class Game {
    constructor() {
        // Round Counts
        this.roundsPlayed = 0
        this.playerRoundsWon = new Score()
        this.computerRoundsWon = new Score()

        // Round End Texts
        this.playerGameWinText = 'Du vant runden!'
        this.computerGameWinText = 'Du tapte runden!'
        this.drawGameText = 'Runden ble uavgjort!'

        // Game End Texts
        this.playerRoundWinText = 'Du Vant!'
        this.computerRoundWinText = 'Du Tapte!'
        this.drawMatchText = 'Det ble uavgjort'
    }

    // Show Game View
    show = () => {
        startView.classList.remove('show')
        gameView.classList.add('show')

        this.startGame()
    }

    stopRound = () => {
        countdownInterval.stop()
        changeHandsInterval.stop()
    }

    startGame = () => {
        // Reset Moves
        movesMade = []

        // Update Current Game Count
        currentGame++

        // Reset
        this.roundsPlayed = 0
        this.playerRoundsWon.reset(playerScore)
        this.computerRoundsWon.reset(computerScore)

        // Display Score
        this.playerRoundsWon.updateElement(playerScore)
        this.computerRoundsWon.updateElement(computerScore)

        this.startRound()
    }

    startRound = () => {
        viewRoundsBtn.classList.remove('show-btn')

        feedback.textContent = ''

        playerMove = ''
        countdownCount = 3

        // Start Intervals
        countdownInterval.run()
        changeHandsInterval.run()

        popup.closeFeedbackPopup()
    }

    win = () => {
        feedback.textContent = this.playerRoundWinText

        this.playerRoundsWon.update()
        this.playerRoundsWon.updateElement(playerScore)
        popup.showFeedbackPopup('round')
    }

    lose = () => {
        feedback.textContent = this.computerRoundWinText

        this.computerRoundsWon.update()
        this.computerRoundsWon.updateElement(computerScore)
        popup.showFeedbackPopup('round')
    }

    draw = () => {
        feedback.textContent = this.drawMatchText
        popup.showFeedbackPopup('round')
    }

    checkGameResult = () => {
        // True Is Player Win Audio, False Is Player Defeat Audio
        if (this.playerRoundsWon.get() > this.computerRoundsWon.get()) {
            feedback.textContent = this.playerGameWinText
            playAudio(true)
        } else if (this.playerRoundsWon.get() < this.computerRoundsWon.get()) {
            feedback.textContent = this.computerGameWinText
            playAudio(false)
        } else {
            feedback.textContent = this.drawGameText
            playAudio(false)
        }
    }

    checkRoundResult = () => {
        let isGameOver

        const hasPlayerWon = playerMove === paper && computerMove === rock || playerMove === scissors && computerMove === paper || playerMove === rock && computerMove === scissors

        const hasComputerWon = computerMove === paper && playerMove === rock || computerMove === scissors && playerMove === paper || computerMove === rock && playerMove === scissors

        const isDraw = playerMove === computerMove

        const isInvalidChoice = countdownCount > 1 || !playerMove

        if (isInvalidChoice) {
            if (countdownCount > 1) {
                // Give Computer Automatic Win
                switch (playerMove) {
                    case rock:
                        computerMove = paper
                        break
                    case paper:
                        computerMove = scissors
                        break
                    case scissors:
                        computerMove = rock
                        break
                }
            }

            this.lose()
        } else if (hasPlayerWon) {
            this.win()
        } else if (hasComputerWon) {
            this.lose()
        } else if (isDraw) {
            this.draw()
        }

        isGameOver = this.roundsPlayed === 2 || this.playerRoundsWon.get() === 2 && this.computerRoundsWon.get() === 0 || this.computerRoundsWon.get() === 2 && this.playerRoundsWon.get() === 0

        this.roundsPlayed++

        this.stopRound()

        // Push Result To Moves For Rounds Popup
        movesMade.push({
            player: playerMove ? playerMove : tempPlayerMove,
            computer: computerMove ? computerMove : tempPlayerMove
        })

        if (isGameOver) {
            viewRoundsBtn.classList.add('show-btn')

            this.checkGameResult()
            popup.updateRoundsPopup()
            popup.showFeedbackPopup('game')
        } else {
            setTimeout(this.startRound, 1000)
        }
    }
}