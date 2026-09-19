const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  getData(category) {
    return fetch(`${baseURL}products/search/${category}`)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`)
      .then(convertToJson)
      .then((data) => data);
    return products.Result;
  }
}
