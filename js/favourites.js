const catalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
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

fetch('../JSON/products.json')
  .then(data => data.json())
  .then(data => allCard(data))
  .then(data => serachCard(data))
  .then(data => {
    if (product.length > 0) {
      data.forEach(card => {
        renderCardHtml(card)

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
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
      document.querySelectorAll('.card-delete').forEach(span => span.style.opacity = 1);
    }
    addDisableCardBtn();
    addDisableCardLike();
    rating();
    filter(data);
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
  return productsALL;
}
// Ищу нужные карточки
function serachCard(array) {
  let cards = [];
  product.forEach(id => {
    cards = cards.concat(array.filter(card => card.id === id));
  })
  return cards;
}
function cardsHtml(id, img, price, title, rating, link, catalog) {
  return `<div class="wrapper-card" id="${id}">
  <div class="card">
    <a href="html/${catalog}/${link}" class="card-wrapper-img">
    <span class="card-discount"></span>
      <img src="img/img-card/${img[0]}" alt="Блинчики" class="card-img" data-img="${img}"></img>
    </a>
    <div class="card-content">
      <div class="card-wrapper-price">
        <p class="card-price-text">
          <span class="card-price__ordinary card-price">${price}</span>
          <i>Обычная</i>
        </p>
      </div>
      <div class="card-info">
        <a href="html/${catalog}/${link}" class="card-name-product">${title}</a>
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
      <button class="card-button add-btn">В корзину</button>
    </div>
    <span class="card-like _icon-shape like"></span>
    <div class="card-delete-wrapper">
      <span class="card-delete">✖</span>
    </div>
  </div>
</div>`;
}
function renderCardHtml(card) {
  favouritesProducts.insertAdjacentHTML('beforeend', cardsHtml(card.id, card.img, card.price, card.name, card.rating, card.link, card.catalog));

  const cardID = document.querySelector(`[id = "${card.id}"]`);
  const cardDiscount = cardID.querySelector('.card-discount');
  if (card.discount) cardDiscount.textContent = '-' + card.discount + '%';
  else cardDiscount.style.display = 'none';
  if (card.price_card) {
    const cardWrapperPrice = cardID.querySelector('.card-wrapper-price');

    cardWrapperPrice.insertAdjacentHTML('beforeend', `
      <p class="card-price-text">
        <span class="card-price__card card-price">${card.price_card}</span>
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
// Удаление карточек
favouritesProducts.addEventListener('click', e => {
  if (e.target.classList.contains('card-delete')) {
    // Карточка
    const wrapperCard = e.target.closest('.wrapper-card');
    // ID карточки
    const wrapperCardId = wrapperCard.getAttribute('id');

    // Нахожу удалееные карточку в массиве 
    const removeCardIndex = product.findIndex(id => id === wrapperCardId);

    // Удаление из массива
    product.splice(removeCardIndex, 1);
    localStorage.setItem('productsFavourites', JSON.stringify(product));

    // Вывод количество товаров в избранном 
    document.querySelector('#menu-favourites').textContent = product.length;
    productQuantity.textContent = product.length;

    wrapperCard.remove();

    product.forEach(card => {
      min_maxPriceArr.push(priceWithoutSpaces(card.price));
      if (card.price_card !== '') min_maxPriceArr.push(priceWithoutSpaces(card.price_card));
    })

    priceMax = Math.max(...min_maxPriceArr);
    priceMin = Math.min(...min_maxPriceArr);

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
function rating() {
  const cardRating = document.getElementsByClassName('card-rating');
  if (cardRating.length > 0) {
    initRatings();
  }
  function initRatings() {
    for (let i = 0; i < cardRating.length; i++) {
      const ratings = cardRating[i];
      initRating(ratings)
    }
  }
  function initRating(ratings) {
    initRatingVars(ratings)
    setTatingActiveWidth();
  }
  function initRatingVars(ratings) {
    ratingActive = ratings.querySelector('.card-rating__active');
    ratingValue = ratings.querySelector('.card-rating__items');
  }
  function setTatingActiveWidth(index = ratingValue.dataset.rating) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}px`;
  }
}
function addDisableCardBtn() {
  cardBasketArray.forEach(card => {
    let cardDisable = document.querySelector(`[id = "${card}"]`);
    if (cardDisable) {
      let cardDisableBtn = cardDisable.querySelector('.add-btn');
      cardDisableBtn.classList.add('disable');
      cardDisableBtn.textContent = 'В корзине';
    }
  })
}
function addDisableCardLike() {
  product.forEach(card => {
    let cardDisable = document.querySelector(`[id = "${card}"]`);
    if (cardDisable) {
      let cardDisableLike = cardDisable.querySelector('.card-like');
      cardDisableLike.classList.add('disable');
    }
  });
}