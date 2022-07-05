
import {closePopup} from './utils.js';
import { nameInput, jobInput, userName, userDescription} from '../utils/constants.js'; 



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
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  };
} 


export {clickOnOverlay, keyHandler, defaultValueInput};
