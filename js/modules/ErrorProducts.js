const ErrorProducts = (
  text = 'К сожалению, раздел пуст',
  link = 'html/catalog.html',
  linkText = 'Нажмите здесь, чтобы продолжить покупки') => {
  return `<div class="error-products">
  <div class="error-products_content">
    <span class="error-products_text">${text}</span>
    <a href="${link}" class="basket__empty-link">${linkText}</a>
  </div>
</div>`;
}

export default ErrorProducts;