const catalogMenu = document.querySelector('.header-catalog');
const wrapper = document.querySelector('.wrapper');
//Modal
const profilBtn = document.querySelector('.header-profil');
//Menu
const headerOriginal = document.querySelector('.header-menu__wrpper');
const headerClon = document.querySelector('.menu-fixed')
const headerMenu = document.querySelector('.header-menu')
const headerWrapper = document.querySelector('.header-wrapper')
//
// const catalog = document.querySelector('.catalog');
//
const cardsCatalog = document.querySelectorAll('.cards-catalog');
let cardCatalogbool = true;
//
const menuLinks = document.querySelectorAll('.header-menu__item');
const footerLinks = document.querySelectorAll('.footer__menu-link');
//
const btnUp = document.querySelector('.btn-up');
//
wrapper.addEventListener('mouseover', function (e) {
  if (e.target.closest('.header-catalog__button')) {
    catalogMenu.classList.add('open');
    document.querySelector('.header-catalog__button').classList.add('active');
  } else if (!e.target.closest('.wrpper-catalog__button') && !e.target.closest('.header-catalog')) {
    catalogMenu.classList.remove('open')
    document.querySelector('.header-catalog__button').classList.remove('active');
  }
});
//mouseover
//mouseout
//mousemove
if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
  wrapper.addEventListener('click', (e) => {
    if (e.target.closest('.header-catalog__button')) {
      e.preventDefault();
      catalogMenu.classList.add('open');
      document.querySelector('.header-catalog__button').classList.add('active');
      document.body.classList.add('lock');
      document.querySelector('html').classList.add('lock');
    } else if (!e.target.closest('.wrpper-catalog__button') && !e.target.closest('.header-catalog')) {
      catalogMenu.classList.remove('open')
      document.querySelector('.header-catalog__button').classList.remove('active');

      document.body.classList.remove('lock');
      document.querySelector('html').classList.remove('lock');
    }
  });
  let touchY = null;

  function touchStart(e) {
    const touch = e.touches[0];
    touchY = touch.clientY;
  }
  function touchMove(e) {
    if (!touchY) {
      return false;
    }
    let catalogMenuHeight = this.clientHeight;

    let moveY = e.touches[0].clientY;
    let yDiff = touchY - moveY;
    console.log(moveY);
    if (yDiff > (catalogMenuHeight / 1.7)) {
      catalogMenu.classList.remove('open')
      document.querySelector('.header-catalog__button').classList.remove('active');

      document.body.classList.remove('lock');
      document.querySelector('html').classList.remove('lock');
    }
  }
  catalogMenu.addEventListener('touchstart', touchStart);
  catalogMenu.addEventListener('touchmove', touchMove);
}

// Перемещение элементов
window.addEventListener('resize', function () {
  const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth);
  if (viewport_width <= 645) {
    if (!headerMenu.classList.contains('done')) {
      headerClon.insertBefore(headerMenu, headerClon.children[1])
      headerMenu.classList.add('done');
      wrapper.style.paddingBottom = '57px';
    }
  } else {
    if (headerMenu.classList.contains('done')) {
      headerOriginal.insertBefore(headerMenu, headerOriginal.children[0])
      headerMenu.classList.remove('done');
      wrapper.style.paddingBottom = '';
    }
  }

  if (viewport_width <= 440) {
    if (!profilBtn.classList.contains('done')) {
      headerMenu.insertBefore(profilBtn, headerMenu.children[headerMenu.children.length])
      profilBtn.classList.add('done');
    }
  } else {
    if (profilBtn.classList.contains('done')) {
      headerWrapper.insertBefore(profilBtn, headerWrapper.children[headerWrapper.children.length])
      profilBtn.classList.remove('done');
    }
  }
})
window.addEventListener('load', function () {
  const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth);
  if (viewport_width <= 645) {
    if (!headerMenu.classList.contains('done')) {
      headerClon.insertBefore(headerMenu, headerClon.children[1])
      headerMenu.classList.add('done');
      wrapper.style.paddingBottom = '57px';
    }
  } else {
    if (headerMenu.classList.contains('done')) {
      headerOriginal.insertBefore(headerMenu, headerOriginal.children[0])
      headerMenu.classList.remove('done');
      wrapper.style.paddingBottom = '';
    }
  }

  if (viewport_width <= 440) {
    if (!profilBtn.classList.contains('done')) {
      headerMenu.insertBefore(profilBtn, headerMenu.children[headerMenu.children.length])
      profilBtn.classList.add('done');
    }
  } else {
    if (profilBtn.classList.contains('done')) {
      headerWrapper.insertBefore(profilBtn, headerWrapper.children[headerWrapper.children.length - 1])
      profilBtn.classList.remove('done');
    }
  }
})


function linkActive(selector, url) {
  for (let i = 0; i < selector.length; i++) {
    const link = selector[i];
    if (url === link.href) {
      link.classList.add('active');
    }
  }
}
window.addEventListener('load', function () {
  let url = document.location.href;
  linkActive(footerLinks, url);
  linkActive(menuLinks, url);
})

if (btnUp) {
  btnUp.addEventListener('click', function () {
    window.scrollTo({
      top: 1,
      behavior: "smooth"
    });
  })
}

window.addEventListener('scroll', function () {
  const viewport_width = Math.max(document.documentElement.clientHeight, window.innerHeight);
  if (scrollY >= viewport_width) {
    btnUp.classList.add('visible');
  } else {
    btnUp.classList.remove('visible');
  }
})
