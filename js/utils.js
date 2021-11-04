import {onSuccessCloseClick, onSuccessCloseKeydown, onFailCloseKeydown, onFailCloseClick} from './form-validation.js';

const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscape = (evt) => evt.key === 'Escape';

const removeSuccessListeners = () => {
  document.removeEventListener('keydown', onSuccessCloseKeydown);
  document.removeEventListener('click', onSuccessCloseClick);
};

const addSuccessListeners = () => {
  document.addEventListener('keydown', onSuccessCloseKeydown);
  document.addEventListener('click', onSuccessCloseClick);
};

const removeFailListeners = () => {
  document.removeEventListener('keydown', onFailCloseKeydown);
  document.removeEventListener('click', onFailCloseClick);
};

const addFailListeners = () => {
  document.addEventListener('keydown', onFailCloseKeydown);
  document.addEventListener('click', onFailCloseClick);
};

export {showAlert, removeSuccessListeners, addSuccessListeners, removeFailListeners, addFailListeners, isEscape};
