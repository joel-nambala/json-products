"use strict";
// Select DOM Elements
const sidebarContainer = document.querySelector(".sidebar-list");
const productContainer = document.querySelector(".product");
// State variables
// State functions
const currencyConverter = function(amount) {
    return amount * 138.65;
};
const currencyFormatter = function(currency) {
    // Convert currency to KSH
    const ksh = currencyConverter(currency);
    // Format the currency
    return new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: "KSH"
    }).format(ksh);
};
// Fetch products function
const fetchProducts = async function() {
    try {
        // Get data from an API
        const response = await fetch("https://dummyjson.com/products");
        // Throw an exception
        if (!response.ok) throw new Error("Something went wrong!!!");
        // Covert the data to a JSON string
        const data = await response.json();
        // Return the data
        return data.products;
    } catch (err) {
        console.error(err.message);
    }
};
// Load spinner
const displaySpinner = function(container) {
    const html = `
    <div class="spinner-container">
      <i class="fa-sharp fa-solid fa-circle-notch spinner"></i>
    </div>
  `;
    container.insertAdjacentHTML("beforeend", html);
};
// Load product items on the sidebar
const displaySidebarItems = async function() {
    // Display spinner
    displaySpinner(sidebarContainer);
    // Get the data
    const products = await fetchProducts();
    // Hide spinner
    sidebarContainer.innerHTML = "";
    // Loop over the products
    products.forEach(function(product, i, arr) {
        // Generate markup
        const html = `
      <li class="sidebar-item" data-product="${product.id}">
        <img
          src="${product.thumbnail}"
          alt="${product.title}"
          class="sidebar-img"
        />
        <div class="sidebar-info">
          <h3 class="sidebar-name">${product.title.length > 30 ? product.title.split("").slice(0, 30).join("") + "..." : product.title}</h3>
          <p class="sidebar-text">${product.brand}</p>
        </div>
      </li>
    `;
        // Append to the UI
        sidebarContainer.insertAdjacentHTML("beforeend", html);
    });
};
displaySidebarItems();
// Function to display product
const displayProduct = async function(e) {
    productContainer.innerHTML = "";
    // Display the spinner
    displaySpinner(productContainer);
    // Select the clicked item
    const clickedItem = e.target.closest(".sidebar-item");
    // Select the dataset
    const { product  } = clickedItem.dataset;
    // Fetch the product
    const productItems = await fetchProducts();
    // Loop over the products
    const selectedProduct = productItems.find((item)=>item.id === +product);
    // Hide the spinner
    productContainer.innerHTML = "";
    // Generate markup
    const html = `
    <figure class="product-photo">
      <img
        src="${selectedProduct.thumbnail}"
        alt="${selectedProduct.title}"
        class="product-img"
      />
      <figcaption class="product-name">
        <h1>${selectedProduct.title}</h1>
      </figcaption>
    </figure>
    <div class="product-info">
      <p class="product-category">${selectedProduct.category[0].toUpperCase() + selectedProduct.category.slice(1)}</p>
      <p class="product-brand">${selectedProduct.brand}</p>
      <p class="product-price">${currencyFormatter(selectedProduct.price)}</p>
      <p class="product-stock">${selectedProduct.stock} units left</p>
      <p class="product-rating">${selectedProduct.rating} rating</p>
      <p class="product-shopping">
        <i class="fa-sharp fa-solid fa-cart-plus shopping-icon"></i>
        <i class="fa-solid fa-check shopping-icon hide-shopping-icon"></i>
      </p>
    </div>
    <p class="product-description">${selectedProduct.description}</p>
    <div class="product-links">
      <a href="" class="product-link"
        >Check out more <i class="fa-solid fa-arrow-right"></i
      ></a>
    </div>
  `;
    // Append to the UI
    productContainer.insertAdjacentHTML("beforeend", html);
};
// Add a click event to the side bar
sidebarContainer.addEventListener("click", displayProduct);

//# sourceMappingURL=index.1c974c2f.js.map
