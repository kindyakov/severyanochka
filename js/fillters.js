window.addEventListener('load', function () {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  html.classList.remove('lock');
  body.classList.remove('lock');
  //
  const products_container = document.querySelector('#products-container')

  const randeSlider = document.querySelector('.filters_box-paramets__sliders');
  const filters = document.querySelector('.catalog-products__filters');
  const inputCheckbox = document.querySelector('.filters__wrapper-checkbox__checkbox');
  const quickFilters = document.querySelectorAll('.catalog-products__quick-filters_btn');
  const filtersMenuList = document.querySelector('.filter-menu__list');
  const catalogWrapper = document.querySelector('.catalog-products__wrapper');

  const minPrice = document.querySelector('#min-price');
  const maxPrice = document.querySelector('#max-price');

  let min_maxPriceArr = [];
  let rangeSettings = {
    start: [0, 999],
    connect: true,
    step: 1,
    range: {
      'min': [0],
      'max': [999],
    }
  }
  const filter__itemClear = document.querySelector('.filter-menu__item-clear');
  let filterss__items, filters__itemPrice, filtersProducts;

  async function getProducts() {
    const response = await fetch('../JSON/products.json');
    const productsArray = await response.json();
    const productsCurrent = productsArray[`${products_container.dataset.products}`];

    if (products_container) {
      if (productsCurrent !== undefined) {
        const productsCards = productsCurrent['cardData'];
        const productsFillters = productsCurrent['fillters'];

        productsCards.forEach(object => {
          min_maxPriceArr.push(object.price, object.price_card);
          if (object.price_card == undefined) {
            min_maxPriceArr.pop();
          }
        })

        rangeSettings.range['max'] = [Math.ceil(Math.max.apply(null, min_maxPriceArr))]; // Округление в большую сторону
        rangeSettings.range['min'] = [Math.floor(Math.min.apply(null, min_maxPriceArr))]; // Округление в меньшую сторону

        noUiSlider.create(randeSlider, rangeSettings);

        const inputsPrice = [minPrice, maxPrice];

        randeSlider.noUiSlider.on('update', function (values, handle) {
          inputsPrice[handle].value = Math.round(values[handle]);
        })

        const setRangeSlider = (i, value) => {
          let arr = [null, null]
          arr[i] = value;

          randeSlider.noUiSlider.set(arr);
        }

        inputsPrice.forEach((el, i) => {
          el.addEventListener('change', function (e) {
            setRangeSlider(i, e.currentTarget.value);
          })
        })

        productsFillters.forEach((item, i) => {
          filtersMenuList.insertAdjacentHTML('afterbegin', `<li class="filter-menu__item filterss__items active none" data-filter="${i}"><span class="filter-menu__item-span">${item}</span><span
            class="filter-menu__item-close"></span></li>`)
        })
        filtersMenuList.insertAdjacentHTML('afterbegin', `<li class="filter-menu__item filterss__items filters__item-price active none"><span class="filter-menu__item-span filters__item-price_text">${Math.min.apply(null, min_maxPriceArr).toFixed(2)} ₽ - ${Math.max.apply(null, min_maxPriceArr).toFixed(2)} ₽</span><span
            class="filter-menu__item-close"></span></li>`)

        filterss__items = document.querySelectorAll('.filterss__items');
        filters__itemPrice = document.querySelector('.filters__item-price');
        filtersProducts = document.querySelectorAll('.filters-products__name');
      } else { }
    }
  }

  getProducts();

  filters.addEventListener('click', function (e) {
    if (e.target.closest('.filters_box-paramets__btn')) {
      randeSlider.noUiSlider.set([0, 999]);

      filtersProducts.forEach(el => el.classList.remove('active'));
      quickFilters.forEach(el => el.classList.remove('active'));

      inputCheckbox.checked = false;
    }
    if (e.target.closest('.filters-products__name')) e.target.classList.toggle('active');
    if (e.target.classList.contains('catalog-products__filters_button')) {
      document.querySelectorAll('.filter-menu__item').forEach(li => li.classList.add('none'));

      catalogWrapper.classList.add('add-margin');

      filters__itemPrice.classList.remove('none');
      filters__itemPrice.querySelector('.filters__item-price_text').textContent = `${minPrice.value} ₽ - ${maxPrice.value} ₽`;

      filtersProducts.forEach(li => {
        if (li.classList.contains('active')) filtersMenuList.querySelector(`[data-filter="${li.dataset.filter}"]`).classList.remove('none');
      });
      filter__itemClear.classList.remove('none');
    }
  })

  filtersMenuList.addEventListener('click', function (e) {
    if (e.target.classList.contains('filter-menu__item-close') && !e.target.closest('.filter-menu__item-clear')) {
      e.target.closest('.filter-menu__item').classList.add('none');
      let num = 0;

      filterss__items.forEach(li => { if (li.classList.contains('none')) num++ });
      if (num == filterss__items.length) {
        filter__itemClear.classList.add('none');
        catalogWrapper.classList.remove('add-margin');
      };

    }
    if (e.target.closest('.filter-menu__item-clear')) {
      const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth);
      filtersMenuList.querySelectorAll('.filter-menu__item').forEach(li => li.classList.add('none'));
      if (viewport_width >= 768) catalogWrapper.classList.remove('add-margin');
    }
  })

  quickFilters.forEach(el => el.addEventListener('click', () => el.classList.toggle('active')));
})
