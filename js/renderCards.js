window.addEventListener('DOMContentLoaded', function () {
  const catalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
  let cardBasketArray = [];
  let cardFavouritesArray = [];
  // '/severyanochka'
  let urlOrigin = window.location.origin + '/severyanochka';
  let urlJson = urlOrigin + '/JSON/products.json';
  let urlImg = urlOrigin + '/img/img-card/';
  let urlProducts = urlOrigin + '/html/';

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

  const index_swiper = document.querySelectorAll('.index-swiper');
  const stocks = document.querySelector('.stocks');
  const related = document.querySelector('.related');

  let gallerySwiper;
  let cardsData;

  let url = window.location.href;
  let nameFile = url.split('/').reverse()[0];
  let nameFolder = url.split('/').reverse()[1];
  nameFile = nameFile.split('#')[0];

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
    index_swiper.forEach(swiper => swiper.classList.remove('swiper-no-swiping'));
  } else {
    index_swiper.forEach(swiper => swiper.classList.add('swiper-no-swiping'));
  }

  async function getData() {
    const response = await fetch('../../JSON/products.json');
    const productsArr = await response.json();
    const productsCurrent = productsArr[`${nameFolder}`].cardData;
    cardsData = productsCurrent.filter(card => card.link == nameFile)[0];

    renderPage(cardsData);
    renderGallery(cardsData.img, cardsData.name);
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
    galleryActive();
    if (stocks) allCard(productsArr, cardsData.id).forEach(card => renderCardHtml(card, stocks));
    if (related) related.closest('.main-promo').style.display = 'none';

    addDisableCardBtn();
    addDisableCardLike();
    renderFeedback(cardsData);
    setRating();
    rating();
  };
  getData();

  // Сохраняю все карточки
  function allCard(data, id) {
    let productsALL = [];
    catalog.forEach(title => {
      if (data[title]) {
        productsALL = [...productsALL, ...data[title].cardData];
      }
    });
    productsALL = productsALL.filter(card => card.id !== id); // фильтрация масива чтоб не попала текущая карточкая
    productsALL = productsALL.filter(card => card.discount !== '');
    return productsALL;
  }
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
      products__mainSlider.insertAdjacentHTML('beforeend', navSliderHtml(imeg, data.name, i));
      sliderWrapper.insertAdjacentHTML('beforeend', sliderHtml(imeg, data.name));
    }); // Картинки
    if (data.discount.length > 0) discount.textContent = `-${data.discount}%`; // Скидка
    else discount.style.display = 'none';
    price.textContent = data.price + ' ₽'; // обычная цена
    if (data.price_card !== '') priceCard.textContent = data.price_card + ' ₽';// цена по карте
    else priceCard.parentNode.style.display = 'none';
    data.characteristic.forEach(arr => specifications.insertAdjacentHTML('beforeend', specificationsHtml(arr[0], arr[1]))); // Характеристики
    document.querySelector('.main-promo__title').textContent = 'С этим товаров покупают';
    document.querySelector('.header-menu__catalog').href = '../catalog.html';
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
  function renderFeedback(data) {
    let feedback = data.feedback;
    const feedback_rating = document.querySelector('#feedback-rating');
    const span_rating = document.querySelector('#span-rating');
    const counter_stars = document.querySelectorAll('.counter-stars');
    const feedback__content = document.querySelector('.feedback__description-content');
    if (feedback.length > 0) {
      feedback_rating.dataset.rating = data.rating;
      span_rating.textContent = data.rating + ' из 5'
      counter_stars.forEach(countStar => {
        if (countStar.dataset.stars == 5) countStar.textContent = feedback.filter(comm => comm.rating == 5).length;
        if (countStar.dataset.stars == 4) countStar.textContent = feedback.filter(comm => comm.rating == 4).length;
        if (countStar.dataset.stars == 3) countStar.textContent = feedback.filter(comm => comm.rating == 3).length;
        if (countStar.dataset.stars == 2) countStar.textContent = feedback.filter(comm => comm.rating == 2).length;
        if (countStar.dataset.stars == 1) countStar.textContent = feedback.filter(comm => comm.rating == 1).length;
      })
      feedback.forEach(comm => feedback__content.insertAdjacentHTML('beforeend', feedbackHtml(comm.author, comm.rating, comm.data, comm.comment)));
    } else feedback__content.innerHTML = '<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"><span style="font-size: 18px; font-weight: bold;">Отзывов пока нет. Вы можете стать первым!</span></div>';

  }
  function feedbackHtml(name, rating, data, comment) {
    return `<div class="feedback__feedback">
    <div class="feedback__users">
      <div class="feedback__users-imeg">
        <img class="feedback__users-img" src="../../img/svg/user.svg" alt="${name}">
      </div>
      <span class="feedback__users-name">${name}</span>
    </div>
    <div class="feedback__users-rating">
      <div class="card-rating">
        <div class="card-rating__active">
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
        </div>
        <div class="card-rating__items" id="user-rating" data-rating="${rating}">
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
          <div class="card-rating__item _icon-star"></div>
        </div>
      </div>
      <span class="feedback__users-data">${data}</span>
    </div>
    <p class="feedback__users-text">${comment}</p>
  </div>`;
  }
  function setRating() {
    let ratingActive, ratingValue;
    const cardRating = document.querySelector('.leave-rating');
    initRating(cardRating);

    function initRating(ratings) {
      initRatingVars(ratings)
      setRatingActiveWidth();
      setRatingActive(ratings);
    }
    function initRatingVars(ratings) {
      ratingActive = ratings.querySelector('.leave-rating__active');
      ratingValue = ratingActive;
    }
    function setRatingActiveWidth(index = ratingValue.dataset.rating) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = ratingActiveWidth + '%';
    }
    function setRatingActive(rating) {
      const ratingAtems = rating.querySelectorAll('.leave-rating__item');
      ratingAtems.forEach(ratingAtem => {
        ratingAtem.addEventListener('mouseenter', () => {
          initRatingVars(rating);
          setRatingActiveWidth(ratingAtem.dataset.value);
        })
        rating.addEventListener('mouseleave', () => {
          setRatingActiveWidth()
        });
        ratingAtem.addEventListener('click', () => {
          initRatingVars(rating);
          ratingActive.dataset.rating = ratingAtem.dataset.value;
          setRatingActiveWidth(ratingAtem.dataset.value);
        })
      });
    }
  }
  function cardsHtml(id, img, price, title, rating, link, catalog) {
    return `<div class="wrapper-card swiper-slide" id="${id}">
    <div class="card">
      <a href="../${catalog}/${link}" class="card-wrapper-img">
        <img src="../../img/img-card/${img[0]}" alt="${title}" class="card-img" data-img="${img[0]}"></img>
        <span class="card-discount"></span>
      </a>
      <div class="card-content">
        <div class="card-wrapper-price">
          <p class="card-price-text">
            <span class="card-price__ordinary card-price">${price} ₽</span>
            <i>Обычная</i>
          </p>
        </div>
        <div class="card-info">
          <a href="../${catalog}/${link}" class="card-name-product">${title}</a>
          <div class="card-rating">
            <div class="card-rating__active">
              <div class="card-rating__item _icon-star"></div>
              <div class="card-rating__item _icon-star"></div>
              <div class="card-rating__item _icon-star"></div>
              <div class="card-rating__item _icon-star"></div>
              <div class="card-rating__item _icon-star"></div>
            </div>
            <div class="card-rating__items" data-rating="${rating}">
              <div class="card-rating__item _icon-star"></div>
              <div class="card-rating__item _icon-star"></div>
              <div class="card-rating__item _icon-star"></div>
              <div class="card-rating__item _icon-star"></div>
              <div class="card-rating__item _icon-star"></div>
            </div>
          </div>
        </div>
        <button class="card-button add-btn">В корзину</button>
      </div>
      <span class="card-like _icon-shape like"></span>
    </div>
  </div>`;
  }
  function renderCardHtml(card, stocks) {
    const content = stocks.querySelector('.swiper-wrapper');
    content.insertAdjacentHTML('beforeend', cardsHtml(card.id, card.img, card.price, card.name, card.rating, card.link, card.catalog));

    const cardID = document.querySelector(`[id = "${card.id}"]`);
    const cardDiscount = cardID.querySelector('.card-discount');
    if (card.discount !== '') cardDiscount.textContent = '-' + card.discount + '%';
    else cardDiscount.style.display = 'none';
    if (card.price_card !== '') {
      const cardWrapperPrice = cardID.querySelector('.card-wrapper-price');
      cardWrapperPrice.insertAdjacentHTML('beforeend', `
        <p class="card-price-text">
          <span class="card-price__card card-price">${card.price_card}</span>
          <i>С картой</i>
        </p>`);
    }
  }
  document.addEventListener('keyup', closeGallery);
  document.addEventListener('click', closeGallery);
});
