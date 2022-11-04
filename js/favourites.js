const favouritesProducts = document.querySelector('#favourites-products');
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

      cardWrapperPrice.insertAdjacentHTML('beforeend', `<p class="card-price-text">
      <span class="card-price__card card-price">${card.price_card}</span>
      <i>Обычная</i>
    </p>`);
      cardPrice__card.insertAdjacentHTML('afterend', `<i>С картой</i>`);
    }
  })
}

function cardsHtml(id, img, price, title, rating) {
  return `<div class="wrapper-card" id="${id}">
  <div class="card">
    <a href="" class="card-wrapper-img">
      <img src="../img/img-card/${img}" alt="Блинчики" class="card-img" data-img="${img}"></img>
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
  </div>
</div>`;
}