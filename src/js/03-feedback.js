import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

formElement.addEventListener('input', throttle(onTextInput, 500));
formElement.addEventListener('submit', onFormSubmit);

getStorageData();

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function onTextInput(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (
    formElement.elements.email.value === '' ||
    formElement.elements.message.value === ''
  ) {
    alert('Enter something in field');
  } else {
    console.log(formData);

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    formData = {};
  }
}

function getStorageData() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedData) {
    formElement.elements.email.value = savedData.email || '';
    formElement.elements.message.value = savedData.message || '';
  }
}
