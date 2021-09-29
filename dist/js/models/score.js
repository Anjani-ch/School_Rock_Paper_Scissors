// Score Model
export default class Score {
    constructor() { this.score = 0 }

    /**
     * @public
     */
    update = () => this.score++

    /**
     * @public
     */
    reset = () => this.score = 0

    /**
     * @public
     * @return {number} - Current Score
     */
    get = () => this.score
}