let cardObject;
let cardBasketArray = [];
let cardFavouritesArray = [];
let disableCardArray = [];
let disableCardFavourites = [];
// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
  cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
}
if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
  cardFavouritesArray = JSON.parse(localStorage.getItem('productsFavourites'));
}

window.addEventListener('load', function () {
  const body = document.body;

  body.addEventListener('click', function (e) {
    const target = e.target;
    cardObject = {
      id: '',
      name: '',
      price: '',
      img: '',
      rating: '',
    };

    if (target.classList.contains('card-button') && !target.classList.contains('disable')) {
      // Кнопка добавить в корзину
      const btn = target;
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
      if (price_card) {
        cardObject.price_card = price_card.textContent;
      }
      cardObject.img = imgSrc;
      cardObject.rating = rating;
      if (discount) {
        cardObject.discount = discount.textContent;
      }
      cardBasketArray.push(cardObject)
      localStorage.setItem('productsBasket', JSON.stringify(cardBasketArray));

      if (cardBasketArray.length > 0) {
        addDisableCardBtn();
      }
    }
    if (target.classList.contains('card-like') && !target.classList.contains('disable')) {
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
      if (price_card) {
        cardObject.price_card = price_card.textContent;
      }
      cardObject.img = imgSrc;
      cardObject.rating = rating;
      if (discount) {
        cardObject.discount = discount.textContent;
      }
      cardFavouritesArray.push(cardObject)
      localStorage.setItem('productsFavourites', JSON.stringify(cardFavouritesArray));
    }
    if (cardBasketArray.length > 0) {
      addDisableCardLike();
    }
  })
  setTimeout(addDisableCardBtn, 0);
  setTimeout(addDisableCardLike, 0);
})

function addDisableCardBtn() {
  cardBasketArray.forEach(card => disableCardArray.push(card.id));
  disableCardArray.forEach(cardsID => {
    let cardDisable = document.querySelector(`[id = "${cardsID}"]`);
    if (cardDisable) {
      let cardDisableBtn = cardDisable.querySelector('.card-button');
      cardDisableBtn.classList.add('disable');
      cardDisableBtn.textContent = 'В корзине';
    }
  })
}
function addDisableCardLike() {
  cardFavouritesArray.forEach(card => disableCardFavourites.push(card.id));
  disableCardFavourites.forEach(cardsID => {
    let cardDisable = document.querySelector(`[id = "${cardsID}"]`);
    if (cardDisable) {
      let cardDisableLike = cardDisable.querySelector('.card-like');
      cardDisableLike.classList.add('disable');
    }
  })
}
function addInfoCard(target) {
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
  if (price_card) {
    cardObject.price_card = `${price_card.textContent}`;
  }
  cardObject.img = imgSrc;
  cardObject.rating = rating;
  if (discount) {
    cardObject.discount = discount.textContent;
  }
  cardFavouritesArray.push(cardObject)
  localStorage.setItem('productsFavourites', JSON.stringify(cardFavouritesArray));
}