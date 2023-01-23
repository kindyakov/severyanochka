const CardBasketHtml = (id, img, link, catalog, price, title, urlOrigin) => {
  return `<div class="basket__wrapper-cards" id="${id}">
  <div class="basket__card">
    <div class="basket__card-wrapper-checkbox">
      <div class="basket__card-checkbox">
        <input type="checkbox" id="basket-card-check" class="basket__card-check basket-card-check">
        <label for="basket-card-check" class="basket__card-check-label">✓</label>
      </div>
    </div>

    <div class="basket__card-wrapper-content">
      <a href="${urlOrigin}/html/${catalog}/${link}" class="basket__card-wrapper-img">
        <img src="${urlOrigin}/img/img-card/${img[0]}" class="basket__card-img"></img>
      </a>
      <div class="basket__card-content">
        <a href="${urlOrigin}/html/${catalog}/${link}" class="basket__card-name">${title}</a>
        <div class="basket__card-text">
          <p class="basket__card-wrapper-price wrapper-price">
            <span class="basket__card-price basket__card-price-usual">${price} ₽</span>
            <i class="basket__card-price-context card-price-context-ordinary"></i>
          </p>
          <p class="basket__card-wrapper-price">
            <span class="basket__card-price basket__card-price-card"></span>
            <i class="basket__card-price-context card-price-context-card"></i>
          </p>
          <p>
            <span class="basket__card-info">за шт.</span>
          </p>
          <p>
            <span class="basket__card-discount"></span>
          </p>
        </div>
      </div>
    </div>
    <div class="basket__card-count-wrapper">
      <div class="basket__card-counter">
        <button class="basket__card-counter-btn counter-plus" data-counter-plus="+"></button>
        <span class="basket__card-counter-input">1</span>
        <button class="basket__card-counter-btn counter-minus" data-counter-plus="-"></button>
      </div>
      <div class="basket__card-counter-wrapper-price">
        <span class="basket__card-counter-price-sum">${price} ₽</span>
        <i class="basket__card-counter-price-old"></i>
      </div>
    </div>
  </div>
</div>`;
}

export default CardBasketHtml;