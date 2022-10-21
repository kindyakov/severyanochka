const body = document.body;
let cardObject;

body.addEventListener('click', function (e) {
  const target = e.target;
  cardObject = {
    id: ``,
    name: ``,
    price: ``,
    price_card: ``,
    img: ``,
    rating: ``,
    discount: ``
  };

  if (target.classList.contains('card-button')) {
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
    const imgSrc = card.querySelector('.card-img').getAttribute('src');
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
    console.log(cardObject);
  }
})