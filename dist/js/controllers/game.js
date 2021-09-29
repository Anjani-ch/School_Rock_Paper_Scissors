// Imports
import playAudio from '../audio.js'

// Game Controller
export default class Game {
    // Game Count
    #currentGame = 0

    // Round Counts
    #roundsPlayed = 0

    // Moves Made During game
    #movesMade = []

    // Game End Texts
    #PLAYER_GAME_WIN_TEXT = 'Du vant runden!'
    #COMPUTER_GAME_WIN_TEXT = 'Du tapte runden!'
    #DRAW_GAME_TEXT = 'Runden ble uavgjort!'

    // Rounds End Texts
    #PLAYER_ROUND_WIN_TEXT = 'Du Vant!'
    #COMPUTER_ROUND = 'Du Tapte!'
    #DRAW_ROUND_TEXT = 'Det ble uavgjort'

    constructor(rounds, player1, player2, countdown, view, move, countdownInterval, changeHandsInterval) {
        this.rounds = rounds
        this.roundsToWin = Math.floor(rounds / 2 + 1)
        this.player1 = player1
        this.player2 = player2
        this.countdown = countdown
        this.view = view
        this.move = move
        this.countdownInterval = countdownInterval
        this.changeHandsInterval = changeHandsInterval
    }

    /**
     * @private
     */
    #startRound = () => {
        this.view.hideViewRoundsBtn()

        this.player1.resetMove()
        this.player2.resetMove()

        this.player1.resetTempMove()
        this.player2.resetTempMove()

        this.countdown.reset()

        // Start Intervals
        this.countdownInterval.run()
        this.changeHandsInterval.run()

        this.view.updateFeedbackMsg('')
        this.view.closeFeedbackPopup()
    }

    /**
     * @private
     */
    #stopRound = () => {
        this.countdownInterval.stop()
        this.changeHandsInterval.stop()
    }

    /**
     * @public
     */
    startGame = () => {
        // Reset Moves
        this.#movesMade = []

        // Update Current Game Count
        this.#currentGame++

        // Reset
        this.player1.resetScore()
        this.player2.resetScore()

        this.view.updateScore('player', this.player1.getScore())
        this.view.updateScore('computer', this.player2.getScore())

        this.#roundsPlayed = 0
        this.#startRound()
    }

    /**
     * Give Player Win
     * @private
     */
    #win = () => {
        this.player1.updateScore()

        this.view.updateFeedbackMsg(this.#PLAYER_ROUND_WIN_TEXT)
        this.view.updateScore('player', this.player1.getScore())
        this.view.showFeedbackPopup('round')
    }

    /**
     * Give Player Loss
     * @private
     */
    #lose = () => {
        this.player2.updateScore()

        this.view.updateFeedbackMsg(this.#COMPUTER_ROUND)
        this.view.updateScore('computer', this.player2.getScore())
        this.view.showFeedbackPopup('round')
    }

    /**
     * Give Player Draw
     * @private
     */
    #draw = () => {
        this.view.updateFeedbackMsg(this.#DRAW_ROUND_TEXT)
        this.view.showFeedbackPopup('round')
    }

    /**
     * @private
     */
    #checkGameResult = () => {
        const player1Score = this.player1.getScore()
        const player2Score = this.player2.getScore()

        // True Is Player Win Audio, False Is Player Defeat Audio
        if (player1Score > player2Score) {
            this.view.updateFeedbackMsg(this.#PLAYER_GAME_WIN_TEXT)
            playAudio(true)
        } else if (player1Score < player2Score) {
            this.view.updateFeedbackMsg(this.#COMPUTER_GAME_WIN_TEXT)
            playAudio(false)
        } else {
            this.view.updateFeedbackMsg(this.#DRAW_GAME_TEXT)
            playAudio(false)
        }
    }

    /**
     * @public
     */
    checkRoundResult = () => {
        let isGameOver
        let player1Score
        let player2Score

        let player1Move = this.player1.getMove()
        let player2Move = this.player2.getMove()

        const hasPlayerWon = player1Move === this.move.PAPER && player2Move === this.move.ROCK || player1Move === this.move.SCISSORS && player2Move === this.move.PAPER || player1Move === this.move.ROCK && player2Move === this.move.SCISSORS

        const hasComputerWon = player2Move === this.move.PAPER && player1Move === this.move.ROCK || player2Move === this.move.SCISSORS && player1Move === this.move.PAPER || player2Move === this.move.ROCK && player1Move === this.move.SCISSORS

        const isDraw = player1Move === player2Move

        const isPlayerChoiceBefore1 = this.countdown.getCount() > 1

        const isInvalidChoice = isPlayerChoiceBefore1 || !player1Move

        if (isInvalidChoice) {
            if (isPlayerChoiceBefore1) {
                let move

                // Give Computer Automatic Win
                switch (player1Move) {
                    case this.move.ROCK:
                        move = this.move.PAPER
                        break
                    case this.move.PAPER:
                        move = this.move.SCISSORS
                        break
                    case this.move.SCISSORS:
                        move = this.move.ROCK
                        break
                }

                this.player2.updateMove(move)
            } else {
                this.#lose()
            }
        } else if (hasPlayerWon) {
            this.#win()
        } else if (hasComputerWon) {
            this.#lose()
        } else if (isDraw) {
            this.#draw()
        }

        player1Score = this.player1.getScore()
        player2Score = this.player2.getScore()

        if (!isPlayerChoiceBefore1) {
            let player1TempMove = this.player1.getTempMove()
            let player2TempMove = this.player2.getTempMove()

            this.#roundsPlayed++
            this.#stopRound()

            // Push Result To Moves For Rounds Popup
            this.#movesMade.push({
                player1: player1Move ? player1Move : player1TempMove,
                player2: player2Move ? player2Move : player2TempMove
            })

            isGameOver = this.#roundsPlayed === this.rounds || player1Score === this.roundsToWin && player2Score === 0 || player2Score === this.roundsToWin && player1Score === 0

            if (isGameOver) {
                this.view.showViewRoundsBtn()
                this.view.updateRoundsPopup(this.#currentGame, this.#movesMade)
                this.view.showFeedbackPopup('game')

                this.#checkGameResult()
            } else {
                setTimeout(this.#startRound, 1000)
            }
        }
    }
}