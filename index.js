//Реализация модального окна редактирования профиля

const profileEditButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
const popupButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__user-name');
const jobInput = document.querySelector('.popup__user-description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');

profileEditButton.addEventListener('click', () => {
        popup.classList.add('popup_is-opened');
    });

    popupClose.addEventListener('click', () => {
        popup.classList.remove('popup_is-opened');
    });



function formSubmitHandler (evt) {                                                                              
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userDescription.textContent = jobInput.value;

    popupButton.addEventListener('click', () => {
        popup.classList.add('popup_is-opened');
    });

    popupButton.addEventListener('click', () => {
        popup.classList.remove('popup_is-opened');
    });
}

formElement.addEventListener('submit', formSubmitHandler); 



const formElementAdd = document.querySelector('.popup_js-add');
const popupButtonAdd = document.querySelector('.popup_js-add-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_js-add-contain');
const popupAddClose = document.querySelector('.popup_js-add-close');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__card');
const cardContainer = document.querySelector('.elements__container');


// Открытие модального окна с добавлением карточек

profileAddButton.addEventListener('click', () => {
    popupAdd.classList.add('popup_is-opened');
});

popupAddClose.addEventListener('click', () => {
    popupAdd.classList.remove('popup_is-opened');
});


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



  const popupImage = document.querySelector('.popup_type_image');
  const popupPic = popupImage.querySelector('.popup__image');
  const popupText = popupImage.querySelector('.popup__text');
  const buttonClose = popupImage.querySelector('.popup__close_js-img')
  
  buttonClose.addEventListener('click', () => {
    popupImage.classList.remove('popup_is-opened');
  });

  const handleClickButtonDelete = function (element) {
    element.remove();
  }

  
// Реализация загрузки 6 карточек из "коробки" и добавление карточки через попап

  const createCard = function(initialCards){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__image');
    const cardBlock = cardElement.querySelector('.elements__card');
    const cardName = cardElement.querySelector('.elements__text');
    const likeButton = cardElement.querySelector('.elements__like-button');
    const deleteButton = cardElement.querySelector('.elements__trash');

    cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__like-button_active');
    })
    
    cardImage.src = initialCards.link;
    cardImage.alt = initialCards.name
    cardName.textContent = initialCards.name;


    cardImage.addEventListener('click', () => {
      popupImage.classList.add('popup_is-opened');
      popupPic.src = cardImage.src;
      popupPic.alt = cardImage.alt;
      popupText.textContent = cardName.textContent;
  });


    deleteButton.addEventListener('click',() => handleClickButtonDelete(cardElement));
    return cardElement;
  };

const renderCard = function(data,container){
  const card = createCard(data);
  container.prepend(card);
}

initialCards.forEach(function(initialCards){
  renderCard(initialCards, cardContainer);
})   

const addToContainer = function(event) {
  event.preventDefault();

  const inputPlace = event.target.querySelector('.popup_js-add-place');
  const inputSource = event.target.querySelector('.popup_js-add-source')
  const input = {name: inputPlace.value, link: inputSource.value};

  renderCard(input, cardContainer);

};

formElementAdd.addEventListener('submit', addToContainer);