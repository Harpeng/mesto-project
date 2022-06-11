const popupImage = document.querySelector('.popup_type-image');
const popupProfile = document.querySelector('.popup_type-edit')
const cardPopup = document.querySelector('.popup_type-add');
const popup = document.querySelectorAll('.popup');
const popupImgClose = popupImage.querySelector('.popup__close_js-img');
const popupAddClose = document.querySelector('.popup__close-add');
const popupCloseEdit = document.querySelector('.popup__close_edit');
const popupButtonEdit = document.querySelector('.popup__button_js-edit');
const popupButtonAdd = document.querySelector('.popup_js-add-button');
const formElementAdd = document.querySelector('.popup__form_js-add');
const formElement = document.querySelector('.popup__form_js-edit');
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
    popup.classList.add('.popup_is-opened');

};

function closePopup(popup) {
    popup.classList.remove('.popup_is-opened');
};

profileEditButton.addEventListener('click', () => {
    openPopup (popupProfile);

})

console.log(openPopup);



//profileEditButton.addEventListener('click', () => {
  //  popupProfile.classList.add('popup_is-opened');
 //     });//

  