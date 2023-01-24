import { urlOrigin, urlJsonProducts, urlImgCard, urlHtml } from './modules/Links.js';

window.addEventListener('DOMContentLoaded', function () {
  const catalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
  const searchForm = document.querySelector('.header-search');
  const searchInput = document.querySelector('.header-search__input');// Поиск
  const search_list = document.querySelector('.search_list');// Лист для вывода поискового товара 
  const search_result = document.querySelector('.search_result');
  const search_all = document.querySelector('.search-all');

  let productsArray = [];
  let search_result_id = [];

  searchInput.autocomplete = 'off';

  async function products() {
    const response = await fetch(urlJsonProducts);
    const products = await response.json();
    catalog.forEach(title => {
      if (products[title]) {
        productsArray = [...productsArray, ...products[title].cardData];
      }
    });
  };
  products();

  function searchProducktsInput() {
    let value = searchInput.value.toLowerCase().trim();
    if (value !== '') {
      productsArray.forEach(product => {
        let nameProducts = product.name.toLowerCase().trim();

        if (nameProducts.search(value) !== -1) {
          search_result.classList.add('search');
          for (let card of search_list.children) {
            if (card.getAttribute('id') === product.id) return;
          }
          search_result_id.push(product.id);
          search_list.insertAdjacentHTML('afterbegin', cardHtml(product.id, product.img, product.name, product.link, product.catalog));
        } else {
          search_list.classList.remove('search');
          const search_li = document.querySelectorAll('.search_li');

          search_li.forEach(li => {
            const currentNameProducts = li.querySelector('.search_span').innerText.toLowerCase().trim();
            if (currentNameProducts.search(value) === -1) {
              search_result_id.splice(search_result_id.findIndex(id => id == li.getAttribute('id')), 1);
              li.remove();
            };
          });
        }
      });
    } else {
      search_result.classList.remove('search');
      search_list.innerHTML = '';
    }
  }
  function isertMark(str, pos, lenght) {
    return str.slice(0, pos) + '<mark class="search-mark">' + str.slice(pos, pos + lenght) + '</mark>' + str.slice(pos + lenght);
  };
  function cardHtml(id, img, title, link, catalog) {
    return `<li class="search_li" id="${id}">
  <a href="${urlHtml}${catalog}/${link}" class="search_link">
    <div class="search-wrapper_img">
      <img class="search_img" src="${urlImgCard}${img[0]}" alt="Картинка">
    </div>
    <span class="search_span">${title}</span>
  </a>
</li>`;
  }
  // isertMark(title, title.search(value), value.length)
  // ${isertMark(nameProducts, nameProducts.search(value), value.lenght)}

  function setSearchResult() {
    let search_result = {
      value: searchInput.value,
      availability: true,
      productsID: search_result_id
    };
    if (search_result.productsID.length == 0) {
      search_result.availability = false;
    }
    localStorage.setItem('search_result', JSON.stringify(search_result));
    document.location.href = search_all.href;
  }

  function searchProducktsSubmit(e) {
    e.preventDefault();
    let value = searchInput.value.toLowerCase().trim();
    if (value !== '') {
      productsArray.forEach(product => {
        let nameProducts = product.name.toLowerCase().trim();
        if (nameProducts.search(value) !== -1) {
          for (let card of search_list.children) {
            if (card.getAttribute('id') === product.id) return;
          }
          search_result_id.push(product.id);
        } else {
          const search_li = document.querySelectorAll('.search_li');
          search_li.forEach(li => {
            const currentNameProducts = li.querySelector('.search_span').innerText.toLowerCase().trim();
            if (currentNameProducts.search(value) === -1) {
              search_result_id.splice(search_result_id.findIndex(id => id == li.getAttribute('id')), 1);
              li.remove();
            };
          });
        }
      });
      setSearchResult();
    }
  }

  searchInput.addEventListener('input', searchProducktsInput);
  searchForm.addEventListener('submit', searchProducktsSubmit);
  search_all.addEventListener('click', setSearchResult);
})
