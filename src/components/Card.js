/** Создание и взаимодейтсвие с карточками */

export class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteClick, userId}, templateSelector){
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardOwner = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick,
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
    this._userId = userId;
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__card')
    .cloneNode(true);
    
    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _isLiked = () => {
      return Boolean(this._likes.find((likeObj) => {
        return likeObj._id === this._userId;
      }))
  }

  updateLike = (likesArr) => {
    this._likeCounter.textContent = likesArr.length;
    this._likes = likesArr;
    if(this._isLiked()){
      this._likeBtn.classList.add('elements__like-button_active')
    } else {
     this._likeBtn.classList.remove('elements__like-button_active');
    }
  }

  createCard = () => {
    this._element = this._getElement();

    this._img = this._element.querySelector('.elements__image');
    this._deleteBtn = this._element.querySelector('.elements__trash');
    this._likeBtn = this._element.querySelector('.elements__like-button');
    this._likeCounter = this._element.querySelector('.elements__like-counter');

    this._img.src = this._cardLink;
    this._img.alt = this._cardName;
    this._element.querySelector('.elements__text').textContent = this._cardName;

    this.updateLike(this._likes);

    if(this._cardOwner !== this._userId) {
      this._deleteBtn.remove();
    }
    this._img.addEventListener('click', () => { this._handleCardClick(this._cardName, this._cardLink)} );
    this._likeBtn.addEventListener('click', () => { this._handleLikeClick(this._id, this, this._isLiked()) });
    this._deleteBtn.addEventListener('click', () => { this._handleDeleteClick(this._id, this) });
    return this._element;
  
  }
}
