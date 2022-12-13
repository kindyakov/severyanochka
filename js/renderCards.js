window.addEventListener('DOMContentLoaded', function () {

  const title = document.querySelector('title'); // Заголовок страницы 
  const navigationLink = document.querySelectorAll('.main__navigation-link'); // Навигационная ссылка
  const productsTitle = document.querySelector('.products-title'); // Заголовок товара 
  const article = document.querySelector('.products__header-article'); // Артикл
  const ratings = document.querySelector('.card-rating__items'); // Рейтинг
  const feedback = document.querySelector('.products__header-feedback'); // Отзывы
  const products = document.querySelector('.products__main');
  const products__mainSlider = document.querySelector('.products__main-slider'); // Обертка с слайдами навигации картинок
  const sliderWrapper = document.querySelector('.products__main-slider-wrapper'); // Обертка с слайдами картинок
  const discount = document.querySelector('.products__main-discount'); // Скидка 
  const price = document.querySelector('.products__aside-regular-price');
  const priceCard = document.querySelector('.products__aside-card-price');
  const specifications = document.querySelector('.specifications-body');

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
  };
  getData();


  function renderPage(data) {
    title.textContent = data.name + ' | Купит в интернет-магазине Северяночка'; // Заголовок страницы 
    navigationLink[--navigationLink.length].textContent = data.name; // навигационная ссылка
    productsTitle.textContent = data.name; // название товара
    article.textContent = 'арт. ' + data.article; // артикуль
    ratings.dataset.rating = data.rating; // рейтинг
    feedback.textContent = data.feedback + ' отзывов'; // отзывы
    products.setAttribute('id', data.id); // ID товара
    data.img.forEach((imeg, i) => {
      products__mainSlider.insertAdjacentHTML('beforeend', navSliderHtml(imeg, data.alt, i));
      sliderWrapper.insertAdjacentHTML('beforeend', sliderHtml(imeg, data.alt));
    }); // Картинки
    if (data.discount.length > 0) discount.textContent = `-${data.discount}%`; // Скидка
    else discount.style.display = 'none';
    price.textContent = data.price + ' ₽'; // обычная цена
    if (data.price_card.length > 0) priceCard.textContent = data.price_card + ' ₽'; // цена по карте
    data.characteristic.forEach(arr => specifications.insertAdjacentHTML('beforeend', specificationsHtml(arr[0], arr[1]))); // Характеристики
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
});



