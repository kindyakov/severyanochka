const products_container = document.querySelector('#products-container');
const filters_products = document.querySelector('.filters-products');

const products_containerDataset = products_container.dataset.products;

let btnNore;
let paginationList;
let modulePagination;
let paginationItem;
// Последняя карточка в массиве
let lastCardID;
let productsArrayLocalStorage = [];
// блоки со стрелочками в пагинции
let blockPrev, blockNext;
// Пагинация duble 
let duble_next, duble_prev;
// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
  productsArrayLocalStorage = JSON.parse(localStorage.getItem('productsBasket'));
}
let cardFavouritesArrays = [];
if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
  cardFavouritesArrays = JSON.parse(localStorage.getItem('productsFavourites'));
}

const products__footer = document.querySelector('.catalog-products__footer');
if (products_container) {
  async function getProducts() {
    const response = await fetch('../JSON/products.json');
    const productsObject = await response.json();
    const productsCurrent = productsObject[`${products_containerDataset}`];

    if (productsCurrent !== undefined) {
      const productsCards = productsCurrent['cardData'];
      const productsFillters = productsCurrent['fillters'];

      lastCardID = productsCards[productsCards.length - 1];
      renderProducts(productsCards);
      renderFillters(productsFillters)
      rating();
      addDisableCardBtn();
      addDisableCardLike();
    } else {
      products_container.style.height = '100%';
      products_container.innerHTML = `<div class="error-products">
    <div class="error-products_content">
      <span class="error-products_text">К сожалению, раздел пуст</span>
      <span class="error-products_comment">В данный момент нет активных товаров</span>
    </div>
  </div>`;
    }
  }
  getProducts();

  function renderProducts(productsArray) {
    const cardsVisible = 6;
    let cards = cardsVisible;
    let inter = 0;

    productsArray.forEach(card => {
      if (inter < cards) {
        renderCardHtml(card);
        inter++;
      }
    });

    if (productsArray.length > cardsVisible) {
      // добовляю footer  с кнопкой more и пагинацию
      products__footer.insertAdjacentHTML('beforeend', footerCatalogHtml());
      modulePagination = document.querySelector('.module-pagination');
      paginationList = document.querySelector('.module-pagination__list');
      btnNore = document.querySelector('.products__more-btn');

      blockPrev = document.querySelector('.module-pagination__prev-block');
      blockNext = document.querySelector('.module-pagination__next-block');

      duble_next = document.querySelector('.module-pagination__duble-next');
      duble_prev = document.querySelector('.module-pagination__duble-prev');

      blockPrev.classList.add('none');

      // Pagination add in html
      const arrayPaginstion = Math.ceil(productsArray.length / cardsVisible);

      for (let pagePagination = 1; pagePagination <= arrayPaginstion; pagePagination++) {
        paginationList.insertAdjacentHTML('beforeend', `<li class="module-pagination__item" data-pagination-index="${pagePagination}">${pagePagination}</li>`);
        if (pagePagination === 1) document.querySelector('.module-pagination__item').classList.add('show');
      }

      modulePagination.addEventListener('click', (e) => {
        if (e.target.classList.contains('module-pagination__item')) {
          const paginationIndex = e.target.dataset.paginationIndex;
          const visibleCard = productsArray.slice(paginationIndex * cardsVisible - cardsVisible, paginationIndex * cardsVisible);
          paginationItem = document.querySelectorAll('.module-pagination__item');

          paginationItem.forEach(li => li.classList.remove('show'));
          e.target.classList.add('show');
          // Очищаю контейнер с карточками
          products_container.innerHTML = '';
          // Добовляю новые карточки
          visibleCard.forEach(card => renderCardHtml(card));
          // Для показа рейтинга
          rating();
          // Добовляет класс disabled если карточка в корзине
          addDisableCardBtn();
          addDisableCardLike();
          // Проверка что последняя карточка на странице
          if (paginationItem.length == paginationIndex) btnNore.classList.add('disable');
          else btnNore.classList.remove('disable');

          addClassPaginationBlock();
        }
        if (e.target.classList.contains('module-pagination__span')) {
          let paginationIndex;
          paginationItem = document.querySelectorAll('.module-pagination__item');
          paginationItem.forEach(li => { if (li.classList.contains('show')) paginationIndex = Number(li.dataset.paginationIndex) });
          // Очищаю контейнер с карточками
          products_container.innerHTML = '';
          // Удаляю класс show всем пагинациям страницы
          paginationItem.forEach(li => li.classList.remove('show'));

          if (e.target.classList.contains('_icon-arrow')) {
            const single = e.target.dataset.single;
            if (single == 'prev') {
              const visibleCard = productsArray.slice((paginationIndex * cardsVisible) - cardsVisible * 2, paginationIndex * cardsVisible - cardsVisible);
              // Pagination active
              paginationItem[paginationIndex - 2].classList.add('show');
              // Вывод карточек            
              visibleCard.forEach(card => renderCardHtml(card));
            } else if (single == 'next') {
              const visibleCard = productsArray.slice(paginationIndex * cardsVisible, paginationIndex * cardsVisible + cardsVisible);
              // Pagination active
              paginationItem[paginationIndex--].classList.add('show');
              // Вывод карточек            
              visibleCard.forEach(card => renderCardHtml(card));
            }
          } else if (e.target.classList.contains('_icon-duble-arrows')) {
            const duble = e.target.dataset.duble;
            if (duble == 'duble-prev') {
              const visibleCard = productsArray.slice((paginationIndex * cardsVisible) - cardsVisible * 3, (paginationIndex * cardsVisible) - cardsVisible * 2);
              // Pagination active
              paginationItem[paginationIndex - 3].classList.add('show');
              // Вывод карточек            
              visibleCard.forEach(card => renderCardHtml(card));
            } else if (duble == 'duble-next') {
              const visibleCard = productsArray.slice(paginationIndex * cardsVisible + cardsVisible, paginationIndex * cardsVisible + cardsVisible * 2);
              // Pagination active
              paginationItem[paginationIndex + 1].classList.add('show');
              // Вывод карточек            
              visibleCard.forEach(card => renderCardHtml(card));
            }
          }
          rating();
          addDisableCardBtn();
          addDisableCardLike();
          addClassPaginationBlock();
          let arrayCard = document.querySelectorAll('.wrapper-card');
          if (arrayCard[arrayCard.length - 1].getAttribute('id') === lastCardID.id) btnNore.classList.add('disable');
          else btnNore.classList.remove('disable');
        }
      });
    }

    if (btnNore) {
      btnNore.addEventListener('click', function () {
        if (!this.classList.contains('disable')) {
          let paginationIndex;
          paginationItem = document.querySelectorAll('.module-pagination__item');
          paginationItem.forEach(li => { if (li.classList.contains('show')) paginationIndex = Number(li.dataset.paginationIndex) });

          const visibleCard = productsArray.slice(paginationIndex * cardsVisible, paginationIndex * cardsVisible + cardsVisible);

          // Вывод карточек
          visibleCard.forEach(card => renderCardHtml(card));
          rating();
          addDisableCardBtn();
          addDisableCardLike();
          // Pagination active
          paginationItem[paginationIndex--].classList.add('show');

          let arrayCard = document.querySelectorAll('.wrapper-card');
          if (arrayCard[arrayCard.length - 1].getAttribute('id') === lastCardID.id) btnNore.classList.add('disable');
          else btnNore.classList.remove('disable');

          addClassPaginationBlock();
        }
      });
    }
  };
  function renderFillters(filltersArray) {
    filltersArray.forEach((el, i) => {
      filters_products.insertAdjacentHTML('beforeend', `<div class="filters-products__name" data-filter="${i}">${el}</div>`);
    });
  }
};

// Rating
let ratingActive, ratingValue;

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
rating();

function addDisableCardBtn() {
  productsArrayLocalStorage.forEach(card => {
    let cardDisable = document.querySelector(`[id="${card}"]`);
    if (cardDisable) {
      let cardDisableBtn = cardDisable.querySelector('.add-btn');
      cardDisableBtn.classList.add('disable');
      cardDisableBtn.textContent = 'В корзине';
    }
  })
}
function addDisableCardLike() {
  cardFavouritesArrays.forEach(card => {
    let cardDisable = document.querySelector(`[id = "${card}"]`);
    if (cardDisable) {
      let cardDisableLike = cardDisable.querySelector('.card-like');
      cardDisableLike.classList.add('disable');
    }
  });
}
function cardsHtml(id, img, price, title, rating, link) {
  return `<div class="wrapper-card" id="${id}">
  <div class="card">
    <a href="${products_containerDataset}/${link}" class="card-wrapper-img">
      <img src="../img/img-card/${img[0]}" alt="${title}" class="card-img" data-img="${img[0]}"></img>
    </a>
    <div class="card-content">
      <div class="card-wrapper-price">
        <p class="card-price-text">
          <span class="card-price__ordinary card-price">${price} ₽</span>
          <i>Обычная</i>
        </p>
      </div>
      <div class="card-info">
        <a href="${products_containerDataset}/${link}" class="card-name-product">${title}</a>
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
    <span class="card-like _icon-shape"></span>
  </div>
</div>`;
}

function renderCardHtml(card) {
  products_container.insertAdjacentHTML('beforeend', cardsHtml(card.id, card.img, card.price, card.name, card.rating, card.link));

  const cardID = document.querySelector(`[id = "${card.id}"]`);
  if (card.discount !== '') {
    const cardWrapperImg = cardID.querySelector('.card-wrapper-img');
    cardWrapperImg.insertAdjacentHTML('beforeend', `<span class="card-discount">-${card.discount}%</span>`)
  }
  if (card.price_card) {
    const cardWrapperPrice = cardID.querySelector('.card-wrapper-price');

    cardWrapperPrice.insertAdjacentHTML('beforeend', `
      <p class="card-price-text">
        <span class="card-price__card card-price">${card.price_card} ₽</span>
        <i>С картой</i>
      </p>`);
  }
}
function addClassPaginationBlock() {
  if (paginationItem[0].classList.contains('show')) blockPrev.classList.add('none');
  else blockPrev.classList.remove('none');

  if (paginationItem[paginationItem.length - 1].classList.contains('show')) blockNext.classList.add('none');
  else blockNext.classList.remove('none');

  if (paginationItem[1].classList.contains('show')) duble_prev.classList.add('none');
  else duble_prev.classList.remove('none');

  if (paginationItem[paginationItem.length - 2].classList.contains('show')) duble_next.classList.add('none');
  else duble_next.classList.remove('none');
}
function footerCatalogHtml() {
  return `<div class="more-wrapper">
      <button class="products__more-btn">Показать ещё</button>
    </div>
    <div class="module-pagination">
      <nav class="module-pagination__nav">
        <div class="module-pagination__prev-block module-pagination__block">
          <span class="module-pagination__duble-prev module-pagination__span _icon-duble-arrows" data-duble="duble-prev"></span> 
          <span class="module-pagination__prev module-pagination__span _icon-arrow" data-single="prev"></span> 
        </div>
        <ul class="module-pagination__list">

        </ul>
        <div class="module-pagination__next-block module-pagination__block">
        <span class="module-pagination__next module-pagination__span _icon-arrow" data-single="next"></span>
          <span class="module-pagination__duble-next module-pagination__span _icon-duble-arrows" data-duble="duble-next"></span>
        </div>
      </nav>
    </div>`;
}