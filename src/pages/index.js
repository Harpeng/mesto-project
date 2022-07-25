import './index.css';
import FormValidator from '../components/FormValidator.js';
import {Popup} from '../components/popup.js';
import {PopupWithImage} from '../components/popup-with-image.js';
import {PopupWithForm} from '../components/popup-with-form.js';
import {
  formChangeAvatar,
  avatar,
  inputChangeAvatar,
  profileChangeAvatarButton,
  profileAddButton,
  profileEditButton,
  formElementEdit,
  formElementAdd,
  inputPlace,
  inputSource,
  cardContainer,
  nameInput,
  jobInput,
  userName,
  userDescription,
  enableValidationConfig,
} from '../utils/constants.js';
import {Card} from '../components/card.js';
import Api from '../components/api.js';
import UserInfo from '../components/userInfo.js';
import Section from '../components/section.js';

let userId = null;

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

// Функция постановки лайка
const handleLike = (cardId, card, isLiked) => {
  api.changeLikeCondition(cardId, isLiked)
    .then((dataFromServer) => {
    card.updateLike(dataFromServer.likes)
  })
    .catch((err) => {
      console.log(`Ошибка изменения лайка: ${err}`);
    })
}

const userInfo = new UserInfo(userName, userDescription, avatar);

api.getAllInfo()
  .then(([cards, user]) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.updateUserInfo();
    userInfo.setUserAvatar(user.avatar);
    userInfo.updateUserAvatar();
    userId = user._id;

    const cardList = new Section(cardContainer, 
      {
      items: cards,
      renderer: (item) => {
        const card = new Card(
          item,
          handleCardClick,
          handleLike,
          handleDeleteCard,
          '.card-template',
          userId);
        const newCard = card.createCard();
        cardList.addItem(newCard);
      }
      }       
    )
    cardList.renderItems();
  })
 
  .catch((err) => {
    console.log(`Ошибка получения информации с сервера: ${err}`)
  })

// слушатели для закрытия по крестику 
const popupEdit = new Popup ('.popup_type-edit');
popupEdit.setEventListener();

const popupAdd = new Popup ('.popup_type-add');
popupAdd.setEventListener();

const popupImage = new PopupWithImage('.popup_type-image');
popupImage.setEventListener();

// открытие попапа с картинкой карточки
const handleCardClick = (name, link) => {
  popupImage.openImage(name, link);
}

// функция формы смены аватара
const handlePopupChangeAvatar = (inputData) => {
  popupChangeAvatar.dataLoading(true);
  api.replaceUserAvatar({avatar: inputData['link-avatar']}) // константу вынести
    .then(() => {
      userInfo.setUserAvatar(inputChangeAvatar.value); // переписать под данные с сервера
      userInfo.updateUserAvatar();
      popupChangeAvatar.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка изменения аватара: ${err}`)
    })
    .finally(() => {
      popupChangeAvatar.dataLoading(false);
    });
}
profileChangeAvatarButton.addEventListener('click', () => {
  changeAvatarValidation.toggleButtonState();
  changeAvatarValidation.hideValidity();
  popupChangeAvatar.openPopup();
});

// создание экземпляра PopupWhithForm для изменения аватара
const popupChangeAvatar = new PopupWithForm('.popup_type-avatar', handlePopupChangeAvatar);
popupChangeAvatar.setEventListener();

// функция формы отправки данных попап редактирования профиля
const handleProfileFormSubmit = () => {                                                                              
  popupEditProfile.dataLoading(true);
  api.editProfile({name: nameInput.value, about: jobInput.value})
    .then(() => {
      userInfo.setUserInfo(nameInput.value, jobInput.value);
      userInfo.updateUserInfo();
    })
    .then(() => {
      popupEditProfile.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка редактирования профиля: ${err}`)
    })
    .finally(() => {
      popupEditProfile.dataLoading(false);
    });
  }

// слушатель на открытия попап с редактированием данных
profileEditButton.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  jobInput.value = getUserInfo.about;
  profileEditValidation.toggleButtonState();
  profileEditValidation.hideValidity();
  popupEdit.openPopup()
});

const popupEditProfile = new PopupWithForm('.popup_type-edit', handleProfileFormSubmit);
popupEditProfile.setEventListener();


//слушатель открытия попап с добавлением карточки
profileAddButton.addEventListener('click', () => {
  profileAddCardValidation.toggleButtonState();
  popupAdd.openPopup();
  profileAddCardValidation.hideValidity();
});

//Функция добавление новых карточек через форму
const addToContainer = () => {
  popupAddCards.dataLoading(true);
  api.addCards({name: inputPlace.value, link: inputSource.value})
    .then((dataFromServer) => {
      const cardSingle = new Section(cardContainer, 
        {items: dataFromServer,
        renderer: (item) => {
          const card = new Card(
            item,
            handleCardClick,
            handleLike,
            handleDeleteCard,
            '.card-template',
            userId);
          const newCard = card.createCard();
          cardSingle.addItem(newCard);
        }
        }       
      )
      cardSingle.renderItem();
      popupAddCards.closePopup();
    })
    .catch((err) => {
      console.log(`Ошибка добавления карточки: ${err}`);
    })
    .finally(() => {
      popupAddCards.dataLoading(false);
    });
};

const popupAddCards = new PopupWithForm('.popup_type-add', addToContainer);
popupAddCards.setEventListener();


// валидация форм в попапах
const profileEditValidation = new FormValidator(enableValidationConfig, formElementEdit);
profileEditValidation.enableValidation();
const profileAddCardValidation = new FormValidator(enableValidationConfig, formElementAdd);
profileAddCardValidation.enableValidation();
const changeAvatarValidation = new FormValidator(enableValidationConfig, formChangeAvatar);
changeAvatarValidation.enableValidation();
