const viewRoundsBtn = document.querySelector('#view-rounds')
const restartBtn = document.querySelector('#restart-btn')

const rock = 'fas fa-hand-rock'
const paper = 'fas fa-hand-paper'
const scissors = 'fas fa-hand-scissors'

const allMoves = [rock, paper, scissors]

let movesMade = []

let currentGame = 0

let countdownCount = 3

let tempPlayerMove = ''
let tempComputerMove = ''

let playerMove = ''
let computerMove = null

let countdownInterval = null
let changeHandsInterval = null