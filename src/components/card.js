export {Card};

class Card {
  constructor(data, handleLike, handleDelete, templateSelector, userId){
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardOwner = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._handleDelete = handleDelete;
    this._handleLike = handleLike;
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

    this._element.querySelector('.elements__image').src = this._cardLink;
    this._element.querySelector('.elements__text').textContent = this._cardName;
    this._element.querySelector('.elements__image').alt = this._cardName;
    this._deleteBtn = this._element.querySelector('.elements__trash');
    this._likeBtn = this._element.querySelector('.elements__like-button');
    this._likeCounter = this._element.querySelector('.elements__like-counter');

   this.updateLike(this._likes);

    if(this._cardOwner !== this._userId) {
      this._deleteBtn.remove();
    }

    this._likeBtn.addEventListener('click', () => { this._handleLike(this._id, this, this._isLiked()) });
    this._deleteBtn.addEventListener('click', () => { this._handleDelete(this._id, this) });
    return this._element;
  
  }
}

//объявленная переменная с функцией создания карточек на сайте
// const createCard = function(dataCard, userId, handleChangeLikeCondition, handleDeleteCard){
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImage = cardElement.querySelector('.elements__image');
//   const cardName = cardElement.querySelector('.elements__text');
//   const likeButton = cardElement.querySelector('.elements__like-button');
//   const deleteButton = cardElement.querySelector('.elements__trash');
 
//   // элемент получает ссылку, имя и альт из "коробки"
//   cardImage.src = dataCard.link;
//   cardImage.alt = dataCard.name;
//   cardName.textContent = dataCard.name;

//   updateLike(cardElement, dataCard.likes, userId);

//   if(dataCard.owner._id !== userId) {
//     deleteButton.remove();
//   }

//   //слушатель на открытие попап с картинкой

//   cardImage.addEventListener('click', () => {
//     openPopup(popupImage);
//     popupPic.src = cardImage.src;
//     popupPic.alt = cardImage.alt;
//     popupText.textContent = cardName.textContent;
// });
   /** слушатель лайка */
 //  likeButton.addEventListener('click', () => {
 //   handleChangeLikeCondition(dataCard._id, likeButton.classList.contains('elements__like-button_active'), cardElement)
 //  });
   //слушатель на удаление карточки    
 //  deleteButton.addEventListener('click', () => handleDeleteCard(dataCard._id, cardElement));



//  return cardElement;
//};