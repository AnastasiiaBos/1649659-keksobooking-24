import {sendData} from './api.js';
import {showAlert} from './utils.js';

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
const title = form.querySelector('#title');
const type = form.querySelector('#type');
const price = form.querySelector('#price');
const checkIn = form.querySelector('#timein');
const checkOut = form.querySelector('#timeout');
const rooms = form.querySelector('#room_number');
const guests = form.querySelector('#capacity');
const submit = form.querySelector('.ad-form__submit');

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

const onSuccess = function(message) {
  console.log(message);
};


form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => onSuccess('success'),
    () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
    new FormData(evt.target),
  );
});
