// Interval Class
export default class Interval {
    constructor(startCallback, stopCallback, time) {
        this.startCallback = startCallback
        this.stopCallback = stopCallback
        this.time = time
        this.isRunning = false
        this.interval = null
    }

    run = () => {
        this.interval = setInterval(this.startCallback, this.time)
        this.isRunning = true
    }

    stop = () => {
        clearInterval(this.interval)
        this.isRunning = false
        this.stopCallback()
    }
}