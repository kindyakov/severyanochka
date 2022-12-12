const title = document.querySelector('title');
const products = document.querySelector('.products');
const navigationLink = document.querySelector('.main__navigation-link');
const productsTitle = document.querySelector('.products-title');
const article = document.querySelector('.products__header-article');
const rating = document.querySelector('.card-rating__items');
rating.dataset.rating = 2;
const feedback = document.querySelector('.products__header-feedback');

let cardsCurrent;
async function getData() {
  const response = await fetch('../../JSON/products.json');
  const productsArr= await response.json();
  const productsCurrent = productsArr[`${products.dataset.card}`].cardData;
  cardsCurrent = productsCurrent.filter(card => card.id === products.dataset.id)[0];
  console.log(cardsCurrent);
}
getData();