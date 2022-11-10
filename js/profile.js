const modalLogin = document.querySelector('.modal-login');
const inputLogin = document.querySelector('.modal-login__input');

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