export default class Countdown {
    constructor(count) {
        this.initialCount = count
        this.count = count
    }

    /**
     * Decrement Current Count
     * @public
     */
    update = () => this.count--

    /**
     * Set Current Count To Be Initial Count
     * @public
     */
    reset = () => this.count = this.initialCount

    /**
     * @public
     * @return {number} - Current Count
     */
    getCount = () => this.count
}