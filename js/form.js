import {sendData} from './api.js';
import {resetMap} from './map.js';
import {resetPhotos} from './avatar.js';
import {removeSuccessListeners, addSuccessListeners, addFailListeners, removeFailListeners, isEscape} from './utils.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const ACCORDANCE_HOUSES_TO_MINPRICES = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000,
};

const ACCORDANCE_ROOMS_TO_GUESTS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const form = document.querySelector('.ad-form');
const fieldsets = form.querySelectorAll('fieldset');
const title = form.querySelector('#title');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
const rooms = form.querySelector('#room_number');
const guests = form.querySelector('#capacity');
const submit = form.querySelector('.ad-form__submit');
const reset = form.querySelector('.ad-form__reset');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const mapFilters = document.querySelector('.map__filters');
const mapFilter = mapFilters.querySelectorAll('.map__filter');


// Title
title.addEventListener('input', () => {
  const titleLength = title.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Заголовок объявления слишком короткий. Введите ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Заголовок объявления слишком длинный. Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});

// Type of houses
type.addEventListener('change', () => {
  price.placeholder = ACCORDANCE_HOUSES_TO_MINPRICES[type.value];
  price.min = ACCORDANCE_HOUSES_TO_MINPRICES[type.value];
});

// Price
price.addEventListener('input', () => {
  const priceValue = price.value;
  const priceMin = price.min;
  if (priceValue > MAX_PRICE) {
    price.setCustomValidity(`Введённое значение не может превышать ${MAX_PRICE} руб.`);
  } else if (priceValue < priceMin) {
    price.setCustomValidity(`Введённое значение не может быть меньше ${priceMin} руб.`);
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
});

// Check-in, check-out
checkIn.addEventListener('change', () => {
  checkOut.value = checkIn.value;
});

checkOut.addEventListener('change', () => {
  checkIn.value = checkOut.value;
});

// Rooms and guests
const isRoomCorrespondToGuests = function() {
  return ACCORDANCE_ROOMS_TO_GUESTS[rooms.value].indexOf(guests.value) === -1;
};

const isValid = function(input, message) {
  if (isRoomCorrespondToGuests()) {
    input.setCustomValidity(message);
  } else {
    input.setCustomValidity('');
  }
  input.reportValidity();
};

rooms.addEventListener('change', () => isValid(rooms, 'Номер не вмещает выбранное количество гостей'));
guests.addEventListener('change', () => isValid(guests, 'Выбранное количество гостей не соответсвует стандартам номера'));

// Submit button
submit.addEventListener('click', (evt) => {
  if (!title.value) {
    title.setCustomValidity('Заголовок объявления не может быть пустым');
  } else if (!price.value) {
    price.setCustomValidity('Поле с ценой не может быть пустым');
  } else if (price.value < ACCORDANCE_HOUSES_TO_MINPRICES[type.value]) {
    price.setCustomValidity(`Введённое значение не может быть меньше ${ACCORDANCE_HOUSES_TO_MINPRICES[type.value]} руб.`);
  } else if (isRoomCorrespondToGuests()) {
    evt.preventDefault();
    rooms.setCustomValidity('Номер не вмещает выбранное количество гостей');
  } else {
    title.setCustomValidity('');
    price.setCustomValidity('');
    rooms.setCustomValidity('');
  }
  title.reportValidity();
  price.reportValidity();
  rooms.reportValidity();
});

// Reset button
const resetComponent = function() {
  form.reset();
  resetPhotos();
  mapFilters.reset();
  resetMap();
};

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetComponent();
});

// Success Message - объявление успешно размещено
const successElement = successTemplate.cloneNode(true);

const onSuccessCloseKeydown = (evt) => {
  if (isEscape(evt)) {
    successElement.parentNode.removeChild(successElement);
    removeSuccessListeners();
  }
};

const onSuccessCloseClick = () => {
  successElement.parentNode.removeChild(successElement);
  removeSuccessListeners();
};

// Форма успешно отправлена
const onSuccess = function() {
  document.body.appendChild(successElement);
  addSuccessListeners();
  resetComponent();
};

// Error Message - ошибка размещения объявления
const errorElement = errorTemplate.cloneNode(true);

const onFailCloseKeydown = (evt) => {
  if (isEscape(evt)) {
    errorElement.parentNode.removeChild(errorElement);
    removeFailListeners();
  }
};

const onFailCloseClick = () => {
  errorElement.parentNode.removeChild(errorElement);
  removeFailListeners();
};

// Форма не отправлена
const onFail = function() {
  document.body.appendChild(errorElement);
  addFailListeners();
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => onSuccess(),
    () => onFail(),
    new FormData(evt.target),
  );
});

// Активация, деактивация формы и фильтров
const formStatus = function (shouldDisable) {
  if (shouldDisable) {
    form.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
  } else {
    form.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
  }
  fieldsets.forEach((fieldest) => {
    fieldest.disabled = shouldDisable;
  });
  mapFilter.forEach((filter) => {
    filter.disabled = shouldDisable;
  });
};

export {onSuccessCloseKeydown, onSuccessCloseClick, onFailCloseKeydown, onFailCloseClick, formStatus};
