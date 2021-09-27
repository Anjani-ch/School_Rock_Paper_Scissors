// DOM Elements
const roundsPopupWrapper = document.querySelector('#rounds-popup-wrapper')
const roundsPopupResults = document.querySelector('#round-results')
const feedbackPopupWrapper = document.querySelector('#feedback-popup-wrapper')
const feedbackPopup = document.querySelector('#feedback-popup')

const showRoundsPopup = () => roundsPopupWrapper.classList.add('show')

const closeRoundsPopup = () => roundsPopupWrapper.classList.remove('show')

const updateRoundsPopup = () => {
    // Create Elements
    const roundEl = document.createElement('DIV')
    const roundHeading = document.createElement('H1')
    const roundList = document.createElement('UL')

    // Update Heading With Current Round
    roundHeading.textContent = `Round ${currentGame}:`

    movesMade.forEach((choice, index) => {
        // Create Element
        const matchResult = document.createElement('LI')

        // Update List Element With Current Moves
        matchResult.innerHTML = `<span>${index + 1}</span>. <i class="fas ${choice.player} ${choice.player === scissors ? 'is-scissors' : ''}"></i> <i class="fas ${choice.computer}"></i>`

        // Append List Element
        roundList.appendChild(matchResult)
    })

    roundEl.classList.add('round')

    // Append Elements
    roundEl.appendChild(roundHeading)
    roundEl.appendChild(roundList)
    roundsPopupResults.appendChild(roundEl)
}

const showFeedbackPopup = state => {
    feedbackPopupWrapper.classList.add('show')
    feedbackPopup.classList.add('show-flex')

    // Decide Restart Button Display Depending On Game State
    if (state === 'game') restartBtn.classList.add('show-btn')
    else if (state === 'round') restartBtn.classList.remove('show-btn')
}

const closeFeedbackPopup = () => {
    feedbackPopupWrapper.classList.remove('show')
    feedbackPopup.classList.remove('show-flex')
}

export { showRoundsPopup, closeRoundsPopup, updateRoundsPopup, showFeedbackPopup, closeFeedbackPopup }