window.addEventListener('DOMContentLoaded', function () {
  const catalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
  const searchInput = document.querySelector('.header-search__input');// Поиск
  const search_list = document.querySelector('.search_list');// Лист для вывода поискового товара 
  const search_result = document.querySelector('.search_result');
  const serachBtn = document.querySelector('.btn-search');// Кнопка поиска
  const search_all = document.querySelector('.search-all');

  let productsArray = [];
  let search_result_id = [];
  let urlOrigin = window.location.origin;
  let urlJson = urlOrigin + '/JSON/products.json';
  let urlImg = urlOrigin + '/img/img-card/';
  let urlProducts = urlOrigin + '/html/';
  let urlSearchResult = urlOrigin + '/search-result.html';

  searchInput.addEventListener('input', () => {
    let value = searchInput.value.toLowerCase().trim();
    if (value !== '') {
      productsArray.forEach(product => {
        let nameProducts = product.name.toLowerCase().trim();

        if (nameProducts.search(value) !== -1) {
          search_result.classList.add('search');
          for (let card of search_list.children) {
            if (card.getAttribute('id') == product.id) return;
          }
          search_result_id.push(product.id);
          search_list.insertAdjacentHTML('afterbegin', cardHtml(product.id, product.img, product.name, product.link, product.catalog));
        } else {
          // search_list.classList.remove('search');
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
  });


  async function products() {
    const response = await fetch(urlJson);
    const products = await response.json();
    catalog.forEach(title => {
      if (products[title]) {
        productsArray = [...productsArray, ...products[title].cardData];
      }
    });
  };
  products();
  function setSearchResult(e) {
    let search_result = {
      value: searchInput.value,
      availability: true,
      productsID: search_result_id
    };
    if (search_result.productsID.length == 0) {
      search_result.availability = false;
    }
    localStorage.setItem('search_result', JSON.stringify(search_result));
    if (this.classList.contains('btn-search')) {
      e.preventDefault();
      document.location.href = urlSearchResult;
    }
  }
  function isertMark(str, pos, lenght) {
    return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + lenght) + '</mark>' + str.slice(pos + lenght);
  };
  function cardHtml(id, img, title, link, catalog) {
    return `<li class="search_li" id="${id}">
  <a href="${urlProducts}${catalog}/${link}" class="search_link">
    <div class="search-wrapper_img">
      <img class="search_img" src="${urlImg}${img[0]}" alt="Картинка">
    </div>
    <span class="search_span">${title}</span>
  </a>
</li>`;
  }
  // ${isertMark(nameProducts, nameProducts.search(value), value.lenght)}
  serachBtn.addEventListener('click', setSearchResult);
  search_all.addEventListener('click', setSearchResult);
})