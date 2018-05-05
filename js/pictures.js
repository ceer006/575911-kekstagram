'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var photosArray = [];

  var filterId;

  var photosArraySort;

  var otherUserPhotoElement = document.querySelector('.pictures');

  var imgFiltersElement = document.querySelector('.img-filters');

  var filtersButtonElement = document.querySelectorAll('.img-filters__button');

  var pictureTemplateElement = document.querySelector('#picture').content;

  var renderPhoto = function (photo) {
    var photoElement = pictureTemplateElement.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
    photoElement.querySelector('.picture__stat--comments').textContent = photo.comments.length;

    return photoElement;
  };

  var onLoad = function (photos) {
    photosArray = photos;
    showPhotoList(photosArray);
    imgFiltersElement.classList.remove('img-filters--inactive');
  };

  var showPhotoList = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    otherUserPhotoElement.appendChild(fragment);

    window.bigphoto.getPhotoList(photos);
  };

  var sortByLikes = function (arr) {
    return arr.slice().sort(function (first, second) {
      return second.likes - first.likes;
    });
  };


  var sortByComments = function (arr) {
    return arr.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };


  var sortByRandom = function (arr) {
    return arr.slice().sort(function () {
      return Math.random() - 0.5;
    });
  };

  var removePhotoList = function () {
    var removePicturesElement = otherUserPhotoElement.querySelectorAll('.picture__link');
    [].forEach.call(removePicturesElement, function (removingPicture) {
      removingPicture.remove();
    });
  };

  var applyFilter = function () {
    switch (filterId) {
      case 'filter-recommended':
        photosArraySort = photosArray;
        break;
      case 'filter-popular':
        photosArraySort = sortByLikes(photosArraySort);
        break;
      case 'filter-discussed':
        photosArraySort = sortByComments(photosArraySort);
        break;
      case 'filter-random':
        photosArraySort = sortByRandom(photosArraySort);
        break;
    }

  };

  var onFilterPhotoClick = function (evt) {
    filterId = evt.target.id;
    applyFilter();
    removePhotoList();
    showPhotoList(photosArraySort);
    window.debounce(showPhotoList, DEBOUNCE_INTERVAL);
  };

  [].forEach.call(filtersButtonElement, function (filter) {
    filter.addEventListener('click', onFilterPhotoClick);
  });

  window.backend.getData(onLoad, window.utils.createMessage);

  window.picture = {
    photosArray: photosArray
  };
})();
