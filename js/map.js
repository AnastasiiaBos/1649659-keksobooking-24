import {formStatus} from './form.js';
import {renderAdvert} from './advert.js';
import {showAlert} from './utils.js';
import {getData} from './api.js';

const address = document.querySelector('#address');

const MAP_ZOOM = 13;
const TOKYO_LATITUDE = 35.68034507280568;
const TOKYO_LONGITUDE = 139.76785003796047;
const SIMILAR_ADVERTS_COUNT = 10;

formStatus(true);

const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${TOKYO_LATITUDE.toFixed(5)}, ${TOKYO_LONGITUDE.toFixed(5)}`;
  })
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, MAP_ZOOM);

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

const getOriginalAdverts = () => originalAdverts;

const setFilteredAdverts = (adverts) => {
  filteredAdverts = adverts;
};

const markersGroup = L.layerGroup().addTo(map);

const drawAdverts = () => {
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
  setFilteredAdverts(originalAdverts.slice(0, SIMILAR_ADVERTS_COUNT));
  drawAdverts();
  formStatus(false);
};

const onFail = () => {
  showAlert('Произошла ошибка. Обновите страницу!');
  formStatus(false);
};

getData(showAdverts, onFail);

const resetMap = function () {
  map.setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, MAP_ZOOM);

  map.closePopup();

  mainMarker.setLatLng({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  });

  address.value = `${TOKYO_LATITUDE.toFixed(5)}, ${TOKYO_LONGITUDE.toFixed(5)}`;
};

export {getOriginalAdverts, setFilteredAdverts, drawAdverts, resetMap, SIMILAR_ADVERTS_COUNT};
