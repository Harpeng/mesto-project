import './index.css';
import {enableValidation, hideValidity, toggleButtonState} from '../components/validate.js'
import {defaultValueInput, Popup} from '../components/popup.js';
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
import {Card} from '../components/card.js';
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

//функция удаления карточек
const handleDeleteCard = (cardId, card) => {
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`)
    })
}

api.getAllInfo()
  .then(([cards, user]) => {
    userName.textContent = user.name;
    userDescription.textContent = user.about;
    avatar.src = user.avatar;
    userId = user._id;

    cards.reverse().forEach((data) => {
      renderCard(data, handleDeleteCard, cardContainer, userId);
    });
  })
    .catch((err) => {
      console.log(`Ошибка получения информации с сервера: ${err}`)
    })

    // попапы со слушателями !!!
    const popupEdit = new Popup ('.popup_type-edit');
    popupEdit.setEventListener();

    const popupAdd = new Popup ('.popup_type-add');
    popupAdd.setEventListener();

    const popupAvatar = new Popup ('.popup_type-avatar');
    popupAvatar.setEventListener();
  
    // слушатель на открытие попапа изменения аватара
    profileChangeAvatarButton.addEventListener('click', () => {
      toggleButtonState(popupButtonChangeAvatar, false, enableValidationConfig.inactiveButtonClass);
      hideValidity(avatarChangePopup);
      popupAvatar.openPopup();
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
          popupAvatar.closePopup();
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
      popupEdit.closePopup();
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
    popupEdit.openPopup()
    defaultValueInput (popupProfile);
});

//слушатель формы редактирования профиля
formElementEdit.addEventListener('submit', handleProfileFormSubmit);



//слушатель закрытия попап с картинкой
popupImgClose.addEventListener('click', () => {
  closePopup(popupImage);
})

//слушатель открытия попап с добавлением карточки
profileAddButton.addEventListener('click', () => {
  toggleButtonState(popupButtonAdd, false, enableValidationConfig.inactiveButtonClass);
  popupAdd.openPopup();
  hideValidity(cardPopup);
});

//объявленная переменная с функцией добавление новых карточек через форму

const addToContainer = function(evt) {
  evt.preventDefault();
  dataLoading(popupButtonAdd, true);
  api.addCards({name: inputPlace.value, link: inputSource.value})
    .then((dataFromServer) => {
      renderCard(dataFromServer, handleDeleteCard, cardContainer, userId);
    popupAdd.closePopup();
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
// const handleChangeLikeCondition = (cardId, isLiked, cardElement) => {
//   api.changeLikeCondition(cardId, isLiked)
//     .then((dataFromServer) => {
//       updateLike(cardElement,dataFromServer.likes, userId)
//     })
//     .catch((err) => {
//       console.log(`Ошибка изменения лайка: ${err}`);
//     })
// }




//объявленная переменная с функцией отображения карточек на сайте
const renderCard = function(data, handleDelete, container, userId) {
  const card = new Card(
    data, 
    handleDelete,
    '.card-template',
    userId
  );
  const newCard = card.createCard();
  container.prepend(newCard);
  }

// слушатель формы на добавление новых карточек
formElementAdd.addEventListener('submit', addToContainer);

  


  
