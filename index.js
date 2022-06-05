const profileEditButton = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__close');
const popupButton = document.querySelector('.popup__button');
const popup = document.querySelector('.popup');

profileEditButton.addEventListener('click', () => {
        popup.classList.add('popup_is-opened');
    });

    popupClose.addEventListener('click', () => {
        popup.classList.remove('popup_is-opened');
    });

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__user-name');
const jobInput = document.querySelector('.popup__user-description');

const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');



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
const placeInput = document.querySelector('.popup_js-place');
const sourceInput = document.querySelector('.popup__js-source');
const popupButtonAdd = document.querySelector('.popup_js-add-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_js-add-contain');
const popupAddClose = document.querySelector('.popup_js-add-close');

profileAddButton.addEventListener('click', () => {
    popupAdd.classList.add('popup_is-opened');
});

popupAddClose.addEventListener('click', () => {
    popupAdd.classList.remove('popup_is-opened');
});

function submitHandler (evt) {                                                                              
  evt.preventDefault();
  placeInput.textContent = placeInput.value;
  sourceInput.src = sourceInput.value;

  popupButtonAdd.addEventListener('click', () => {
      popup.classList.add('popup_is-opened');
  });

  popupButtonAdd.addEventListener('click', () => {
      popup.classList.remove('popup_is-opened');
  });
}

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


  const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__card');
  const cardContainer = document.querySelector('.elements__container');
  //const handleClickImage = function(data) {
  //  popupPic.src = initialCards.img;
  //  popupOpen(popupImage);
  //}
  const popupImage = document.querySelector('.popup_type_image');
  const popupPic = popupImage.querySelector('.popup__image');

  const popupOpen = (popupIs) => {
    popup.classList.add('.popup_is-opened');
  };

  const createCard = function(initialCards){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__image');
    const cardBlock = cardElement.querySelector('.elements__card');
    const cardName = cardElement.querySelector('.elements__text');
    const likeButton = cardElement.querySelector('.elements__like-button');
    
    cardImage.src = initialCards.link;
    cardName.textContent = initialCards.name;

    // cardImage.addEventListener('click', () => handleClickImage(data))

    return cardElement;
  }

const renderCard = function(data,container){
  const card = createCard(data);
  container.prepend(card);
}

initialCards.forEach(function(initialCards){
  renderCard(initialCards, cardContainer);
})   

