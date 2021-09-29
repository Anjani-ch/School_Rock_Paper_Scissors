// Imports
import Score from './score.js'

// Player Model
export default class Player {
    score = new Score()
    finalmove
    tempMove

    constructor() { }

    // Player Scores
    /**
     * @public
     */
    getScore = () => this.score.get()

    /**
     * @public
     */
    updateScore = () => this.score.update()

    /**
     * @public
     */
    resetScore = () => this.score.reset()

    // Playr Move
    /**
     * @public
     * @return {string} - Final Move
     */
    getMove = () => this.finalMove

    /**
     * @public
     */
    updateMove = move => this.finalMove = move

    /**
     * @public
     */
    resetMove = () => this.finalMove = ''

    // Player Temp Move
    /**
     * @public
     * @return {string} - Temp Move
     */
    getTempMove = () => this.tempMove

    /**
     * @public
     */
    updateTempMove = move => this.tempMove = move

    /**
     * @public
     */
    resetTempMove = () => this.tempMove = ''
}