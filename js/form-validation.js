const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const form = document.querySelector('.ad-form');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const rooms = form.querySelector('#room_number');
const guests = form.querySelector('#capacity');

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

price.addEventListener('input', () => {
  const priceValue = price.value;
  if (priceValue > MAX_PRICE) {
    price.setCustomValidity(`Введённое значение не может превышать ${MAX_PRICE}`);
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
});

const CORRESPONDENCE_ROOMS_TO_GUESTS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const isRoomCorrespondToGuests = function() {
  return (CORRESPONDENCE_ROOMS_TO_GUESTS[rooms.value]).indexOf(guests.value) === -1;
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

form.addEventListener('submit', (evt) => {
  if (isRoomCorrespondToGuests()) {
    evt.preventDefault();
    rooms.setCustomValidity('Номер не вмещает выбранное количество гостей');
  } else {
    rooms.setCustomValidity('');
  }
  rooms.reportValidity();
});
