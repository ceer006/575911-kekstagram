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

var ESC_KEYCODE = 27;

var ENTER_KEYCODE = 13;

var photos = [];

var bigPicture = document.querySelector('.big-picture');

var removeComents = document.querySelector('.social__comments');

var otherUserPhoto = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content;

var socialComent = document.querySelector('.social__comment');

var newSocialComent = socialComent.cloneNode(true);

var uploadFile = document.querySelector('#upload-file');

var overlay = document.querySelector('.img-upload__overlay');

var uploadClose = overlay.querySelector('.img-upload__cancel');

var previewUploadImg = document.querySelector('.img-upload__preview');

var imgUploadScale = document.querySelector('.img-upload__scale');

var previewPhoto = previewUploadImg.querySelector('img');

var originalPhoto = document.querySelector('#effect-none');

var effectChrome = document.querySelector('#effect-chrome');

var effectSepia = document.querySelector('#effect-sepia');

var effectMarvin = document.querySelector('#effect-marvin');

var effectPhobos = document.querySelector('#effect-phobos');

var effectHeat = document.querySelector('#effect-heat');

var listPhoto = document.querySelectorAll('.picture__link');

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getArrayComents = function () {
  var userComents = [];
  var QUANTITY_COMENTS = getRandom(1, 10);
  for (var i = 0; i < QUANTITY_COMENTS; i++) {
    userComents.push(PHOTO_COMENTS[getRandom(0, PHOTO_COMENTS.length)]);
  }
  return userComents;
};

var getPhotoDescription = function (i) {
  return {
    url: 'photos/' + i + '.jpg',
    likes: getRandom(15, 200),
    coments: getArrayComents(),
    description: PHOTO_DESCRIPTION[getRandom(0, PHOTO_DESCRIPTION.length)]
  };
};

var getPhotoData = function () {
  for (var i = 1; i <= QUANTITY_PHOTO; i++) {
    photos.push(getPhotoDescription(i));
  }
  return photos;
};

getPhotoData();

var renderPhoto = function (photo) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.coments.length;

  return photoElement;
};

var showBigPhoto = function (photo) {
  bigPicture.classList.remove('hidden');

  document.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.coments.length;
};

var getUsersComents = function (coment) {
  newSocialComent = socialComent.cloneNode(true);

  newSocialComent.querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 7) + '.svg';
  newSocialComent.querySelector('p').textContent = coment;

  return newSocialComent;
};

var showPhotoList = function (photo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photo.length; i++) {
    fragment.appendChild(renderPhoto(photo[i]));
  }
  otherUserPhoto.appendChild(fragment);
};

var showComentsList = function (coments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < coments.length; i++) {
    fragment.appendChild(getUsersComents(coments[i]));
  }
  removeComents.appendChild(fragment);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  overlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  overlay.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};

var removeClassPhoto = function () {
  for (var i = 0; i < previewPhoto.classList.length; i++) {
    previewPhoto.classList.remove(previewPhoto.classList[i]);
  }
};

var openImgScale = function () {
  imgUploadScale.classList.remove('hidden');
};

var closeImgScale = function () {
  imgUploadScale.classList.add('hidden');
};

while (removeComents.firstChild) {
  removeComents.removeChild(removeComents.firstChild);
}

showPhotoList(photos);
showComentsList(photos[0].coments);

listPhoto[0].addEventListener('click', function () {
  showBigPhoto(photos[0]);
});

listPhoto[1].addEventListener('click', function () {
  showBigPhoto(photos[1]);
  showComentsList(photos[1].coments);
});

listPhoto[2].addEventListener('click', function () {
  showBigPhoto(photos[2]);
  showComentsList(photos[2].coments);
});

listPhoto[3].addEventListener('click', function () {
  showBigPhoto(photos[3]);
  showComentsList(photos[3].coments);
});

listPhoto[4].addEventListener('click', function () {
  showBigPhoto(photos[4]);
  showComentsList(photos[4].coments);
});

listPhoto[5].addEventListener('click', function () {
  showBigPhoto(photos[5]);
  showComentsList(photos[5].coments);
});

listPhoto[6].addEventListener('click', function () {
  showBigPhoto(photos[6]);
  showComentsList(photos[6].coments);
});

listPhoto[7].addEventListener('click', function () {
  showBigPhoto(photos[7]);
  showComentsList(photos[7].coments);
});

listPhoto[8].addEventListener('click', function () {
  showBigPhoto(photos[8]);
  showComentsList(photos[8].coments);
});

listPhoto[9].addEventListener('click', function () {
  showBigPhoto(photos[9]);
  showComentsList(photos[9].coments);
});

listPhoto[10].addEventListener('click', function () {
  showBigPhoto(photos[10]);
  showComentsList(photos[10].coments);
});

listPhoto[11].addEventListener('click', function () {
  showBigPhoto(photos[11]);
  showComentsList(photos[11].coments);
});

listPhoto[12].addEventListener('click', function () {
  showBigPhoto(photos[12]);
  showComentsList(photos[12].coments);
});

listPhoto[13].addEventListener('click', function () {
  showBigPhoto(photos[13]);
  showComentsList(photos[13].coments);
});

listPhoto[14].addEventListener('click', function () {
  showBigPhoto(photos[14]);
  showComentsList(photos[14].coments);
});

listPhoto[15].addEventListener('click', function () {
  showBigPhoto(photos[15]);
  showComentsList(photos[15].coments);
});

listPhoto[16].addEventListener('click', function () {
  showBigPhoto(photos[16]);
  showComentsList(photos[16].coments);
});

listPhoto[17].addEventListener('click', function () {
  showBigPhoto(photos[17]);
  showComentsList(photos[17].coments);
});

listPhoto[18].addEventListener('click', function () {
  showBigPhoto(photos[18]);
  showComentsList(photos[18].coments);
});

listPhoto[19].addEventListener('click', function () {
  showBigPhoto(photos[19]);
  showComentsList(photos[19].coments);
});

listPhoto[20].addEventListener('click', function () {
  showBigPhoto(photos[20]);
  showComentsList(photos[20].coments);
});

listPhoto[21].addEventListener('click', function () {
  showBigPhoto(photos[21]);
  showComentsList(photos[21].coments);
});

listPhoto[22].addEventListener('click', function () {
  showBigPhoto(photos[22]);
  showComentsList(photos[22].coments);
});

listPhoto[23].addEventListener('click', function () {
  showBigPhoto(photos[23]);
  showComentsList(photos[23].coments);
});

listPhoto[24].addEventListener('click', function () {
  showBigPhoto(photos[24]);
  showComentsList(photos[24].coments);
});

uploadFile.addEventListener('change', function () {
  openPopup();
});

uploadFile.addEventListener('change', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

uploadClose.addEventListener('click', function () {
  closePopup();
});

uploadClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

originalPhoto.addEventListener('click', function () {
  removeClassPhoto();
  closeImgScale();
});

effectChrome.addEventListener('click', function () {
  removeClassPhoto();
  openImgScale();
  previewPhoto.classList.add('effects__preview--chrome');
});

effectSepia.addEventListener('click', function () {
  removeClassPhoto();
  openImgScale();
  previewPhoto.classList.add('effects__preview--septia');
});

effectMarvin.addEventListener('click', function () {
  removeClassPhoto();
  openImgScale();
  previewPhoto.classList.add('effects__preview--marvin');
});

effectPhobos.addEventListener('click', function () {
  removeClassPhoto();
  openImgScale();
  previewPhoto.classList.add('effects__preview--phobos');
});

effectHeat.addEventListener('click', function () {
  removeClassPhoto();
  openImgScale();
  previewPhoto.classList.add('effects__preview--heat');
});
