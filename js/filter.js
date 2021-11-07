import {drawAdverts, getOriginalAdverts, setFilteredAdverts, SIMILAR_ADVERTS_COUNT} from './map.js';
import {debounce} from './utils/debounce.js';

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const ROOMS_NOT_FOR_GUESTS = 100;

const mapFilters = document.querySelector('.map__filters');
const housingTypeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelector('#housing-features');
const features = featuresFilter.querySelectorAll('input[type=checkbox]');

let selectedHousingType;
let selectedPrice;
let selectedRooms;
let selectedGuests;
let selectedFeatures = [];

const filterHousingType = (advert) => selectedHousingType && selectedHousingType !== 'any' ? advert.offer.type === selectedHousingType : true;

const filterPrice = (advert) => {
  if (selectedPrice && selectedPrice !== 'any') {
    if (selectedPrice === 'low') {
      return advert.offer.price < LOW_PRICE;
    }

    if (selectedPrice === 'middle') {
      return advert.offer.price >= LOW_PRICE && advert.offer.price <= HIGH_PRICE;
    }

    if (selectedPrice === 'high') {
      return advert.offer.price > HIGH_PRICE;
    }
  }

  return true;
};

const filterRooms = (advert) => selectedRooms && selectedRooms !== 'any' ? advert.offer.rooms === Number(selectedRooms) : true;

const filterGuests = (advert) => {
  if (selectedGuests && selectedGuests !== 'any' && selectedGuests !== '0') {
    return advert.offer.guests >= Number(selectedGuests);
  }

  if (selectedGuests === '0') {
    return advert.offer.rooms === ROOMS_NOT_FOR_GUESTS;
  }

  return true;
};

const filterFeatures = (advert) => {
  if (selectedFeatures && selectedFeatures.length > 0) {
    return advert.offer.features ? selectedFeatures.every((feature) => advert.offer.features.includes(feature)) : false;
  }
  return true;
};

const filterAdverts = (advert) => filterHousingType(advert) && filterPrice(advert) && filterRooms(advert) && filterGuests(advert) && filterFeatures(advert);

const showFilteredAdverts = function() {
  const filteredAdverts = getOriginalAdverts()
    .filter(function(advert) {
      if (this.count < SIMILAR_ADVERTS_COUNT && filterAdverts(advert)) {
        this.count++;
        return true;
      }
      return false;
    }, {count: 0});
  setFilteredAdverts(filteredAdverts);
  drawAdverts();
};

const debouncedFilteredAdverts = debounce(showFilteredAdverts);

housingTypeFilter.addEventListener('change', () => {
  selectedHousingType = housingTypeFilter.value;
  debouncedFilteredAdverts();
});

priceFilter.addEventListener('change', () => {
  selectedPrice = priceFilter.value;
  debouncedFilteredAdverts();
});

roomsFilter.addEventListener('change', () => {
  selectedRooms = roomsFilter.value;
  debouncedFilteredAdverts();
});

guestsFilter.addEventListener('change', () => {
  selectedGuests = guestsFilter.value;
  debouncedFilteredAdverts();
});

featuresFilter.addEventListener('change', () => {
  const selectedFeaturesArray = [];
  features.forEach((feature) => {
    if (feature.checked) {
      selectedFeaturesArray.push(feature.value);
    }
  });
  selectedFeatures = selectedFeaturesArray;
  debouncedFilteredAdverts();
});

