import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    if (this.product) {
      this.renderProductDetails();

      document
        .getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
    }
  }
  addProductToCart() {
    const cart = getLocalStorage('so-cart') || [];
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
  }
  renderProductDetails() {
    const productDetail = document.querySelector('.product-detail');
    if (productDetail) {
      const [name, detail, image, price, color, description] =
        productDetail.querySelectorAll(
          'h3, h2, img, .product-card__price, .product__color, .product__description',
        );

      name.textContent = this.product.Brand.Name || '';
      detail.textContent = this.product.NameWithoutBrand || '';
      price.textContent = `$${this.product.ListPrice || ''}`;
      color.textContent = (this.product.Colors[0] || {}).ColorName || '';
      description.innerHTML = this.product.DescriptionHtmlSimple || '';

      image.src = this.product.Image || '';
      image.alt = this.product.Brand.Name || '';
    }
  }
}
