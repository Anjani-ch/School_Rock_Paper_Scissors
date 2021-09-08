import * as game from './game.js'

const getRandomMoveIndex = () => Math.round(Math.random() * (allMoves.length - 1))

const getComputerMove = () => allMoves[getRandomMoveIndex()]

const getPlayerMove = e => {
    if (countdownInterval && countdownCount !== 1) setTimeout(game.checkRoundResult, 1)
    return e.target.className
}

export { getRandomMoveIndex, getComputerMove, getPlayerMove }