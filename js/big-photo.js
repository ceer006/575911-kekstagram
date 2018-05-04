'use strict';

(function () {
  var QUANTITY_AVATARS = 7;

  var bigPictureElement = document.querySelector('.big-picture');

  var bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img');

  var likesCountElement = bigPictureElement.querySelector('.likes-count');

  var commentsCountElement = bigPictureElement.querySelector('.comments-count');

  var removeCommentsElement = document.querySelector('.social__comments');

  var listPhoto;

  var socialCommentElement = document.querySelector('.social__comment');

  var newSocialCommentElement = socialCommentElement.cloneNode(true);

  var fullPhotoCloseElement = document.querySelector('.big-picture__cancel');

  var getUsersComments = function (comment) {
    newSocialCommentElement = socialCommentElement.cloneNode(true);

    newSocialCommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.utils.getRandom(1, QUANTITY_AVATARS) + '.svg';
    newSocialCommentElement.querySelector('p').textContent = comment;

    return newSocialCommentElement;
  };

  var removeSocialComments = function () {
    while (removeCommentsElement.firstChild) {
      removeCommentsElement.removeChild(removeCommentsElement.firstChild);
    }
  };

  var showCommentsList = function (comments) {
    removeSocialComments();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(getUsersComments(comments[i]));
    }
    removeCommentsElement.appendChild(fragment);
  };

  var showBigPhoto = function (photo) {
    bigPictureElement.classList.remove('hidden');

    bigPictureImgElement.querySelector('img').src = photo.url;
    likesCountElement.textContent = photo.likes;
    commentsCountElement.textContent = photo.comments.length;
  };

  var onListPhotoClick = function (index, photos) {
    listPhoto[index].addEventListener('click', function () {
      showBigPhoto(photos[index]);
      showCommentsList(photos[index].comments);
      document.addEventListener('keydown', onFullPhotoEscPress);
    });
  };

  var getPhotoList = function (photos) {
    listPhoto = document.querySelectorAll('.picture__link');
    for (var i = 0; i < listPhoto.length; i++) {
      onListPhotoClick(i, photos);
    }
  };

  var onFullPhotoEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
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
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      closeFullPhoto();
    }
  });

  window.bigphoto = {
    getPhotoList: getPhotoList
  };
})();
