import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

const data = new ProductData('tents');
const listElement = document.querySelector('.product-list');

if (listElement) {
  const list = new ProductList('tents', data, listElement);
  list.init();
}

loadHeaderFooter();
