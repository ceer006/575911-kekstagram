'use strict';

(function () {
  var otherUserPhotoElement = document.querySelector('.pictures');

  var imgFiltersElement = document.querySelector('.img-filters');

  var pictureTemplateElement = document.querySelector('#picture').content;

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplateElement.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return photoElement;
  };

  var onLoad = function (photos) {
    showPhotoList(photos);
    imgFiltersElement.classList.remove('img-filters--inactive');
    window.filters.initializeData(photos);
  };

  var showPhotoList = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });
    otherUserPhotoElement.appendChild(fragment);

    window.bigphoto.getPhotoList(photos);
  };

  window.backend.getData(onLoad, window.utils.createMessage);

  window.picture = {
    showPhotoList: showPhotoList,
    otherUserPhotoElement: otherUserPhotoElement
  };
})();
