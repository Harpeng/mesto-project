const popupImage = document.querySelector('.popup_type-image');
const popupProfile = document.querySelector('.popup_type-edit')
const cardPopup = document.querySelector('.popup_type-add');
const popup = document.querySelectorAll('.popup');
const popupImgClose = popupImage.querySelector('.popup__close_js-img');
const popupAddClose = document.querySelector('.popup__close_js-add');
const popupCloseEdit = document.querySelector('.popup__close_js-edit');
const popupButtonEdit = document.querySelector('.popup__button_js-edit');
const popupButtonAdd = document.querySelector('.popup_js-add-button');
const formElementAdd = document.querySelector('.popup__form_js-add');
const formElementEdit = document.querySelector('.popup__form_js-edit');
const inputPlace = document.querySelector('.popup_js-add-place');
const inputSource = document.querySelector('.popup_js-add-source');
const profileEditButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__user-name');
const jobInput = document.querySelector('.popup__user-description');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__subtitle');
const profileAddButton = document.querySelector('.profile__add-button');
const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__card');
const cardContainer = document.querySelector('.elements__container');
const popupPic = popupImage.querySelector('.popup__image');
const popupText = popupImage.querySelector('.popup__text');


function openPopup(popup) {
    popup.classList.add('popup_is-opened');

};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
};

profileEditButton.addEventListener('click', () => {
    openPopup (popupProfile);
    defaultValueInput (popupProfile);
});

popupCloseEdit.addEventListener('click', () => {
    closePopup(popupProfile);
});

function formSubmitHandler (evt) {                                                                              
    evt.preventDefault();
    
    userName.textContent = nameInput.value;
    userDescription.textContent = jobInput.value;

    evt.target.reset()
}

formElementEdit.addEventListener('submit', formSubmitHandler);

popupButtonEdit.addEventListener('click', () => {
    closePopup(popupProfile);
});

function defaultValueInput (popup) {
    nameInput.value = userName.textContent;
    jobInput.value = userDescription.textContent
  };

profileAddButton.addEventListener('click', () => {
    openPopup(cardPopup);
});

popupAddClose.addEventListener('click', () => {
    closePopup(cardPopup);
});

const handleClickButtonDelete = function (element) {
    element.remove();
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

  const createCard = function(initialCards){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.elements__image');
    const cardBlock = cardElement.querySelector('.elements__card');
    const cardName = cardElement.querySelector('.elements__text');
    const likeButton = cardElement.querySelector('.elements__like-button');
    const deleteButton = cardElement.querySelector('.elements__trash');

    likeButton.addEventListener('click', function (evt) {
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

const addToContainer = function(evt) {
  evt.preventDefault();

  const input = {name: inputPlace.value, link: inputSource.value};

  renderCard(input, cardContainer);

  closePopup(cardPopup);

  inputPlace.value = '';
  inputSource.value = '';
};

formElementAdd.addEventListener('submit', addToContainer);

popupImgClose.addEventListener('click', () => {
    closePopup(popupImage);
})
  