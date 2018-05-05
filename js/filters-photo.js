'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var filterId = 'filter-recommended';

  var photosArray = [];

  var photosArraySort = [];

  var imgFiltersElement = document.querySelector('.img-filters');

  var filtersButtonElement = imgFiltersElement.querySelectorAll('.img-filters__button');

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
    var removePicturesElement = window.picture.otherUserPhotoElement.querySelectorAll('.picture__link');
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
        photosArraySort = sortByLikes(photosArray);
        break;
      case 'filter-discussed':
        photosArraySort = sortByComments(photosArray);
        break;
      case 'filter-random':
        photosArraySort = sortByRandom(photosArray);
        break;
    }

  };

  var onFilterPhotoClick = function (evt) {
    if (evt.target.id === filterId) {
      return;
    }
    var imgFilterActiveElement = imgFiltersElement.querySelector('#' + filterId);
    imgFilterActiveElement.classList.remove('img-filters__button--active');
    filterId = evt.target.id;
    imgFilterActiveElement = imgFiltersElement.querySelector('#' + filterId);
    imgFilterActiveElement.classList.add('img-filters__button--active');
    applyFilter();
    removePhotoList();
    window.utils.debounce(window.picture.showPhotoList(photosArraySort), DEBOUNCE_INTERVAL);
  };

  [].forEach.call(filtersButtonElement, function (filter) {
    filter.addEventListener('click', onFilterPhotoClick);
  });

  window.filters = {
    photosArray: photosArray
  };
})();
