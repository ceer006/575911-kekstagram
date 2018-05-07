'use strict';

(function () {
  var lastTimeout;

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
      node.style.background = 'red';
      node.style.left = 0;
      node.style.right = 0;
      node.style.top = '60px';
      node.style.fontSize = '24px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    debounce: function (fun, interval) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, interval);
    }
  };
})();
