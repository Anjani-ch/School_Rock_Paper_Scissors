// Score Class
export default class Score {
    constructor() { this.score = 0 }

    update = () => this.score++

    updateElement = scoreEl => scoreEl.textContent = this.score

    reset = () => this.score = 0

    get = () => this.score
}