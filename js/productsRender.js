const products_container = document.querySelector('#products-container');

let btnNore;
let paginationList;
let productsArrayLocalStorage = [];

// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
  productsArrayLocalStorage = JSON.parse(localStorage.getItem('productsBasket'));
}


const products__footer = document.querySelector('.catalog-products__footer');
if (products_container) {
  async function getProducts() {
    const response = await fetch(`../JSON/${products_container.dataset.products}.json`); // нужный мне json файл
    const productsArray = await response.json();
    renderProducts(productsArray);
    rating();
  }
  getProducts();

  function renderProducts(productsArray) {
    const productsLength = productsArray.length;
    let cardsVisible = 6;
    let cards = cardsVisible;
    let inter = 0;
    let arrVisibleCard = cardsVisible;

    productsArray.forEach(card => {
      if (inter < cards) {
        if (card.discount || card.price_card) {
          const productHTML = `
          <div class="wrapper-card" id="${card.id}">
                  <div class="card">
                    <a href="" class="card-wrapper-img">
                      <img src="../img/img-card/${card.img}" alt="Блинчики" class="card-img" data-img="${card.img}"></img>
                      <span class="card-discount">-${card.discount}%</span>
                    </a>
                    <div class="card-content">
                      <div class="card-wrapper-price">
                        <p class="card-price-text">
                          <span class="card-price__card card-price">${card.price_card} ₽</span>
                          <i>С картой</i>
                        </p>
                        <p class="card-price-text">
                          <span class="card-price__ordinary card-price">${card.price} ₽</span>
                          <i>Обычная</i>
                        </p>
                      </div>
                      <div class="card-info">
                        <a href="" class="card-name-product">${card.name}</a>
                        <div class="card-rating">
                          <div class="card-rating__active">
                            <div class="card-rating__item _icon-star"></div>
                            <div class="card-rating__item _icon-star"></div>
                            <div class="card-rating__item _icon-star"></div>
                            <div class="card-rating__item _icon-star"></div>
                            <div class="card-rating__item _icon-star"></div>
                          </div>
                          <div class="card-rating__items" data-rating="${card.rating}">
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
                </div>
          `;
          products_container.insertAdjacentHTML('beforeend', productHTML);
        } else {
          const productHTML = `
          <div class="wrapper-card" id="${card.id}">
                              <div class="card">
                                <a href="" class="card-wrapper-img">
                                  <img src="../img/img-card/${card.img}" alt="Блинчики" class="card-img" data-img="${card.img}"></img>
                                </a>
                                <div class="card-content">
                                  <div class="card-wrapper-price">
                                    <p class="card-price-text">
                                      <span class="card-price__card card-price">${card.price} ₽</span>
                                    </p>
                                  </div>
                                  <div class="card-info">
                                    <a href="" class="card-name-product">${card.name}</a>
                                    <div class="card-rating">
                                      <div class="card-rating__active">
                                        <div class="card-rating__item _icon-star"></div>
                                        <div class="card-rating__item _icon-star"></div>
                                        <div class="card-rating__item _icon-star"></div>
                                        <div class="card-rating__item _icon-star"></div>
                                        <div class="card-rating__item _icon-star"></div>
                                      </div>
                                      <div class="card-rating__items" data-rating="${card.rating}">
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
                            </div>
          `;
          products_container.insertAdjacentHTML('beforeend', productHTML);
        }
        inter++;
      }
    });
    if (productsArray.length > 0) {
      products__footer.insertAdjacentHTML('beforeend', `<div class="more-wrapper">
      <button class="products__more-btn">Показать ещё</button>
    </div>
    <div class="module-pagination">
      <nav class="module-pagination__nav">
        <div class="module-pagination__prev-block module-pagination__block">
          <span
            class="module-pagination__duble-prev module-pagination__span _icon-duble-arrows"></span>
          <span class="module-pagination__prev module-pagination__span _icon-arrow"></span>
        </div>
        <ul class="module-pagination__list">

        </ul>
        <div class="module-pagination__next-block module-pagination__block">
          <span class="module-pagination__next module-pagination__span _icon-arrow"></span>
          <span
            class="module-pagination__duble-next module-pagination__span _icon-duble-arrows"></span>
        </div>
      </nav>
    </div>`);
      paginationList = document.querySelector('.module-pagination__list');
      btnNore = document.querySelector('.products__more-btn');
    }
    if (btnNore) {
      btnNore.addEventListener('click', function () {
        const visibleCard = productsArray.slice(cards, cards + cardsVisible);
        cards += cardsVisible;
        // Вывод карточек
        visibleCard.forEach(card => {
          if (card.discount || card.price_card) {
            const productHTML = `
          <div class="wrapper-card" id="${card.id}">
                  <div class="card">
                    <a href="" class="card-wrapper-img">
                      <img src="../img/img-card/${card.img}" alt="Блинчики" class="card-img" data-img="${card.img}"></img>
                      <span class="card-discount">-${card.discount}%</span>
                    </a>
                    <div class="card-content">
                      <div class="card-wrapper-price">
                        <p class="card-price-text">
                          <span class="card-price__card card-price">${card.price_card} ₽</span>
                          <i>С картой</i>
                        </p>
                        <p class="card-price-text">
                          <span class="card-price__ordinary card-price">${card.price} ₽</span>
                          <i>Обычная</i>
                        </p>
                      </div>
                      <div class="card-info">
                        <a href="" class="card-name-product">${card.name}</a>
                        <div class="card-rating">
                          <div class="card-rating__active">
                            <div class="card-rating__item _icon-star"></div>
                            <div class="card-rating__item _icon-star"></div>
                            <div class="card-rating__item _icon-star"></div>
                            <div class="card-rating__item _icon-star"></div>
                            <div class="card-rating__item _icon-star"></div>
                          </div>
                          <div class="card-rating__items" data-rating="${card.rating}">
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
                </div>
          `;
            products_container.insertAdjacentHTML('beforeend', productHTML);
          } else {
            const productHTML = `
          <div class="wrapper-card" id="${card.id}">
                              <div class="card">
                                <a href="" class="card-wrapper-img">
                                  <img src="../img/img-card/${card.img}" alt="Блинчики" class="card-img" data-img="${card.img}"></img>
                                </a>
                                <div class="card-content">
                                  <div class="card-wrapper-price">
                                    <p class="card-price-text">
                                      <span class="card-price__card card-price">${card.price} ₽</span>
                                    </p>
                                  </div>
                                  <div class="card-info">
                                    <a href="" class="card-name-product">${card.name}</a>
                                    <div class="card-rating">
                                      <div class="card-rating__active">
                                        <div class="card-rating__item _icon-star"></div>
                                        <div class="card-rating__item _icon-star"></div>
                                        <div class="card-rating__item _icon-star"></div>
                                        <div class="card-rating__item _icon-star"></div>
                                        <div class="card-rating__item _icon-star"></div>
                                      </div>
                                      <div class="card-rating__items" data-rating="${card.rating}">
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
                            </div>
          `;
            products_container.insertAdjacentHTML('beforeend', productHTML);
          }
        })
        rating();
        addDisableCardBtn();
        // Pagination active
        let arrayCard = document.querySelectorAll('.wrapper-card').length;
        document.querySelectorAll('.module-pagination__item').forEach((page, i) => {
          i++;
          if (i <= (arrayCard / cardsVisible)) {
            page.classList.add('show')
          }
        });
        //
        if (arrVisibleCard === (productsLength - cardsVisible)) {
          btnNore.classList.add('disable');
        } else {
          btnNore.classList.remove('disable');
          arrVisibleCard += cardsVisible;
        }
      });
    }


    // Pagination add in html
    const arrayPaginstion = (productsArray.length / cardsVisible)

    for (let pagePagination = 1; pagePagination <= arrayPaginstion; pagePagination++) {
      const paginadionHtml = `<li class="module-pagination__item" data-pagination-index="${pagePagination}">${pagePagination}</li>`;
      paginationList.insertAdjacentHTML('beforeend', paginadionHtml);
      if (pagePagination === 1) {
        document.querySelector('.module-pagination__item').classList.add('show');
      }
    }
  };
};
// Rating
function rating() {
  const cardRating = document.getElementsByClassName('card-rating');
  if (cardRating.length > 0) {
    initRatings();
  }

  function initRatings() {
    let ratingActive, ratingValue;

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
  productsArrayLocalStorage.forEach(card => disableCardArray.push(card.id));
  disableCardArray.forEach(cardsID => {
    let cardDisable = document.querySelector(`[id="${cardsID}"]`);
    if (cardDisable) {
      let cardDisableBtn = cardDisable.querySelector('.card-button');
      cardDisableBtn.classList.add('disable');
      cardDisableBtn.textContent = 'В корзине';
    }
  })
}