const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ExternalServices {
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
  async checkout(order) {
    return await fetch(`${baseURL}checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(convertToJson)
      .then((data) => data);
  }
}
