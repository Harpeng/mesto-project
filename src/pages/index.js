import './index.css';

const popupImgClose = popupImage.querySelector('.popup__close_js-img');
const popupAddClose = document.querySelector('.popup__close_js-add');
const popupCloseEdit = document.querySelector('.popup__close_js-edit');
const popupButtonEdit = document.querySelector('.popup__button_js-edit');
const popupButtonAdd = document.querySelector('.popup_js-add-button');
const formElementAdd = document.querySelector('.popup__form_js-add');
const formElementEdit = document.querySelector('.popup__form_js-edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

import {enableValidation, hideValidity, toggleButtonState, enableValidationConfig} from '../components/validate.js'
import {openPopup, closePopup, popupProfile, popupImage, cardPopup} from '../components/utils.js';
import {formSubmitHandler, defaultValueInput, addToContainer} from '../components/modal.js';

enableValidation(enableValidationConfig)

// слушатель на открытия попап с редактированием данных
profileEditButton.addEventListener('click', () => {
  toggleButtonState(popupButtonEdit, false, enableValidationConfig.inactiveButtonClass);
    hideValidity(popupProfile);
    openPopup (popupProfile);
    defaultValueInput (popupProfile);
});

// слушатель на закрытие попап с редактированием данных
popupCloseEdit.addEventListener('click', () => {
    closePopup(popupProfile);
});

//слушатель формы редактирования профиля
formElementEdit.addEventListener('submit', formSubmitHandler);

//слушатель открытия попап с добавлением карточки
profileAddButton.addEventListener('click', () => {
    toggleButtonState(popupButtonAdd, false, enableValidationConfig.inactiveButtonClass);
    openPopup(cardPopup);
    hideValidity(cardPopup);
});

//слушатель закрытия попап с добавлением карточки
popupAddClose.addEventListener('click', () => {
    closePopup(cardPopup);
});

//слушатель закрытия попап с картинкой
popupImgClose.addEventListener('click', () => {
  closePopup(popupImage);
})

// слушатель формы на добавление новых карточек
formElementAdd.addEventListener('submit', addToContainer);

  


