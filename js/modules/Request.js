const Request = async (urlOrigin) => {
  const url = urlOrigin + '/JSON/products.json';
  const respons = await fetch(url);
  const catalog = await respons.json();
  return catalog;
}
export default Request;