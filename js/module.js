window.addEventListener('load', function () {
  const body = document.body;
  // Колличество товаров корзины в шапке
  const basketQuantity = document.querySelector('#menu-basket');

  let cardArray = [];

  if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
    cardArray = JSON.parse(localStorage.getItem('productsBasket'));
    basketQuantity.textContent = cardArray.length;
  } else {
    basketQuantity.textContent = '0';
  }

  body.addEventListener('click', function (e) {
    if (e.target.classList.contains('card-button')) {
      cardArray = JSON.parse(localStorage.getItem('productsBasket'));
      basketQuantity.textContent = cardArray.length;
    }
  })

})

