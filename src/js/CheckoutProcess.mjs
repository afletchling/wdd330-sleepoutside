import ExternalServices from './ExternalServices.mjs';
import { displayLabel, formDataToJSON, getLocalStorage } from './utils.mjs';

function packageItem(product) {
  return {
    id: product.Id,
    name: product.Name,
    price: product.FinalPrice,
    qty: product.Quantity ?? 1,
  };
}

const externalServices = new ExternalServices();
export default class CheckoutProcess {
  items = [];
  total = 0;
  tax = 0;
  shipping = 0;
  subtotal = 0;
  init() {
    this.items = getLocalStorage('so-cart') || [];
  }
  displaySubtotal() {
    for (const product of this.items) {
      this.subtotal += product.FinalPrice;
    }

    const label = document.getElementById('subtotal');
    if (label) {
      label.textContent = `Subtotal: $${this.subtotal.toFixed(2)}`;
    }
  }
  calculateTotals() {
    this.tax = this.subtotal * 0.06;
    this.shipping = 0;

    for (const item in this.items) {
      this.shipping += item == 0 ? 10 : 2;
    }

    this.total = this.subtotal + this.tax + this.shipping;
    this.displayTotals();
  }
  displayTotals() {
    displayLabel('tax', `Tax: $${this.tax.toFixed(2)}`);
    displayLabel('shipping', `Shipping: $${this.shipping.toFixed(2)}`);
    displayLabel('total', `Total: $${this.total.toFixed(2)}`);
  }
  async checkout(form) {
    const data = formDataToJSON(form);
    const order = {
      orderDate: new Date().toISOString(),
      fname: data['first-name'],
      lname: data['last-name'],
      street: data.address,
      city: data.city,
      state: data.state,
      zip: data.zipcode,
      cardNumber: data.card,
      expiration: data.exp,
      code: data['security-code'],
      items: this.items.map(packageItem),
      orderTotal: this.total.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2),
    };

    const response = await externalServices.checkout(order);
    console.log(response);
  }
}
