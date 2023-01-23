const FeedbackHtml = (name, rating, data, comment) => {
  return `<div class="feedback__feedback">
    <div class="feedback__users">
      <div class="feedback__users-imeg">
        <img class="feedback__users-img" src="../../img/svg/user.svg" alt="${name}">
      </div>
      <span class="feedback__users-name">${name}</span>
    </div>
    <div class="feedback__users-rating">
      <div class="card-rating">
        <div class="card-rating__active">
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
        </div>
        <div class="card-rating__items" id="user-rating" data-rating="${rating}">
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
        </div>
      </div>
      <span class="feedback__users-data">${data}</span>
    </div>
    <p class="feedback__users-text">${comment}</p>
  </div>`;
}

export default FeedbackHtml;