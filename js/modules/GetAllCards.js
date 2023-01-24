const titleCatalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
const GetAllCards = (product, productID) => {
  let productsALL = [];
  let productsFiltr = [];
  titleCatalog.forEach(title => {
    if (product[title]) {
      productsALL = [...productsALL, ...product[title].cardData];
    }
  });
  productID.forEach(id => {
    productsFiltr = productsFiltr.concat(productsALL.filter(card => card.id == id));
  })
  return productsFiltr;
}

export default GetAllCards;