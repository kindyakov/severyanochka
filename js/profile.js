import Modal from "./modules/modal.js";

const inputLogin = document.querySelector('.modal-login__input');
const wrapper = document.querySelector('.wrapper');
let profile = {};
// Modal 
if (JSON.parse(localStorage.getItem('profile')) !== null) {
  profile = JSON.parse(localStorage.getItem('profile'));
}
let patterns = {
  phone: /(^[7|8]{0,1}\d{10}$)|(^\+7{1}\d{10}$)/,
}

// if (!patterns.phone.test(inputLogin.value)) {
//   e.preventDefault();
//   inputLogin.classList.add('error');
// }
// inputLogin.addEventListener('input', () => inputLogin.classList.remove('error'));

const options = {
  speed: 400,
  btnActive: '.profil-btn',
  name: '.modal-login',
  btnClose: '.modal-login__close',
  closeArea: 'modal-login__body',
  insertHTML: wrapper,
  html: `<div class="modal-login" >
        <div class="modal-login__body">
          <div class="modal-login__content">
            <h3 class="modal-login__title">Вход</h3>
            <form action="#" class="modal-login__form">
              <label class="modal-login__label">Телефон</label>
              <input type="tel" name="phone" class="modal-login__input">
                <button class="modal-login__btn-log">Вход</button>
                <div class="form-footer">
                  <a href="registration.html" class="form-footer__btn-registration">Регистрация</a>
                  <button class="form-footer__forgot-pass">Забыли пароль?</button>
                </div>
            </form>
            <div class="modal-login__close"></div>
          </div>
        </div>
    </div>`,
}

const modal = new Modal(options)