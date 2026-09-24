import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

const category = getParam('category') ?? 'tents';
const data = new ExternalServices(category);
const listElement = document.querySelector('.product-list');
const title = document.querySelector('h2');
title.textContent = `Top Products: ${category
  .replaceAll('-', ' ')
  .split(' ')
  .map(
    (value) => value.substring(0, 1).toLocaleUpperCase() + value.substring(1),
  )
  .join(' ')}`;

if (listElement) {
  const list = new ProductList(category, data, listElement);
  list.init();
}

loadHeaderFooter();
