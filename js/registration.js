window.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#registration-form');
  const input = document.querySelectorAll('.registration__input');

  const pattern = {
    phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    name: 1,
    surname: 1,
    password: 1,
    region: 1,
    city: 1,
    email: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  }
  // email
  // /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 

  // /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  input.forEach(inputs => {
    inputs.addEventListener('change', () => {
      const inputName = inputs.name;
      const inputData = inputs.dataset.valid;

      if (!pattern[inputData].test(inputs.value)) {
        inputs.classList.add('error');
        console.log('ошибка');
      } else inputs.classList.remove('error');
    });
  });

  form.addEventListener('submit', function (e) {
    console.log(e);
    e.preventDefault();
  });
})