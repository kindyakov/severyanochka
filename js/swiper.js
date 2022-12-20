const index_swiper = document.querySelectorAll('.index-swiper');
const products_swiper = document.querySelectorAll('.products-swiper');
const indexSwiper = new Swiper('.index-swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  //= colum-gap
  spaceBetween: 25,
  // Бесконечная прокрутка
  // loop: true,
  // Кол-во дублирующих слайдов
  // loopedSlides: 1,

  // Брейк поинты (ширины )
  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    360: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    580: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  }
});
const productsSwiper = new Swiper('.products-swiper', {
  navigation: {
    nextEl: '.products-swiper-next',
    prevEl: '.products-swiper-prev',
  },
  //= colum-gap
  spaceBetween: 25,
  // Бесконечная прокрутка
  // loop: true,
  // Кол-во дублирующих слайдов
  // loopedSlides: 1,

  // Брейк поинты (ширины )
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    360: {
      slidesPerView: 2,
      spaceBetween: 15
    },
    580: {
      slidesPerView: 3,
      spaceBetween: 15
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  }
});

if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
  index_swiper.forEach(swiper => swiper.classList.remove('swiper-no-swiping'));
  products_swiper.forEach(swiper => swiper.classList.remove('swiper-no-swiping'));
} else {
  index_swiper.forEach(swiper => swiper.classList.add('swiper-no-swiping'));
  products_swiper.forEach(swiper => swiper.classList.add('swiper-no-swiping'));
}