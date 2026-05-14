import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
  }
  addProductToCart() {
    const cartList = getLocalStorage('so-cart') || [];
    cartList.push(this.product);
    setLocalStorage('so-cart', cartList);
  }
  renderProductDetails() {
    const template = document.getElementById('product-template');
    if (template && this.product.Id !== undefined) {
      const clone = template.content.cloneNode(true);
      const [title, details, img, price, color, description, checkout] = clone.querySelectorAll('h3, h2, img, p, p, p, button');

      title.textContent = this.product.Name.replace(this.product.NameWithoutBrand, '');
      details.textContent = this.product.NameWithoutBrand;
      price.textContent = `$${this.product.ListPrice.toFixed(2)}`;
      color.textContent = this.product.Colors[0].ColorName;
      description.innerHTML = this.product.DescriptionHtmlSimple;

      img.src = this.product.Image;
      img.alt = this.product.NameWithoutBrand;

      checkout['data-id'] = this.product.Id;
      checkout.addEventListener('click', this.addProductToCart.bind(this));

      document.body.querySelector('main').appendChild(clone);
    }
  }
}