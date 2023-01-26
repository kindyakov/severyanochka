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
const RenderCardHtml = (where, card, urlOrigin, favourites = false) => {
  where.insertAdjacentHTML('beforeend', CardHtml(card.id, card.img, card.price, card.name, card.rating, card.link, card.catalog, urlOrigin));

  const cardID = document.querySelector(`[id = "${card.id}"]`);
  const cardDiscount = cardID.querySelector('.card-discount');
  if (favourites) {
    const _Card = cardID.querySelector('.card');
    _Card.insertAdjacentHTML('beforeend', `<div class="card-delete-wrapper">
    <span class="card-delete">✖</span>
  </div>`)
  }
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
export { CardHtml, RenderCardHtml };