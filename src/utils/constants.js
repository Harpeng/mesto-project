/** попапы */
const formElementAdd = document.querySelector('.popup__form_js-add');
const formElementEdit = document.querySelector('.popup__form_js-edit');
const formChangeAvatar = document.querySelector('.popup__form_js-avatar');

/** кнопки для открытия попапов */
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileChangeAvatarButton = document.querySelector('.profile__change-avatar-button');

/** инпуты */
const nameInput = document.querySelector('.popup__user-name');
const descInput = document.querySelector('.popup__user-description');

/** селекторы элементов страницы */
const userNameSelector = '.profile__title';
const userDescSelector = '.profile__subtitle';
const avatarSelector = '.profile__avatar';

const cardTemplateSelector = '.card-template';
const cardContainer = '.elements__container';

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

export {
  avatarSelector,
  formChangeAvatar,
  profileChangeAvatarButton,
  enableValidationConfig,
  profileAddButton,
  profileEditButton,
  formElementEdit,
  formElementAdd,
  cardContainer,
  nameInput,
  descInput,
  userNameSelector,
  userDescSelector,
  cardTemplateSelector
};
