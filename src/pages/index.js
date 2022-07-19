import './index.css';
import {enableValidation, hideValidity, toggleButtonState} from '../components/validate.js'
import {defaultValueInput, openPopup, closePopup} from '../components/modal.js';
import {
  popupCloseChangeAvatar,
  formChangeAvatar,
  avatar,
  inputChangeAvatar,
  popupButtonChangeAvatar,
  avatarChangePopup,
  profileChangeAvatarButton,
  profileAddButton,
  profileEditButton,
  formElementEdit,
  formElementAdd,
  popupButtonAdd,
  popupButtonEdit,
  popupCloseEdit,
  popupAddClose,
  popupImgClose,
  inputPlace,
  inputSource,
  cardContainer,
  nameInput,
  jobInput,
  userName,
  userDescription,
  popupProfile,
  popupImage,
  cardPopup,
  enableValidationConfig,
  dataLoading,
  cardTemplate
} from '../utils/constants.js';
import {Card, updateLike, handleButtonDeleteCard} from '../components/card.js';
import Api from '../components/api.js'

let userId = null;


 // получение карточек и информации о пользователе с сервера

const api = new Api(
  "https://mesto.nomoreparties.co/v1/plus-cohort-13",
  {
    "Content-type": 'application/json',
    "Authorization": '0840f0ca-62bb-451b-9a78-75b4cfb3cc54'
  }
)


api.getAllInfo()
  .then(([cards, user]) => {
    userName.textContent = user.name;
    userDescription.textContent = user.about;
    avatar.src = user.avatar;
    userId = user._id;

    cards.reverse().forEach((data) => {
      console.log('data', data);
      renderCard(data, cardContainer, userId)
    });
  })
    .catch((err) => {
      console.log(`Ошибка получения информации с сервера: ${err}`)
    })
  
    // слушатель на открытие попапа изменения аватара
    profileChangeAvatarButton.addEventListener('click', () => {
      toggleButtonState(popupButtonChangeAvatar, false, enableValidationConfig.inactiveButtonClass);
      hideValidity(avatarChangePopup);
      openPopup(avatarChangePopup);
    });

    // функция формы смены аватара
    const handleAvatarFormSubmit = (evt) => {
      evt.preventDefault();
      dataLoading(popupButtonChangeAvatar, true);
      api.replaceUserAvatar({avatar: inputChangeAvatar.value })
        .then(() => {
          avatar.src = inputChangeAvatar.value;
        })
        .then(() => {
          closePopup(avatarChangePopup);
          evt.target.reset();
        })
        .catch((err) => {
          console.log(`Ошибка изменения аватара: ${err}`)
        })
        .finally(() => {
          dataLoading(popupButtonChangeAvatar, false);
        });
    }

    // слушатель на отправку сабмита попапа изменения аватара
    formChangeAvatar.addEventListener('submit', handleAvatarFormSubmit);

    // слушатель на закратие попапа изменение аватара
    popupCloseChangeAvatar.addEventListener('click', () => {
      closePopup(avatarChangePopup);
    })

    // вызвана функция проверки валидности
enableValidation(enableValidationConfig);

// функция формы отправки данных попап редактирования профиля
const handleProfileFormSubmit = (evt) => {                                                                              
  evt.preventDefault();
  dataLoading(popupButtonEdit, true);
  api.editProfile({name: nameInput.value, about: jobInput.value})
    .then(() => {
      userName.textContent = nameInput.value;
      userDescription.textContent = jobInput.value;
    })
    .then(() => {
      closePopup(popupProfile);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка редактирования профиля: ${err}`)
    })
    .finally(() => {
      dataLoading(popupButtonEdit, false);
    });
  }


// слушатель на открытия попап с редактированием данных
profileEditButton.addEventListener('click', () => {
  toggleButtonState(popupButtonEdit, false, enableValidationConfig.inactiveButtonClass);
    hideValidity(popupProfile);
    openPopup (popupProfile);
    defaultValueInput (popupProfile);
});

// слушатель на закрытие попап с редактированием данных
popupCloseEdit.addEventListener('click', () => {
    closePopup(popupProfile);
});

//слушатель формы редактирования профиля
formElementEdit.addEventListener('submit', handleProfileFormSubmit);


//слушатель закрытия попап с добавлением карточки
popupAddClose.addEventListener('click', () => {
    closePopup(cardPopup);
});

//слушатель закрытия попап с картинкой
popupImgClose.addEventListener('click', () => {
  closePopup(popupImage);
})

//слушатель открытия попап с добавлением карточки
profileAddButton.addEventListener('click', () => {
  toggleButtonState(popupButtonAdd, false, enableValidationConfig.inactiveButtonClass);
  openPopup(cardPopup);
  hideValidity(cardPopup);
});

//объявленная переменная с функцией добавление новых карточек через форму

const addToContainer = function(evt) {
  evt.preventDefault();
  dataLoading(popupButtonAdd, true);
  api.addCards({name: inputPlace.value, link: inputSource.value})
    .then((dataFromServer) => {
      renderCard(dataFromServer, cardContainer, userId);
    closePopup(cardPopup);
    evt.target.reset();
  })
    .catch((err) => {
      console.log(`Ошибка добавления карточки: ${err}`);
    })
    .finally(() => {
      dataLoading(popupButtonAdd, false);
    });
};

// функция изменения лайка
const handleChangeLikeCondition = (cardId, isLiked, cardElement) => {
  api.changeLikeCondition(cardId, isLiked)
    .then((dataFromServer) => {
      updateLike(cardElement,dataFromServer.likes, userId)
    })
    .catch((err) => {
      console.log(`Ошибка изменения лайка: ${err}`);
    })
}

//функция удаления карточек
const handleDeleteCard = (cardId, cardElement) => {
  api.deleteCards(cardId)
    .then(() => {
      handleButtonDeleteCard(cardElement)
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`)
    })
}


//объявленная переменная с функцией отображения карточек на сайте
const renderCard = function(data, container, userId) {
  //const card = createCard(data, userId, handleChangeLikeCondition, handleDeleteCard);

  const card = new Card(
    data,
    '.card-template',
    userId
  );
  //console.log(card);
  const newCard = card.createCard()
  container.prepend(newCard);
  }

// слушатель формы на добавление новых карточек
formElementAdd.addEventListener('submit', addToContainer);

  


  
