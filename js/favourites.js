const favouritesProducts = document.querySelector('#favourites-products');
const randeSlider = document.querySelector('.filters_box-paramets__sliders');

// Продукт из localSorange
let product = [];

// "span" для вывода Колличество товара 
const productQuantity = document.querySelector('.main-title-quantity');
// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
  product = JSON.parse(localStorage.getItem('productsFavourites'));
  productQuantity.textContent = product.length;

} else {
  productQuantity.textContent = '0';
}

if (product.length > 0) {
  product.forEach(function (card) {
    favouritesProducts.insertAdjacentHTML('beforeend', cardsHtml(card.id, card.img, card.price, card.name, card.rating));

    const cards = document.querySelector(`[id = "${card.id}"]`);
    if (card.discount) {
      const cardWrapperImg = cards.querySelector('.card-wrapper-img');
      cardWrapperImg.insertAdjacentHTML('beforeend', `<span class="card-discount">${card.discount}</span>`)
    }
    if (card.price_card) {
      const cardWrapperPrice = cards.querySelector('.card-wrapper-price');
      const cardPrice__card = cards.querySelector('.card-price__card');

      cardWrapperPrice.insertAdjacentHTML('beforeend', `
      <p class="card-price-text">
        <span class="card-price__ordinary card-price">${card.price_card}</span>
        <i>Обычная</i>
      </p>`);
      cardPrice__card.insertAdjacentHTML('afterend', `<i>С картой</i>`);
    }
  })
} else {
  favouritesProducts.style.height = '100%';
  favouritesProducts.innerHTML = `<div class="error-products">
    <div class="error-products_content">
      <span class="error-products_text">К сожалению, раздел пуст</span>
      <a href="html/catalog.html" class="basket__empty-link">Нажмите здесь, чтобы продолжить покупки</a>
    </div>
  </div>`;
}

function cardsHtml(id, img, price, title, rating) {
  return `<div class="wrapper-card" id="${id}">
  <div class="card">
    <a href="" class="card-wrapper-img">
      <img src="img/img-card/${img}" alt="Блинчики" class="card-img" data-img="${img}"></img>
    </a>
    <div class="card-content">
      <div class="card-wrapper-price">
        <p class="card-price-text">
          <span class="card-price__card card-price">${price}</span>
        </p>
      </div>
      <div class="card-info">
        <a href="" class="card-name-product">${title}</a>
        <div class="card-rating">
          <div class="card-rating__active">
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
          </div>
          <div class="card-rating__items" data-rating="${rating}">
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
            <div class="card-rating__item _icon-star"></div>
          </div>
        </div>
      </div>
      <button class="card-button">В корзину</button>
    </div>
    <span class="card-like _icon-shape"></span>
    <div class="card-delete-wrapper">
      <span class="card-delete">✖</span>
    </div>
  </div>
</div>`;
}

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


if (product.length > 0) {
  product.forEach(card => {
    min_maxPriceArr.push(priceWithoutSpaces(card.price));
    if (card.price_card !== undefined) min_maxPriceArr.push(priceWithoutSpaces(card.price_card))
  })

  rangeSettings.range['max'] = [Math.max.apply(null, min_maxPriceArr)];
  rangeSettings.range['min'] = [Math.min.apply(null, min_maxPriceArr)];

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

// Получаю числовое значение из строки 
function priceWithoutSpaces(str) {
  return Number(str.replace(/[^\d.-]/g, ''));
}

// Удаление карточек
favouritesProducts.addEventListener('click', e => {
  if (e.target.classList.contains('card-delete')) {
    // Карточка
    const wrapperCard = e.target.closest('.wrapper-card');
    // ID карточки
    const wrapperCardId = wrapperCard.getAttribute('id');

    // Нахожу удалееные карточку в массиве 
    const removeCardIndex = product.findIndex(card => card.id === wrapperCardId);

    // Удаление из массива
    product.splice(removeCardIndex, 1);
    localStorage.setItem('productsFavourites', JSON.stringify(product));

    // Вывод количество товаров в избранном 
    document.querySelector('#menu-favourites').textContent = product.length;
    productQuantity.textContent = product.length;

    wrapperCard.remove();

    product.forEach(card => {
      min_maxPriceArr.push(priceWithoutSpaces(card.price));
      if (card.price_card !== undefined) min_maxPriceArr.push(priceWithoutSpaces(card.price_card));
    })

    priceMax = Math.max.apply(null, min_maxPriceArr);
    priceMin = Math.min.apply(null, min_maxPriceArr);

    rangeSettings.range['max'] = [priceMax];
    rangeSettings.range['min'] = [priceMin];

    randeSlider.noUiSlider.set([priceMin, priceMax]);
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
// Анияция карточки при удалении
function cardRemoveAnim(item) {
  let anim = item.animate([
    { transform: 'scale(1)', opacity: '1' },
    { transform: 'scale(0)', opacity: '0' },
  ], { duration: 200 });
  anim.addEventListener('finish', () => item.remove());
}

if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
  document.querySelectorAll('.card-delete').forEach(span => span.style.opacity = 1);
}