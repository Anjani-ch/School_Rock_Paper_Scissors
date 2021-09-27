// Score Class
export default class Score {
    constructor() { this.score = 0 }

    update = () => this.score++

    updateElement = scoreEl => scoreEl.textContent = this.score

    reset = scoreEl => {
        this.score = 0
        this.updateElement(scoreEl)
    }

    get = () => this.score
}