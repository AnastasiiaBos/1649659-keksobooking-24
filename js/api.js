
// import {showAlert} from './utils.js';

const getData = (onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking1',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
