//реализация валидации полей
import {enableValidationConfig} from '../utils/constants';

 const showInputError = (errorElement, inputElement, inputErrorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (errorElement, inputElement, inputErrorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
};


const checkInputValidity = (inputElement, formElement, inputErrorClass) => {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if(!isInputValid) {
    showInputError(errorElement, inputElement, inputErrorClass);
  } else {
    hideInputError(errorElement, inputElement, inputErrorClass);
  }
}

const toggleButtonState = (button, isActive = false, inactiveButtonClass)  => {
  if(isActive) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(inactiveButtonClass);
    button.disabled = 'disabled';
  }
 }

 const hideValidity = (formElement) => {
  const activeErrors = formElement.querySelectorAll('.popup__input');
  [...activeErrors].forEach(error => {
    error.classList.remove('popup_error-input')
  })
  const visibleErrors = formElement.querySelectorAll('.popup__error');
  [...visibleErrors].forEach(span => {
    span.textContent = '';
  })
 }

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass,inputErrorClass}) => {
  const inputList = formElement.querySelectorAll(inputSelector);
  const submitButton = formElement.querySelector(submitButtonSelector); 
  Array.from(inputList).forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      const isFormValid = formElement.checkValidity();
      checkInputValidity(inputElement, formElement, inputErrorClass);
      toggleButtonState(submitButton, isFormValid, inactiveButtonClass);
    })
  })
}; 

const enableValidation = ({formSelector, ...rest}) => {
  const forms = document.querySelectorAll(formSelector);
  [...forms].forEach(formElement => {
    setEventListeners(formElement, rest);
  });
}

export {enableValidation, setEventListeners, hideValidity, toggleButtonState, checkInputValidity, hideInputError, showInputError, enableValidationConfig};