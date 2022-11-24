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

  const inputEmail = document.querySelector('input[name="email"]');
  const inputCard = document.querySelector('input[name="card"]');

  const pattern = {
    phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/,
    name: /[а-яА-ЯЁё]/,
    region: /[а-яА-ЯЁё]/,
    city: /[а-яА-ЯЁё]/,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    password: /^[a-zA-Z0-9а-яА-ЯЁё]{5,}$/,
    data: /^[0-9]+$/,
    card: /^[0-9]+$/,
  }

  let error = 0;

  input.forEach(inputs => {
    inputs.addEventListener('input', () => {
      removeError(inputs);
      if (inputs.type === 'password') {
        validPassword();
      };
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    error = 0;
    inputRequired.forEach(inputs => {
      const inputName = inputs.name;
      const inputData = inputs.dataset.valid;

      if (inputs.value === '') addError(inputs, 'Пустое поле !');
      else if (inputName === 'phone') validPhone(inputs);
      else if (inputData === 'name') validName(inputs);
      else if (inputName === 'confirm-password') validPassword();
    });
    if (inputEmail.value !== '') validEmail(inputEmail);
    if (inputCard.value !== '') validСard(inputCard);

    console.log(error);
    if (error == 0) {
      console.log('отправка');
    }
  });
  function validPhone(inputs) {
    if (!pattern[inputs.name].test(inputs.value.trim())) {
      addError(inputs, 'Проверте правильность ввода !');
    };
  };
  function validName(inputs) {
    if (!pattern[inputs.dataset.valid].test(inputs.value.trim())) {
      addError(inputs, 'Проверте правильность ввода !');
      console.log(inputs.dataset.valid);
    };
  };
  function validPassword() {
    if (inputPass.value !== inputConfirmPass.value) {
      const inputPassword = document.querySelectorAll('[type="password"]')
      inputPassword.forEach(inputsPas => addError(inputsPas, 'Пароли не совоподают !'));
    };
  };
  function validEmail(inputs) {
    if (!pattern[inputs.name].test(inputs.value.trim())) {
      addError(inputs, 'Email неверный !');
    };
  };
  function validСard(inputs) {
    if (!pattern['card'].test(inputs.value.trim())) {
      addError(inputs, 'Проверте правильность ввода !');
    };
  };
  function addError(inputs, strError) {
    const item = inputs.closest('.registration__item');
    const infoError = item.querySelector('.info-error');
    item.classList.add('error');
    infoError.textContent = `${strError}`;
    error++;
  }
  function removeError(inputs) {
    const item = inputs.closest('.registration__item');
    item.classList.remove('error');
  }
})