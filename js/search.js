// Поиск
const searchInput = document.querySelector('.header-search__input');
// Лист для вывода поискового товара
const search_list = document.querySelector('.search_list');
// 
const search_result = document.querySelector('.search_result');
// Кнопка искать
const serachBtn = document.querySelector('.btn-search');

let productsArray = [];

searchInput.addEventListener('input', () => {
  let value = searchInput.value.trim().toLowerCase();
  if (value !== '') {
    productsArray.forEach(product => {
      const nameProducts = product.name.toLowerCase();

      if (nameProducts.search(value) !== -1) {
        const idProducts = product.id;
        const imgProducts = product.img;
        search_result.classList.add('search');
        search_list.insertAdjacentHTML('afterbegin', `<li class="search_li" id="${idProducts}">
            <img class="search_img" src="../img/img-card/${imgProducts}" alt="${imgProducts}">
            <span class="search_span">${nameProducts}</span>
          </li>`);
      }
      else {
        // search_list.classList.remove('search');
        const search_li = document.querySelector('.search_li');
        search_li.forEach(li => {
          if (li.innerText.search(value) == -1) li.remove();
        });
      }
    });
  } else {
    search_result.classList.remove('search');
    search_list.innerHTML = '';
  }
});

async function products() {
  const response = await fetch('../JSON/products-all.json');
  productsArray = await response.json();
};
products();

function isertMark(str, pos, lenght) {
  return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + lenght) + '</mark>' + str.slice(pos + lenght);
};
// ${isertMark(nameProducts, nameProducts.search(value), value.lenght)}
