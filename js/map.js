const coordinates = [[55.751301327383075, 37.628317526161155], [55.7564837333217, 37.606463923293305], [55.76690536419223, 37.588403737351626], [55.797564577287666, 37.67437625504726]];
const markers = ['img/marker-восход.png', 'img/marker-парус.png', 'img/marker-рябинушка.png', 'img/marker-пелысь.png']
let mapObject = {
  center: coordinates[0],
  zoom: 15,
}
let map;
let marker = markers[0];
function init() {
  map = new ymaps.Map('map', mapObject)

  // map.controls.remove('geolocationControl'); // удаляем геолокацию
  map.controls.remove('searchControl'); // удаляем поиск
  // map.controls.remove('trafficControl'); // удаляем контроль трафика
  // map.controls.remove('typeSelector'); // удаляем тип
  map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
  map.controls.remove('rulerControl'); // удаляем контрол правил
  map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  let placemark = new ymaps.Placemark(mapObject.center, {}, {
    iconLayout: 'default#image',
    iconImageHref: marker,
    iconImageSize: [100, 40],
    iconImageOffset: [-50, -20],
  });
  // https://cdn-icons-png.flaticon.com/512/787/787535.png
  map.geoObjects.add(placemark);
}


const map_item = document.querySelectorAll('.map__item');
const map_menu = document.querySelector('.map__menu');
const map_cards = document.querySelector('.map__cards');

map_menu.addEventListener('click', function (e) {
  if (e.target.classList.contains('map__item')) {
    if (!e.target.classList.contains('active')) {
      map_item.forEach(function name(item, i) {
        item.classList.remove('active');
        e.target.classList.add('active');
      });

      let id = e.target.dataset.map;
      mapObject.center = coordinates[id];
      marker = markers[id];
      map_cards.innerHTML = '';
      ymaps.ready(init);
    }
  }
})
ymaps.ready(init);