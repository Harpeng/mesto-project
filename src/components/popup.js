export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  
  _clickOnOverlay = (evt) => {
    if(evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  }
  
  // функция закрытие попап через esc (функция)
  
  _keyHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup()
    };
  } 
  
  // функция открытия попап
  
  openPopup(){
    this._popup.classList.add('popup_is-opened');
  
    this._popup.addEventListener('mousedown', this._clickOnOverlay);
    document.addEventListener('keydown', this._keyHandler)
  };
  
  // функция закрытия попап
  
  closePopup() {
    this._popup.classList.remove('popup_is-opened');
    
    this._popup.removeEventListener('mousedown', this._clickOnOverlay);
    document.removeEventListener('keydown', this._keyHandler);
  };

  setEventListener() {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close')) {
        this.closePopup()
      }
    })
  }
}
// функция добавляющаю в форму данные из профиля

function defaultValueInput (popup) {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent
};


export {defaultValueInput};
