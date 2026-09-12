import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(data) {
  return `<li class="product-card">
    <a href="product_pages/?product=${data.Id}">
      <img
        src="${data.Image}"
        alt="${data.Name}"
      />
      <h3 class="card__brand">${data.Brand.Name}</h3>
      <h2 class="card__name">${data.NameWithoutBrand}</h2>
      <p class="product-card__price">${data.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const products = await this.dataSource.getData();
    this.renderList(products);
  }
  renderList(products) {
    return renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      products,
    );
  }
}
