import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._handleSubmit = handleSubmit;
  }

  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }

  _getInputValues = () => {
    this._formInputsValues = {};

    this._inputList.forEach((input) => {
      this._formInputsValues[input.name] = input.value; // на выходе - объект {имя_поля1: значение1, ..}
    });

    return this._formInputsValues;
  }

  setEventListener = () => {
    super.setEventListener();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }
}