// Корзина
const basket = document.querySelector('.basket');
// Выделить всё
const checkAll = document.querySelector('#settings-check');
// Форма оформления заказы
const basket__form = document.querySelector('.basket__aside-form');
// Коробка информации заказа
const boxInfoOrder = document.querySelector('.basket__aside-info');
// Итоговая цена 
const priceResult = document.querySelector('.basket__aside-info-price-result');

// Значение счетчика
let counterScore = 1;
let counterScorePriceSum = 0;
let counterScorePriceSumOld = 0;
let priceResultSum = 0;
basket.addEventListener('click', function (e) {
  const cardsCheckImput = basket.querySelectorAll('.basket-card-check');
  // Выделить всё
  if (e.target.classList.contains('basket__settings-check') || e.target.closest('.basket__settings-allot')) {
    if (checkAll.checked == true) {
      cardsCheckImput.forEach(check => {
        check.checked = true;
      })
    } else {
      cardsCheckImput.forEach(check => {
        check.checked = false;
      })
    }
  }
  if (e.target.classList.contains('basket-card-check')) {
    let cardsCheckImputArr = [];
    for (let i = 0; i < cardsCheckImput.length; i++) {
      const check = cardsCheckImput[i];
      if (check.checked == true) {
        cardsCheckImputArr.push(check);
        if (cardsCheckImput.length === cardsCheckImputArr.length) {
          checkAll.checked = true;
        }
      } else {
        checkAll.checked = false;
      }
    }
  }
  // Cчетчик
  if (e.target.closest('.basket__card-counter')) {
    // Цена товара
    const productPrice = e.target.closest('.basket__wrapper-cards').querySelector('.basket__card-price');
    // Старая цена товара если есть
    const productPriceOld = e.target.closest('.basket__wrapper-cards').querySelector('.basket__card-price-usual');
    // Содержимое span со значением
    const counterProductQuantity = e.target.closest('.basket__card-count-wrapper').querySelector('.basket__card-counter-input');
    // Сумма товаров 
    const counterPriceSum = e.target.closest('.basket__card-count-wrapper').querySelector('.basket__card-counter-price-sum');
    const counterPriceSumOld = e.target.closest('.basket__card-count-wrapper').querySelector('.basket__card-counter-price-old');
    if (e.target.classList.contains('basket__card-counter-btn')) {
      if (e.target.dataset.counterPlus === '+') {
        counterScore = Number(counterProductQuantity.textContent) + 1;
        counterProductQuantity.textContent = counterScore;
      }
      if (Number(counterProductQuantity.textContent) > 1) {
        if (e.target.dataset.counterPlus === '-') {
          counterScore = Number(counterProductQuantity.textContent) - 1;
          counterProductQuantity.textContent = counterScore;
        }
      }

      counterScorePriceSum = Number(priceWithoutSpaces(productPrice.textContent)) * counterScore;
      counterPriceSum.textContent = counterScorePriceSum.toFixed(2) + ' ₽';
      if (productPriceOld) {
        counterScorePriceSumOld = Number(priceWithoutSpaces(productPriceOld.textContent)) * counterScore;
        counterPriceSumOld.textContent = counterScorePriceSumOld.toFixed(2) + ' ₽';
      }
      // ID текущей карточки
      const currrentCards = e.target.closest('.basket__wrapper-cards').getAttribute('id');
      // Текущя коробка информации заказа 
      const currentBoxInfoOrder = document.querySelector(`.basket__aside-info-block[data-card-id="${currrentCards}"]`);
      // Текущее количество товаров в инфо блоке
      const currentQuantityProduct = currentBoxInfoOrder.querySelector('.basket__aside-info-text');
      // Текущая сумма цены по колочиество товаров
      const currentPriceProductSum = currentBoxInfoOrder.querySelector('.basket__aside-info-price');
      // Итоговая цена продукта с учетом его количества
      const currentResultPriceProduct = currentBoxInfoOrder.querySelector('.basket__aside-info-price');
      const resultPriceProduct = document.querySelectorAll('.basket__aside-info-price');

      if (counterScore == 1) {
        currentQuantityProduct.textContent = counterScore + ' товар';
      } else if (counterScore < 5) {
        currentQuantityProduct.textContent = counterScore + ' товара';
      } else {
        currentQuantityProduct.textContent = counterScore + ' товаров';
      }
      currentResultPriceProduct.textContent = counterScorePriceSum + ' ₽';

      let ResultPriceProductSum = 0;
      // Считаю итоговую цену
      resultPriceProduct.forEach(price => {
        ResultPriceProductSum += Number(priceWithoutSpaces(price.textContent))
      })

      priceResultSum = ResultPriceProductSum;
      priceResult.textContent = priceResultSum.toFixed(2) + ' ₽';
    }
  }
})
// Получаю числовое значени из строки 
const priceWithoutSpaces = (str) => {
  return str.replace(/[^\d.-]/g, '');
}

// Форма оформления заказы
basket__form.addEventListener('click', function (e) {
})

basket.querySelectorAll('.basket__wrapper-cards').forEach(function (card) {
  boxInfoOrder.insertAdjacentHTML('beforeend', `<div class="basket__aside-info-block" data-card-id="${card.getAttribute('id')}">
  <p class="basket__aside-info-text">${counterScore} товар</p>
  <span class="basket__aside-info-price">${counterScorePriceSum.toFixed(2)} ₽</span>
</div>`);
});