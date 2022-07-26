import './index.css';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {Card} from '../components/Card.js';
import {Api} from '../components/Api.js';
import {UserInfo} from '../components/UserInfo.js';
import {Section} from '../components/Section.js';
import {
  formChangeAvatar,
  avatarSelector,
  avatarInput,
  profileChangeAvatarButton,
  profileAddButton,
  profileEditButton,
  formElementEdit,
  formElementAdd,
  inputPlace,
  inputSource,
  cardContainer,
  nameInput,
  descInput,
  userNameSelector,
  userDescSelector,
  enableValidationConfig,
  cardTemplateSelector
} from '../utils/constants.js';

let userId = null;

// ФУНКЦИИ
// функциональность карточек
const handleDeleteClick = (cardId, card) => {
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`)
    })
}

const handleLikeClick = (cardId, card, isLiked) => {
  api.changeLikeCondition(cardId, isLiked)
    .then((dataFromServer) => {
    card.updateLike(dataFromServer.likes)
  })
    .catch((err) => {
      console.log(`Ошибка изменения лайка: ${err}`);
    })
}

const handleCardClick = (name, link) => {
  popupWithImage.openImage(name, link);
}

// изменение аватара
const handlePopupChangeAvatar = (inputData) => {
  popupChangeAvatar.dataLoading(true);
  api.replaceUserAvatar({avatar: inputData['link-avatar']})
    .then((user) => {
      userInfo.setUserAvatar(user.avatar);
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

// изменение описания профиля
const handleProfileFormSubmit = () => {
  popupEditProfile.dataLoading(true);
  api.editProfile({name: nameInput.value, about: descInput.value})
    .then((user) => {
      userInfo.setUserInfo(user.name, user.about);
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

// добавление новых карточек через форму
const addToContainer = () => {
  popupAddCards.dataLoading(true);
  api.addCards({name: inputPlace.value, link: inputSource.value})
    .then((dataFromServer) => {
      const cardSingle = new Section(
        {items: dataFromServer,
        renderer: (item) => {
          const card = new Card({
            data:item,
            handleCardClick,
            handleLikeClick,
            handleDeleteClick,
            userId
            },
            cardTemplateSelector);
          const newCard = card.createCard();
          cardSingle.addItem(newCard);
        }
        }, cardContainer
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

// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ
const api = new Api(
  "https://mesto.nomoreparties.co/v1/plus-cohort-13",
  {
    "Content-type": 'application/json',
    "Authorization": '0840f0ca-62bb-451b-9a78-75b4cfb3cc54'
  }
);
const userInfo = new UserInfo(userNameSelector, userDescSelector, avatarSelector);

const popupWithImage = new PopupWithImage('.popup_type-image');
const popupChangeAvatar = new PopupWithForm('.popup_type-avatar', handlePopupChangeAvatar);
const popupEditProfile = new PopupWithForm('.popup_type-edit', handleProfileFormSubmit);
const popupAddCards = new PopupWithForm('.popup_type-add', addToContainer);

// СЛУШАТЕЛИ
// слушатели на кнопки страницы
profileChangeAvatarButton.addEventListener('click', () => {
  changeAvatarValidation.toggleButtonState();
  changeAvatarValidation.hideValidity();
  popupChangeAvatar.openPopup();
});

profileEditButton.addEventListener('click', () => {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.name;
  descInput.value = getUserInfo.about;
  profileEditValidation.toggleButtonState();
  profileEditValidation.hideValidity();
  popupEditProfile.openPopup()
});

profileAddButton.addEventListener('click', () => {
  profileAddCardValidation.toggleButtonState();
  profileAddCardValidation.hideValidity();
  popupAddCards.openPopup();
});

// слушатели на попапы
popupWithImage.setEventListener();
popupChangeAvatar.setEventListener();
popupEditProfile.setEventListener();
popupAddCards.setEventListener();

// ВАЛИДАЦИЯ
const profileEditValidation = new FormValidator(enableValidationConfig, formElementEdit);
profileEditValidation.enableValidation();
const profileAddCardValidation = new FormValidator(enableValidationConfig, formElementAdd);
profileAddCardValidation.enableValidation();
const changeAvatarValidation = new FormValidator(enableValidationConfig, formChangeAvatar);
changeAvatarValidation.enableValidation();

// ЗАПРОС К СЕРВЕРУ
api.getAllInfo()
  .then(([cards, user]) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.updateUserInfo();
    userInfo.setUserAvatar(user.avatar);
    userInfo.updateUserAvatar();
    userId = user._id;

    const cardList = new Section(
      {
      items: cards,
      renderer: (item) => {
        const card = new Card({
          data: item,
          handleCardClick,
          handleLikeClick,
          handleDeleteClick,
          userId
          },
          cardTemplateSelector
          );
        const newCard = card.createCard();
        cardList.addItem(newCard);
      }
      }, cardContainer
    )
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(`Ошибка получения информации о пользователе или карточек: ${err}`)
  })
