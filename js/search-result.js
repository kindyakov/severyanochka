import { urlOrigin } from './modules/Links.js';
import CardHtml from './modules/CardHtml.js';
import { AddDisableCardBtn, AddDisableCardLike } from './modules/AddDisableClass.js';
import Rating from './modules/Rating.js';
import GetAllCards from './modules/GetAllCards.js';
import CardsFromLS from "./modules/CardsFromLS.js";



window.addEventListener('DOMContentLoaded', function () {
  const content = document.querySelector('.search-result__content');
  const searchResult_value = document.querySelector('.search-result__value ');
  const searchResult_error = document.querySelector('.search-result__error');
  const [cardsBasket, cardsFavourites] = CardsFromLS();

  let search_result = []
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
    .then(data => GetAllCards(data, search_result.productsID))
    .then(cards => cards.forEach(card => renderCardHtml(card)))
    .catch(err => console.error(err))

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
    AddDisableCardBtn(cardsBasket);
    AddDisableCardLike(cardsFavourites);
  }
})
