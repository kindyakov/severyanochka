let cardObject;
let cardArray = [];
let disableCardArray = [];
// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
  cardArray = JSON.parse(localStorage.getItem('productsBasket'));
}
if (JSON.parse(localStorage.getItem('disebleCards')) !== null) {
  disableCardArray = JSON.parse(localStorage.getItem('disebleCards'));
}
window.addEventListener('load', function () {
  const body = document.body;

  body.addEventListener('click', function (e) {
    const target = e.target;
    cardObject = {
      id: ``,
      name: ``,
      price: ``,
      img: ``,
      rating: ``,
    };

    if (target.classList.contains('card-button') && !target.classList.contains('disable')) {
      // Кнопка добавить в корзину
      const btn = target;
      // Обертка карточки
      const card = target.closest('.wrapper-card');
      // ID карточки
      const cardID = card.getAttribute('id');
      // Название товара
      const name = card.querySelector('.card-name-product').textContent;
      // Цена товара
      const price = card.querySelector('.card-price__card').textContent;
      // Цена товара без карты 
      const price_card = card.querySelector('.card-price__ordinary');
      // Картинка карточки
      const imgSrc = card.querySelector('.card-img').dataset.img;
      // Рейтинг 
      const rating = card.querySelector('.card-rating__items').dataset.rating;
      // Скидка 
      const discount = card.querySelector('.card-discount');

      cardObject.id = `${cardID}`;
      cardObject.name = `${name}`;
      cardObject.price = `${price}`;
      if (price_card) {
        cardObject.price_card = `${price_card.textContent}`;
      }
      cardObject.img = `${imgSrc}`;
      cardObject.rating = `${rating}`;
      if (discount) {
        cardObject.discount = `${discount.textContent}`;
      }
      cardArray.push(cardObject)
      localStorage.setItem('productsBasket', JSON.stringify(cardArray));

      disableCardArray.push(cardID);
      localStorage.setItem('disebleCards', JSON.stringify(disableCardArray));

      if (disableCardArray.length > 0) {
        addDisableCardBtn();
      }
    }
  })
  setTimeout(addDisableCardBtn, 0)
})

function addDisableCardBtn() {
  disableCardArray.forEach(cardsID => {
    let cardDisable = document.querySelector(`[id="${cardsID}"]`);
    let cardDisableBtn = cardDisable.querySelector('.card-button');
    cardDisableBtn.classList.add('disable');
    cardDisableBtn.textContent = 'В корзине';
  })
}