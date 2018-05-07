'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var filterId = 'filter-recommended';

  var dataPhotos;

  var dataSortedPhotos = [];

  var imgFiltersElement = document.querySelector('.img-filters');

  var filterButtonElements = imgFiltersElement.querySelectorAll('.img-filters__button');

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
    var removePictureElements = window.picture.otherUserPhotoElement.querySelectorAll('.picture__link');
    [].forEach.call(removePictureElements, function (removingPicture) {
      removingPicture.remove();
    });
  };

  var applyFilter = function () {
    switch (filterId) {
      case 'filter-recommended': {
        dataSortedPhotos = dataPhotos;
        break;
      }
      case 'filter-popular': {
        dataSortedPhotos = sortByLikes(dataPhotos);
        break;
      }
      case 'filter-discussed': {
        dataSortedPhotos = sortByComments(dataPhotos);
        break;
      }
      case 'filter-random': {
        dataSortedPhotos = sortByRandom(dataPhotos);
        break;
      }
    }
  };

  var redrawPhotoList = function () {
    applyFilter();
    removePhotoList();
    window.picture.showPhotoList(dataSortedPhotos);
  };

  var onFilterPhotoClick = function (evt) {
    if (evt.target.id !== filterId) {
      var imgFilterActiveElement = imgFiltersElement.querySelector('#' + filterId);
      imgFilterActiveElement.classList.remove('img-filters__button--active');
      filterId = evt.target.id;
      imgFilterActiveElement = imgFiltersElement.querySelector('#' + filterId);
      imgFilterActiveElement.classList.add('img-filters__button--active');
      window.utils.debounce(redrawPhotoList, DEBOUNCE_INTERVAL);
    }
  };

  var onInitializeData = function (photos) {
    dataPhotos = photos;
    [].forEach.call(filterButtonElements, function (filter) {
      filter.addEventListener('click', onFilterPhotoClick);
    });
  };

  window.filters = {
    initializeData: onInitializeData
  };
})();
