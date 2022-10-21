window.addEventListener('load', function () {
  const body = document.querySelector('.body');
  body.classList.remove('lock')
  //
  const randeSlider = document.querySelector('.filters_box-paramets__sliders');
  const filtersProducts = document.querySelectorAll('.filters-products__name');
  const filters = document.querySelector('.catalog-products__filters'),
    filters_body = document.querySelector('.catalog-products__filters_body'),
    container = document.querySelector('.container');
  const inputCheckbox = document.querySelector('.filters__wrapper-checkbox__checkbox');
  const quickFilters = document.querySelectorAll('.catalog-products__quick-filters_btn');
  const filtersMenuList = document.querySelector('.filter-menu__list');
  const catalogContent = document.querySelector('.catalog-products__content'),
    catalogWrapper = document.querySelector('.catalog-products__wrapper');
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
  if (filters) {
    async function getProducts() {
      const response = await fetch(`../JSON/${catalogWrapper.dataset.products}.json`); // нужный мне json файл
      const productsArray = await response.json();

      productsArray.forEach(object => {
        min_maxPriceArr.push(object.price, object.price_card);
        if (object.price_card == undefined) {
          min_maxPriceArr.pop();
        }
      })
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

    getProducts();

    let filterArray = [];

    filters.addEventListener('click', function (e) {
      if (e.target.closest('.filters_box-paramets__btn')) {
        randeSlider.noUiSlider.set([0, 999]);

        filtersProducts.forEach(el => {
          el.classList.remove('active');
        })
        quickFilters.forEach(el => {
          el.classList.remove('active');
        })

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
      if (e.target.classList.contains('filter-adaptive-active')) {
        filters.classList.add('active');
        body.classList.add('lock')
      }
    })
    document.querySelector('.filtres-close').addEventListener('click', function () {
      filters.classList.remove('active');
      body.classList.remove('lock')
    })
    quickFilters.forEach(el => {
      el.addEventListener('click', function () {
        el.classList.toggle('active');
      })
    })

    // filter scroll
    let OffsetLeft = container.offsetLeft + 15;
    let topFilters = catalogContent.offsetTop - 20;

    let heightFilters = catalogContent.offsetHeight;
    let heightFilter = filters_body.offsetHeight;

    let widthFilters = filters.offsetWidth;

    window.addEventListener('scroll', function () {
      if (!filters.classList.contains('dev')) {
        if (scrollY >= topFilters) {
          filters_body.classList.add('fixed');
          filters_body.style.cssText = `left: ${OffsetLeft}px; width: ${widthFilters}px;`;
          filters_body.classList.remove('absolute');
        } else {
          filters_body.classList.remove('fixed');
          filters_body.style.left = `0`;
        }

        if (scrollY >= ((heightFilters + topFilters) - heightFilter)) {
          filters_body.classList.add('absolute');
          filters_body.classList.remove('fixed');
          filters_body.style.left = `0`;
        }
      }
    })
    catalogContent.addEventListener('click', function (e) {
      if (e.target.closest('.products__more-btn')) {
        heightFilters = catalogContent.offsetHeight;
      }
    })
    let viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth);
    if (viewport_width <= 768) {
      filters.classList.add('dev');
    }
    window.addEventListener('resize', function () {
      viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth);
      topFilters = catalogContent.offsetTop - 20;

      if (viewport_width <= 768) {
        filters.classList.add('dev')
        filters_body.classList.remove('fixed');
        filters_body.classList.remove('absolute');
        filters_body.style.cssText = '';

        catalogWrapper.classList.add('add-margin');
      } else {
        filters.classList.remove('dev')
        OffsetLeft = container.offsetLeft + 15;
        widthFilters = filters.offsetWidth;

        catalogWrapper.classList.remove('add-margin');

        if (filters_body.classList.contains('fixed')) {
          filters_body.style.cssText = `left: ${OffsetLeft}px; width: ${widthFilters}px; `;
        }
      }
    })
  }
})
