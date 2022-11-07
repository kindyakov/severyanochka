window.addEventListener('load', function () {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  html.classList.remove('lock');
  body.classList.remove('lock');

  //
  const filters = document.querySelector('.catalog-products__filters'),
    filters_body = document.querySelector('.catalog-products__filters_body'),
    container = document.querySelector('.container');

  const filtersMenuList = document.querySelector('.filter-menu__list');
  const catalogContent = document.querySelector('.catalog-products__content'),
    catalogWrapper = document.querySelector('.catalog-products__wrapper');

  // filter scroll
  let viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth);

  let OffsetLeft = container.offsetLeft + 15;
  let topFilters = catalogContent.offsetTop - 20;

  let heightFilters = catalogContent.offsetHeight;
  let heightFilter = filters_body.offsetHeight;

  let widthFilters = filters.offsetWidth;

  async function getProducts() {
    const response = await fetch('../JSON/products.json');
    const productsArray = await response.json();

    filtersValue()
  }

  getProducts();

  filtersMenuList.addEventListener('click', function (e) {
    if (e.target.classList.contains('filter-adaptive-active')) {
      filters.classList.add('active');
      body.classList.add('lock');
      html.classList.add('lock');
    }
  })

  document.querySelector('.filtres-close').addEventListener('click', function () {
    filters.classList.remove('active');
    html.classList.remove('lock');
    body.classList.remove('lock')
  });


  window.addEventListener('scroll', function () {
    if (!filters.classList.contains('dev')) {
      if (scrollY >= topFilters) {
        filters_body.classList.add('fixed');
        filters_body.style.cssText = `left: ${OffsetLeft}px; width: ${widthFilters}px;`;
        filters_body.classList.remove('absolute');
      } else {
        filters_body.classList.remove('fixed');
        filters_body.style.left = '0';
      }

      if (scrollY >= ((heightFilters + topFilters) - heightFilter)) {
        filters_body.classList.add('absolute');
        filters_body.classList.remove('fixed');
        filters_body.style.left = '0';
      }
    }
  })
  catalogContent.addEventListener('click', function (e) {
    if (e.target.closest('.products__more-btn')) heightFilters = catalogContent.offsetHeight;
  })

  if (viewport_width <= 768) {
    filters.classList.add('dev');
    catalogWrapper.classList.add('add-margin');
  }

  window.addEventListener('resize', function () {
    filtersValue();

    if (viewport_width <= 768) {
      filters.classList.add('dev')
      filters_body.classList.remove('fixed');
      filters_body.classList.remove('absolute');
      filters_body.style.cssText = '';

      catalogWrapper.classList.add('add-margin');
    } else {
      filters.classList.remove('dev')
      filtersValue();
      catalogWrapper.classList.remove('add-margin');

      if (filters_body.classList.contains('fixed')) {
        filters_body.style.cssText = `left: ${OffsetLeft}px; width: ${widthFilters}px; `;
      }
    }
  })

  function filtersValue() {
    viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth);

    OffsetLeft = container.offsetLeft + 15;
    topFilters = catalogContent.offsetTop - 20;

    heightFilters = catalogContent.offsetHeight;
    heightFilter = filters_body.offsetHeight;

    widthFilters = filters.offsetWidth;
  }
});

