const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', response: jsonResponse };
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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(convertToJson)
      .then((data) => data);
  }
}
