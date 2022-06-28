//"коробка" из которой загружаются картинки на сайт при обновление страницы
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  //объявленная переменная с функцией создания карточек на сайте
  const createCard = function(initialCards){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__image');
    const cardName = cardElement.querySelector('.elements__text');
    const likeButton = cardElement.querySelector('.elements__like-button');
    const deleteButton = cardElement.querySelector('.elements__trash');

    //реализация лайка
    likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like-button_active');
    })
    
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

     //слушатель на удаление карточки    

    deleteButton.addEventListener('click',() => handleClickButtonDelete(cardElement));
    return cardElement;
  };

 //объявленная переменная с функцией отображения карточек на сайте
const renderCard = function(data,container){
  const card = createCard(data);
  container.prepend(card);
}

initialCards.forEach(function(initialCards){
  renderCard(initialCards, cardContainer);
})   

 //объявленная переменная с функцией добавление новых карточек через форму

const addToContainer = function(evt) {
  evt.preventDefault();

  const input = {name: inputPlace.value, link: inputSource.value};

  renderCard(input, cardContainer);

  closePopup(cardPopup);

  inputPlace.value = '';
  inputSource.value = '';
};

const handleClickButtonDelete = function (element) {
    element.remove();
  }

  // объявленная переменная с функцией удаления фото
