const titleCatalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
const GetAllCards = (product) => {
  let productsALL = [], productsFiltr = [], allID = [];
  titleCatalog.forEach(title => {
    if (product[title]) {
      productsALL = [...productsALL, ...product[title].cardData];
    }
  });

  productsALL.forEach(card => allID.push(card.id));

  for (let i = 0; i < 12; i++) {
    let id = randomID(i, allID.length - 1);
    productsFiltr = productsFiltr.concat(productsALL.filter(card => card.id == allID[id]));
  }

  // productID.forEach(id => {
  //   productsFiltr = productsFiltr.concat(productsALL.filter(card => card.id == id));
  // })
  return productsFiltr;
}
const randomID = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}
export default GetAllCards;