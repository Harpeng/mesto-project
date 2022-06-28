//реализация валидации полей

const enableValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup_error-input',
    errorClass: 'popup__error_visible'
  }; 
  
   const showInputError = (errorElement, inputElement, config) => {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  
  const hideInputError = (errorElement, inputElement, config) => {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
  };
  
  
  const checkInputValidity = (inputElement, formElement, config) => {
    const isInputValid = inputElement.validity.valid;
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    if(!isInputValid) {
      showInputError(errorElement, inputElement, config);
    } else {
      hideInputError(errorElement, inputElement, config);
    }
  }
  
  
  const setEventListeners = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector); 
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        checkInputValidity(input, formElement, config);
        toggleButtonState(submitButton, formElement.checkValidity(), config);
      })
    })
  }; 
  
  const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    [...forms].forEach(form => {
      setEventListeners(form, config);
    });
  }
  
  
 export default enableValidation(enableValidationConfig)
  
   const toggleButtonState = (button, isActive = false, config)  => {
    if(isActive) {
      button.classList.remove(config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(config.inactiveButtonClass);
      button.disabled = 'disabled';
    }
   }

   const setInitialState = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);

    inputList.forEach(input => {
        hideInputError(input);
        toggleButtonState();
      })
    }