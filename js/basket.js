// Корзина
const basket = document.querySelector('.basket');
// Оюертка карточек
const basket__content = document.querySelector('.basket__content');
// Выделить всё
const checkAll = document.querySelector('#settings-check');
// Форма оформления заказы
const basket__form = document.querySelector('.basket__aside-form');
// Коробка информации заказа
const boxInfoOrder = document.querySelector('.basket__aside-info');
// Итоговая цена 
const priceResult = document.querySelector('.basket__aside-info-price-result');
// Кнопка оформить заказ
const basketButton = document.querySelector('.basket__aside-button');
// Продукт из localSorange
let product = [];
// "span" для вывода Колличество товара 
const productQuantity = document.querySelector('.main-title-quantity');
// Проверяю чтоб не было null
if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
  product = JSON.parse(localStorage.getItem('productsBasket'));
  productQuantity.textContent = product.length;
} else {
  productQuantity.textContent = '0';
}

if (product.length > 0) {
  product.forEach(function (card, i) {
    if (card.discount || card.price_card) {
      const productHTML = `<div class="basket__wrapper-cards" id="${card.id}">
    <div class="basket__card">
      <div class="basket__card-wrapper-checkbox">
        <div class="basket__card-checkbox">
          <input type="checkbox" id="basket-card-check" class="basket__card-check basket-card-check">
          <label for="basket-card-check" class="basket__card-check-label">✓</label>
        </div>
      </div>

      <div class="basket__card-wrapper-content">
        <a href="HTML/${card.link}" class="basket__card-wrapper-img">
          <img src="img/img-card/${card.img}" class="basket__card-img"></img>
        </a>
        <div class="basket__card-content">
          <a href="HTML/${card.link}" class="basket__card-name">${card.name}</a>
          <div class="basket__card-text">
            <p class="basket__card-wrapper-price">
              <span class="basket__card-price">${card.price}</span>
              <i class="basket__card-price-context">С картой</i>
            </p>
            <p class="basket__card-wrapper-price">
              <span class="basket__card-price basket__card-price-usual">${card.price_card}</span>
              <i class="basket__card-price-context">Обычная</i>
            </p>
            <p>
              <span class="basket__card-info">за шт.</span>
            </p>
            <p>
              <span class="basket__card-discount">${card.discount}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="basket__card-count-wrapper">
        <div class="basket__card-counter">
          <button class="basket__card-counter-btn counter-plus" data-counter-plus="+"></button>
          <span class="basket__card-counter-input">1</span>
          <button class="basket__card-counter-btn counter-minus" data-counter-plus="-"></button>
        </div>
        <div class="basket__card-counter-wrapper-price">
          <span class="basket__card-counter-price-sum">${card.price}</span>
          <i class="basket__card-counter-price-old">${card.price_card}</i>
        </div>
      </div>
    </div>
  </div>`;
      basket__content.insertAdjacentHTML('beforeend', productHTML);
    } else {
      const productHTML = `<div class="basket__wrapper-cards" id="${card.id}">
      <div class="basket__card">
        <div class="basket__card-wrapper-checkbox">
          <div class="basket__card-checkbox">
            <input type="checkbox" id="basket-card-check" class="basket__card-check basket-card-check">
            <label for="basket-card-check" class="basket__card-check-label">✓</label>
          </div>
        </div>

        <div class="basket__card-wrapper-content">
          <a href="HTML/${card.link}" class="basket__card-wrapper-img">
            <img src="img/img-card/${card.img}" class="basket__card-img"></img>
          </a>
          <div class="basket__card-content">
            <a href="HTML/${card.link}" class="basket__card-name">${card.name}</a>
            <div class="basket__card-text">
              <p class="basket__card-wrapper-price">
                <span class="basket__card-price">${card.price}</span>
              </p>
              <p>
                <span class="basket__card-info">за шт.</span>
              </p>
            </div>
          </div>
        </div>
        <div class="basket__card-count-wrapper">
          <div class="basket__card-counter">
            <button class="basket__card-counter-btn counter-plus" data-counter-plus="+"></button>
            <span class="basket__card-counter-input">1</span>
            <button class="basket__card-counter-btn counter-minus" data-counter-plus="-"></button>
          </div>
          <div class="basket__card-counter-wrapper-price">
            <span class="basket__card-counter-price-sum">${card.price}</span>
          </div>
        </div>
      </div>
    </div>`;
      basket__content.insertAdjacentHTML('beforeend', productHTML);
    }
    basket__content.children[i].style.cssText = 'margin-bottom: 30px';
  })
  basket__content.children[basket__content.children.length - 1].removeAttribute('style');
} else basket__content.innerHTML = `<div class="basket__wrapper-empty"><div class="basket__empty"><p class="basket__empty-text">Ваша корзина пуста</p><a href="html/catalog.html" class="basket__empty-link">Нажмите здесь, чтобы продолжить покупки</a></div></div>`;

// Значение счетчика
let counterScore = 1;
let counterScorePriceSum = 0;
let counterScorePriceSumOld = 0;
let priceResultSum = 0;
// Индекс для анимированного массива
let indexAnim = 0;

basket.addEventListener('click', function (e) {
  const cardsCheckImput = basket.querySelectorAll('.basket-card-check');

  // Удалить выбранные
  if (e.target.classList.contains('basket__settings-button')) {
    // Все инпуты с checked = true;
    let cardsCheckInputArr_true = [];
    // Все инпуты с checked = false;
    let cardsCheckInputArr_false = [];

    cardsCheckImput.forEach(check => {
      if (check.checked == true) {
        cardsCheckInputArr_true.push(check);
      } else {
        cardsCheckInputArr_false.push(check);
      }
    })

    cardsCheckInputArr_true.forEach(check => {
      // Карточка
      const wrapperCard = check.closest('.basket__wrapper-cards');
      // ID карточки
      const wrapperCardId = wrapperCard.getAttribute('id');
      // Нахожу удалееные карточку в массиве 
      const removeCardIndex = product.findIndex(card => {
        return card.id === wrapperCardId;
      });
      // Удаление из массива
      product.splice(removeCardIndex, 1);
      localStorage.setItem('productsBasket', JSON.stringify(product));
    })

    indexAnim = 0;
    removeCardAnimate(falseWrapperCard(cardsCheckInputArr_true));
    // Вывод количество товаров в корзине 
    document.querySelector('#menu-basket').textContent = product.length;
    productQuantity.textContent = product.length;

    // Нахожу карточки с checked = false;
    function falseWrapperCard(array) {
      let arr = [];
      array.forEach(check => {
        // Карточка
        const wrapperCard = check.closest('.basket__wrapper-cards');
        arr.push(wrapperCard);
      })
      return arr;
    }
    calcSumPrice(falseWrapperCard(cardsCheckInputArr_false));
  }

  // Выделить всё
  if (e.target.classList.contains('basket__settings-check') || e.target.closest('.basket__settings-allot')) {
    if (checkAll.checked == true) {
      cardsCheckImput.forEach(check => check.checked = true);
    } else {
      cardsCheckImput.forEach(check => check.checked = false);
    }
  }
  if (e.target.classList.contains('basket-card-check')) {
    let cardsCheckImputArr = [];

    for (let i = 0; i < cardsCheckImput.length; i++) {
      const check = cardsCheckImput[i];
      if (check.checked == true) {
        cardsCheckImputArr.push(check);
        if (cardsCheckImput.length === cardsCheckImputArr.length) checkAll.checked = true;
      } else checkAll.checked = false;
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

      if (counterScore == 1) currentQuantityProduct.textContent = counterScore + ' товар';
      else if (counterScore < 5) currentQuantityProduct.textContent = counterScore + ' товара';
      else currentQuantityProduct.textContent = counterScore + ' товаров';

      currentResultPriceProduct.textContent = counterScorePriceSum.toFixed(2) + ' ₽';

      let ResultPriceProductSum = 0;
      // Считаю итоговую цену
      resultPriceProduct.forEach(price => {
        ResultPriceProductSum += Number(priceWithoutSpaces(price.textContent))
      })

      priceResultSum = ResultPriceProductSum;
      priceResult.textContent = priceResultSum.toFixed(2) + ' ₽';

      if (priceResultSum < 1000) {
        let minSum = document.querySelector('.basket__aside-minsum');
        if (!minSum) {
          document.querySelector('.basket__aside-footer').insertAdjacentHTML('afterbegin', `<div class="basket__aside-minsum">Минимальная сумма заказа 1000р</div>`);
        }
      } else {
        let minSum = document.querySelector('.basket__aside-minsum');
        if (minSum) minSum.remove();
      }
    }
  }
})
// Получаю числовое значение из строки 
const priceWithoutSpaces = (str) => {
  return str.replace(/[^\d.-]/g, '');
}

// Форма оформления заказы
basketButton.addEventListener('click', function (e) {
  e.preventDefault();
  if (priceResultSum > 1000) {
    let productsInfo = {
      price: 0,
      quan: 0,
    }

    let quantity = 0;
    const quantityProduct = document.querySelectorAll('.basket__card-counter-input');
    quantityProduct.forEach(item => { quantity += Number(item.textContent) });

    productsInfo.price = priceResultSum.toFixed(2);
    productsInfo.quan = quantity;

    localStorage.setItem('quantityProducts', JSON.stringify(productsInfo));
    document.location.pathname = '/severyanochka/delivery.html';
    // document.location.pathname = '/delivery.html';
  } else {
    const minSum = document.querySelector('.basket__aside-minsum');
    minSum.classList.add('bounce');
    setTimeout(() => { minSum.classList.remove("bounce") }, 350);
  }
})


const cardsWrapper = basket.querySelectorAll('.basket__wrapper-cards');

function calcSumPrice(elem) {
  boxInfoOrder.innerHTML = '';
  // Сумма товаров
  priceResultSum = 0;

  for (let i = 0; i < elem.length; i++) {
    // ID товара
    const elemId = elem[i].getAttribute('id');
    // Цена каждого товара
    const currentPrice = elem[i].querySelector('.basket__card-counter-price-sum').textContent;
    // Количество товара
    const currentScore = elem[i].querySelector('.basket__card-counter-input').textContent;
    boxInfoOrder.innerHTML += `<div class="basket__aside-info-block" data-card-id="${elemId}">
  <p class="basket__aside-info-text">${currentScore} товар</p>
  <span class="basket__aside-info-price">${currentPrice}</span>
  </div>`;
    priceResultSum += Number(priceWithoutSpaces(currentPrice))
  }
  priceResult.textContent = priceResultSum.toFixed(2) + ' ₽';
  if (priceResultSum < 1000) {
    let minSum = document.querySelector('.basket__aside-minsum');
    if (!minSum) document.querySelector('.basket__aside-footer').insertAdjacentHTML('afterbegin', `<div class="basket__aside-minsum">Минимальная сумма заказа 1000р</div>`);
  }
}
calcSumPrice(cardsWrapper);

function removeCardAnimate(array) {
  setTimeout(function () {
    const el = array[indexAnim];
    const card = el.querySelector('.basket__card');

    const durationHeight = 150;

    let anim = card.animate([
      { transform: 'translateX(0px)', opacity: '1' },
      { transform: 'translateX(-100%)', opacity: '0' },
    ], { duration: 250 });
    anim.addEventListener('finish', () => {
      el.style.opacity = '0';
      let finishAnim = el.animate([
        { height: el.clientHeight + 'px', marginBottom: 30 + 'px' },
        { height: 0, margin: 0 + 'px' },
      ], { duration: durationHeight })
      finishAnim.addEventListener('finish', () => {
        el.remove();
      });
      if (product.length == 0) setTimeout(() => {
        basket__content.innerHTML = `<div class="basket__wrapper-empty"><div class="basket__empty"><p class="basket__empty-text">Ваша корзина пуста</p><a href="html/catalog.html" class="basket__empty-link">Нажмите здесь, чтобы продолжить покупки</a></div></div>`;
      }, array.length * durationHeight);
    })
    indexAnim++;
    if (indexAnim < array.length) {
      removeCardAnimate(array);
    }
  }, 150)
}