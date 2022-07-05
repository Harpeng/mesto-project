import './index.css';
import {enableValidation, hideValidity, toggleButtonState, enableValidationConfig} from '../components/validate.js'
import {openPopup, closePopup} from '../components/utils.js';
import {defaultValueInput} from '../components/modal.js';
import {profileAddButton, profileEditButton, formElementEdit, formElementAdd, popupButtonAdd, popupButtonEdit, popupCloseEdit, popupAddClose, popupImgClose, initialCards,inputPlace, inputSource, cardContainer, nameInput, jobInput, userName, userDescription, popupProfile, popupImage, cardPopup} from '../utils/constants.js';
import {createCard} from '../components/card.js';

enableValidation(enableValidationConfig);

// функция формы отправки данных попап редактирования профиля
const formEditSubmitHandler = (evt) => {                                                                              
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;

  closePopup(popupProfile);

  evt.target.reset();
};

//объявленная переменная с функцией добавление новых карточек через форму

const addToContainer = function(evt) {
  evt.preventDefault();

  const input = {name: inputPlace.value, link: inputSource.value};

  renderCard(input, cardContainer);

  closePopup(cardPopup);

  evt.target.reset();
};

//объявленная переменная с функцией отображения карточек на сайте
const renderCard = function(data,container){
  const card = createCard(data);
  container.prepend(card);
  }
  
  initialCards.forEach(function(initialCards){
  renderCard(initialCards, cardContainer);
  })  

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
formElementEdit.addEventListener('submit', formEditSubmitHandler);

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

  


