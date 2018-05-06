'use strict';

(function () {
  var Code = {
    SUCCSESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  window.backend = {
    getData: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var errorText;
        switch (xhr.status) {
          case Code.SUCCSESS:
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
          case Code.SUCCSESS:
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
      xhr.timeout = 10000;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
