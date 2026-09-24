import CheckoutProcess from './CheckoutProcess.mjs';
import { loadHeaderFooter } from './utils.mjs';

const holder = new CheckoutProcess();
holder.init();
holder.displaySubtotal();

const zipField = document.getElementById('zipcode');
if (zipField) {
  zipField.addEventListener('input', () => {
    holder.calculateTotals();
  });
}

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    holder.checkout(form);
  });
}

loadHeaderFooter();
