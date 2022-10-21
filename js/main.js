const catalogMenu = document.querySelector('.header-catalog');
const wrapper = document.querySelector('.wrapper');
//Modal
const modalLogin = document.querySelector('.modal-login');
const inputLogin = document.querySelector('.modal-login__input');
const profilBtn = document.querySelector('.header-profil');
//Menu
const headerOriginal = document.querySelector('.header-menu__wrpper');
const headerClon = document.querySelector('.menu-fixed')
const headerMenu = document.querySelector('.header-menu')
const headerWrapper = document.querySelector('.header-wrapper')
//
const catalog = document.querySelector('.catalog');
//
const cardsCatalog = document.querySelectorAll('.cards-catalog');
let cardCatalogbool = true;
//
const menuLinks = document.querySelectorAll('.header-menu__item');
const footerLinks = document.querySelectorAll('.footer__menu-link');
//
const btnUp = document.querySelector('.btn-up');
// Статьи
const article__list = document.querySelector('.article__list');
const article__card = document.querySelectorAll('.article-block');
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


// Modal 
let patterns = {
  phone: /(^[7|8]{0,1}\d{10}$)|(^\+7{1}\d{10}$)/,
}
profilBtn.addEventListener('click', function () {
  const document_width = document.documentElement.clientWidth;
  const window_width = window.innerWidth;
  const wrapper_margin = window_width - document_width;

  if (wrapper_margin > 0) {
    wrapper.style.cssText = `padding-right: ${wrapper_margin}px;`;
  }

  modalLogin.classList.add('active');
  document.querySelector('body').classList.add('lock');
})

modalLogin.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-login__body') || e.target.classList.contains('modal-login__close')) {
    wrapper.style.cssText = ``;
    modalLogin.classList.remove('active');
    document.querySelector('body').classList.remove('lock');
  } else if (e.target.classList.contains('modal-login__btn-log')) {
    if (!patterns.phone.test(inputLogin.value)) {
      e.preventDefault();
      inputLogin.classList.add('error');
    }
  } else if (e.target.classList.contains('form-footer__btn-registration')) {
    e.preventDefault();
  }
})
inputLogin.addEventListener('input', function () {
  inputLogin.classList.remove('error');
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
btnUp.addEventListener('click', function () {
  window.scrollTo({
    top: 1,
    behavior: "smooth"
  });
})
window.addEventListener('scroll', function () {
  const viewport_width = Math.max(document.documentElement.clientHeight, window.innerHeight);
  if (scrollY >= viewport_width) {
    btnUp.classList.add('visible');
  } else {
    btnUp.classList.remove('visible');
  }
})
if (article__list) {
  article__list.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('article__item-data')) {
      const itemCurent = target;
      const itemCurentText = itemCurent.textContent;

      article__list.querySelectorAll('.article__item-data').forEach(item => {
        item.classList.remove('active');
      });

      target.classList.add('active');

      article__card.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.date === itemCurentText) {
          card.classList.add('active');
        }
      })
    }
    if (target.classList.contains('article-all-time')) {
      article__card.forEach(card => {
        card.classList.add('active');
      })
    }
  })
}
