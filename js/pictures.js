'use strict';

var QUANTITY_PHOTO = 25;

var PHOTO_COMENTS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var PHOTO_DESCRIPTION = ['Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

var photos = [];

var bigPicture = document.querySelector('.big-picture');

var commentCount = document.querySelector('.social__comment-count');

var commentLoadmore = document.querySelector('.social__comment-loadmore');

var otherUserPhoto = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content;

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getPhotoData = function () {
  for (var i = 1; i <= QUANTITY_PHOTO; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandom(15, 200),
      coments: PHOTO_COMENTS[getRandom(0, PHOTO_COMENTS.length)],
      description: PHOTO_DESCRIPTION[getRandom(0, PHOTO_DESCRIPTION.length)]
    });
  }
  return photos;
};

getPhotoData();

var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.coments;

  return photoElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}
otherUserPhoto.appendChild(fragment);

bigPicture.classList.remove('hidden');

commentCount.classList.add('visually-hidden');

commentLoadmore.classList.add('visually-hidden');

var getBigPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.big-picture__img').src = photo[0].url;
  photoElement.querySelector('.likes-count').textContent = photo[0].likes;
  photoElement.querySelector('.comments-count').textContent = photo[0].coments;

  return photoElement;
};

getBigPhoto(photos);
