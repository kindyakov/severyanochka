class CreateSliderCards {
  constructor(obj) {
    this.insert = obj.insert;
    this.where = obj.where;
    this.title = obj.title;
    this.link = obj.link;
    this.linkText = obj.linkText;
    this.className = obj.className;
    this.cards = obj.cards;
    this.urlOrigin = obj.urlOrigin;

    this.renderSlider();
    this.blockSwiping();
  }
  addSliderHtml() {
    this.insert.insertAdjacentHTML(`${this.where}`,
      sliderHtml(this.title, this.link, this.linkText, this.className));
  }
  addCardSlider() {

    this.cards.forEach(card => renderCardHtml(card, this.className, this.urlOrigin));
  }
  blockSwiping() {
    const index_swiper = document.querySelectorAll('.index-swiper');
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
      index_swiper.forEach(swiper => swiper.classList.remove('swiper-no-swiping'));
    } else {
      index_swiper.forEach(swiper => swiper.classList.add('swiper-no-swiping'));
    }
  }
  renderSlider() {
    this.addSliderHtml();
    this.addCardSlider();
  }
}

const sliderHtml = (title, link, linkText, className) => {
  return `
      <div class="main-promo main-section">
        <div class="main-promo__header">
          <h2 class="main-promo__title main-title title-discount">${title}</h2>
          <a href="${link}" class="main-promo__all-link main-promo__all-discount _icon-arrow">${linkText}</a>
        </div>
        <div class="products-swiper-wrapper">
          <!-- products-swiper -->
          <div class="index-swiper swiper">
            <div class="main-promo__content swiper-wrapper ${className}">

            </div>
            <div class="swiper-button-prev products-swiper-prev"></div>
            <div class="swiper-button-next products-swiper-next"></div>
          </div>
        </div>
    </div>`;
}
const CardHtml = (id, img, price, title, rating, link, catalog, urlOrigin) => {
  return `<div class="wrapper-card" id="${id}">
  <div class="card">
    <a href="${urlOrigin}/html/${catalog}/${link}" class="card-wrapper-img">
      <img src="${urlOrigin}/img/img-card/${img[0]}" alt="Блинчики" class="card-img" data-img="${img}"></img>
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
        <a href="${urlOrigin}/html/${catalog}/${link}" class="card-name-product">${title}</a>
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
const renderCardHtml = (card, selector, urlOrigin) => {
  const content = document.querySelector(`.${selector}`);

  content.insertAdjacentHTML('beforeend', CardHtml(card.id, card.img,
    card.price, card.name,
    card.rating, card.link,
    card.catalog, urlOrigin));

  const cardID = document.querySelector(`[id = "${card.id}"]`);
  cardID.classList.add('swiper-slide');

  const cardDiscount = cardID.querySelector('.card-discount');
  if (card.discount !== '') cardDiscount.textContent = '-' + card.discount + '%';
  else cardDiscount.style.display = 'none';
  if (card.price_card !== '') {
    const cardWrapperPrice = cardID.querySelector('.card-wrapper-price');
    cardWrapperPrice.insertAdjacentHTML('beforeend', `
      <p class="card-price-text">
        <span class="card-price__card card-price">${card.price_card}</span>
        <i>С картой</i>
      </p>`);
  }
}
export default CreateSliderCards;