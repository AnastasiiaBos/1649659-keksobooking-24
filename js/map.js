import {activateForm, deactivateForm} from './form.js';
import {createAdverts} from './data.js';
import {renderAdvert} from './advert.js';


const TOKYO_LATITUDE = 35.68034507280568;
const TOKYO_LONGITUDE = 139.76785003796047;
const address = document.querySelector('#address');
const advertArray = createAdverts();

deactivateForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    address.value = `${TOKYO_LATITUDE.toFixed(5)}, ${TOKYO_LONGITUDE.toFixed(5)}`;
  })
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, 10);

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

advertArray.forEach((advert) => {
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
    .addTo(map)
    .bindPopup(renderAdvert(advert));
});
