import './index.css';
import FormValidator from '../components/FormValidator.js';
import {Popup} from '../components/popup.js';
import {PopupImage} from '../components/popup-with-image.js';
import {
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
  popupImgClose,
  inputPlace,
  inputSource,
  cardContainer,
  nameInput,
  jobInput,
  userName,
  userDescription,
  popupProfile,
  cardPopup,
  enableValidationConfig,
  dataLoading,
  cardTemplate
} from '../utils/constants.js';
import {Card} from '../components/card.js';
import Api from '../components/api.js';
import UserInfo from '../components/userInfo.js';

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

// открытие попапа с картинкой карточки
//const handleCardClick = (name, link) => {
  //popupWithImage.open(name, link);
//}
//console.log(userName, userDescription);
const userInfo = new UserInfo(userName, userDescription);

api.getAllInfo()
  .then(([cards, user]) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.updateUserInfo();
    userId = user._id

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

    const popupImage = new PopupImage('.popup_type-image');
    popupImage.setEventListener();

    const profileEditValidation = new FormValidator(enableValidationConfig, formElementEdit);
    profileEditValidation.enableValidation();
    const profileAddCardValidation = new FormValidator(enableValidationConfig, formElementAdd);
    profileAddCardValidation.enableValidation();
    const changeAvatarValidation = new FormValidator(enableValidationConfig, formChangeAvatar);
    changeAvatarValidation.enableValidation();
  
    // слушатель на открытие попапа изменения аватара
    profileChangeAvatarButton.addEventListener('click', () => {
      changeAvatarValidation.toggleButtonState();
      changeAvatarValidation.hideValidity();
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
  profileEditValidation.toggleButtonState();
  profileEditValidation.hideValidity();
    popupEdit.openPopup()
    userInfo.setUserInfo ();
});

//слушатель формы редактирования профиля
formElementEdit.addEventListener('submit', handleProfileFormSubmit);



//слушатель закрытия попап с картинкой
popupImgClose.addEventListener('click', () => {
  popupImage.closePopup();
})

//слушатель открытия попап с добавлением карточки
profileAddButton.addEventListener('click', () => {
  profileAddCardValidation.toggleButtonState();
  popupAdd.openPopup();
  profileAddCardValidation.hideValidity();
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
/* const handleChangeLikeCondition = (cardId, isLiked, cardElement) => {
    api.changeLikeCondition(cardId, isLiked)
     .then((dataFromServer) => {
      updateLike(cardElement,dataFromServer.likes, userId)
    })
     .catch((err) => {
       console.log(`Ошибка изменения лайка: ${err}`);
     })
 }
*/

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

  


  
