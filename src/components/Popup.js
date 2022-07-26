export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  
  _clickOnOverlay = (evt) => {
    if(evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  }
  
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup()
    };
  } 
  
  openPopup(){
    this._popup.classList.add('popup_is-opened');
  
    this._popup.addEventListener('mousedown', this._clickOnOverlay);
    document.addEventListener('keydown', this._handleEscClose)
  };
  
  closePopup() {
    this._popup.classList.remove('popup_is-opened');
    
    this._popup.removeEventListener('mousedown', this._clickOnOverlay);
    document.removeEventListener('keydown', this._handleEscClose);
  };

  setEventListener() {
    this._popup.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup__close')) {
        this.closePopup()
      }
    })
  }
}
