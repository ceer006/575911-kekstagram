'use strict';

(function () {
  window.backend = {
    getData: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var errorText;
        switch (xhr.status) {
          case 200:
            onSuccess(xhr.response);
            break;
          case 400:
            errorText = 'Неверный запрос';
            break;
          case 401:
            errorText = 'Пользователь не авторизован';
            break;
          case 404:
            errorText = 'Ничего не найдено';
            break;
          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
        if (errorText) {
          onError(errorText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000;

      xhr.open('GET', URL);
      xhr.send();
    },

    postData: function (data, onLoad, onError) {
      var URL = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var errorText;
        switch (xhr.status) {
          case 200:
            onLoad();
            break;
          case 400:
            errorText = 'Неверный запрос';
            break;
          case 401:
            errorText = 'Пользователь не авторизован';
            break;
          case 404:
            errorText = 'Ничего не найдено';
            break;
          default:
            errorText = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
        }
        if (errorText) {
          onError(errorText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Неуспешное выполнение запроса. Попробуйте обновить страницу и повторить запрос');
      });
      xhr.addEventListener('timeout', function () {
        onError('Время ожидания соединения исктекло.');
      });
      xhr.timeout = 10000;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
