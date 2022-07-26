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
const cardContainer = document.querySelector('.elements__container');
/**const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; */



  
  export{ avatarSelector,  inputChangeAvatar,  formChangeAvatar, profileChangeAvatarButton, enableValidationConfig, profileAddButton, profileEditButton, formElementEdit, formElementAdd, inputPlace, inputSource, cardContainer, nameInput, jobInput, userNameSelector, userDescSelector};