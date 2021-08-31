import { showPopup, closePopup } from './popup.js'
import playAudio from './audio.js'

const closePopupBtn = document.querySelector('#close-popup')
const roundResults = document.querySelector('#round-results')
const startView = document.querySelector('#start-view')
const startBtn = document.querySelector('#start-btn')
const gameView = document.querySelector('#game-view')
const playerScore = document.querySelector('#player-score')
const computerScore = document.querySelector('#computer-score')
const viewRoundsBtn = document.querySelector('#view-rounds')
const choicesEl = document.querySelector('#choices')
const playerHand = document.querySelector('#player-hand')
const countdown = document.querySelector('#countdown')
const computerHand = document.querySelector('#computer-hand')
const feedback = document.querySelector('#feedback')
const restartBtn = document.querySelector('#restart-btn')

const playerRoundWinText = 'Du vant runden!'
const computerRoundWinText = 'Du tapte runden!'
const drawRoundText = 'Runden ble uavgjort!'

const playerMatchWinText = 'Du Vant!'
const computerMatchWinText = 'Du Tapte!'
const drawMatchText = 'Det ble uavgjort'

const rock = 'fas fa-hand-rock'
const paper = 'fas fa-hand-paper'
const scissors = 'fas fa-hand-scissors'

const choices = [rock, paper, scissors]

const choicesMade = []

let currentRound = 0

let matchesPlayed = 0
let playerMatchesWon = 0
let computerMatchesWon = 0

let countdownCount = 3

let tempPlayerChoice = ''
let tempComputerChoice = ''

let playerChoice = ''
let computerChoice = null

let countdownInterval = null
let changeHandsInterval = null

const getRandomChoiceIndex = () => Math.round(Math.random() * (choices.length - 1))

const runChangeHandsInterval = () => {
    changeHandsInterval = setInterval(() => {
        const playerRandomChoice = getRandomChoiceIndex()
        const computerRandomChoice = getRandomChoiceIndex()

        tempPlayerChoice = choices[playerRandomChoice]
        tempComputerChoice = choices[computerRandomChoice]

        playerHand.className = tempPlayerChoice
        computerHand.className = choices[computerRandomChoice]

        if (!countdownInterval) stopChangeHandsInterval()
    }, 300)
}

const stopChangeHandsInterval = () => {
    clearInterval(changeHandsInterval)
    changeHandsInterval = null
    playerHand.className = playerChoice ? playerChoice : tempPlayerChoice
    computerHand.className = computerChoice ? computerChoice : tempComputerChoice
}

const runCountdownInterval = () => {
    countdown.textContent = countdownCount

    countdownInterval = setInterval(() => {
        countdownCount--
        countdown.textContent = countdownCount

        if (countdownCount === 0) {
            computerChoice = getComputerMove()

            countdown.textContent = 'VIS!'
            playerHand.className = playerChoice
            computerHand.className = computerChoice

            choicesMade.push({ player: playerChoice, computer: computerChoice })

            stopCountdownInterval()
            checkMatchResult()
        }
    }, 1000);
}

const stopCountdownInterval = () => {
    clearInterval(countdownInterval)
    countdownInterval = null
}

const changeToGameView = () => {
    startView.style.display = 'none'
    gameView.style.display = 'block'

    startNewGame()
}

const startNewGame = () => {
    currentRound++

    matchesPlayed = 0
    playerMatchesWon = 0
    computerMatchesWon = 0

    playerScore.textContent = playerMatchesWon
    computerScore.textContent = computerMatchesWon

    startRound()
}

const stopGame = () => {
    stopCountdownInterval()
    stopChangeHandsInterval()
}

const startRound = () => {
    viewRoundsBtn.style.display = 'none'
    restartBtn.style.display = 'none'

    feedback.textContent = ''

    playerChoice = ''
    countdownCount = 3

    runCountdownInterval()
    runChangeHandsInterval()
}

const updateRoundResults = () => {
    const roundEl = document.createElement('DIV')
    const roundHeading = document.createElement('H1')
    const roundList = document.createElement('OL')

    roundHeading.textContent = `Round ${currentRound}:`

    choicesMade.forEach(choice => {
        const matchResult = document.createElement('LI')

        matchResult.innerHTML = `<i class="fas ${choice.player}"></i> <i class="fas ${choice.computer}"></i>`
        roundList.appendChild(matchResult)
    })

    roundEl.classList.add('round')

    roundEl.appendChild(roundHeading)
    roundEl.appendChild(roundList)
    roundResults.appendChild(roundEl)
}

const makePlayerMove = e => {
    playerChoice = e.target.className
    if (countdownInterval) checkMatchResult()
}

const getComputerMove = () => choices[getRandomChoiceIndex()]

const checkMatchResult = () => {
    const isGameOver = matchesPlayed === 2 || playerMatchesWon === 2 && computerMatchesWon === 0 || computerMatchesWon === 2 && playerMatchesWon === 0

    const hasPlayerWon = playerChoice === paper && computerChoice === rock || playerChoice === scissors && computerChoice === paper || playerChoice === rock && computerChoice === scissors

    const hasComputerWon = computerChoice === paper && playerChoice === rock || computerChoice === scissors && playerChoice === paper || computerChoice === rock && playerChoice === scissors

    const isDraw = playerChoice === computerChoice

    const isNotValidChoice = parseInt(countdown.textContent) > 1 || !playerChoice

    if (isNotValidChoice) {
        feedback.textContent = computerMatchWinText
    } else if (hasPlayerWon) {
        feedback.textContent = playerMatchWinText
        updateScore('player')
    } else if (hasComputerWon) {
        feedback.textContent = computerMatchWinText
        updateScore('computer')
    } else if (isDraw) {
        feedback.textContent = drawMatchText
    }

    matchesPlayed++

    stopGame()

    if (isGameOver) {
        viewRoundsBtn.style.display = 'inline-block'
        restartBtn.style.display = 'inline-block'

        checkRoundResult()
        updateRoundResults()
    } else {
        setTimeout(startRound, 1000)
    }
}

const checkRoundResult = () => {
    if (playerMatchesWon > computerMatchesWon) {
        feedback.textContent = playerRoundWinText
        playAudio(true)
    } else if (playerMatchesWon < computerMatchesWon) {
        feedback.textContent = computerRoundWinText
        playAudio(false)
    } else {
        feedback.textContent = drawRoundText
        playAudio(false)
    }
}

const updateScore = scoreToBeUpdated => {
    if (scoreToBeUpdated === 'player') {
        playerMatchesWon++
        playerScore.textContent = playerMatchesWon
    } else if (scoreToBeUpdated === 'computer') {
        computerMatchesWon++
        computerScore.textContent = computerMatchesWon
    }
}

restartBtn.addEventListener('click', startNewGame)
viewRoundsBtn.addEventListener('click', showPopup)
closePopupBtn.addEventListener('click', closePopup)
startBtn.addEventListener('click', changeToGameView)
choicesEl.addEventListener('click', e => e.target.classList.contains('fas') ? makePlayerMove(e) : '')