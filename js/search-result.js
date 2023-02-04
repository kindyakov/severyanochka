import { urlOrigin } from './modules/Links.js';
import { RenderCardHtml } from './modules/CardHtml.js';
import { AddDisableCardBtn, AddDisableCardLike } from './modules/AddDisableClass.js';
import Rating from './modules/Rating.js';
import GetAllCards from './modules/GetAllCards.js';
import CardsFromLS from "./modules/CardsFromLS.js";

window.addEventListener('DOMContentLoaded', function () {
  const content = document.querySelector('.search-result__content');
  const searchResult_value = document.querySelector('.search-result__value ');
  const searchResult_error = document.querySelector('.search-result__error');
  const [cardsBasket, cardsFavourites] = CardsFromLS();

  let search_result = {};
  if (JSON.parse(localStorage.getItem('search_result')) !== null) {
    search_result = JSON.parse(localStorage.getItem('search_result'));
  }
  searchResult_value.textContent = search_result.value;
  if (search_result.availability == false) {
    searchResult_error.style.display = 'inline';
    return;
  }
  fetch('JSON/products.json')
    .then(data => data.json())
    .then(data => GetAllCards({ product: data, productID: search_result.productsID, byId: true }))
    .then(cards => cards.forEach(card => RenderCardHtml(content, card, urlOrigin)))
    .catch(err => console.error(err))
    .finally(() => {
      Rating();
      AddDisableCardBtn(cardsBasket);
      AddDisableCardLike(cardsFavourites);
    })
})
