import {openPopup} from './modal';
import {cardTemplate, popupPic, popupText, popupImage} from '../utils/constants.js';
export {Card,/**updateLike */ handleButtonDeleteCard};

class Card {
  constructor(data, /*handleclick, handlelike,*/ handleDelete, templateSelector, userId){
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardOwner = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._handleDelete = handleDelete;
    this._templateSelector = templateSelector;
    this._userId = userId;
    
    this._isLiked = false;
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.elements__card')
    .cloneNode(true);
    
    return cardElement;
  }



  isLiked() {
      return Boolean(this._likes.find((likeObj) => {
        return likeObj._id === this._userId;
      }))
  }


  updateLike() {
    const cardElement = this._getElement();
    const likeButton = cardElement.querySelector('.elements__like-button');

    if(isLiked(this._likes, this._userId)){
      likeButton.classList.add('elements__like-button_active');
    } else {
      likeButton.classList.remove('elements__like-button_active');
    }
  }

  displayLikeCounter(likesArray) {
    this._likeCounter.textContent = likesArray;
  }

  createCard() {
    this._element = this._getElement();

    this._element.querySelector('.elements__image').src = this._cardLink;
    this._element.querySelector('.elements__text').textContent = this._cardName;
    this._element.querySelector('.elements__image').alt = this._cardName;
    this._delete = this._element.querySelector('.elements__trash');
    this._likeCounter = this._element.querySelector('.elements__like-counter');


    this.displayLikeCounter(this._likes.length);

    if(this._cardOwner !== this._userId) {
      this._delete.remove();
    }

    this._delete.addEventListener('click', () => { this._handleDelete(this._id, this._element)});

    return this._element;
  }
}


 // объявленная переменная с функцией удаления фото
 const handleButtonDeleteCard = (cardElement) => {
  cardElement.remove()
  cardElement = null
};


const isLiked = (likesArray, userId) => {
  return Boolean(likesArray.find((likeObj) => {
    return likeObj._id === userId
  }))
}

/**const updateLike = (cardElement, likesArray, userId) => {
  const likeButton = cardElement.querySelector('.elements__like-button');
  const likeCounter = cardElement.querySelector('.elements__like-counter');
  
  likeCounter.textContent = likesArray.length;

  if(isLiked(likesArray, this._userId)){
    likeButton.classList.add('elements__like-button_active');
  } else {
    likeButton.classList.remove('elements__like-button_active');
  }
}

//объявленная переменная с функцией создания карточек на сайте
const createCard = function(dataCard, userId, handleChangeLikeCondition, handleDeleteCard){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardName = cardElement.querySelector('.elements__text');
  const likeButton = cardElement.querySelector('.elements__like-button');
  const deleteButton = cardElement.querySelector('.elements__trash');
 
  // элемент получает ссылку, имя и альт из "коробки"
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardName.textContent = dataCard.name;

  updateLike(cardElement, dataCard.likes, userId);

  if(dataCard.owner._id !== userId) {
    deleteButton.remove();
  }

  //слушатель на открытие попап с картинкой

  cardImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupPic.src = cardImage.src;
    popupPic.alt = cardImage.alt;
    popupText.textContent = cardName.textContent;
});
   /** слушатель лайка */
 //  likeButton.addEventListener('click', () => {
 //   handleChangeLikeCondition(dataCard._id, likeButton.classList.contains('elements__like-button_active'), cardElement)
 //  });
   //слушатель на удаление карточки    
 //  deleteButton.addEventListener('click', () => handleDeleteCard(dataCard._id, cardElement));



//  return cardElement;
//}; *