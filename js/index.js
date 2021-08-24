const startView = document.querySelector('#start-view')
const startBtn = document.querySelector('#start-btn')
const gameView = document.querySelector('#game-view')

const changeToGameView = () => {
    startView.style.display = 'none'
    gameView.style.display = 'block'
}

startBtn.addEventListener('click', changeToGameView)