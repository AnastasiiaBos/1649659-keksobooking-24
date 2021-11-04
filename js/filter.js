import {drawAdverts, getOriginalAdverts, setFilteredAdverts} from './map.js';
const mapFilters = document.querySelector('.map__filters');
const housingTypeFilter = mapFilters.querySelector('#housing-type');
// const priceFilter = mapFilters.querySelector('#housing-price');
// const roomsFilter = mapFilters.querySelector('#housing-rooms');
// const guestsFilter = mapFilters.querySelector('#housing-guests');
// const featuresFilter = mapFilters.querySelector('#housing-features');
// const features = featuresFilter.querySelectorAll('[name="features"]');
let selectedHousingType;

const filterSimilarAdverts = () => {
  const filteredAdverts = getOriginalAdverts()
    .filter((advert) => advert.offer.type === selectedHousingType)
    .slice(0, 10);
  setFilteredAdverts(filteredAdverts);
  drawAdverts();
};

housingTypeFilter.addEventListener('change', () => {
  selectedHousingType = housingTypeFilter.value;
  filterSimilarAdverts();
  console.log(selectedHousingType);
});


// priceFilter.addEventListener('change', () => {
//   const selectedPrice = priceFilter.value;
//   console.log(selectedPrice);
// });

// roomsFilter.addEventListener('change', () => {
//   const selectedRooms = roomsFilter.value;
//   console.log(selectedRooms);
// });

// guestsFilter.addEventListener('change', () => {
//   const selectedGuests = guestsFilter.value;
//   console.log(selectedGuests);
// });

// featuresFilter.addEventListener('change', () => {
//   features.forEach ( (feature) => {
//     if (feature.checked) {
//       const selectedFeatures = feature.value;
//       console.log(selectedFeatures);
//     }
//   });
// });

