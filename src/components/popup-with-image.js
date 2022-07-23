import { Popup } from "./popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPic = this._popup.querySelector('.popup__image');
        this._popupPicText = this._popup.querySelector('.popup__text');
    }

    openImage = (name, link) => {
        super.openPopup();
        this._popupPic.src = link;
        this._popupPicText.textContent = name;
        this._popupPic.alt = name;
    }
}