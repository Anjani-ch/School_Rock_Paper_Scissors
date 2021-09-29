// Imports
import Move from './models/move.js'
import Game from './controllers/game.js'
import Interval from './models/interval.js'
import View from './controllers/view.js'
import Countdown from './models/countdown.js'
import Player from './models/player.js'
import Computer from './models/computer.js'

// Create Player
const player = new Player()

// Create Computer
const computer = new Computer()

// Initial Move Instance
const initialMoveInstance = new Move()

// Init Countdown
const countdown = new Countdown(3)

// Init Controllers
// Init View Controller
const view = new View(countdown, initialMoveInstance)

// Init Intervals
const countdownInterval = new Interval(view => {
    view.addAnimations()

    view.updateCountdown(countdown.getCount())

    return setInterval(() => {
        countdown.update()
        view.updateCountdown(countdown.getCount())

        if (countdown.getCount() === 0) {
            const move = new Move('computer')

            // Update Computer Move
            if (!computer.getMove()) computer.updateMove(move.get())

            view.updateCountdown('VIS!')

            // Display Final Result
            countdownInterval.stop()
            game.checkRoundResult()
            view.displayFinalResult(player, computer)
        }
    }, 1000)
}, view.removeAnimations, view)

const changeHandsInterval = new Interval(view => {
    return setInterval(() => {
        const move = new Move()

        // Get Random Temp Move
        player.updateTempMove(move.getRandom())
        computer.updateTempMove(move.getRandom())

        // Update Hands With Temp Moves
        view.handleChangeHandsIntervalStart(player.tempMove, computer.tempMove)

        if (!countdownInterval.isRunning) changeHandsInterval.stop()
    }, 300)
}, () => view.handleChangeHandsIntervalEnd(player, computer), view)

// Init Game Controller
const game = new Game(3, player, computer, countdown, view, initialMoveInstance, countdownInterval, changeHandsInterval)

// Add Event Listeners
view.addEventListeners(game, player, countdownInterval)