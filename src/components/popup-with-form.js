import { Popup } from "./popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formElement) {
        super(popupSelector);
        this._formElement = formElement;
        this._submit = this._formElement.querySelector('.popup__button');
    }
}