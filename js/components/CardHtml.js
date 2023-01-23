const CardHtml = (id, img, price, title, rating, link, catalog) => {
  return `<div class="wrapper-card" id="${id}">
  <div class="card">
    <a href="html/${catalog}/${link}" class="card-wrapper-img">
      <img src="img/img-card/${img[0]}" alt="Блинчики" class="card-img" data-img="${img}"></img>
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
    <div class="card-delete-wrapper">
      <span class="card-delete">✖</span>
    </div>
  </div>
  </div>`;
}

export default CardHtml;