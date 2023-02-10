window.addEventListener('DOMContentLoaded', () => {
  const modalSuccessful = document.querySelector('.modal-successful');
  //Form
  const form = document.querySelector('#registration-form');
  const input = document.querySelectorAll('.registration__input');
  const inputRequired = document.querySelectorAll('.input-required');

  const inputsPhone = document.querySelectorAll('input[type="tel"]');
  const inputsData = document.querySelectorAll('input[name="date"]');
  const inputsCard = document.querySelectorAll('input[name="card"]');

  new Inputmask('+7 (999) 999-99-99').mask(inputsPhone); // Маска телефона
  new Inputmask('99-99-9999').mask(inputsData); // Маска даты рождения
  new Inputmask('9999-9999-9999-9999').mask(inputsCard); // Маска карты

  const inputPassword = document.querySelectorAll('[type="password"]')
  const inputEmail = document.querySelector('input[name="email"]');
  const inputCard = document.querySelector('input[name="card"]');
  let time = 0;
  let activeModal;
  const pattern = {
    phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/,
    name: /[а-яА-ЯЁё]{3,}$/,
    region: /[а-яА-ЯЁё]/,
    city: /[а-яА-ЯЁё]/,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    password: /^[a-zA-Z0-9а-яА-ЯЁё]{5,}$/,
    data: /^[0-9]{10,}$/,
    card: /[0-9]/,
  }

  let error;

  input.forEach(inputs => {
    inputs.addEventListener('input', () => {
      removeError(inputs)
      if (inputs.type == 'password') {
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
      else if (inputName === 'password') validPassword();
      // else if (inputData === 'date') validDate(inputs);
    });
    if (inputEmail.value !== '') validEmail(inputEmail);
    if (inputCard.value !== '') validСard(inputCard);

    let obj = {};
    let formData = new FormData(form)

    formData.forEach((value, key) => obj[key] = value);
    obj['id'] = (Math.random() * 1000000000).toFixed(0);
    obj['dateRegistration'] = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    if (error == 0) {
      postForm(obj)
    }
  });
  async function postForm(formData) {
    try {
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      activeModal = setInterval(timeActive, 1000);
      modalSuccessful.classList.add('active');
    } catch (e) {
      alert(e, 'Ошибка! попробуйте позже');
    }
  }
  function timeActive() {
    time++;
    if (time == 2) {
      clearInterval(activeModal);
      modalSuccessful.classList.remove('active');
      time = 0;
    }
  }
  function validPhone(inputs) {
    if (!pattern[inputs.name].test(inputs.value.trim())) {
      addError(inputs, 'Проверте правильность ввода');
    };
  };
  function validName(inputs) {
    if (!pattern[inputs.dataset.valid].test(inputs.value.trim())) {
      addError(inputs, 'Проверте правильность ввода');
      console.log(inputs.dataset.valid);
    };
  };
  function validPassword() {
    const inputPass = document.querySelector('input[name="password"]');
    const inputConfirmPass = document.querySelector('input[name="confirm-password"]');
    if (!pattern['password'].test(inputPass.value.trim())) {
      addError(inputPass, 'Минимальное коллчиество символов 5');
    } else {
      if (inputPass.value !== inputConfirmPass.value) {
        addError(inputConfirmPass, 'Пароли не совоподают')
      } else removeError(inputConfirmPass);
    }
  };
  function validEmail(inputs) {
    if (!pattern[inputs.name].test(inputs.value.trim())) {
      addError(inputs, 'Email неверный');
    };
  };
  function validСard(inputs) {
    if (!pattern['card'].test(inputs.value.trim())) {
      addError(inputs, 'Проверте правильность ввода');
    };
  };
  function validDate(inputs) {
    if (!pattern.date.test(inputs.value.trim())) {
      addError(inputs, 'Проверте правильность ввода');
      console.log(inputs.value.length);
    };
  }
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