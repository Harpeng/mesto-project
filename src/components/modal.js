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