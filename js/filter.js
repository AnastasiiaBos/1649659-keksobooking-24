import {drawAdverts, getOriginalAdverts, setFilteredAdverts, SIMILAR_ADVERTS_COUNT} from './map.js';
import {debounce} from './utils/debounce.js';

const mapFilters = document.querySelector('.map__filters');
const housingTypeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelector('#housing-features');
const features = featuresFilter.querySelectorAll('[name="features"]');

const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const ROOMS_NOT_FOR_GUESTS = 100;

let selectedHousingType;
let selectedPrice;
let selectedRooms;
let selectedGuests;
let selectedFeatures = [];

const filterSimilarAdverts = () => {
  const filteredAdverts = getOriginalAdverts()
    .filter((advert) => {
      if (selectedHousingType && selectedHousingType !== 'any') {
        return advert.offer.type === selectedHousingType;
      }
      return true;
    })
    .filter((advert) => {
      if (selectedPrice && selectedPrice !== 'any') {
        if (selectedPrice === 'low') {
          return advert.offer.price < LOW_PRICE;
        } else if (selectedPrice === 'middle') {
          return advert.offer.price >= LOW_PRICE && advert.offer.price <= HIGH_PRICE;
        } else if (selectedPrice === 'high') {
          return advert.offer.price > HIGH_PRICE;
        }
      } else {
        return true;
      }
    })
    .filter((advert) => {
      if (selectedRooms && selectedRooms !== 'any') {
        return advert.offer.rooms === Number(selectedRooms);
      }
      return true;
    })
    .filter((advert) => {
      if (selectedGuests && selectedGuests !== 'any' && selectedGuests !== '0') {
        return advert.offer.guests >= Number(selectedGuests);
      } else if (selectedGuests === '0') {
        return advert.offer.rooms === ROOMS_NOT_FOR_GUESTS;
      } else {
        return true;
      }
    })
    .filter ((advert) => {
      if (selectedFeatures && selectedFeatures.length > 0) {
        if (advert.offer.features) {
          return selectedFeatures.every((feature) => advert.offer.features.includes(feature));
        }
        return false;
      }
      return true;
    })
    .slice(0, SIMILAR_ADVERTS_COUNT);
  setFilteredAdverts(filteredAdverts);
  const debouncedDrawAdvert = debounce(drawAdverts);
  debouncedDrawAdvert();
};

housingTypeFilter.addEventListener('change', () => {
  selectedHousingType = housingTypeFilter.value;
  filterSimilarAdverts();
});

priceFilter.addEventListener('change', () => {
  selectedPrice = priceFilter.value;
  filterSimilarAdverts();
});

roomsFilter.addEventListener('change', () => {
  selectedRooms = roomsFilter.value;
  filterSimilarAdverts();
});

guestsFilter.addEventListener('change', () => {
  selectedGuests = guestsFilter.value;
  filterSimilarAdverts();
});

featuresFilter.addEventListener('change', () => {
  const selectedFeaturesArray = [];
  features.forEach((feature) => {
    if (feature.checked) {
      selectedFeaturesArray.push(feature.value);
    }
  });
  selectedFeatures = selectedFeaturesArray;
  filterSimilarAdverts();
});
