// Interval Model
export default class Interval {
    constructor(startCallback, stopCallback, controller) {
        this.startCallback = startCallback
        this.stopCallback = stopCallback
        this.isRunning = false
        this.Interval = null
        this.controller = controller
    }

    /**
     * @public
     */
    run = () => {
        this.Interval = this.startCallback(this.controller)
        this.isRunning = true
    }

    /**
     * @public
     */
    stop = () => {
        clearInterval(this.Interval)
        this.isRunning = false
        this.stopCallback()
    }
}