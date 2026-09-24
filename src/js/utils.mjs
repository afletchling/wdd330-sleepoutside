// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
// retrieve a url parameter from the search bar
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
// render a list of objects from a template function
export function renderListWithTemplate(
  callback,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  const templateList = list.map(callback);
  parentElement.insertAdjacentHTML(position, templateList.join(''));
}
// render an object from a template function
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}
// fetch and load template
export async function loadTemplate(url) {
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
    },
  }).catch((err) => {
    console.error(err);
  });

  if (data.ok) {
    return await data.text();
  } else {
    return '';
  }
}
// load header and footer
export async function loadHeaderFooter() {
  const headerElement = document.getElementById('header');
  if (headerElement) {
    renderWithTemplate(
      await loadTemplate('../partials/header.html'),
      headerElement,
    );
  }

  const footerElement = document.getElementById('footer');
  if (footerElement) {
    renderWithTemplate(
      await loadTemplate('../partials/footer.html'),
      footerElement,
    );
  }
}
// display and unhide label
export function displayLabel(id, text) {
    const label = document.getElementById(id);
    if (label) {
        label.classList.remove('hidden');
        label.textContent = text;
    }
}
// convert form data to JSON
export function formDataToJSON(form) {
  const formData = new FormData(form);
  const newData = {};

  formData.forEach((value, key) => {
    newData[key] = value;
  })

  return newData;
}