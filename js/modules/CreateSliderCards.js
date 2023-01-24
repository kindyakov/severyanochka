class CreateSliderCards {
  constructor(insert, obj, cards, urlOrigin) {
    this.insert = insert;
    this.title = obj.title;
    this.link = obj.link;
    this.linkText = obj.linkText;
    this.className = obj.className;
    this.cards = cards;
    this.urlOrigin = urlOrigin;

    this.renderSlider();
  }
  addSliderHtml() {
    this.insert.insertAdjacentHTML('afterend', sliderHtml(this.title, this.link, this.linkText, this.className));
  }
  addCardSlider() {
    this.cards.forEach(card => renderCardHtml(card, this.className, this.urlOrigin));
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
        <div class="products-swiper-wrapper ${className}">
          <!-- products-swiper -->
          <div class="index-swiper swiper">
            <div class="main-promo__content swiper-wrapper">

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
    <div class="card-delete-wrapper">
      <span class="card-delete">✖</span>
    </div>
  </div>
  </div>`;
}
const renderCardHtml = (card, selector, urlOrigin) => {
  const wrapper = document.querySelector(`.${selector}`);
  const content = wrapper.querySelector('.swiper-wrapper');

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