import './index.css';
import {enableValidation, hideValidity, toggleButtonState} from '../components/validate.js'
import {defaultValueInput, openPopup, closePopup} from '../components/modal.js';
import {popupCloseChangeAvatar, formChangeAvatar, avatar, inputChangeAvatar, popupButtonChangeAvatar, avatarChangePopup, profileChangeAvatarButton, profileAddButton, profileEditButton, formElementEdit, formElementAdd, popupButtonAdd, popupButtonEdit, popupCloseEdit, popupAddClose, popupImgClose, inputPlace, inputSource, cardContainer, nameInput, jobInput, userName, userDescription, popupProfile, popupImage, cardPopup, enableValidationConfig, dataLoading} from '../utils/constants.js';
import {createCard, updateLike, handleButtonDeleteCard} from '../components/card.js';
import {replaceUserAvatar ,changeLikeCondition, addCards, editProfile, getAllInfo, deleteCards} from '../components/api.js'

 export let userId = null;

getAllInfo()
  .then(([cards, user]) => {
    userName.textContent = user.name;
    userDescription.textContent = user.about;
    avatar.src = user.avatar;
    userId = user._id;

    cards.reverse().forEach((data) => {
      renderCard(data, cardContainer, userId)
    });
  })
    .catch((err) => {
      console.log(`Ошибка получения информации с сервера: ${err}`)
    })
  

    profileChangeAvatarButton.addEventListener('click', () => {
      toggleButtonState(popupButtonChangeAvatar, false, enableValidationConfig.inactiveButtonClass);
      hideValidity(avatarChangePopup);
      openPopup(avatarChangePopup);
    });

    const handleAvatarFormSubmit = (evt) => {
      evt.preventDefault();
      dataLoading(popupButtonChangeAvatar, true);
      replaceUserAvatar({avatar: inputChangeAvatar.value })
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

    formChangeAvatar.addEventListener('submit', handleAvatarFormSubmit);
    popupCloseChangeAvatar.addEventListener('click', () => {
      closePopup(avatarChangePopup);
    })

enableValidation(enableValidationConfig);

// функция формы отправки данных попап редактирования профиля
const handleProfileFormSubmit = (evt) => {                                                                              
  evt.preventDefault();
  dataLoading(popupButtonEdit, true);
  editProfile({name: nameInput.value, about: jobInput.value})
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
  addCards({name: inputPlace.value, link: inputSource.value})
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

const handleChangeLikeCondition = (cardId, isLiked, cardElement) => {
  changeLikeCondition(cardId, isLiked)
    .then((dataFromServer) => {
      updateLike(cardElement,dataFromServer.likes, userId)
    })
    .catch((err) => {
      console.log(`Ошибка изменения лайка: ${err}`);
    })
}

const handleDeleteCard = (cardId, cardElement) => {
  deleteCards(cardId)
    .then(() => {
      handleButtonDeleteCard(cardElement)
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`)
    })
}


//объявленная переменная с функцией отображения карточек на сайте
const renderCard = function(data, container, userId) {
  const card = createCard(data, userId, handleChangeLikeCondition, handleDeleteCard);
  container.prepend(card);
  }

// слушатель формы на добавление новых карточек
formElementAdd.addEventListener('submit', addToContainer);

  
