//реализация валидации полей
export default class FormValidator {
  constructor(enableValidationConfig, formElement) {
    this._enableValidationConfig = enableValidationConfig;
    this._formElement = formElement;
    this._button = this._formElement.querySelector(this._enableValidationConfig.submitButtonSelector);
  }
    _showInputError = (errorElement, inputElement) => {
      inputElement.classList.add(this._enableValidationConfig.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
    };
    
    _hideInputError = (errorElement, inputElement) => {
      inputElement.classList.remove(this._enableValidationConfig.inputErrorClass);
      errorElement.textContent = "";
    };
    
    
    _checkInputValidity = (inputElement) => {
      const isInputValid = inputElement.validity.valid;
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    
      if(!isInputValid) {
        this._showInputError(errorElement, inputElement);
      } else {
        this._hideInputError(errorElement, inputElement);
      }
    }
    
    toggleButtonState = (isActive = false)  => {
      if(isActive) {
        this._button.classList.remove(this._enableValidationConfig.inactiveButtonClass);
        this._button.disabled = false;
      } else {
        this._button.classList.add(this._enableValidationConfig.inactiveButtonClass);
        this._button.disabled = 'disabled';
      }
     }
    
     hideValidity = () => {
      const activeErrors = this._formElement.querySelectorAll(this._enableValidationConfig.inputSelector);
      [...activeErrors].forEach(error => {
        error.classList.remove(this._enableValidationConfig.inputErrorClass);
      })
      const visibleErrors = this._formElement.querySelectorAll(this._enableValidationConfig.spanSelector);
      [...visibleErrors].forEach(span => {
        span.textContent = '';
      })
     }
    
    _setEventListeners = () => {
      const inputList = this._formElement.querySelectorAll(this._enableValidationConfig.inputSelector); 
      Array.from(inputList).forEach(inputElement => {
        inputElement.addEventListener('input', () => {
          const isFormValid = this._formElement.checkValidity();
          this._checkInputValidity(inputElement, this._formElement, this._enableValidationConfig.inputErrorClass);
          this.toggleButtonState(this._button, isFormValid, this._enableValidationConfig.inactiveButtonClass);
        })
      })
    }; 
    
    enableValidation = () => {
      this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
      this._setEventListeners();
    }
  }


