let cardObject;
let cardBasketArray = [];
let cardFavouritesArray = [];

// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
  cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
}
if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
  cardFavouritesArray = JSON.parse(localStorage.getItem('productsFavourites'));
}

window.addEventListener('DOMContentLoaded', function () {

  document.body.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('add-btn') && !target.classList.contains('disable')) {
      addInfoCard(target, cardBasketArray, 'productsBasket');
      addDisableCardBtn(cardBasketArray);
    };
    if (target.classList.contains('card-like') && !target.classList.contains('disable')) {
      addInfoCard(target, cardFavouritesArray, 'productsFavourites');
      addDisableCardLike(cardFavouritesArray);
    }
  });
  addDisableCardBtn();
  addDisableCardLike();
})



function addDisableCardBtn() {
  cardBasketArray.forEach(card => {
    let cardDisable = document.querySelector(`[id = "${card}"]`);
    if (cardDisable) {
      let cardDisableBtn = cardDisable.querySelector('.add-btn');
      cardDisableBtn.classList.add('disable');
      cardDisableBtn.textContent = 'В корзине';
    }
  })
}
function addDisableCardLike() {
  cardFavouritesArray.forEach(card => {
    let cardDisable = document.querySelector(`[id = "${card}"]`);
    if (cardDisable) {
      let cardDisableLike = cardDisable.querySelector('.card-like');
      cardDisableLike.classList.add('disable');
    }
  });
}
function addInfoCard(target, arr, storage) {
  cardObject = {
    id: '',
    name: '',
    price: '',
    img: '',
    rating: '',
    link: '',
  };

  const card = target.closest('.wrapper-card');// Обертка карточки
  const cardID = card.getAttribute('id'); // ID карточки
  const name = card.querySelector('.card-name-product');// Название товара
  const price = card.querySelector('.card-price__ordinary');// Цена товара
  const price_card = card.querySelector('.card-price__card'); // Цена товара c картой 
  const imgSrc = card.querySelector('.card-img'); // Картинка карточки
  const rating = card.querySelector('.card-rating__items'); // Рейтинг 
  const discount = card.querySelector('.card-discount'); // Скидка 
  const url = card.querySelector('.card-wrapper-img'); // url товара 
  // const link = url.href.split('/').reverse()[1] + '/' + url.href.split('/').reverse()[0]; // относительная ссылка

  // cardObject.id = cardID;
  // cardObject.name = name.textContent;
  // cardObject.price = price.textContent;
  // if (price_card) cardObject.price_card = price_card.textContent;
  // cardObject.img = imgSrc.dataset.img;
  // cardObject.rating = rating.dataset.rating;
  // if (discount) cardObject.discount = discount.textContent;
  // cardObject.link = link;

  // arr.unshift(cardObject);
  arr.unshift(cardID);
  localStorage.setItem(`${storage}`, JSON.stringify(arr));
}