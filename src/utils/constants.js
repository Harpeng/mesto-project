/** попапы */
const popupProfile = document.querySelector('.popup_type-edit');
const popupImage = document.querySelector('.popup_type-image');
const cardPopup = document.querySelector('.popup_type-add');
const popupImgClose = popupImage.querySelector('.popup__close_js-img');
const popupAddClose = document.querySelector('.popup__close_js-add');
const popupCloseEdit = document.querySelector('.popup__close_js-edit');
const popupButtonEdit = document.querySelector('.popup__button_js-edit');
const popupButtonAdd = document.querySelector('.popup_js-add-button');
const formElementAdd = document.querySelector('.popup__form_js-add');
const formElementEdit = document.querySelector('.popup__form_js-edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileChangeAvatarButton = document.querySelector('.profile__change-avatar-button');
const formChangeAvatar = document.querySelector('.popup__form_js-avatar');
const popupCloseChangeAvatar = document.querySelector('.popup__close_js-avatar');
const avatarChangePopup = document.querySelector('.popup_type-avatar');
const popupButtonChangeAvatar = document.querySelector('.popup_js-avatar-button');
const avatar = document.querySelector('.profile__avatar');
/** инпуты */
const inputPlace = document.querySelector('.popup_js-add-place');
const inputSource = document.querySelector('.popup_js-add-source');
const nameInput = document.querySelector('.popup__user-name');
const jobInput = document.querySelector('.popup__user-description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');
const inputChangeAvatar = document.querySelector('.popup_js-change-avatar');
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
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__card');
const cardContainer = document.querySelector('.elements__container');
const popupPic = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');
const initialCards = [
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
  ];


/** функция изменения текста кнопки при загрузки информации на страницу */
  const dataLoading = (button, loading) => {
    if (loading) {
      button.textContent = "Сохранение...";
    } else {
      button.textContent = "Сохранить";
    }
  }
  
  export{avatar, popupButtonChangeAvatar, inputChangeAvatar, avatarChangePopup, popupCloseChangeAvatar, formChangeAvatar, profileChangeAvatarButton, dataLoading, enableValidationConfig, profileAddButton, profileEditButton, formElementEdit, formElementAdd, popupButtonAdd, popupButtonEdit, popupCloseEdit, popupAddClose, popupImgClose, cardTemplate, popupPic, popupText, initialCards,inputPlace, inputSource, cardContainer, nameInput, jobInput, userName, userDescription, popupProfile, popupImage, cardPopup};