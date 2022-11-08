import {productsCurrent} from './productsRender.js';
console.log(productsCurrent);

const btnNore = document.querySelector('.products__more-btn');

if (btnNore) {
  btnNore.addEventListener('click', function () {
    const visibleCard = productsArray.slice(cards, cards + cardsVisible);
    cards += cardsVisible;
    // Вывод карточек
    visibleCard.forEach(card => {
      products_container.insertAdjacentHTML('beforeend', cardsHtml(card.id, card.img, card.price, card.name, card.rating));

      const cardID = document.querySelector(`[id = "${card.id}"]`);
      if (card.discount) {
        const cardWrapperImg = cardID.querySelector('.card-wrapper-img');
        cardWrapperImg.insertAdjacentHTML('beforeend', `<span class="card-discount">${card.discount}</span>`)
      }
      if (card.price_card) {
        const cardWrapperPrice = cardID.querySelector('.card-wrapper-price');
        const cardPrice__card = cardID.querySelector('.card-price__card');

        cardWrapperPrice.insertAdjacentHTML('beforeend', `
        <p class="card-price-text">
          <span class="card-price__ordinary card-price">${card.price_card}</span>
          <i>Обычная</i>
        </p>`);
        cardPrice__card.insertAdjacentHTML('afterend', `<i>С картой</i>`);
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