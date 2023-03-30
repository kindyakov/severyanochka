import { urlOrigin } from './modules/Links.js';
// import Request from './modules/request.js';
import { AddDisableCardBtn, AddDisableCardLike } from './modules/AddDisableClass.js';
import Rating from "./modules/Rating.js";
import FeedbackHtml from './modules/FeedbackHtml.js';
import CreateSliderCards from './modules/CreateSliderCards.js';
import GetAllCards from './modules/GetAllCards.js';
import CardsFromLS from "./modules/CardsFromLS.js";

window.addEventListener('DOMContentLoaded', function () {
  const [cardsBasket, cardsFavourites] = CardsFromLS();

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

  const _slides_cards = document.querySelector('._slides-cards');
  const btnLike = document.querySelector('.products__header-icon._icon-shape');

  let gallerySwiper;
  let cardsData;

  let url = window.location.href;
  let nameFile = url.split('/').reverse()[0];
  let nameFolder = url.split('/').reverse()[1];
  nameFile = nameFile.split('#')[0];

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

    AddDisableCardBtn(cardsBasket);
    AddDisableCardLike(cardsFavourites);
    renderFeedback(cardsData);
    setRating();
    Rating();
  };
  getData();

  function renderPage(data) {
    title.textContent = data.name + ' | Купит в интернет-магазине Северяночка'; // Заголовок страницы 
    navigationLink[navigationLink.length - 1].textContent = data.name; // навигационная ссылка Заголовок страницы
    navigationLink[navigationLink.length - 1].href = nameFile; // навигационная ссылка 
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
    const gallery__wrapper = document.querySelector('.gallery__wrapper-swiper');
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
      if (e.target.classList.contains('gallery__body')) removeClass();
    }
  }
  function removeClass() {
    gallery.classList.remove('active')
    document.body.classList.remove('lock');
    document.querySelector('html').classList.remove('lock');
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
      feedback.forEach(comm => feedback__content.insertAdjacentHTML('beforeend', FeedbackHtml(comm.author, comm.rating, comm.data, comm.comment)));
    } else feedback__content.innerHTML = '<div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"><span style="font-size: 18px; font-weight: bold;">Отзывов пока нет. Вы можете стать первым!</span></div>';
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
  document.addEventListener('keyup', closeGallery);
  document.addEventListener('click', closeGallery);
});
