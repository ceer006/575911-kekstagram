'use strict';

(function () {
  var QUANTITY_PHOTO = 25;

  var PHOTO_COMENTS = ['Всё отлично!',
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

  window.photos = [];

  var getArrayComents = function () {
    var userComents = [];
    var QUANTITY_COMENTS = window.util.getRandom(1, 10);
    for (var i = 0; i < QUANTITY_COMENTS; i++) {
      userComents.push(PHOTO_COMENTS[window.util.getRandom(0, PHOTO_COMENTS.length)]);
    }
    return userComents;
  };

  var getPhotoDescription = function (i) {
    return {
      url: 'photos/' + i + '.jpg',
      likes: window.util.getRandom(15, 200),
      coments: getArrayComents(),
      description: PHOTO_DESCRIPTIONS[window.util.getRandom(0, PHOTO_DESCRIPTIONS.length)]
    };
  };

  var getPhotoData = function () {
    for (var i = 1; i <= QUANTITY_PHOTO; i++) {
      window.photos.push(getPhotoDescription(i));
    }
    return window.photos;
  };

  getPhotoData();
})();
