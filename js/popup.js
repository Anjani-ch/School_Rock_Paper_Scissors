const popupWrapper = document.querySelector('#rounds-popup-wrapper')
const roundResults = document.querySelector('#round-results')

const show = () => popupWrapper.style.display = 'block'

const close = () => popupWrapper.style.display = 'none'

const update = (currentGame, choicesMade, scissors) => {
    const roundEl = document.createElement('DIV')
    const roundHeading = document.createElement('H1')
    const roundList = document.createElement('UL')

    roundHeading.textContent = `Round ${currentGame}:`
    console.log(choicesMade)
    choicesMade.forEach((choice, index) => {
        const matchResult = document.createElement('LI')

        matchResult.innerHTML = `<span>${index + 1}</span>. <i class="fas ${choice.player} ${choice.player === scissors ? 'is-scissors' : ''}"></i> <i class="fas ${choice.computer}"></i>`
        roundList.appendChild(matchResult)
    })

    roundEl.classList.add('round')

    roundEl.appendChild(roundHeading)
    roundEl.appendChild(roundList)
    roundResults.appendChild(roundEl)
}

export { show, close, update }