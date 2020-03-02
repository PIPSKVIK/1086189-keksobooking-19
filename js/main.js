'use strict';

var mapAdvertisement = document.querySelector('.map');
mapAdvertisement.classList.remove('map--faded'); // У блока .map уберите класс .map--faded.

var mapPins = document.querySelector('.map__pins'); // Нашли метку обьявления
var simularPin = document.querySelector('#pin').content.querySelector('.map__pin'); // нашли шаблон который мы будем копировать
var pins = [];
var PINS_QUANTITY = 8;
var TYPE_ROOM = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var TYPE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TYPE_DESCRIPTION = ['Тут все круто', 'Тут не очень круто', 'Сюда лучше не приезжать', 'Мы вас ждем', 'Мы вас НЕ ждем'];
var TYPE_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapArea = document.querySelector('.map').clientWidth;
var Y_MIN = 130;
var Y_MAX = 630;

var simularCard = document.querySelector('#card').content.querySelector('.map__card');
var mapFilterConteiner = document.querySelector('.map__filters-container');


// функция рандомного числа.
var genRandomNumber = function (min, max) {
  if (!max) {
    return Math.round(Math.random() * min);
  } else {
    return Math.round(Math.random() * (max - min) + min);
  }
};

// функция рандомной строки из массива
var genRandomElement = function (element) {
  var rand = Math.floor(Math.random() * element.length);
  return element[rand];
};


var renderFeatures = function (arr) { // Функция строк случайно длинны из Массива
  var newArray = [];
  for (var i = 0; i < genRandomNumber(1, arr.length); i++) {
    newArray[i] = arr[i];
  }
  return newArray;
};

var genPins = function () { // функция создания пина
  for (var i = 0; i < PINS_QUANTITY; i++) {
    var avatarPhoto = 'img/avatars/user0' + (i + 1) + '.png';
    pins.push({
      author: {
        avatar: avatarPhoto
      },
      offer: {
        title: 'Обьявление_' + genRandomNumber(8) + ' самое крутое',
        address: genRandomNumber(300, 600) + ', ' + genRandomNumber(300, 600),
        price: genRandomNumber(1000, 10000),
        type: genRandomElement(TYPE_ROOM),
        rooms: genRandomNumber(3),
        guests: genRandomNumber(20),
        checkin: genRandomElement(CHECKIN_TIME),
        checkout: genRandomElement(CHECKOUT_TIME),
        features: renderFeatures(TYPE_FEATURES),
        description: genRandomElement(TYPE_DESCRIPTION),
        photos: genRandomElement(TYPE_PHOTO)
      },
      location: {
        x: genRandomNumber(0, mapArea),
        y: genRandomNumber(Y_MIN, Y_MAX)
      }
    });
  }
};

genPins(); // вызвали функцию

var renderPin = function (index) {
  var pinElement = simularPin.cloneNode(true); // клонируем пин.
  pinElement.style = ('left: ' + (pins[index].location.x) + 'px; top: ' + (pins[index].location.y) + 'px;'); // координата пинов
  pinElement.querySelector('img').src = pins[index].author.avatar; // путь картинки (конкатинация + i+1 + расширение)
  pinElement.querySelector('img').alt = pins[index].offer.tittle; // альт из tittle в массиве Обьектов.
  return pinElement; // возвращаем
};


var renderCard = function (index) {
  var mapElement = simularCard.cloneNode(true);

  mapElement.querySelector('.popup__title').textContent = pins[index].offer.title;
  mapElement.querySelector('.popup__text--address').textContent = pins[index].offer.address;
  mapElement.querySelector('.popup__text--price').textContent = pins[index].offer.price + '₽/ночь';
  mapElement.querySelector('.popup__type').textContent = pins[index].offer.type; // вот тут не совсем правильно работает, иногда появляется undefined, функция рандома не та.
  mapElement.querySelector('.popup__text--capacity').textContent = (pins[index].offer.rooms) + ' комнаты для ' + (pins[index].offer.guests) + ' гостей';
  mapElement.querySelector('.popup__text--time').textContent = 'Заезд после' + (pins[index].offer.checkin) + ', выезд до' + (pins[index].offer.checkout);

  mapElement.querySelector('.popup__features').textContent = pins[index].offer.features;


  mapElement.querySelector('.popup__description').textContent = pins[index].offer.description;
  mapElement.querySelector('.popup__photo').src = pins[index].offer.photos;
  mapElement.querySelector('.popup__avatar').src = pins[index].author.avatar;

  return mapElement;
};

var fragment = document.createDocumentFragment(); // просто тиснул из демки (создаем фрагмент)
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(i));
}

var newFragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  newFragment.appendChild(renderCard(i));
}

mapPins.appendChild(fragment); // вставляем фрагмент в разметку.
mapAdvertisement.insertBefore(newFragment, mapFilterConteiner); // Вставляем .map перед блоком.map__filters-container

