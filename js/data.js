import {getRandomInt, getRandomFloat, getRandomArrayElement, getRandomArray, createAvatarNumber} from './utils.js';

const PRICE_MIN = 50000;
const PRICE_MAX = 300000;
const ROOM_MAX = 6;
const GUESTS_MAX = 6;
const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGITUDE_MIN = 139.70000;
const LONGITUDE_MAX = 139.80000;

const TITLES = [
  'Свободная квартира!',
  'Лучшее жилье для Вас',
  'Именно то, что Вы давно искали',
  'Стильно, со вкусом и дорого!',
  'Срочно!',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_CHEKOUT = [
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

const DESCRIPTIONS = [
  'Прекрасное жилье для платежеспособных арендаторов.',
  'Удобная, комфортная квартира, полностью меблированная, с новой техникой.',
  'Светлая уютная квартирка для настоящих ценителей комфорта.',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAdvert = function () {
  const location = {
    lat: getRandomFloat(LATITUDE_MIN, LATITUDE_MAX, 5),
    lng: getRandomFloat(LONGITUDE_MIN, LONGITUDE_MAX, 5),
  };

  return {
    author: {
      avatar: `img/avatars/user${createAvatarNumber(getRandomInt(1, 9))}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomInt(PRICE_MIN, PRICE_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(1, ROOM_MAX),
      guests: getRandomInt(1, GUESTS_MAX),
      checkin: getRandomArrayElement(CHECKIN_CHEKOUT),
      checkout: getRandomArrayElement(CHECKIN_CHEKOUT),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: location,
  };
};

// eslint-disable-next-line no-unused-vars
const  createAdverts = () => Array.from({length: 10}, (item, index) => createAdvert(index));


export {createAdverts};
