const select = document.querySelector('#select-city');
const choices = new Choices(select, {
  searchEnabled: false,
});


// Объект с инфо о продуктах из localSorange
let quantityProduct = {};
// "span" для вывода Колличество товара 
const productQuantity = document.querySelector('.main-title-quantity');
// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('quantityProducts')) !== null) {
  quantityProduct = JSON.parse(localStorage.getItem('quantityProducts'));
  productQuantity.textContent = quantityProduct.quan;
  makingOrders();
} else {
  productQuantity.textContent = '0';
}

function makingOrders() {
  // Коробка информации заказа
  const boxInfoOrder = document.querySelector('.basket__aside-info');
  // Итоговая цена
  const resultPrice = document.querySelector('.basket__aside-info-price-result');

  boxInfoOrder.innerHTML = `<div class="basket__aside-info-block">
<p class="basket__aside-info-text">${quantityProduct.quan} товар</p>
<span class="basket__aside-info-price">${quantityProduct.price}</span>
</div>`;

  // Количество товаров в инфо блоке
  const currentQuantityProduct = document.querySelector('.basket__aside-info-text');

  if (quantityProduct.quan == 1) currentQuantityProduct.textContent = quantityProduct.quan + ' товар';
  else if (quantityProduct.quan < 5) currentQuantityProduct.textContent = quantityProduct.quan + ' товара';
  else currentQuantityProduct.textContent = quantityProduct.quan + ' товаров';

  resultPrice.textContent = quantityProduct.price + ' ₽';
};
const timeBlockWrapper = document.querySelector('.basket__delivery-inner-content');
const timeBlock = document.querySelectorAll('.basket__delivery-time-block');

timeBlockWrapper.addEventListener('click', (e) => {
  if (e.target.closest('.basket__delivery-time-block') && !e.target.closest('.time-disable')) {
    timeBlock.forEach(block => { block.classList.remove('active') });
    e.target.closest('.basket__delivery-time-block').classList.add('active');
  }
});