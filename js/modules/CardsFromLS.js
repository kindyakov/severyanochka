const CardsFromLS = () => {
  let cardsBasket = [], cardsFavourites = [];
  // Корзина
  if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
    cardsBasket = JSON.parse(localStorage.getItem('productsBasket'));
  };
  // Избранное
  if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
    cardsFavourites = JSON.parse(localStorage.getItem('productsFavourites'));
  };
  return [cardsBasket, cardsFavourites];
};

export default CardsFromLS;