import { urlOrigin } from './modules/Links.js';
import { RenderCardHtml } from './modules/CardHtml.js';
import { AddDisableCardBtn, AddDisableCardLike } from './modules/AddDisableClass.js';
import Rating from './modules/Rating.js';
import GetAllCards from './modules/GetAllCards.js';
import ErrorProducts from './modules/ErrorProducts.js';
import CardsFromLS from "./modules/CardsFromLS.js";

window.addEventListener('DOMContentLoaded', function () {
  const favouritesProducts = document.querySelector('#favourites-products');
  const randeSlider = document.querySelector('.filters_box-paramets__sliders');
  // Продукт из localSorange
  const [cardsBasket, cardsFavourites] = CardsFromLS();

  // "span" для вывода Колличество товара 
  const productQuantity = document.querySelector('.main-title-quantity');

  if (cardsFavourites.length > 0) {
    productQuantity.textContent = cardsFavourites.length;
  } else productQuantity.textContent = '0';

  let min_maxPriceArr = [];
  let rangeSettings = {
    start: [0, 999],
    connect: true,
    step: 1,
    range: {
      'min': [0],
      'max': [999],
    }
  }

  fetch('JSON/products.json')
    .then(data => data.json())
    .then(data => GetAllCards({ product: data, productID: cardsFavourites, byId: true }))
    .then(data => {
      if (cardsFavourites.length > 0) data.forEach(card => RenderCardHtml(favouritesProducts, card, urlOrigin, true))
      else {
        favouritesProducts.style.height = '100%';
        favouritesProducts.innerHTML = ErrorProducts();
      }
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        document.querySelectorAll('.card-delete').forEach(span => span.style.opacity = 1);
      }
      AddDisableCardBtn(cardsBasket);
      AddDisableCardLike(cardsFavourites);
      Rating();
      filter(data);
    })
    .catch(err => {
      favouritesProducts.style.height = '100%';
      favouritesProducts.innerHTML = ErrorProducts();
      console.error(err)
    })
  // Удаление карточек
  favouritesProducts.addEventListener('click', e => {
    if (e.target.classList.contains('card-delete')) {
      // Карточка
      const wrapperCard = e.target.closest('.wrapper-card');
      // ID карточки
      const wrapperCardId = wrapperCard.getAttribute('id');

      // Нахожу удаленные карточку в массиве 
      const removeCardIndex = cardsFavourites.findIndex(id => id === wrapperCardId);

      // Удаление из массива
      cardsFavourites.splice(removeCardIndex, 1);
      localStorage.setItem('productsFavourites', JSON.stringify(cardsFavourites));

      // Вывод количество товаров в избранном 
      document.querySelector('#menu-favourites').textContent = cardsFavourites.length;
      productQuantity.textContent = cardsFavourites.length;

      wrapperCard.remove();
      const wrapperCards = document.querySelectorAll('.wrapper-card');
      // filterPrice(wrapperCards)
    }
    if (cardsFavourites.length === 0) {
      favouritesProducts.style.height = '100%';
      favouritesProducts.innerHTML = `<div class="error-products">
      <div class="error-products_content">
        <span class="error-products_text">К сожалению, раздел пуст</span>
        <a href="html/catalog.html" class="basket__empty-link">Нажмите здесь, чтобы продолжить покупки</a>
      </div>
    </div>`;
    }
  });
  function filter(cardsFavourites) {
    if (cardsFavourites.length > 0) {
      cardsFavourites.forEach(card => {
        min_maxPriceArr.push(priceWithoutSpaces(card.price));
        if (card.price_card !== '') min_maxPriceArr.push(priceWithoutSpaces(card.price_card))
      })

      rangeSettings.range['max'] = [Math.max(...min_maxPriceArr)];
      rangeSettings.range['min'] = [Math.min(...min_maxPriceArr)];

      noUiSlider.create(randeSlider, rangeSettings);

      const minPrice = document.querySelector('#min-price');
      const maxPrice = document.querySelector('#max-price');

      const inputsPrice = [minPrice, maxPrice];

      randeSlider.noUiSlider.on('update', function (values, handle) {
        inputsPrice[handle].value = Math.round(values[handle]);
      })

      const setRangeSlider = (i, value) => {
        let arr = [null, null]
        arr[i] = value;

        randeSlider.noUiSlider.set(arr);
      }

      inputsPrice.forEach((el, i) => {
        el.addEventListener('change', function (e) {
          setRangeSlider(i, e.currentTarget.value);
        })
      })
    }
  }
  // Получаю числовое значение из строки 
  function priceWithoutSpaces(str) {
    return Number(str.replace(/[^\d.-]/g, ''));
  }
  // function filterPrice(cards) {
  //   cards.forEach(card => {
  //     min_maxPriceArr.push(priceWithoutSpaces(card.price));
  //     if (card.price_card !== '') min_maxPriceArr.push(priceWithoutSpaces(card.price_card));
  //   })

  //   priceMax = Math.max(...min_maxPriceArr);
  //   priceMin = Math.min(...min_maxPriceArr);

  //   rangeSettings.range['max'] = [priceMax];
  //   rangeSettings.range['min'] = [priceMin];

  //   randeSlider.noUiSlider.set([priceMin, priceMax]);
  // }
})
