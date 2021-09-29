// Move Model
export default class Move {
    // Moves
    ROCK = 'fas fa-hand-rock'
    PAPER = 'fas fa-hand-paper'
    SCISSORS = 'fas fa-hand-scissors'

    #allMoves = [this.ROCK, this.PAPER, this.SCISSORS]

    // All Moves Made In Game
    movesMade = []

    constructor(turn, countdown, game, countdownInterval) {
        this.turn = turn
        this.countdown = countdown
        this.game = game
        this.countdownInterval = countdownInterval
    }

    /**
     * @private
     * @return {number} - Random Index For allMoves Array
     */
    #getRandomIndex = () => Math.round(Math.random() * (this.#allMoves.length - 1))

    /**
     * @public
     * @return {string} - Random Move From allMoves Array
     */
    getRandom = () => this.#allMoves[this.#getRandomIndex()]

    /**
     * @public
     * @return {string} - Final Move
     */
    get = e => {
        let move

        // Return Move Depending On Move Is For Player Or Computer
        if (this.turn === 'player') {
            if (this.countdownInterval.isRunning && this.countdown.getCount() !== 1) setTimeout(this.game.checkRoundResult, 1)
            move = e.target.className
        } else if (this.turn === 'computer') {
            move = this.getRandom()
        }
        return move
    }
}