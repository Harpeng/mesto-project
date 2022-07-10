import {openPopup} from './modal';
import {cardTemplate, popupPic, popupText, popupImage} from '../utils/constants.js';
import { data } from 'autoprefixer';



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

const updateLike = (cardElement, likesArray, userId) => {
  const likeButton = cardElement.querySelector('.elements__like-button');
  const likeCounter = cardElement.querySelector('.elements__like-counter');
  
  likeCounter.textContent = likesArray.length;

  if(isLiked(likesArray, userId)){
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
  cardImage.alt = dataCard.name
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
   likeButton.addEventListener('click', () => {
    handleChangeLikeCondition(dataCard._id, likeButton.classList.contains('elements__like-button_active'), cardElement)
   });
   //слушатель на удаление карточки    
   deleteButton.addEventListener('click', () => handleDeleteCard(dataCard._id, cardElement));



  return cardElement;
};

export {createCard, updateLike, handleButtonDeleteCard};