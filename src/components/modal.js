
import {closePopup, popupProfile, cardPopup} from './utils.js'
import {renderCard} from '../components/card.js'

const inputPlace = document.querySelector('.popup_js-add-place');
const inputSource = document.querySelector('.popup_js-add-source');
const cardContainer = document.querySelector('.elements__container');
const nameInput = document.querySelector('.popup__user-name');
const jobInput = document.querySelector('.popup__user-description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');


// функция формы отправки данных попап редактирования профиля
const formSubmitHandler = (evt) => {                                                                              
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;

  closePopup(popupProfile);

  userName.value = '';
  userDescription.value = '';

}

// функция добавляющаю в форму данные из профиля

function defaultValueInput (popup) {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent
};

// функция Закрытие попап через клик по оверлей

function clickOnOverlay (evt) {
  if(evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target.closest('.popup'))
  }
}

// функция закрытие попап через esc (функция)

function keyHandler(evt) {
  const activePopup = document.querySelector('.popup_is-opened')
  if (evt.which === 27) {
    closePopup(activePopup);
  };
} 

//объявленная переменная с функцией добавление новых карточек через форму

const addToContainer = function(evt) {
  evt.preventDefault();

  const input = {name: inputPlace.value, link: inputSource.value};

  renderCard(input, cardContainer);

  closePopup(cardPopup);

  inputPlace.value = '';
  inputSource.value = '';
};

export {clickOnOverlay, keyHandler};
export {formSubmitHandler, defaultValueInput, addToContainer};