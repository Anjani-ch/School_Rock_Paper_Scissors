const getRandomMoveIndex = moves => Math.round(Math.random() * (moves.length - 1))

const getComputerMove = moves => moves[getRandomMoveIndex(moves)]

const getPlayerMove = (e, countdownInterval, countdownCount, callback) => {
    if (countdownInterval && countdownCount !== 1) setTimeout(callback, 1)
    return e.target.className
}

export { getRandomMoveIndex, getComputerMove, getPlayerMove }