// Статьи
const article__list = document.querySelector('.article__list');
const article__card = document.querySelectorAll('.article-block');

if (article__list) {
  article__list.addEventListener('click', function (e) {
    const target = e.target;
    if (target.classList.contains('article__item-data')) {
      const itemCurent = target;
      const itemCurentText = itemCurent.textContent;

      article__list.querySelectorAll('.article__item-data').forEach(item => {
        item.classList.remove('active');
      });

      target.classList.add('active');

      article__card.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.date === itemCurentText) {
          card.classList.add('active');
        }
      })
    }
    if (target.classList.contains('article-all-time')) {
      article__card.forEach(card => {
        card.classList.add('active');
      })
    }
  })
}
