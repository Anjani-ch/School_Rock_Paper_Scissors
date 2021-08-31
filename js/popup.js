const popupWrapper = document.querySelector('#rounds-popup-wrapper')

const showPopup = () => popupWrapper.style.display = 'block'

const closePopup = () => popupWrapper.style.display = 'none'

export { showPopup, closePopup }