window.addEventListener('DOMContentLoaded', function () {
  let cardBasketArray = [];
  let cardFavouritesArray = [];

  // Проверяю чтоб не было null
  if (JSON.parse(localStorage.getItem('productsBasket')) !== null) {
    cardBasketArray = JSON.parse(localStorage.getItem('productsBasket'));
  }
  if (JSON.parse(localStorage.getItem('productsFavourites')) !== null) {
    cardFavouritesArray = JSON.parse(localStorage.getItem('productsFavourites'));
  }

  const title = document.querySelector('title'); // Заголовок страницы 
  const navigationLink = document.querySelectorAll('.main__navigation-link'); // Навигационная ссылка
  const productsTitle = document.querySelector('.products-title'); // Заголовок товара 
  const article = document.querySelector('.products__header-article'); // Артикл
  const ratings = document.querySelector('.card-rating__items'); // Рейтинг
  const feedback = document.querySelector('.products__header-feedback'); // Отзывы
  const products = document.querySelector('.products__container');
  const products__mainSlider = document.querySelector('.products__main-slider'); // Обертка с слайдами навигации картинок
  const sliderWrapper = document.querySelector('.products__main-slider-wrapper'); // Обертка с слайдами картинок
  const discount = document.querySelector('.products__main-discount'); // Скидка 
  const price = document.querySelector('.products__aside-regular-price');
  const priceCard = document.querySelector('.products__aside-card-price');
  const specifications = document.querySelector('.specifications-body');

  const gallery__swiper = document.querySelector('.gallery__swiper');
  const gallery = document.querySelector('.gallery');
  const gallery__wrapper = document.querySelector('.gallery__wrapper-swiper');

  const btnLike = document.querySelector('.products__header-icon._icon-shape');

  let gallerySwiper;
  let cardsData;

  let url = window.location.href;
  let nameFile = url.split('/').reverse()[0];
  let nameFolder = url.split('/').reverse()[1];

  async function getData() {
    const response = await fetch('../../JSON/products.json');
    const productsArr = await response.json();
    const productsCurrent = productsArr[`${nameFolder}`].cardData;
    cardsData = productsCurrent.filter(card => card.link == nameFile)[0];

    renderPage(cardsData);
    renderGallery(cardsData.img, cardsData.name);
    galleryActive();

    const productsSliderSlide = document.querySelectorAll('.products__main-slider-slide');
    const imgSwiper = new Swiper('.products__main-slider-active', { slidesPerView: 1, });
    if (productsSliderSlide) {
      productsSliderSlide.forEach(el => {
        el.addEventListener('click', (e) => {
          productsSliderSlide.forEach(elem => elem.classList.remove('active'));
          e.currentTarget.classList.add('active');

          const index = e.currentTarget.dataset.index;
          imgSwiper.slideTo(index);
        });
      });
    }
    rating();
    addDisableCardBtn();
    addDisableCardLike();
  };
  getData();

  function renderPage(data) {
    title.textContent = data.name + ' | Купит в интернет-магазине Северяночка'; // Заголовок страницы 
    navigationLink[--navigationLink.length].textContent = data.name; // навигационная ссылка Заголовок страницы
    navigationLink[--navigationLink.length].href = nameFile; // навигационная ссылка 
    productsTitle.textContent = data.name; // название товара
    article.textContent = 'арт. ' + data.article; // артикуль
    ratings.dataset.rating = data.rating; // рейтинг
    // отзывы
    if (data.feedback.length === 1) feedback.textContent = data.feedback.length + ' отзыв';
    else if (data.feedback.length === 0 || data.feedback.length > 4) feedback.textContent = data.feedback.length + ' отзывов';
    else if (data.feedback.length < 5) feedback.textContent = data.feedback.length + ' отзыва';
    btnLike.classList.add('like');
    products.setAttribute('id', data.id); // ID товара
    data.img.forEach((imeg, i) => {
      products__mainSlider.insertAdjacentHTML('beforeend', navSliderHtml(imeg, data.alt, i));
      sliderWrapper.insertAdjacentHTML('beforeend', sliderHtml(imeg, data.alt));
    }); // Картинки
    if (data.discount.length > 0) discount.textContent = `-${data.discount}%`; // Скидка
    else discount.style.display = 'none';
    price.textContent = data.price + ' ₽'; // обычная цена
    if (data.price_card !== '') priceCard.textContent = data.price_card + ' ₽';// цена по карте
    else priceCard.parentNode.style.display = 'none';
    data.characteristic.forEach(arr => specifications.insertAdjacentHTML('beforeend', specificationsHtml(arr[0], arr[1]))); // Характеристики
    document.querySelector('.main-promo__title').textContent = 'С этим товаров покупают';
  }
  function navSliderHtml(img, alt, i) {
    return `<div class="products__main-slider-slide" data-index="${i}">
    <img src="../../img/img-card/${img}" alt="${alt}" class="products__main-slider-preview-img">
  </div>`;
  }
  function sliderHtml(img, alt) {
    return `<div class="products__main-sliders swiper-slide">
    <img src="../../img/img-card/${img}" alt="${alt}" class="products__main-slider-img">
  </div>`;
  }
  function specificationsHtml(text, value) {
    return `<tr class="specifications-row">
    <td class="specifications-cell specifications-cell-name">${text}</td>
    <td class="specifications-cell specifications-cell-value">${value}</td>
  </tr>`;
  }
  function renderGallery(imeg, title) {
    imeg.forEach(img => gallery__wrapper.insertAdjacentHTML('beforeend', `
    <div class="gallery__swiper-slide swiper-slide">
      <img src="../../img/img-card/${img}" alt="${title}">
    </div>`));
    gallerySwiper = new Swiper(gallery__swiper, {
      navigation: {
        nextEl: '.gallery-button-next',
        prevEl: '.gallery-button-prev',
      },
      pagination: {
        el: '.gallery-pagination',
        type: 'bullets',
        clickable: true,
      },
      keyboard: { // управление с помощью клавиотуры 
        enabled: true,
      },
      slidesPerView: 1,
      spaceBetween: 0
    });
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
      gallery__swiper.classList.remove('swiper-no-swiping');
    }
  }
  function galleryActive() {
    const sliders_slide = document.querySelectorAll('.products__main-sliders');
    sliders_slide.forEach((slider, i) => {
      slider.addEventListener('click', () => {
        gallerySwiper.slideTo(i);
        gallery.classList.add('active');
        document.body.classList.add('lock');
        document.querySelector('html').classList.add('lock');
      });
    })
  }
  function closeGallery(e) {
    if (gallery.classList.contains('active')) {
      if (e.keyCode === 27) removeClass();
      if (e.target.closest('.gallery__close')) removeClass();
    }
  }
  function removeClass() {
    gallery.classList.remove('active')
    document.body.classList.remove('lock');
    document.querySelector('html').classList.remove('lock');
  }
  function rating() {
    const cardRating = document.getElementsByClassName('card-rating');
    if (cardRating.length > 0) {
      initRatings();
    }
    function initRatings() {
      for (let i = 0; i < cardRating.length; i++) {
        const ratings = cardRating[i];
        initRating(ratings)
      }
    }
    function initRating(ratings) {
      initRatingVars(ratings)
      setTatingActiveWidth();
    }
    function initRatingVars(ratings) {
      ratingActive = ratings.querySelector('.card-rating__active');
      ratingValue = ratings.querySelector('.card-rating__items');
    }
    function setTatingActiveWidth(index = ratingValue.dataset.rating) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}px`;
    }
  }
  function addDisableCardBtn() {
    cardBasketArray.forEach(id => {
      let cardDisable = document.querySelector(`[id = "${id}"]`);
      if (cardDisable) {
        let cardDisableBtn = cardDisable.querySelector('.add-btn');
        cardDisableBtn.classList.add('disable');
        cardDisableBtn.textContent = 'В корзине';
      }
    })
  }
  function addDisableCardLike() {
    cardFavouritesArray.forEach(id => {
      let cardDisable = document.querySelector(`[id = "${id}"]`);
      if (cardDisable) {
        let cardDisableLike = cardDisable.querySelector('.like');
        if (cardDisableLike) cardDisableLike.classList.add('disable');
      }
    });
  }
  document.addEventListener('keyup', closeGallery);
  document.addEventListener('click', closeGallery);
});

