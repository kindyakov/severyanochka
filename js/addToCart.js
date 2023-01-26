import { AddDisableCardBtn, AddDisableCardLike } from './modules/AddDisableClass.js';
import CardsFromLS from './modules/CardsFromLS.js';
window.addEventListener('DOMContentLoaded', function () {
  const [cardsBasket, cardsFavourites] = CardsFromLS();

  document.body.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('add-btn') && !target.classList.contains('disable')) {
      addInfoCard(target, cardsBasket, 'productsBasket');
      AddDisableCardBtn(cardsBasket);
    };
    if (target.classList.contains('like') && !target.classList.contains('disable')) {
      addInfoCard(target, cardsFavourites, 'productsFavourites');
      AddDisableCardLike(cardsFavourites);
    }
  });
  AddDisableCardBtn(cardsBasket);
  AddDisableCardLike(cardsFavourites);

  function addInfoCard(target, arr, storage) {
    const card = target.closest('.wrapper-card');// Обертка карточки
    const cardID = card.getAttribute('id'); // ID карточки

    arr.unshift(cardID);
    localStorage.setItem(`${storage}`, JSON.stringify(arr));
  }
});





