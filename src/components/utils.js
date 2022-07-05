import {clickOnOverlay, keyHandler} from './modal.js';

// функция открытия попап

function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    popup.addEventListener('mousedown', clickOnOverlay);
    document.addEventListener('keydown', keyHandler)
};

// функция закрытия попап

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    
    popup.removeEventListener('mousedown', clickOnOverlay);
    document.removeEventListener('keydown', keyHandler)
};

export {openPopup, closePopup};