import { urlOrigin } from './components/Links.js';
import CardHtml from './components/CardHtml.js';
import { AddDisableCardBtn, AddDisableCardLike } from './components/AddDisableClass.js';
import Rating from "./components/Rating.js";

window.addEventListener('DOMContentLoaded', function () {
  const catalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
  const content = document.querySelector('#discount-content');

  let cardBasketArray = [];
  let cardFavouritesArray = [];

  // Проверяю чтоб не было null
  if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
    cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
  }
  if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
    cardFavouritesArray = JSON.parse(localStorage.getItem('productsFavourites'));
  }

  fetch('JSON/products.json')
    .then(data => data.json())
    .then(data => allCard(data))
    .then(cards => cards.forEach(card => renderCardHtml(card)))
    .catch(err => console.error(err))

  // Сохраняю все карточки
  function allCard(data) {
    let productsALL = [];
    catalog.forEach(title => {
      if (data[title]) {
        productsALL = [...productsALL, ...data[title].cardData];
      }
    });
    productsALL = productsALL.filter(card => card.discount !== '');
    return productsALL;
  }
  function renderCardHtml(card) {
    content.insertAdjacentHTML('beforeend', CardHtml(card.id, card.img, card.price, card.name, card.rating, card.link, card.catalog, urlOrigin));
    const cardID = document.querySelector(`[id = "${card.id}"]`);
    const cardDiscount = cardID.querySelector('.card-discount');
    if (card.discount !== '') cardDiscount.textContent = '-' + card.discount + '%';
    else cardDiscount.style.display = 'none';
    if (card.price_card !== '') {
      const cardWrapperPrice = cardID.querySelector('.card-wrapper-price');
      cardID.querySelector('.card-price__i').textContent = 'Обычная';
      cardWrapperPrice.insertAdjacentHTML('beforeend', `
        <p class="card-price-text">
          <span class="card-price__card card-price">${card.price_card}</span>
          <i>С картой</i>
        </p>`);
    }
    Rating();
    AddDisableCardBtn(cardBasketArray);
    AddDisableCardLike(cardFavouritesArray);
  }
})
