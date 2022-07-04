import {clickOnOverlay, keyHandler} from './modal.js'

const popupProfile = document.querySelector('.popup_type-edit');
const popupImage = document.querySelector('.popup_type-image');
const cardPopup = document.querySelector('.popup_type-add');

// функция открытия попап

function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    document.addEventListener('mousedown', clickOnOverlay);
    document.addEventListener('keydown', keyHandler)
};

// функция закрытия попап

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    
    document.removeEventListener('mousedown', clickOnOverlay);
    document.removeEventListener('keydown', keyHandler)
};

export {openPopup, closePopup, popupProfile,popupImage, cardPopup};