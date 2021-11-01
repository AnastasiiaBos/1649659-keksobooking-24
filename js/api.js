
import {showAlert} from './utils.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      showAlert('Ошибка запроса!');
    });
};


export {getData};
