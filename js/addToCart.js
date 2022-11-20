let cardObject;
let cardBasketArray = [];
let cardFavouritesArray = [];

// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
  cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
}
if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
  cardFavouritesArray = JSON.parse(localStorage.getItem('productsFavourites'));
}

window.addEventListener('DOMContentLoaded', function () {
  const body = document.body;

  body.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('card-button') && !target.classList.contains('disable')) addInfoCard(target, cardBasketArray, 'productsBasket');
    if (target.classList.contains('card-like') && !target.classList.contains('disable')) addInfoCard(target, cardFavouritesArray, 'productsFavourites');

    if (cardBasketArray.length > 0) addDisableCardLike();
    if (cardBasketArray.length > 0) addDisableCardBtn();
  })
  setTimeout(addDisableCardBtn, 0);
  setTimeout(addDisableCardLike, 0);
})

function addDisableCardBtn() {
  cardBasketArray.forEach(card => {
    let cardDisable = document.querySelector(`[id = "${card.id}"]`);
    if (cardDisable) {
      let cardDisableBtn = cardDisable.querySelector('.card-button');
      cardDisableBtn.classList.add('disable');
      cardDisableBtn.textContent = 'В корзине';
    }
  })
}
function addDisableCardLike() {
  cardFavouritesArray.forEach(card => {
    let cardDisable = document.querySelector(`[id = "${card.id}"]`);
    if (cardDisable) {
      let cardDisableLike = cardDisable.querySelector('.card-like');
      cardDisableLike.classList.add('disable');
    }
  });
}
function addInfoCard(target, arr, storage) {
  cardObject = {
    id: '',
    name: '',
    price: '',
    img: '',
    rating: '',
  };
  // Обертка карточки
  const card = target.closest('.wrapper-card');
  // ID карточки
  const cardID = card.getAttribute('id');
  // Название товара
  const name = card.querySelector('.card-name-product').textContent;
  // Цена товара
  const price = card.querySelector('.card-price__card').textContent;
  // Цена товара без карты 
  const price_card = card.querySelector('.card-price__ordinary');
  // Картинка карточки
  const imgSrc = card.querySelector('.card-img').dataset.img;
  // Рейтинг 
  const rating = card.querySelector('.card-rating__items').dataset.rating;
  // Скидка 
  const discount = card.querySelector('.card-discount');

  cardObject.id = cardID;
  cardObject.name = name;
  cardObject.price = price;
  if (price_card) cardObject.price_card = price_card.textContent;
  cardObject.img = imgSrc;
  cardObject.rating = rating;
  if (discount) cardObject.discount = discount.textContent;

  arr.unshift(cardObject)
  localStorage.setItem(`${storage}`, JSON.stringify(arr));
}