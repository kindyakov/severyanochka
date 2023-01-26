const LoadingSwiper = () => {
  new Swiper('.index-swiper', {
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
}
export default LoadingSwiper;
