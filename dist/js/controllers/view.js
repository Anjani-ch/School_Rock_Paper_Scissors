// Imports
import Move from '../models/move.js'

// View Controller
export default class View {
    // DOM Elements
    // Game
    // Choice Element
    #choices = document.querySelector('#choices')

    // Hand Elements
    #player1Hand = document.querySelector('#player1-hand')
    #player2Hand = document.querySelector('#player2-hand')

    // Score Element
    #player1Score = document.querySelector('#player1-score')
    #player2Score = document.querySelector('#player2-score')

    // Countdown Element
    #countdownEl = document.querySelector('#countdown')

    // Views
    // Game View
    #gameView = document.querySelector('#game-view')

    // Start View
    #startView = document.querySelector('#start-view')

    // Buttons
    #startBtn = document.querySelector('#start-btn')
    #restartBtn = document.querySelector('#restart-btn')
    #viewRoundsBtn = document.querySelector('#view-rounds')
    #closePopupBtn = document.querySelector('#close-popup')

    // Popups
    // Rounds Popup
    #roundsPopupWrapper = document.querySelector('#rounds-popup-wrapper')
    #roundsPopupResults = document.querySelector('#round-results')

    // Feedback Popup
    #feedbackPopupWrapper = document.querySelector('#feedback-popup-wrapper')
    #feedbackPopup = document.querySelector('#feedback-popup')
    #feedbackMsg = document.querySelector('#feedback')

    constructor(countdown, move) {
        this.countdown = countdown
        this.move = move
    }

    // Game Handlers
    /**
     * Change View To Game View
     * @private
     */
    #changeToGameView = () => {
        // Hide Start View
        this.#startView.classList.remove('show')

        // Show Game View
        this.#gameView.classList.add('show')
    }

    /**
     * Update Player Hands
     * @public
     */
    displayFinalResult = (player1, player2) => {
        const player1Move = player1.finalMove
        const player2Move = player2.finalMove

        const player1TempMove = player1.tempMove
        const player2TempMove = player2.tempMove

        this.#player1Hand.className = `${player1Move ? player1Move : player1TempMove} ${player1Move === this.move.SCISSORS || player1TempMove === this.move.SCISSORS ? 'is-scissors' : ''}`
        this.#player2Hand.className = player2Move ? player2Move : player2TempMove
    }

    /**
     * Update Score Element
     * @public
     * @param {class} player - The Player
     * @param {number} score - The Player Score
     */
    updateScore = (player, score) => {
        if (player === 'player') this.#player1Score.textContent = score
        else if (player === 'computer') this.#player2Score.textContent = score
    }

    /**
     * Update Countdown Element
     * @public
     * @param {any} input - Text To Display In Countdown Element
     */
    updateCountdown = input => this.#countdownEl.textContent = input

    // Buttons
    // View Rounds Button
    /**
     * Show View Rounds Button
     * @public
     */
    showViewRoundsBtn = () => this.#viewRoundsBtn.classList.add('show-btn')

    /**
     * Hide View Rounds Button
     * @public
     */
    hideViewRoundsBtn = () => this.#viewRoundsBtn.classList.remove('show-btn')

    // Popup Handlers
    // Rounds Popup
    /**
     * Toggle Popup
     * @private
     */
    #toggleRoundsPopup = () => this.#roundsPopupWrapper.classList.toggle('show')

    /**
     * Update Rounds Popup Content
     * @public
     * @param {number} currentGame - Current Game Round Count
     * @param {array} movesMade - All Moves Made In Game
     */
    updateRoundsPopup = (currentGame, movesMade) => {
        // Create Elements
        const roundEl = document.createElement('DIV')
        const roundHeading = document.createElement('H1')
        const roundList = document.createElement('UL')

        // Update Heading With Current Round
        roundHeading.textContent = `Round ${currentGame}:`

        movesMade.forEach((choice, index) => {
            // Create Element
            const matchResult = document.createElement('LI')

            // Update List Element With Current Moves
            matchResult.innerHTML = `<span>${index + 1}</span>. <i class="fas ${choice.player1} ${choice.player1 === this.move.SCISSORS ? 'is-scissors' : ''}"></i> <i class="fas ${choice.player2}"></i>`

            // Append List Element
            roundList.appendChild(matchResult)
        })

        roundEl.classList.add('round')

        // Append Elements
        roundEl.appendChild(roundHeading)
        roundEl.appendChild(roundList)
        this.#roundsPopupResults.appendChild(roundEl)
    }

    // Feedback Popup
    /**
     * Show Feedback Popup With Content Depending On Game State
     * @public
     * @param {string} state - Current Game State
     */
    showFeedbackPopup = state => {
        this.#feedbackPopupWrapper.classList.add('show')
        this.#feedbackPopup.classList.add('show-flex')

        // Decide Restart Button Display Depending On Game State
        if (state === 'game') this.#restartBtn.classList.add('show-btn')
        else if (state === 'round') this.#restartBtn.classList.remove('show-btn')
    }

    /**
     * @public
     */
    closeFeedbackPopup = () => {
        this.#feedbackPopupWrapper.classList.remove('show')
        this.#feedbackPopup.classList.remove('show-flex')
    }

    /**
     * @public
     * @param {string} input - Feedback Message
     */
    updateFeedbackMsg = input => this.#feedbackMsg.textContent = input

    // Change Hands Interval Handlers
    /**
     * @public
     * @param {string} tempPlayer1Move - Player 1 Temp Move
     * @param {string} tempPlayer2Move - Player 2 Temp Move
     */
    handleChangeHandsIntervalStart = (tempPlayer1Move, tempPlayer2Move) => {
        // Update Hands With Temp Move
        this.#player1Hand.className = `${tempPlayer1Move} ${tempPlayer1Move === this.move.SCISSORS ? 'is-scissors' : ''}`
        this.#player2Hand.className = tempPlayer2Move
    }

    /**
     * @public
     * @param {class} player1 - Player 1 Class
     * @param {class} player2 - Player 2 Class
     */
    handleChangeHandsIntervalEnd = (player1, player2) => {
        const player1Move = player1.finalMove
        const player2Move = player1.finalMove

        // Reset Temp Moves
        if (player1Move) player1.resetTempMove()
        if (player2Move) player2.resetTempMove()

        // Update Final Result
        if (!player1.tempMove) this.#player1Hand.className = `${player1Move} ${player1Move === this.move.SCISSORS ? 'is-scissors' : ''}`
        if (!player2.tempMove) this.#player2Hand.className = player2Move
    }

    // Animation Handlers
    /**
    * @public
    */
    addAnimations = () => {
        // Add Animations On Elements
        this.#player1Hand.parentElement.classList.add('animate-hand')
        this.#player2Hand.parentElement.classList.add('animate-hand')
        this.#countdownEl.classList.add('animate-countdown')
    }

    /**
    * @public
    */
    removeAnimations = () => {
        // Remove Animations On Elements
        this.#player1Hand.parentElement.classList.remove('animate-hand')
        this.#player2Hand.parentElement.classList.remove('animate-hand')
        this.#countdownEl.classList.remove('animate-countdown')
    }

    /**
     * Initialize All Event Listeners
    * @public
    * @param {class} game - Game Instance
    * @param {class} player - Current Player
    * @param {interval} countdownInterval - Interval For Countdown
    */
    addEventListeners = (game, player, countdownInterval) => {
        // Event Listeners
        // Game Event
        this.#choices.addEventListener('click', e => {
            if (e.target.classList.contains('fas')) {
                const move = new Move('player', this.countdown, game, countdownInterval)

                player.updateMove(move.get(e, this.countdown))
            }
        })

        this.#restartBtn.addEventListener('click', game.startGame)

        // Button Events
        this.#startBtn.addEventListener('click', () => {
            this.#changeToGameView()
            game.startGame()
        })

        // Popup Events
        this.#viewRoundsBtn.addEventListener('click', this.#toggleRoundsPopup)
        this.#closePopupBtn.addEventListener('click', this.#toggleRoundsPopup)
    }
}