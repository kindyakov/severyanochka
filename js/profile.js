const modalLogin = document.querySelector('.modal-login');
const inputLogin = document.querySelector('.modal-login__input');
const profilBtn = document.querySelector('.header-profil');
const wrapper = document.querySelector('.wrapper');
let profile = {};
// Modal 
if (JSON.parse(localStorage.getItem('profile')) !== null) {
  profile = JSON.parse(localStorage.getItem('profile'));
}
let patterns = {
  phone: /(^[7|8]{0,1}\d{10}$)|(^\+7{1}\d{10}$)/,
}

profilBtn.addEventListener('click', function () {
  const document_width = document.documentElement.clientWidth;
  const window_width = window.innerWidth;
  const wrapper_margin = window_width - document_width;

  if (wrapper_margin > 0) wrapper.style.cssText = `padding-right: ${wrapper_margin}px;`;

  modalLogin.classList.add('active');
  document.body.classList.add('lock');
  document.querySelector('html').classList.add('lock');
})

modalLogin.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-login__body') || e.target.classList.contains('modal-login__close')) {
    wrapper.style.cssText = ``;
    modalLogin.classList.remove('active');
    document.body.classList.remove('lock');
    document.querySelector('html').classList.remove('lock');
  } else if (e.target.classList.contains('modal-login__btn-log')) {
    if (!patterns.phone.test(inputLogin.value)) {
      e.preventDefault();
      inputLogin.classList.add('error');
    }
  }
})

inputLogin.addEventListener('input', () => inputLogin.classList.remove('error'));