window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#registration-form');
  const input = document.querySelectorAll('.registration__input');
  const inputRequired = document.querySelectorAll('.input-required');

  const inputsPhone = document.querySelectorAll('input[type="tel"]');
  const inputsData = document.querySelectorAll('input[name="date"]');
  const inputsCard = document.querySelectorAll('input[name="card"]');

  new Inputmask('+7 (999) 999-99-99').mask(inputsPhone); // Маска телефона
  new Inputmask('99-99-9999').mask(inputsData); // Маска даты рождения
  new Inputmask('9999-9999-9999-9999').mask(inputsCard); // Маска карты

  const inputPass = document.querySelector('input[name="password"]');
  const inputConfirmPass = document.querySelector('input[name="confirm-password"]');

  const pattern = {
    phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/,
    name: /[а-яА-ЯЁё]/,
    surname: /[а-яА-ЯЁё]/,
    region: /[а-яА-ЯЁё]/,
    city: /[а-яА-ЯЁё]/,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    password: /^[a-zA-Z0-9а-яА-ЯЁё]{5,}$/,
    data: /^[0-9]+$/,
  }
  // email
  // /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 

  // /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  input.forEach(inputs => {
    inputs.addEventListener('input', () => {
      const item = inputs.closest('.registration__item');
      item.classList.remove('error');
      if (inputs.type === 'password') validPassword();
    });
  });

  form.addEventListener('submit', function (e) {
    const items = document.querySelectorAll('.registration__item');
    inputRequired.forEach(inputs => {
      const item = inputs.closest('.registration__item');
      const infoError = item.querySelector('.info-error');
      const inputName = inputs.name;
      const inputData = inputs.dataset.valid;

      if (inputs.value === '') {
        item.classList.add('error');
        infoError.textContent = 'Пустое поле !';
        e.preventDefault();
        console.log('pusto');
        return;
      } else {
        if (!pattern[inputData].test(inputs.value.trim())) {
          item.classList.add('error');
          infoError.textContent = 'Не правильно заполнено поле !';
          e.preventDefault();
          console.log('valide');
        }
      }
    });
    items.forEach(tem => { if (tem.classList.contains('error')) e.preventDefault() });
  });

  function validPassword() {
    if (inputPass.value !== inputConfirmPass.value) {
      const item = inputConfirmPass.closest('.registration__item');
      const infoError = item.querySelector('.info-error');
      item.classList.add('error');
      infoError.textContent = 'Пароли не совоподают !';
    };
  };
})