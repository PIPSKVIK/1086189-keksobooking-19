'use strict';

var mapAdvertisement = document.querySelector('.map');
mapAdvertisement.classList.remove('map--faded'); // У блока .map уберите класс .map--faded.

var mapPins = document.querySelector('.map__pins'); // Нашли метку обьявления
var simularPin = document.querySelector('#pin').content.querySelector('.map__pin'); // нашли шаблон который мы будем копировать
var pins = [1, 2, 3, 4, 5, 6, 7, 8]; // массив с пинами 8 штук
var TYPE_ROOM = ['place', 'flat', 'house', 'bungalo']; // типы комнат
var CHECKIN_TIME = ['12:00', '13:00', '14:00']; // массив время заселения
var CHECKOUT_TIME = ['12:00', '13:00', '14:00']; // массив время высиления
var TYPE_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // массив фишек
var TYPE_DESCRIPTION = ['Тут все круто', 'Тут не очень круто', 'Сюда лучше не приезжать', 'Мы вас ждем', 'Мы вас НЕ ждем']; // типы описания
var OFFSET_X = 50; // оффсет по заданию x , вроде как нужно отталкиватся от размера картинки
var OFFSET_Y = 70; // оффсет по заданию y вроде как нужно отталкиватся от размера картинки

var genRandomNumber = function (min, max) { // функция рандомного числа
  if (!max) {
    return Math.round(Math.random() * min);
  } else {
    return Math.round(Math.random() * (max - min) + min);
  }
};

var genRandomPhotos = function () { // функция создания массифа, фоток случайной длинны.
  var photos = [];
  for (var i = 1; i < genRandomNumber(2, 4); i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg';
  }
  return photos;
};


var genPins = function () { // функция создания пина
  for (var i = 0; i < pins.length; i++) {
    var avatarPhoto = 'img/avatars/user0' + (i + 1) + '.png';
    pins[i] = {
      author: {
        avatar: avatarPhoto
      },
      offer: {
        tittle: 'Обьявление_' + genRandomNumber(8) + ' самое крутое',
        adddress: '600, 350',
        price: genRandomNumber(1000, 10000),
        type: TYPE_ROOM[genRandomNumber(4)],
        rooms: genRandomNumber(3),
        guests: genRandomNumber(20),
        checkin: CHECKIN_TIME[genRandomNumber(3)],
        checkout: CHECKOUT_TIME[genRandomNumber(3)],
        features: TYPE_FEATURES[genRandomNumber(6)],
        description: TYPE_DESCRIPTION[genRandomNumber(5)],
        photos: genRandomPhotos()
      },
      location: {
        x: genRandomNumber(200, 1200),
        y: genRandomNumber(200, 500)
      }
    };
  }
};

genPins(); // вызвали функцию

var renderPin = function (index) {
  var pinElement = simularPin.cloneNode(true); // клонируем пин.
  pinElement.style = ('left: ' + (pins[index].location.x - OFFSET_X) + 'px; top: ' + (pins[index].location.y - OFFSET_Y) + 'px;'); // координата пинов
  pinElement.querySelector('img').src = pins[index].author.avatar; // путь картинки (конкатинация + i+1 + расширение)
  pinElement.querySelector('img').alt = pins[index].offer.tittle; // альт из tittle в массиве Обьектов.
  return pinElement; // возвращаем
};

var fragment = document.createDocumentFragment(); // просто тиснул из демки (создаем фрагмент)
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(i));
}

mapPins.appendChild(fragment); // вставляем фрагмент в разметку.

