'use strict';

var QUANTITY_PHOTO = 25;

var QUANTITY_HASHTAGS = 5;

var HASHTAGS_LENGTH = 20;

var MIN_X = 0;

var MAX_X = 453;

var MIN_VALUE = 25;

var MAX_VALUE = 100;

var STEP = 25;

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

var ESC_KEYCODE = 27;

var ENTER_KEYCODE = 13;

var photos = [];

var validityHashTags = [];

var bigPictureElement = document.querySelector('.big-picture');

var bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img');

var removeComentsElement = document.querySelector('.social__comments');

var otherUserPhotoElement = document.querySelector('.pictures');

var pictureTemplateElement = document.querySelector('#picture').content;

var socialComentElement = document.querySelector('.social__comment');

var newSocialComentElement = socialComentElement.cloneNode(true);

var uploadFileElement = document.querySelector('#upload-file');

var overlayElement = document.querySelector('.img-upload__overlay');

var uploadCloseElement = overlayElement.querySelector('.img-upload__cancel');

var fullPhotoCloseElement = document.querySelector('.big-picture__cancel');

var previewUploadImgElement = document.querySelector('.img-upload__preview');

var imgUploadScaleElement = document.querySelector('.img-upload__scale');

var previewPhotoElement = previewUploadImgElement.querySelector('img');

var originalPhotoElement = document.querySelector('#effect-none');

var formSubmitElement = document.querySelector('.img-upload__form');

var resizeControlElement = formSubmitElement.querySelector('.img-upload__resize');

var resizeControlMinusElement = formSubmitElement.querySelector('.resize__control--minus');

var resizeControlPlusElement = formSubmitElement.querySelector('.resize__control--plus');

var resizeControlValueElement = formSubmitElement.querySelector('.resize__control--value');

var scaleLevelElement = formSubmitElement.querySelector('.scale__level');

var scalePinElement = formSubmitElement.querySelector('.scale__pin');

var scaleLineElement = formSubmitElement.querySelector('.scale__line');

var inputHashtagsElement = formSubmitElement.querySelector('.text__hashtags');

var inputComentElement = formSubmitElement.querySelector('.text__description');

var effectPreviewElement = formSubmitElement.querySelectorAll('.effects__preview');

var effectRadioElement = formSubmitElement.querySelectorAll('.effects__radio');

var submitFormButtonElement = formSubmitElement.querySelector('.img-upload__submit');

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
    description: PHOTO_DESCRIPTIONS[getRandom(0, PHOTO_DESCRIPTIONS.length)]
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
  var photoElement = pictureTemplateElement.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__stat--likes').textContent = photo.likes;
  photoElement.querySelector('.picture__stat--comments').textContent = photo.coments.length;

  return photoElement;
};

var getUsersComents = function (coment) {
  newSocialComentElement = socialComentElement.cloneNode(true);

  newSocialComentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 7) + '.svg';
  newSocialComentElement.querySelector('p').textContent = coment;

  return newSocialComentElement;
};

while (removeComentsElement.firstChild) {
  removeComentsElement.removeChild(removeComentsElement.firstChild);
}

var showPhotoList = function (photo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photo.length; i++) {
    fragment.appendChild(renderPhoto(photo[i]));
  }
  otherUserPhotoElement.appendChild(fragment);
};

var showComentsList = function (coments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < coments.length; i++) {
    fragment.appendChild(getUsersComents(coments[i]));
  }
  removeComentsElement.appendChild(fragment);
};

var showBigPhoto = function (photo) {
  bigPictureElement.classList.remove('hidden');

  bigPictureImgElement.querySelector('img').src = photo.url;
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
  overlayElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  overlayElement.classList.add('hidden');
  uploadFileElement.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};

var closeFullPhoto = function () {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onFullPhotoEscPress);
};

var removeClassPhoto = function () {
  for (var i = 0; i < previewPhotoElement.classList.length; i++) {
    previewPhotoElement.classList.remove(previewPhotoElement.classList[i]);
  }
};

var openImgScale = function () {
  imgUploadScaleElement.classList.remove('hidden');
};

var closeImgScale = function () {
  imgUploadScaleElement.classList.add('hidden');
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
  var isQuantityHashtagsValid = hashTagArr.length > QUANTITY_HASHTAGS;
  if (isQuantityHashtagsValid) {
    inputHashtagsElement.setCustomValidity('Максимум 5 хеш-тегов');
  }
  validityHashTags.push(isQuantityHashtagsValid);
};

var getHashtagLength = function (hashTag) {
  var isHashtagLengthValid = hashTag.length > HASHTAGS_LENGTH;
  if (isHashtagLengthValid) {
    inputHashtagsElement.setCustomValidity('Длинна хеш-тега не должна превышать 20 символов');
  }
  validityHashTags.push(isHashtagLengthValid);
};

var checkSymbolHashtags = function (hashTag) {
  var isSymbolHashtagsValid = hashTag === '#';
  if (isSymbolHashtagsValid) {
    inputHashtagsElement.setCustomValidity('Хеш-тег не может состоять только из символа #');
  }
  validityHashTags.push(isSymbolHashtagsValid);
};

var getSameHashtags = function (hashTagArr, hashTagArrElement, index) {
  var isSameHashtagsValid = hashTagArr.indexOf(hashTagArrElement, index + 1) > 0;
  if (isSameHashtagsValid) {
    inputHashtagsElement.setCustomValidity('Хеш-теги не должны повторяться');
  }
  validityHashTags.push(isSameHashtagsValid);
};

var checkSpaceHashtags = function (hashTag) {
  var sumSumbolHashtags = hashTag.match(/#/g);
  if (sumSumbolHashtags === null) {
    sumSumbolHashtags = 0;
  }
  var isSpaceHashtagsValid = sumSumbolHashtags.length > 1;
  if (isSpaceHashtagsValid) {
    inputHashtagsElement.setCustomValidity('Хеш-теги должны быть разделены пробелом');
  }
  validityHashTags.push(isSpaceHashtagsValid);
};

var findPositionSymbolHashtag = function (hashTag) {
  var isPositionSymbolHashtaValid = hashTag.search(/#/g) !== 0;
  if (isPositionSymbolHashtaValid) {
    inputHashtagsElement.setCustomValidity('Хеш-тег должен начинаться с символа #');
  }
  validityHashTags.push(isPositionSymbolHashtaValid);
};

var getValidate = function () {
  var hashtags = inputHashtagsElement.value;

  hashtags = hashtags.toLowerCase();

  hashtags = hashtags.trim();

  var hashtagsArr = hashtags.split(/[\s]+/);

  for (var i = 0; i < hashtagsArr.length; i++) {
    if (validityHashTags.indexOf(true) === -1) {
      getSameHashtags(hashtagsArr, hashtagsArr[i], i);
      getHashtagLength(hashtagsArr[i]);
      checkSymbolHashtags(hashtagsArr[i]);
      checkSpaceHashtags(hashtagsArr[i]);
      findPositionSymbolHashtag(hashtagsArr[i]);
      getQuantityHashtags(hashtagsArr);
    } else {
      break;
    }
  }

  if (validityHashTags.indexOf(true) === -1) {
    inputHashtagsElement.removeAttribute('style');
    inputHashtagsElement.setCustomValidity('');
  } else {
    inputHashtagsElement.style.border = '2px solid red';
    validityHashTags.length = 0;
  }
};

var onImgResize = function (scaleDown, scaleUp) {

  var inputValue = parseInt(resizeControlValueElement.value, 10);

  if (scaleDown) {
    if (inputValue > MIN_VALUE) {
      previewUploadImgElement.style.transform = 'scale(0.' + (inputValue - STEP) + ')';
      resizeControlValueElement.value = inputValue - STEP + '%';
    }
  }
  if (scaleUp) {
    if (inputValue < MAX_VALUE) {
      if (parseInt(resizeControlValueElement.value, 10) === MAX_VALUE - STEP) {
        previewUploadImgElement.removeAttribute('style');
        resizeControlValueElement.value = MAX_VALUE + '%';
      } else {
        previewUploadImgElement.style.transform = 'scale(0.' + (inputValue + STEP) + ')';
        resizeControlValueElement.value = inputValue + STEP + '%';
      }
    }
  }
};

var getEffectDepth = function () {
  return (scaleLevelElement.offsetWidth / scaleLineElement.offsetWidth).toFixed(2);
};

var refreshFilterDepth = function () {
  switch (previewPhotoElement.className) {
    case 'effects__preview--none':
      previewPhotoElement.removeAttribute('filter');
      break;
    case 'effects__preview--chrome':
      previewPhotoElement.style = 'filter: grayscale(' + getEffectDepth() + ');';
      break;
    case 'effects__preview--sepia':
      previewPhotoElement.style = 'filter: sepia(' + getEffectDepth() + ');';
      break;
    case 'effects__preview--marvin':
      previewPhotoElement.style = 'filter: invert(' + getEffectDepth() * 100 + '%);';
      break;
    case 'effects__preview--phobos':
      previewPhotoElement.style = 'filter: blur(' + getEffectDepth() * 3 + 'px);';
      break;
    case 'effects__preview--heat':
      previewPhotoElement.style = 'filter: brightness(' + getEffectDepth() * 3 + ');';
      break;
  }
};

for (var i = 0; i < listPhoto.length; i++) {
  onListPhotoClick(i);
}

var onEffectPhotoClick = function (index) {
  effectRadioElement[index].addEventListener('click', function () {
    removeClassPhoto();
    openImgScale();
    previewPhotoElement.classList.add('effects__preview--' + effectRadioElement[index].value);
    scalePinElement.style = 'left: ' + MAX_X + 'px;';
    scaleLevelElement.style = 'width: 100%';
    refreshFilterDepth();
  });
};

for (var j = 1; j < effectPreviewElement.length; j++) {
  onEffectPhotoClick(j);
}

uploadFileElement.addEventListener('change', function () {
  openPopup();
});

uploadFileElement.addEventListener('change', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

uploadCloseElement.addEventListener('click', function () {
  closePopup();
});

uploadCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

fullPhotoCloseElement.addEventListener('click', function () {
  closeFullPhoto();
});

fullPhotoCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeFullPhoto();
  }
});

originalPhotoElement.addEventListener('click', function () {
  removeClassPhoto();
  closeImgScale();
  previewPhotoElement.removeAttribute('style');
});

inputHashtagsElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

inputComentElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

submitFormButtonElement.addEventListener('click', function () {
  getValidate();
});

resizeControlElement.addEventListener('click', function (evt) {
  switch (evt.target) {
    case resizeControlMinusElement:
      onImgResize(true);
      break;
    case resizeControlPlusElement:
      onImgResize(false, true);
      break;
  }
});

scalePinElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    if ((scalePinElement.offsetLeft - shift.x) >= MIN_X && (scalePinElement.offsetLeft - shift.x) <= MAX_X) {
      scalePinElement.style.left = (scalePinElement.offsetLeft - shift.x) + 'px';
      scaleLevelElement.style.width = (scaleLevelElement.offsetWidth - shift.x) + 'px';
      refreshFilterDepth();
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
