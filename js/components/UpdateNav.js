const UpdateNav = () => {
  const body = document.body;
  // Колличество товаров корзины в шапке
  const basketQuantity = document.querySelector('#menu-basket');
  const favouritesQuantity = document.querySelector('#menu-favourites')

  let cardBasketArray = [];
  let cardFavouritesArray = [];

  if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
    cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
    basketQuantity.textContent = cardBasketArray.length;
  } else basketQuantity.textContent = '0';


  if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
    cardFavouritesArray = JSON.parse(localStorage.getItem('productsFavourites'));
    favouritesQuantity.textContent = cardFavouritesArray.length;
  } else favouritesQuantity.textContent = '0';


  body.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-btn')) {
      cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
      basketQuantity.textContent = cardBasketArray.length;
    }
    if (e.target.classList.contains('like')) {
      cardFavouritesArray = JSON.parse(localStorage.getItem('productsFavourites'));
      favouritesQuantity.textContent = cardFavouritesArray.length;
    }
  })
}

export default UpdateNav; 