'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');

  var bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img');

  var removeComentsElement = document.querySelector('.social__comments');

  var listPhoto = document.querySelectorAll('.picture__link');

  var socialComentElement = document.querySelector('.social__comment');

  var newSocialComentElement = socialComentElement.cloneNode(true);

  var fullPhotoCloseElement = document.querySelector('.big-picture__cancel');

  var getUsersComents = function (coment) {
    newSocialComentElement = socialComentElement.cloneNode(true);

    newSocialComentElement.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandom(1, 7) + '.svg';
    newSocialComentElement.querySelector('p').textContent = coment;

    return newSocialComentElement;
  };

  var removeSocialComents = function () {
    while (removeComentsElement.firstChild) {
      removeComentsElement.removeChild(removeComentsElement.firstChild);
    }
  };

  var showComentsList = function (coments) {
    removeSocialComents();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < coments.length; i++) {
      fragment.appendChild(getUsersComents(coments[i]));
    }
    removeComentsElement.appendChild(fragment);
  };

  var showBigPhoto = function (photo) {
    bigPictureElement.classList.remove('hidden');

    bigPictureImgElement.querySelector('img').src = photo.url;
    document.querySelector('.likes-count').textContent = photo.likes;
    document.querySelector('.comments-count').textContent = photo.coments.length;
  };

  var onListPhotoClick = function (index) {
    listPhoto[index].addEventListener('click', function () {
      showBigPhoto(window.photos[index]);
      showComentsList(window.photos[index].coments);
      document.addEventListener('keydown', onFullPhotoEscPress);
    });
  };

  for (var i = 0; i < listPhoto.length; i++) {
    onListPhotoClick(i);
  }

  var onFullPhotoEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeFullPhoto();
    }
  };

  var closeFullPhoto = function () {
    bigPictureElement.classList.add('hidden');
    document.removeEventListener('keydown', onFullPhotoEscPress);
  };

  fullPhotoCloseElement.addEventListener('click', function () {
    closeFullPhoto();
  });

  fullPhotoCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closeFullPhoto();
    }
  });
})();
