import * as popup from './popup.js'
import * as game from './game.js'
import * as moves from './moves.js'

const closePopupBtn = document.querySelector('#close-popup')
const startBtn = document.querySelector('#start-btn')
const choices = document.querySelector('#choices')

restartBtn.addEventListener('click', game.startNewGame)
viewRoundsBtn.addEventListener('click', popup.show)
closePopupBtn.addEventListener('click', popup.close)
startBtn.addEventListener('click', game.show)
choices.addEventListener('click', e => e.target.classList.contains('fas') ? playerMove = moves.getPlayerMove(e) : '')