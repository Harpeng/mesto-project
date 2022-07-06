import {openPopup} from './modal';
import {cardTemplate, popupPic, popupText, popupImage} from '../utils/constants.js';
 // объявленная переменная с функцией удаления фото
 const handleDeleteCard = (evt) => {
  evt.target.closest('.elements__card').remove();
};

const handleClickLikeButton = function(evt) {
  evt.target.classList.toggle('elements__like-button_active');
}

//объявленная переменная с функцией создания карточек на сайте
const createCard = function(initialCards){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardName = cardElement.querySelector('.elements__text');
  const likeButton = cardElement.querySelector('.elements__like-button');
  const deleteButton = cardElement.querySelector('.elements__trash');

  // элемент получает ссылку, имя и альт из "коробки"
  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name
  cardName.textContent = initialCards.name;

  //слушатель на открытие попап с картинкой

  cardImage.addEventListener('click', () => {
    openPopup(popupImage);
    popupPic.src = cardImage.src;
    popupPic.alt = cardImage.alt;
    popupText.textContent = cardName.textContent;
});
   /** слушатель лайка */
   likeButton.addEventListener('click', handleClickLikeButton)
   //слушатель на удаление карточки    
   deleteButton.addEventListener('click', handleDeleteCard);

  return cardElement;
};

export {createCard};