const roundsPopupWrapper = document.querySelector('#rounds-popup-wrapper')
const roundsPopupResults = document.querySelector('#round-results')
const feedbackPopupWrapper = document.querySelector('#feedback-popup-wrapper')
const feedbackPopup = document.querySelector('#feedback-popup')

const showRoundsPopup = () => roundsPopupWrapper.style.display = 'block'

const closeRoundsPopup = () => roundsPopupWrapper.style.display = 'none'

const updateRoundsPopup = () => {
    const roundEl = document.createElement('DIV')
    const roundHeading = document.createElement('H1')
    const roundList = document.createElement('UL')

    roundHeading.textContent = `Round ${currentGame}:`

    movesMade.forEach((choice, index) => {
        const matchResult = document.createElement('LI')

        matchResult.innerHTML = `<span>${index + 1}</span>. <i class="fas ${choice.player} ${choice.player === scissors ? 'is-scissors' : ''}"></i> <i class="fas ${choice.computer}"></i>`
        roundList.appendChild(matchResult)
    })

    roundEl.classList.add('round')

    roundEl.appendChild(roundHeading)
    roundEl.appendChild(roundList)
    roundsPopupResults.appendChild(roundEl)
}

const showFeedbackPopup = state => {
    feedbackPopupWrapper.style.display = 'block'
    feedbackPopup.style.display = 'flex'

    if (state === 'game') restartBtn.style.display = 'inline-block'
    else if (state === 'round') restartBtn.style.display = 'none'
}

const closeFeedbackPopup = () => {
    feedbackPopupWrapper.style.display = 'none'
    feedbackPopup.style.display = 'none'
}

export { showRoundsPopup, closeRoundsPopup, updateRoundsPopup, showFeedbackPopup, closeFeedbackPopup }