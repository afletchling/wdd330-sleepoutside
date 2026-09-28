import CheckoutProcess from './CheckoutProcess.mjs';
import { alertMessage, loadHeaderFooter, setLocalStorage } from './utils.mjs';

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
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const response = await holder.checkout(form);
    if (response === true) {
      setLocalStorage('so-cart', []);
      window.location = '/success/index.html';
    } else {
      for (const message of Object.values(response.response)) {
        alertMessage(message);
      }
    }
  });
}

loadHeaderFooter();
