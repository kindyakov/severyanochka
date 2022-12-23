const catalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
const searchInput = document.querySelector('.header-search__input');// Поиск
const search_list = document.querySelector('.search_list');// Лист для вывода поискового товара 
const search_result = document.querySelector('.search_result');
const serachBtn = document.querySelector('.btn-search');// Кнопка поиска

let productsArray = [];

searchInput.addEventListener('input', () => {
  let value = searchInput.value.toLowerCase().trim();
  if (value !== '') {
    productsArray.forEach(product => {
      const nameProducts = product.name.toLowerCase().trim();
      
      if (nameProducts.search(value) !== -1) {
        console.log(nameProducts);
        search_result.classList.add('search');
        search_list.insertAdjacentHTML('afterbegin', cardHtml(product.id, product.img, product.name, product.link, product.catalog));
      }
      else {
        // search_list.classList.remove('search');
        const search_li = document.querySelectorAll('.search_li');
        search_li.forEach(li => {
          const currentNameProducts = li.querySelector('.search_span');
          if (currentNameProducts.innerText.search(value) == -1) li.remove();
        });
      }
    });
  } else {
    search_result.classList.remove('search');
    search_list.innerHTML = '';
  }
});

async function products() {
  const response = await fetch('JSON/products.json');
  const products = await response.json();
  catalog.forEach(title => {
    if (products[title]) {
      productsArray = [...productsArray, ...products[title].cardData];
    }
  });
};
products();

function isertMark(str, pos, lenght) {
  return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + lenght) + '</mark>' + str.slice(pos + lenght);
};
function cardHtml(id, img, title, link, catalog) {
  return `<li class="search_li" id="${id}">
  <a href="html/${catalog}/${link}" class="search_link">
    <div class="search-wrapper_img">
      <img class="search_img" src="img/img-card/${img[0]}" alt="${title}">
    </div>
    <span class="search_span">${title}</span>
  </a>
</li>`;
}
// ${isertMark(nameProducts, nameProducts.search(value), value.lenght)}
