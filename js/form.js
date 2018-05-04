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

  var effectButton;

  var formElement = document.querySelector('.img-upload__form');

  var resizeControlMinusElement = formElement.querySelector('.resize__control--minus');

  var resizeControlPlusElement = formElement.querySelector('.resize__control--plus');

  var resizeControlValueElement = formElement.querySelector('.resize__control--value');

  var scaleLevelElement = formElement.querySelector('.scale__level');

  var scalePinElement = formElement.querySelector('.scale__pin');

  var scaleLineElement = formElement.querySelector('.scale__line');

  var inputHashtagsElement = formElement.querySelector('.text__hashtags');

  var inputCommentElement = formElement.querySelector('.text__description');

  var effectPreviewElement = formElement.querySelectorAll('.effects__preview');

  var effectRadioElement = formElement.querySelectorAll('.effects__radio');

  var submitFormButtonElement = formElement.querySelector('.img-upload__submit');

  var previewUploadImgElement = formElement.querySelector('.img-upload__preview');

  var imgUploadScaleElement = formElement.querySelector('.img-upload__scale');

  var overlayElement = formElement.querySelector('.img-upload__overlay');

  var originalPhotoElement = formElement.querySelector('#effect-none');

  var errorForm = formElement.querySelector('.img-upload__message--error');

  var imgUploadScaleValueElement = imgUploadScaleElement.querySelector('.scale__value');

  var previewPhotoElement = previewUploadImgElement.querySelector('img');

  var uploadFileElement = document.querySelector('#upload-file');

  var uploadCloseElement = overlayElement.querySelector('.img-upload__cancel');

  var inputValue = parseInt(resizeControlValueElement.value, 10);

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closePopup();
      resetSettings();
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

  var resetSettings = function () {
    inputHashtagsElement.removeAttribute('style');
    inputHashtagsElement.setCustomValidity('');
    scalePinElement.removeAttribute('style');
    scaleLevelElement.removeAttribute('style');
    imgUploadScaleValueElement.value = '0';
    previewPhotoElement.removeAttribute('style');
    previewUploadImgElement.removeAttribute('style');
    inputHashtagsElement.value = '';
    inputCommentElement.value = '';
    if (imgClass !== '') {
      previewPhotoElement.classList.remove(imgClass);
    }
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
    var effectValue;
    switch (effectButton) {
      case 'none':
        previewPhotoElement.removeAttribute('style');
        break;
      case 'chrome':
        effectValue = 'filter: grayscale(' + getEffectDepth() + ');';
        break;
      case 'sepia':
        effectValue = 'filter: sepia(' + getEffectDepth() + ');';
        break;
      case 'marvin':
        effectValue = 'filter: invert(' + getEffectDepth() * 100 + '%);';
        break;
      case 'phobos':
        effectValue = 'filter: blur(' + getEffectDepth() * 3 + 'px);';
        break;
      case 'heat':
        effectValue = 'filter: brightness(' + getEffectDepth() * 3 + ');';
        break;
    }
    previewPhotoElement.style = effectValue;
  };

  var onEffectPhotoClick = function (index) {
    effectRadioElement[index].addEventListener('click', function (evt) {
      effectButton = evt.target.value;
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
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      openPopup();
    }
  });

  uploadCloseElement.addEventListener('click', function () {
    closePopup();
    resetSettings();
  });

  uploadCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_KEYCODE) {
      closePopup();
      resetSettings();
    }
  });

  originalPhotoElement.addEventListener('click', function () {
    previewPhotoElement.classList.remove(imgClass);
    closeImgScale();
    previewPhotoElement.removeAttribute('style');
    imgUploadScaleValueElement.value = '0';

  });

  inputHashtagsElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  inputCommentElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
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

  var onFormUploadSuccess = function () {
    overlayElement.classList.add('hidden');
    formElement.reset();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.postData(new FormData(formElement), onFormUploadSuccess, function (errorMessage) {
      window.utils.createMessage(errorMessage);
      errorForm.classList.remove('hidden');
      overlayElement.classList.add('hidden');
    });
  };

  formElement.addEventListener('submit', onFormSubmit);
})();
