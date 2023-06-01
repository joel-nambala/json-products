// Core imports
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Local imports
import * as model from './model.js';
import { app } from './views/View.js';
import * as dom from './config/dom.js';

const controller = async function () {
  // Display the spinner
  app.displaySpinner(dom.sidebarContainer);

  try {
    // Get the products
    const products = await model.fetchProducts();

    // Empty the sidebar container
    dom.sidebarContainer.innerHTML = '';

    // Display results to the side bar
    products.forEach(function (product, i, arr) {
      // Append to the UI
      app.displaySidebarResults(product, dom.sidebarContainer);
    });

    // Add an event listener to the sidebar
    dom.sidebarContainer.addEventListener('click', async function (e) {
      // Clear the product container
      dom.productContainer.innerHTML = '';

      // Display the spinner
      app.displaySpinner(dom.productContainer);

      // Get the product id
      const productId = +model.getItemId(e);

      // Get the products array
      const productsArr = await model.fetchProducts();

      // Get the product from the products
      const selectedProduct = productsArr.find(item => item.id === productId);

      // Clear the container
      dom.productContainer.innerHTML = '';

      // Append to the UI
      app.displayProduct(selectedProduct, dom.productContainer);
    });

    // Get all the categories
    const categories = model.getAllCategories(products);

    // Sorted categories
    const sortedCategories = categories.sort();

    // Display the categories to the UI
    sortedCategories.forEach(function (category, i, arr) {
      // Append to the UI
      app.displaySelectOptions(category, dom.selectContainer);
    });

    // Add an event listener
    dom.selectContainer.addEventListener('change', async function (e) {
      // Empty the sidebar
      dom.sidebarContainer.innerHTML = '';

      // Display the spinner
      app.displaySpinner(dom.sidebarContainer);

      // Get the clicked value
      const optionValue = e.target.value;

      // Get the array
      const categorrArr = await model.getProductsInCategory(optionValue);

      // Empty the sidebar
      dom.sidebarContainer.innerHTML = '';

      // Loop over the array
      categorrArr.forEach(function (item, i, arr) {
        // Display the UI
        app.displaySidebarResults(item, dom.sidebarContainer);
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

controller();

// Toggle the hidden class
const toggleShoppingListModal = function () {
  model.showShoppingListModal(dom.overflowsContainer, dom.shoppingListContainer);
};

// Add event listeners
dom.headerShopping.addEventListener('click', function () {
  // Remove the hidden class
  toggleShoppingListModal();
});

dom.shoppingListCloseBtn.addEventListener('click', function () {
  // Add the hidden class
  toggleShoppingListModal();
});

dom.overflowsContainer.addEventListener('click', function () {
  // Add the hidden classes
  toggleShoppingListModal();
});

dom.shoppingListBtn.addEventListener('click', function () {
  // Remove hidden class
  model.showHideCheckoutModal(dom.checkoutContainer);
  dom.shoppingListContainer.classList.add('shopping-modal-hidden');
});

dom.checkoutBtn.addEventListener('click', function () {
  // Remove hidden class
  model.showHideCheckoutModal(dom.checkoutContainer);
  dom.overflowsContainer.classList.add('overflow-modal-hidden');
});
