'use strict';

(function () {
  var lastTimeout;

  var errorMessageElement;

  var DELETE_MESSAGE_TIMEOUT = 3000;

  var deleteBlockMessage = function () {
    errorMessageElement.remove();
  };

  window.utils = {
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    createMessage: function (errorMessage) {
      var node = document.createElement('div');
      node.classList.add('error-message');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center;';
      node.style.position = 'absolute';
      node.style.color = 'red';
      node.style.background = '#232321';
      node.style.left = 0;
      node.style.right = 0;
      node.style.height = '45px';
      node.style.padding = '10px';
      node.style.top = '15px';
      node.style.fontSize = '24px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
      errorMessageElement = document.querySelector('.error-message');
    },
    deleteMessage: function () {
      if (errorMessageElement) {
        setTimeout(deleteBlockMessage, DELETE_MESSAGE_TIMEOUT);
      }
    },
    debounce: function (fun, interval) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, interval);
    }
  };
})();
