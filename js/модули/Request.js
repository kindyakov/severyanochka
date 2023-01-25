const titleCatalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
const Request = async (urlOrigin) => {
  console.log(urlOrigin);
  const url = urlOrigin + '/JSON/products.json';
  const respons = await fetch(url);
  const catalog = await respons.json();
  return catalog;
}
export default Request;
