const popupImage = document.querySelector('.popup_type-image');
const popupProfile = document.querySelector('.popup_type-edit')
const cardPopup = document.querySelector('.popup_type-add');
const popups = document.querySelectorAll('.popup');
const formInputs = document.querySelector('.popup__input')
const popupCloseButtons = document.querySelectorAll('.popup__close')
const popupImgClose = popupImage.querySelector('.popup__close_js-img');
const popupAddClose = document.querySelector('.popup__close_js-add');
const popupCloseEdit = document.querySelector('.popup__close_js-edit');
const popupButtonEdit = document.querySelector('.popup__button_js-edit');
const popupButtonAdd = document.querySelector('.popup_js-add-button');
const formElementAdd = document.querySelector('.popup__form_js-add');
const forms = document.querySelectorAll('.popup__form');
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


// реализация валидации полей
const showInputError = (formElement, inputElement, validationMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup_error_type');
  errorElement.textContent = validationMessage;
  errorElement.classList.add('popup_error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup_error_type');
  errorElement.classList.remove('popup_error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
    });
  });
};

function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit',(evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation()

// функция Закрытие попап через клик по оверлей

function clickOnOverlay (evt) {
  if(evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target.closest('.popup'))
  }
}

// функция закрытие попап через esc (функция)

function keyHandler(evt) {
  const activePopup = document.querySelector('.popup_is-opened')
  if (evt.which === 27) {
    closePopup(activePopup);
  };
} 

// функция открытия попап

function openPopup(popup) {
    popup.classList.add('popup_is-opened');

    document.addEventListener('mousedown', clickOnOverlay);
    document.addEventListener('keydown', keyHandler)
};

// функция закрытия попап

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    
    document.removeEventListener('mousedown', clickOnOverlay);
    document.removeEventListener('keydown', keyHandler)
};

// слушатель на открытия попап с редактированием данных

profileEditButton.addEventListener('click', () => {
    openPopup (popupProfile);
    defaultValueInput (popupProfile);
});

// слушатель на закрытие попап с редактированием данных


popupCloseEdit.addEventListener('click', () => {
    closePopup(popupProfile);
});

// функция формы отправки данных попап редактирования профиля

function formSubmitHandler (evt) {                                                                              
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userDescription.textContent = jobInput.value;

    closePopup(popupProfile);

    userName.value = '';
    userDescription.value = '';

}

//слушатель формы редактирования профиля

formElementEdit.addEventListener('submit', formSubmitHandler);

// функция добавляющаю в форму данные из профиля

function defaultValueInput (popup) {
    nameInput.value = userName.textContent;
    jobInput.value = userDescription.textContent
  };


  //слушатель открытия попап с добавлением карточки

profileAddButton.addEventListener('click', () => {
    openPopup(cardPopup);
});


  //слушатель закрытия попап с добавлением карточки

popupAddClose.addEventListener('click', () => {
    closePopup(cardPopup);
});


  //слушатель закрытия попап с картинкой

popupImgClose.addEventListener('click', () => {
  closePopup(popupImage);
})

// объявленная переменная с функцией удаления фото
const handleClickButtonDelete = function (element) {
    element.remove();
  }

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

// слушатель формы на добавление новых карточек

formElementAdd.addEventListener('submit', addToContainer);

  


