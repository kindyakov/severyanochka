import { urlOrigin } from './components/Links.js';
import CardHtml from './components/CardHtml.js';
import { AddDisableCardBtn, AddDisableCardLike } from './components/AddDisableClass.js';
import Rating from './components/Rating.js';
import GetAllCards from './components/GetAllCards.js';

window.addEventListener('DOMContentLoaded', function () {
  const favouritesProducts = document.querySelector('#favourites-products');
  const randeSlider = document.querySelector('.filters_box-paramets__sliders');

  // Продукт из localSorange
  let product = [];
  let cardBasketArray = [];
  // "span" для вывода Колличество товара 
  const productQuantity = document.querySelector('.main-title-quantity');
  // Проверяю чтоб не было null
  if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
    cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
  }
  if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
    product = JSON.parse(localStorage.getItem('productsFavourites'));
    productQuantity.textContent = product.length;
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
    .then(data => GetAllCards(data, product))
    .then(data => {
      if (product.length > 0) data.forEach(card => renderCardHtml(card))
      else {
        favouritesProducts.style.height = '100%';
        favouritesProducts.innerHTML = `<div class="error-products">
        <div class="error-products_content">
          <span class="error-products_text">К сожалению, раздел пуст</span>
          <a href="html/catalog.html" class="basket__empty-link">Нажмите здесь, чтобы продолжить покупки</a>
        </div>
      </div>`;
      }
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        document.querySelectorAll('.card-delete').forEach(span => span.style.opacity = 1);
      }
      AddDisableCardBtn(cardBasketArray);
      AddDisableCardLike(product);
      Rating();
      filter(data);
    })
    .catch(err => console.error(err))
  // Удаление карточек
  favouritesProducts.addEventListener('click', e => {
    if (e.target.classList.contains('card-delete')) {
      // Карточка
      const wrapperCard = e.target.closest('.wrapper-card');
      // ID карточки
      const wrapperCardId = wrapperCard.getAttribute('id');

      // Нахожу удаленные карточку в массиве 
      const removeCardIndex = product.findIndex(id => id === wrapperCardId);

      // Удаление из массива
      product.splice(removeCardIndex, 1);
      localStorage.setItem('productsFavourites', JSON.stringify(product));

      // Вывод количество товаров в избранном 
      document.querySelector('#menu-favourites').textContent = product.length;
      productQuantity.textContent = product.length;

      wrapperCard.remove();
      const wrapperCards = document.querySelectorAll('.wrapper-card');
      // filterPrice(wrapperCards)
    }
    if (product.length === 0) {
      favouritesProducts.style.height = '100%';
      favouritesProducts.innerHTML = `<div class="error-products">
      <div class="error-products_content">
        <span class="error-products_text">К сожалению, раздел пуст</span>
        <a href="html/catalog.html" class="basket__empty-link">Нажмите здесь, чтобы продолжить покупки</a>
      </div>
    </div>`;
    }
  });
  function renderCardHtml(card) {
    favouritesProducts.insertAdjacentHTML('beforeend', CardHtml(card.id, card.img, card.price, card.name, card.rating, card.link, card.catalog, urlOrigin));

    const cardID = document.querySelector(`[id = "${card.id}"]`);
    const cardDiscount = cardID.querySelector('.card-discount');
    if (card.discount) cardDiscount.textContent = '-' + card.discount + '%';
    else cardDiscount.style.display = 'none';
    if (card.price_card) {
      const cardWrapperPrice = cardID.querySelector('.card-wrapper-price');
      cardID.querySelector('.card-price__i').textContent = 'Обычная';
      cardWrapperPrice.insertAdjacentHTML('beforeend', `
      <p class="card-price-text">
        <span class="card-price__card card-price">${card.price_card} ₽</span>
        <i>С картой</i>
      </p>`);
    }
  }
  function filter(product) {
    if (product.length > 0) {
      product.forEach(card => {
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
