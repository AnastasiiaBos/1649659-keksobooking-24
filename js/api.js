const URL_GET = 'https://24.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(URL_GET)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_SEND,
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
