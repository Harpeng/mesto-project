/** попапы */
const formElementAdd = document.querySelector('.popup__form_js-add');
const formElementEdit = document.querySelector('.popup__form_js-edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileChangeAvatarButton = document.querySelector('.profile__change-avatar-button');
const formChangeAvatar = document.querySelector('.popup__form_js-avatar');
/** инпуты */
const inputPlace = document.querySelector('.popup_js-add-place');
const inputSource = document.querySelector('.popup_js-add-source');
const nameInput = document.querySelector('.popup__user-name');
const jobInput = document.querySelector('.popup__user-description');
const inputChangeAvatar = document.querySelector('.popup_js-change-avatar');
/** селекторы */
const userNameSelector = '.profile__title';
const userDescSelector = '.profile__subtitle';
const avatarSelector = '.profile__avatar';
/** валидация */
const enableValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  spanSelector: '.popup__error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_invalid',
  inputErrorClass: 'popup_error-input',
  errorClass: 'popup__error_visible'
};


/** карточки */
const cardContainer = '.elements__container';

export{ avatarSelector,  inputChangeAvatar,  formChangeAvatar, profileChangeAvatarButton, enableValidationConfig, profileAddButton, profileEditButton, formElementEdit, formElementAdd, inputPlace, inputSource, cardContainer, nameInput, jobInput, userNameSelector, userDescSelector};
