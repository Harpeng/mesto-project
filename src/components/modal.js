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
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closePopup(activePopup);
  };
} 

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


export {openPopup, closePopup, clickOnOverlay, keyHandler, defaultValueInput};
