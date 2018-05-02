'use strict';

(function () {
  var QUANTITY_HASHTAGS = 5;

  var HASHTAGS_LENGTH = 20;

  var MIN_X = 0;

  var MAX_X = 453;

  var MIN_VALUE = 25;

  var MAX_VALUE = 100;

  var STEP = 25;

  var validityHashTags = [];

  var imgClass = '';

  var formSubmitElement = document.querySelector('.img-upload__form');

  var resizeControlMinusElement = formSubmitElement.querySelector('.resize__control--minus');

  var resizeControlPlusElement = formSubmitElement.querySelector('.resize__control--plus');

  var resizeControlValueElement = formSubmitElement.querySelector('.resize__control--value');

  var scaleLevelElement = formSubmitElement.querySelector('.scale__level');

  var scalePinElement = formSubmitElement.querySelector('.scale__pin');

  var scaleLineElement = formSubmitElement.querySelector('.scale__line');

  var inputHashtagsElement = formSubmitElement.querySelector('.text__hashtags');

  var inputCommentElement = formSubmitElement.querySelector('.text__description');

  var effectPreviewElement = formSubmitElement.querySelectorAll('.effects__preview');

  var effectRadioElement = formSubmitElement.querySelectorAll('.effects__radio');

  var submitFormButtonElement = formSubmitElement.querySelector('.img-upload__submit');

  var previewUploadImgElement = formSubmitElement.querySelector('.img-upload__preview');

  var imgUploadScaleElement = formSubmitElement.querySelector('.img-upload__scale');

  var overlayElement = formSubmitElement.querySelector('.img-upload__overlay');

  var originalPhotoElement = formSubmitElement.querySelector('#effect-none');

  var imgUploadScaleValueElement = imgUploadScaleElement.querySelector('.scale__value');

  var previewPhotoElement = previewUploadImgElement.querySelector('img');

  var uploadFileElement = document.querySelector('#upload-file');

  var uploadCloseElement = overlayElement.querySelector('.img-upload__cancel');

  var inputValue = parseInt(resizeControlValueElement.value, 10);

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
      resetSettingEffect();
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

  var openImgScale = function () {
    imgUploadScaleElement.classList.remove('hidden');
  };

  var closeImgScale = function () {
    imgUploadScaleElement.classList.add('hidden');
  };

  var getQuantityHashtags = function (hashTagArr) {
    var isQuantityHashtagsValid = hashTagArr.length <= QUANTITY_HASHTAGS;
    if (!isQuantityHashtagsValid) {
      inputHashtagsElement.setCustomValidity('Максимум 5 хеш-тегов');
    }
    validityHashTags.push(isQuantityHashtagsValid);
  };

  var getHashtagLength = function (hashTag) {
    var isHashtagLengthValid = hashTag.length <= HASHTAGS_LENGTH;
    if (!isHashtagLengthValid) {
      inputHashtagsElement.setCustomValidity('Длинна хеш-тега не должна превышать 20 символов');
    }
    validityHashTags.push(isHashtagLengthValid);
  };

  var checkSymbolHashtags = function (hashTag) {
    var isSymbolHashtagsValid = hashTag !== '#';
    if (!isSymbolHashtagsValid) {
      inputHashtagsElement.setCustomValidity('Хеш-тег не может состоять только из символа #');
    }
    validityHashTags.push(isSymbolHashtagsValid);
  };

  var getSameHashtags = function (hashTagArr, hashTagArrElement, index) {
    var isSameHashtagsValid = hashTagArr.indexOf(hashTagArrElement, index + 1) < 0;
    if (!isSameHashtagsValid) {
      inputHashtagsElement.setCustomValidity('Хеш-теги не должны повторяться');
    }
    validityHashTags.push(isSameHashtagsValid);
  };

  var checkSpaceHashtags = function (hashTag) {
    var sumSumbolHashtags = hashTag.match(/#/g);
    if (sumSumbolHashtags === null) {
      sumSumbolHashtags = [];
    }
    var isSpaceHashtagsValid = sumSumbolHashtags.length <= 1;
    if (!isSpaceHashtagsValid) {
      inputHashtagsElement.setCustomValidity('Хеш-теги должны быть разделены пробелом');
    }
    validityHashTags.push(isSpaceHashtagsValid);
  };

  var findPositionSymbolHashtag = function (hashTag) {
    var isPositionSymbolHashtagValid = /^#/.test(hashTag);
    if (!isPositionSymbolHashtagValid) {
      inputHashtagsElement.setCustomValidity('Хеш-тег должен начинаться с символа #');
    }
    validityHashTags.push(isPositionSymbolHashtagValid);
  };

  var getValidate = function () {
    var hashtags = inputHashtagsElement.value;
    hashtags = hashtags.toLowerCase();
    hashtags = hashtags.trim();
    var hashtagsArr = hashtags.split(/[\s]+/);
    if (hashtags === '') {
      return;
    } else {
      for (var i = 0; i < hashtagsArr.length; i++) {
        if (validityHashTags.indexOf(false) === -1) {
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
    }
    if (validityHashTags.indexOf(false) === -1) {
      inputHashtagsElement.removeAttribute('style');
      inputHashtagsElement.setCustomValidity('');
    } else {
      inputHashtagsElement.style.border = '2px solid red';
      validityHashTags.length = 0;
    }
  };

  var resetSettingEffect = function () {
    inputHashtagsElement.removeAttribute('style');
    inputHashtagsElement.setCustomValidity('');
    scalePinElement.removeAttribute('style');
    scaleLevelElement.removeAttribute('style');
    imgUploadScaleValueElement.value = '0';
    previewPhotoElement.removeAttribute('style');
    previewUploadImgElement.removeAttribute('style');
    previewPhotoElement.classList.remove(imgClass);
    closeImgScale();
    for (var i = 1; i < effectRadioElement.length; i++) {
      effectRadioElement[i].checked = false;
    }
    originalPhotoElement.checked = true;
  };

  var onImgResize = function (resize) {
    var size = inputValue + STEP * resize;
    if (size >= MIN_VALUE && size <= MAX_VALUE) {
      inputValue = size;
      previewUploadImgElement.style.transform = 'scale(' + inputValue / 100 + ')';
      resizeControlValueElement.value = inputValue + '%';
    }
  };

  var getEffectDepth = function () {
    return (scaleLevelElement.offsetWidth / scaleLineElement.offsetWidth).toFixed(2);
  };

  var getEffectDepthProcent = function () {
    return (scaleLevelElement.offsetWidth / scaleLineElement.offsetWidth * 100).toFixed(0);
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

  var onEffectPhotoClick = function (index) {
    effectRadioElement[index].addEventListener('click', function () {
      if (imgClass !== '') {
        previewPhotoElement.classList.remove(imgClass);
      }
      imgClass = 'effects__preview--' + effectRadioElement[index].value;
      openImgScale();
      previewPhotoElement.classList.add(imgClass);
      scalePinElement.style = 'left: ' + MAX_X + 'px;';
      scaleLevelElement.style = 'width: 100%';
      imgUploadScaleValueElement.value = '100';
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
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      openPopup();
    }
  });

  uploadCloseElement.addEventListener('click', function () {
    closePopup();
    resetSettingEffect();
  });

  uploadCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
      resetSettingEffect();
    }
  });

  originalPhotoElement.addEventListener('click', function () {
    previewPhotoElement.classList.remove(imgClass);
    closeImgScale();
    previewPhotoElement.removeAttribute('style');
    imgUploadScaleValueElement.value = '0';

  });

  inputHashtagsElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  inputCommentElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  resizeControlMinusElement.addEventListener('click', function () {
    onImgResize(-1);
  });

  resizeControlPlusElement.addEventListener('click', function () {
    onImgResize(1);
  });

  submitFormButtonElement.addEventListener('click', function () {
    getValidate();
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
        imgUploadScaleValueElement.value = '' + getEffectDepthProcent();
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
})();
