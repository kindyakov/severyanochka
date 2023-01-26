const titleCatalog = ['milk-cheese-egg', 'frozen-foods', 'breed', 'baby-food', 'confectionery-products', 'drinks', 'fruits-vegetables', 'grocery', 'healthy-eating', 'meat-poultry-sausage', 'non-food-products', 'tea-coffee', 'pet-supplies'];
const GetAllCards = ({
  product, productID,
  byId = false, byDiscount = false, random = false,
  count = 12, currentCardID = '',
}) => {
  let productsALL = [], productsFiltr = [], allID = [];
  titleCatalog.forEach(title => {
    if (product[title]) {
      productsALL = [...productsALL, ...product[title].cardData];
    }
  });
  if (byId) {
    productID.forEach(id => {
      productsFiltr = productsFiltr.concat(productsALL.filter(card => card.id == id));
    })
  }
  if (byDiscount) {
    productsALL.forEach(card => {
      if (card.discount !== '') {
        allID.push(card.id)
      }
    });
    let arID = [];
    for (let i = 0; i < count; i++) {
      let id = randomID(0, allID.length - 1, arID);
      arID.push(id);
      productsFiltr = productsFiltr.concat(productsALL.filter(card => card.id == allID[id]
        && allID[id] !== currentCardID));
    }
  }
  if (random) {
    productsALL.forEach(card => allID.push(card.id));
    let arID = [];
    for (let i = 0; i < count; i++) {
      let id = randomID(0, allID.length - 1, arID);
      arID.push(id);
      productsFiltr = productsFiltr.concat(productsALL.filter(card => card.id == allID[id]));
    }
  }
  return productsFiltr;
}
const randomID = (min, max, arID) => {
  let rNum = Math.floor(Math.random() * (max - min) + min);
  for (let i = 0; i < arID.length; i++) {
    if (arID[i] == rNum) {
      rNum = Math.floor(Math.random() * (max - min) + min);
      i = 0;
    }
  }
  return rNum;
}
export default GetAllCards;