export default class Move {
    constructor(turn) { this.turn = turn }

    getRandomIndex = () => Math.round(Math.random() * (allMoves.length - 1))

    get = move => {
        if (this.turn === 'player') {
            if (countdownInterval && countdownCount !== 1) setTimeout(game.checkRoundResult, 1)
            return move
        } else if (this.turn === 'computer') {
            return allMoves[this.getRandomIndex()]
        }
    }
}