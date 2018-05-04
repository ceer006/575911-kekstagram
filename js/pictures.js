'use strict';

(function () {
  var otherUserPhotoElement = document.querySelector('.pictures');

  var pictureTemplateElement = document.querySelector('#picture').content;

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplateElement.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return photoElement;
  };

  var showPhotoList = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    otherUserPhotoElement.appendChild(fragment);
    window.getPhotoList(photos);
    window.photosArray = photos;
  };

  window.backend.getData(showPhotoList, window.utils.createMessage);
})();
