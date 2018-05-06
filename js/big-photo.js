'use strict';

(function () {
  var QUANTITY_AVATARS = 7;

  var bigPictureElement = document.querySelector('.big-picture');

  var bigPictureWrapElement = bigPictureElement.querySelector('.big-picture__img');

  var bigPictureImgElement = bigPictureWrapElement.querySelector('img');

  var likesCountElement = bigPictureElement.querySelector('.likes-count');

  var commentsCountElement = bigPictureElement.querySelector('.comments-count');

  var removeCommentsElement = document.querySelector('.social__comments');

  var commentCountElement = document.querySelector('.social__comment-count');

  var commentLoadmoreElement = document.querySelector('.social__comment-loadmore');

  var photoElements;

  var socialCommentElement = document.querySelector('.social__comment');

  var newSocialCommentElement;

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
    comments.forEach(function (coment) {
      fragment.appendChild(getUsersComments(coment));
    });
    removeCommentsElement.appendChild(fragment);
  };

  var showBigPhoto = function (photo) {
    bigPictureElement.classList.remove('hidden');

    bigPictureImgElement.src = photo.url;
    likesCountElement.textContent = photo.likes;
    commentsCountElement.textContent = photo.comments.length;
  };

  var addClickListPhoto = function (index, photos) {
    photoElements[index].addEventListener('click', function () {
      showBigPhoto(photos[index]);
      showCommentsList(photos[index].comments);
      document.addEventListener('keydown', onFullPhotoEscPress);
    });
  };

  var getPhotoList = function (photos) {
    photoElements = document.querySelectorAll('.picture__link');
    [].forEach.call(photoElements, function (listPhotoClick, index) {
      addClickListPhoto(index, photos);
    });
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

  commentCountElement.classList.add('hidden');
  commentLoadmoreElement.classList.add('hidden');

  window.bigphoto = {
    getPhotoList: getPhotoList
  };
})();
