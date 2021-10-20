import {createAdverts} from './data.js';

const advertInsertBlock = document.querySelector('.map__canvas');
const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const TYPES_OF_HOUSES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarAdverts = createAdverts();
const advertFragment = document.createDocumentFragment();

const renderAdvert = function ({author, offer}) {
  const advertElement = advertTemplate.cloneNode(true);
  const hideElement = (className) => advertElement.querySelector(className).classList.add('hidden');

  // Features
  const advertFeatures = offer.features;
  const popupFeaturesContainer = advertElement.querySelector('.popup__features');
  const popupFeaturesList = popupFeaturesContainer.querySelectorAll('.popup__feature');

  if (advertFeatures) {
    popupFeaturesList.forEach((popupFeaturesItem) => {
      const isNecessary = advertFeatures.some(
        (advertFeature) => popupFeaturesItem.classList.contains(`popup__feature--${advertFeature}`),
      );

      if (!isNecessary) {
        popupFeaturesItem.remove();
      }
    });
  } else {
    hideElement('.popup__features');
  }

  // Photos
  const advertPhotos = offer.photos;
  const popupPhotosContainer = advertElement.querySelector('.popup__photos');
  const popupPhotosList = popupPhotosContainer.querySelector('.popup__photo');

  if (advertPhotos) {
    advertPhotos.forEach((advertPhoto) => {
      const popupPhotosListClone = popupPhotosList.cloneNode(true);
      popupPhotosListClone.src = advertPhoto;
      popupPhotosContainer.appendChild(popupPhotosListClone);
      popupPhotosList.remove();
    });
  } else {
    hideElement('.popup__photos');
  }

  // Проверяем, есть ли данные для заполнения (textContent)
  const addTextContentIfExists = function (content, classAdvert) {
    if (content) {
      advertElement.querySelector(classAdvert).textContent = content;
    } else {
      hideElement(classAdvert);
    }
  };

  // Title, address, type, description
  addTextContentIfExists(offer.title, '.popup__title');
  addTextContentIfExists(offer.address, '.popup__text--address');
  addTextContentIfExists(TYPES_OF_HOUSES[offer.type], '.popup__type');
  addTextContentIfExists(offer.description, '.popup__description');

  // Price, capacity, time
  if (offer.price) {
    advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  } else {
    hideElement('.popup__text--price');
  }

  if (offer.rooms && offer.guests) {
    advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  } else {
    hideElement('.popup__text--capacity');
  }

  if (offer.checkin && offer.checkout) {
    advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    hideElement('.popup__text--time');
  }

  // Проверяем, есть ли данные для заполнения (src)
  const addSrcIfExists = function (content, classAdvert) {
    if (content) {
      advertElement.querySelector(classAdvert).src = content;
    } else {
      hideElement(classAdvert);
    }
  };

  // avatar
  addSrcIfExists(author.avatar, '.popup__avatar');

  advertFragment.appendChild(advertElement);
};

const addAdvert = (index) => {
  renderAdvert(similarAdverts[index]);
  advertInsertBlock.appendChild(advertFragment);
};

export {addAdvert};
