import { Popup } from "./popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSelector, submitHandler = null) {
        super(popupSelector);
        this._form = document.querySelector(formSelector);
        this._submitHandler = submitHandler;
        this._inputLists = this._form.querySelectorAll('.popup__input');
    }

    setSubmitAction = (action) => {
        this._submitHandler = action;
    }   

    _getInputValues = () => {
        this._inputValues = {};
    
        this._inputLists.forEach((input) => {
          this._inputValues[input.name] = input.value;
        });
    
        return this._inputValues;
      }

    setEventListener = () => {
        super.setEventListener();
        this._submit.addEventListener('submit', (e)=> {
            e.preventDefault();
            this._submitHandler(this._getInputValues);
        })
    }

    closePopup = (e) => {
        super.closePopup();
        e.target.reset();
    }

}