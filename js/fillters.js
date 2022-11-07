window.addEventListener('load', function () {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  html.classList.remove('lock');
  body.classList.remove('lock');
  //
  const products_container = document.querySelector('#products-container')

  const randeSlider = document.querySelector('.filters_box-paramets__sliders');
  const filtersProducts = document.querySelectorAll('.filters-products__name');
  const filters = document.querySelector('.catalog-products__filters');
  const inputCheckbox = document.querySelector('.filters__wrapper-checkbox__checkbox');
  const quickFilters = document.querySelectorAll('.catalog-products__quick-filters_btn');
  const filtersMenuList = document.querySelector('.filter-menu__list');
  const catalogWrapper = document.querySelector('.catalog-products__wrapper');
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

  let errorProducts = false;

  if (filters) {
    async function getProducts() {
      const response = await fetch('../JSON/products.json');
      const productsArray = await response.json();
      if (products_container) {
        const productsCurrent = productsArray[`${products_container.dataset.products}`];
        if (productsCurrent !== undefined) {
          productsCurrent.forEach(object => {
            min_maxPriceArr.push(object.price, object.price_card);
            if (object.price_card == undefined) {
              min_maxPriceArr.pop();
            }
          })
        } else errorProducts = true;
      }
      if (!errorProducts) {
        rangeSettings.range['max'] = [Math.max.apply(null, min_maxPriceArr)];
        rangeSettings.range['min'] = [Math.min.apply(null, min_maxPriceArr)];

        noUiSlider.create(randeSlider, rangeSettings);

        const minPrice = document.querySelector('#min-price');
        const maxPrice = document.querySelector('#max-price');

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
      }
    }

    getProducts();

    let filterArray = [];

    filters.addEventListener('click', function (e) {
      if (e.target.closest('.filters_box-paramets__btn')) {
        randeSlider.noUiSlider.set([0, 999]);

        filtersProducts.forEach(el => el.classList.remove('active'));
        quickFilters.forEach(el => el.classList.remove('active'));

        inputCheckbox.checked = false;
      }
      if (e.target.closest('.filters-products__name')) {
        e.target.classList.toggle('active');
      }
      if (e.target.closest('.catalog-products__filters_button')) {
        let menuFilterHtml;
        document.querySelectorAll('.filters-products__name').forEach(item => {
          if (item.classList.contains('active')) {
            menuFilterHtml = item.dataset.filter;
            filtersMenuList.insertAdjacentHTML('afterbegin', `<li class="filter-menu__item active"><span class="filter-menu__item-span">${menuFilterHtml}</span><span
          class="filter-menu__item-close"></span></li>`)
            filterArray.push(filtersMenuList.firstChild);
          }
        })
        if (filterArray.length > 0) {
          filtersMenuList.insertAdjacentHTML('beforeend', `<li class="filter-menu__item filter-menu__item-clear">
          <span class="filter-menu__item-span">Очистить фильтры</span>
          <span class="filter-menu__item-close"></span>
        </li>`);
          catalogWrapper.classList.add('add-margin');
        }
      }
    })

    filtersMenuList.addEventListener('click', function (e) {
      if (e.target.classList.contains('filter-menu__item-close') && !e.target.closest('.filter-menu__item-clear')) {
        e.target.closest('.filter-menu__item').remove();
      }
      if (e.target.closest('.filter-menu__item-clear')) {
        filtersMenuList.querySelectorAll('.filter-menu__item').forEach(el => {
          el.remove();
        });
        catalogWrapper.classList.remove('add-margin');
      }
    })
    quickFilters.forEach(el => {
      el.addEventListener('click', function () {
        el.classList.toggle('active');
      })
    })
  }
})
