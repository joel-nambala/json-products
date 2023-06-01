import { currencyFormatter } from '../config/helpers';

class App {
  constructor() {}

  // Display spinner
  displaySpinner(container) {
    const html = `
        <div class="spinner-container">
          <i class="fa-sharp fa-solid fa-circle-notch spinner"></i>
        </div>
      `;

    container.insertAdjacentHTML('beforeend', html);
  }

  // Display select container options
  displaySelectOptions(options, container) {
    // Generate markup
    const html = `<option value="${options}">${options}</option>`;

    // Append to the container
    container.insertAdjacentHTML('beforeend', html);
  }

  // Display sidebar list
  displaySidebarResults(product, container) {
    // Generate markup
    const html = `
      <li class="sidebar-item" data-product="${product.id}">
        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="sidebar-img"
        />
        <div class="sidebar-info">
          <h3 class="sidebar-name">${
            product.title.length > 30
              ? product.title.split('').slice(0, 30).join('') + '...'
              : product.title
          }</h3>
          <p class="sidebar-text">${product.brand}</p>
        </div>
      </li>
    `;

    // Append to the UI
    container.insertAdjacentHTML('beforeend', html);
  }

  // Display product
  displayProduct(product, container) {
    // Generate markup
    const html = `
      <figure class="product-photo">
        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="product-img"
        />
        <figcaption class="product-name">
          <h1>${product.title}</h1>
        </figcaption>
      </figure>
      <div class="product-info">
        <p class="product-category">${
          product.category[0].toUpperCase() + product.category.slice(1)
        }</p>
        <p class="product-brand">${product.brand}</p>
        <p class="product-price">${currencyFormatter(product.price)}</p>
        <p class="product-stock">${product.stock} units left</p>
        <p class="product-rating">${product.rating} rating</p>
        <p class="product-shopping">
          <i class="fa-sharp fa-solid fa-cart-plus shopping-icon"></i>
          <i class="fa-solid fa-check shopping-icon hide-shopping-icon"></i>
        </p>
      </div>
      <p class="product-description">${product.description}</p>
      <div class="product-links">
        <a href="" class="product-link"
          >Check out more <i class="fa-solid fa-arrow-right"></i
        ></a>
      </div>
    `;

    // Append to the UI
    container.insertAdjacentHTML('beforeend', html);
  }
}

export const app = new App();
