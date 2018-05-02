'use strict';

(function () {
  var QUANTITY_PHOTO = 25;

  var PHOTO_COMMENTS = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var PHOTO_DESCRIPTIONS = ['Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'];

  var photos = [];

  var getArrayComments = function () {
    var userComments = [];
    var quantityComments = window.util.getRandom(1, 10);
    for (var i = 0; i < quantityComments; i++) {
      userComments.push(PHOTO_COMMENTS[window.util.getRandom(0, PHOTO_COMMENTS.length)]);
    }
    return userComments;
  };

  var getPhotoDescription = function (i) {
    return {
      url: 'photos/' + i + '.jpg',
      likes: window.util.getRandom(15, 200),
      comments: getArrayComments(),
      description: PHOTO_DESCRIPTIONS[window.util.getRandom(0, PHOTO_DESCRIPTIONS.length)]
    };
  };

  var getPhotoData = function () {
    for (var i = 1; i <= QUANTITY_PHOTO; i++) {
      photos.push(getPhotoDescription(i));
    }
    return photos;
  };

  getPhotoData();

  window.photos = {
    data: photos
  };
})();
