import { AddDisableCardBtn, AddDisableCardLike } from './modules/AddDisableClass.js';
window.addEventListener('DOMContentLoaded', function () {
  let cardBasketArray = [];
  let cardFavouritesArray = [];

  // Проверяю чтоб не было null
  if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
    cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
  }
  if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
    cardFavouritesArray = JSON.parse(localStorage.getItem('productsFavourites'));
  }

  document.body.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('add-btn') && !target.classList.contains('disable')) {
      addInfoCard(target, cardBasketArray, 'productsBasket');
      AddDisableCardBtn(cardBasketArray);
    };
    if (target.classList.contains('like') && !target.classList.contains('disable')) {
      addInfoCard(target, cardFavouritesArray, 'productsFavourites');
      AddDisableCardLike(cardFavouritesArray);
    }
  });
  AddDisableCardBtn(cardBasketArray);
  AddDisableCardLike(cardFavouritesArray);

  function addInfoCard(target, arr, storage) {
    const card = target.closest('.wrapper-card');// Обертка карточки
    const cardID = card.getAttribute('id'); // ID карточки

    arr.unshift(cardID);
    localStorage.setItem(`${storage}`, JSON.stringify(arr));
  }
});





