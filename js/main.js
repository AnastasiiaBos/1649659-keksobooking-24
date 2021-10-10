/* eslint-disable prefer-template */
function getRandomInt (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomFloat (min, max, digits) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const PRICE_MIN = 50000;
const PRICE_MAX = 300000;
const ROOM_MAX = 6;
const GUESTS_MAX = 6;
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;

const TITLE = [
  'Свободная квартира!',
  'Лучшее жилье для Вас',
  'Именно то, что Вы давно искали',
  'Стильно, со вкусом и дорого!',
  'Срочно!',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Прекрасное жилье для платежеспособных арендаторов.',
  'Удобная, комфортная квартира, полностью меблированная, с новой техникой.',
  'Светлая уютная квартирка для настоящих ценителей комфорта.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomArrayElement = function (element) {
  return element[getRandomInt(0, element.length - 1)];
};

const getRandomAvatarNumber = function () {
  const randomAvatarNumber = getRandomInt(1, 10);
  if (randomAvatarNumber < 10) {
    return '0' + randomAvatarNumber;
  }
  return randomAvatarNumber;
};

const advert = function () {
  const location = {
    lat: getRandomFloat(LATITUDE_MIN, LATITUDE_MAX, 5),
    lng: getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, 5),
  };

  return {
    author: {
      avatar: 'img/avatars/user' + getRandomAvatarNumber() + '.png',
    },
    offer: {
      title: getRandomArrayElement(TITLE),
      address: location.lat + ', ' + location.lng,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(TYPE),
      rooms: getRandomInt(1, ROOM_MAX),
      guests: getRandomInt(1, GUESTS_MAX),
      checkin: getRandomArrayElement(CHECKIN_OUT),
      checkout: getRandomArrayElement(CHECKIN_OUT),
      features: getRandomArrayElement(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayElement(PHOTOS),
    },
    location: location,
  };
};

// eslint-disable-next-line no-unused-vars
const advertArray = Array.from({length: 10}, advert);
