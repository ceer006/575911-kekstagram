'use strict';

var QUANTITY_PHOTO = 25;

var QUANTITY_HASHTAGS = 5;

var HASHTAGS_LENGTH = 20;

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

var hashTagValidityOk = [];

var bigPicture = document.querySelector('.big-picture');

var bigPictureImg = bigPicture.querySelector('.big-picture__img');

var removeComents = document.querySelector('.social__comments');

var otherUserPhoto = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content;

var socialComent = document.querySelector('.social__comment');

var newSocialComent = socialComent.cloneNode(true);

var uploadFile = document.querySelector('#upload-file');

var overlay = document.querySelector('.img-upload__overlay');

var uploadClose = overlay.querySelector('.img-upload__cancel');

var fullPhotoClose = document.querySelector('.big-picture__cancel');

var previewUploadImg = document.querySelector('.img-upload__preview');

var imgUploadScale = document.querySelector('.img-upload__scale');

var previewPhoto = previewUploadImg.querySelector('img');

var originalPhoto = document.querySelector('#effect-none');

var formSubmit = document.querySelector('.img-upload__form');

var inputHashtags = formSubmit.querySelector('.text__hashtags');

var inputComent = formSubmit.querySelector('.text__description');

var effectPreview = formSubmit.querySelectorAll('.effects__preview');

var effectRadio = formSubmit.querySelectorAll('.effects__radio');

var submitFormButton = formSubmit.querySelector('.img-upload__submit');

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

var getUsersComents = function (coment) {
  newSocialComent = socialComent.cloneNode(true);

  newSocialComent.querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 7) + '.svg';
  newSocialComent.querySelector('p').textContent = coment;

  return newSocialComent;
};

while (removeComents.firstChild) {
  removeComents.removeChild(removeComents.firstChild);
}

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

var showBigPhoto = function (photo) {
  bigPicture.classList.remove('hidden');

  bigPictureImg.querySelector('img').src = photo.url;
  document.querySelector('.likes-count').textContent = photo.likes;
  document.querySelector('.comments-count').textContent = photo.coments.length;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onFullPhotoEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeFullPhoto();
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

var closeFullPhoto = function () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onFullPhotoEscPress);
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

showPhotoList(photos);

var listPhoto = document.querySelectorAll('.picture__link');

var onListPhotoClick = function (index) {
  listPhoto[index].addEventListener('click', function () {
    showBigPhoto(photos[index]);
    showComentsList(photos[index].coments);
    document.addEventListener('keydown', onFullPhotoEscPress);
  });
};

var getQuantityHashtags = function (hashTagArr) {
  if (hashTagArr.length > QUANTITY_HASHTAGS) {
    inputHashtags.setCustomValidity('Максимум 5 хеш-тегов');
    hashTagValidityOk.push(false);
  } else {
    hashTagValidityOk.push(true);
  }
};

var getHashtagLength = function (hashTag) {
  if (hashTag.length > HASHTAGS_LENGTH) {
    inputHashtags.setCustomValidity('Длинна хеш-тега не должна превышать 20 символов');
    hashTagValidityOk.push(false);
  } else {
    hashTagValidityOk.push(true);
  }
};

var checkSymbolHashtags = function (hashTag) {
  if (hashTag === '#') {
    inputHashtags.setCustomValidity('Хеш-тег не может состоять только из символа #');
    hashTagValidityOk.push(false);
  } else {
    hashTagValidityOk.push(true);
  }
};

var getSameHashtags = function (hashTagArr, hashTagArrElement, index) {
  if (hashTagArr.indexOf(hashTagArrElement, index + 1) > 0) {
    inputHashtags.setCustomValidity('Хеш-теги не должны повторяться');
    hashTagValidityOk.push(false);
  } else {
    hashTagValidityOk.push(true);
  }
};

var checkSpaceHashtags = function (hashTag) {
  var sumSumbolHashtags = hashTag.match(/#/g);

  if (sumSumbolHashtags === null) {
    sumSumbolHashtags = 0;
    hashTagValidityOk.push(true);
  } else if (sumSumbolHashtags.length > 1) {
    inputHashtags.setCustomValidity('Хеш-теги должны быть разделены пробелом');
    hashTagValidityOk.push(false);
  } else {
    hashTagValidityOk.push(true);
  }
};

var findPositionSymbolHashtag = function (hashTag) {
  var positionHashtag = hashTag.search(/#/g);
  if (positionHashtag !== 0) {
    inputHashtags.setCustomValidity('Хеш-тег должен начинаться с символа #');
    hashTagValidityOk.push(false);
  } else {
    hashTagValidityOk.push(true);
  }
};

var getValidate = function () {
  var hashtags = inputHashtags.value;

  hashtags = hashtags.toLowerCase();

  hashtags = hashtags.trim();

  var hashtagsArr = hashtags.split(/[\s]+/);

  for (var i = 0; i < hashtagsArr.length; i++) {
    if (hashTagValidityOk.indexOf(false) === -1) {
      getSameHashtags(hashtagsArr, hashtagsArr[i], i);
      getHashtagLength(hashtagsArr[i]);
      checkSymbolHashtags(hashtagsArr[i]);
      checkSpaceHashtags(hashtagsArr[i]);
      findPositionSymbolHashtag(hashtagsArr[i]);
      getQuantityHashtags(hashtagsArr);
    } else {
      inputHashtags.style.border = '2px solid red';
      break;
    }
  }

  if (hashTagValidityOk.indexOf(false) === -1) {
    inputHashtags.style.border = 'none';
    inputHashtags.setCustomValidity('');
  } else {
    hashTagValidityOk.length = 0;
  }
};

for (var i = 0; i < listPhoto.length; i++) {
  onListPhotoClick(i);
}

var onEffectPhotoClick = function (index) {
  effectRadio[index].addEventListener('click', function () {
    removeClassPhoto();
    openImgScale();
    previewPhoto.classList.add('effects__preview--' + effectRadio[index].value);
  });
};

for (var j = 1; j < effectPreview.length; j++) {
  onEffectPhotoClick(j);
}

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

fullPhotoClose.addEventListener('click', function () {
  closeFullPhoto();
});

fullPhotoClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeFullPhoto();
  }
});

originalPhoto.addEventListener('click', function () {
  removeClassPhoto();
  closeImgScale();
});

inputHashtags.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

inputComent.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

submitFormButton.addEventListener('click', function () {
  getValidate();
});
