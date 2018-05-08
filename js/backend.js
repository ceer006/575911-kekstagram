'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/kekstagram';

  var TIMEOUT = 10000;

  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  window.backend = {
    getData: function (onSuccess, onError) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var errorText;
        switch (xhr.status) {
          case Code.SUCCESS:
            onSuccess(xhr.response);
            break;
          case Code.BAD_REQUEST:
            errorText = 'Неверный запрос';
            break;
          case Code.UNAUTHORIZED:
            errorText = 'Пользователь не авторизован';
            break;
          case Code.NOT_FOUND:
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

      xhr.timeout = TIMEOUT;

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },

    postData: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        var errorText;
        switch (xhr.status) {
          case Code.SUCCESS:
            onLoad();
            break;
          case Code.BAD_REQUEST:
            errorText = 'Неверный запрос';
            break;
          case Code.UNAUTHORIZED:
            errorText = 'Пользователь не авторизован';
            break;
          case Code.NOT_FOUND:
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
      xhr.timeout = TIMEOUT;
      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
