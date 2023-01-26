import { urlOrigin } from './modules/Links.js';
import { RenderCardHtml } from './modules/CardHtml.js';
import { AddDisableCardBtn, AddDisableCardLike } from './modules/AddDisableClass.js';
import Rating from "./modules/Rating.js";
import CardsFromLS from './modules/CardsFromLS.js';

window.addEventListener('DOMContentLoaded', function () {
  const catalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
  const content = document.querySelector('#discount-content');
  
  const [cardsBasket, cardsFavourites] = CardsFromLS();

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
    .then(cards => cards.forEach(card => RenderCardHtml(content, card, urlOrigin)))
    .then(() => {
      Rating();
      AddDisableCardBtn(cardsBasket);
      AddDisableCardLike(cardsFavourites);
    })
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
})
