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
  function cardsHtml(id, img, price, title, rating, link, catalog) {
    return `<div class="wrapper-card swiper-slide" id="${id}">
    <div class="card">
      <a href="html/${catalog}/${link}" class="card-wrapper-img">
        <img src="img/img-card/${img[0]}" alt="${title}" class="card-img" data-img="${img[0]}"></img>
        <span class="card-discount"></span>
      </a>
      <div class="card-content">
        <div class="card-wrapper-price">
          <p class="card-price-text">
            <span class="card-price__ordinary card-price">${price} ₽</span>
            <i class="card-price__i"></i>
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
    </div>
  </div>`;
  }
  function renderCardHtml(card) {
    content.insertAdjacentHTML('beforeend', cardsHtml(card.id, card.img, card.price, card.name, card.rating, card.link, card.catalog));
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
    rating();
    addDisableCardBtn();
    addDisableCardLike();
  }
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
    cardBasketArray.forEach(id => {
      let cardDisable = document.querySelector(`[id = "${id}"]`);
      if (cardDisable) {
        let cardDisableBtn = cardDisable.querySelector('.add-btn');
        cardDisableBtn.classList.add('disable');
        cardDisableBtn.textContent = 'В корзине';
      }
    })
  }
  function addDisableCardLike() {
    cardFavouritesArray.forEach(id => {
      let cardDisable = document.querySelector(`[id = "${id}"]`);
      if (cardDisable) {
        let cardDisableLike = cardDisable.querySelector('.like');
        if (cardDisableLike) cardDisableLike.classList.add('disable');
      }
    });
  }
})
