import {disableForm} from './form.js';
import {renderAdvert} from './advert.js';
import {showAlert} from './utils.js';
import {getData} from './api.js';

const address = document.querySelector('#address');

const TOKYO_LATITUDE = 35.68034507280568;
const TOKYO_LONGITUDE = 139.76785003796047;

disableForm(true);

const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${TOKYO_LATITUDE.toFixed(5)}, ${TOKYO_LONGITUDE.toFixed(5)}`;
  })
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

let originalAdverts = [];
let filteredAdverts = [];

export const getOriginalAdverts = () => originalAdverts;

export const setFilteredAdverts = (adverts) => {
  filteredAdverts = adverts;
  console.log(filteredAdverts);
};

const markersGroup = L.layerGroup().addTo(map);

export const drawAdverts = () => {
  markersGroup.clearLayers();
  filteredAdverts.forEach((advert) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markersGroup)
      .bindPopup(renderAdvert(advert));
  });
};

const showAdverts = function (adverts) {
  originalAdverts = adverts;
  setFilteredAdverts(originalAdverts.slice(0, 10));
  drawAdverts();
  disableForm(false);
};

const onFail = () => {
  showAlert('Ошибка запроса!');
  disableForm(false);
};

getData(showAdverts, onFail);

const resetMap = function () {
  map.setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, 13);

  map.closePopup();

  mainMarker.setLatLng({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  });

  address.value = `${TOKYO_LATITUDE.toFixed(5)}, ${TOKYO_LONGITUDE.toFixed(5)}`;
};

export {resetMap};
