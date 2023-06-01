// Local imports
import { API_URL } from './config/config';

// Get the products
export const fetchProducts = async function () {
  try {
    // API request for all the products
    const reponse = await fetch(API_URL);

    // Throw an exception
    if (!reponse.ok) throw new Error('Something went wrong!!');

    // Convert the data to a json string
    const data = await reponse.json();

    // Return the products from the function
    return data.products;
  } catch (err) {
    // Rethrow the error
    throw new Error(err.message);
  }
};

// Get a specific item
export const getItemId = function (e) {
  // Get the clicked item
  const clickedItem = e.target.closest('.sidebar-item');

  // Get the product id
  const { product } = clickedItem.dataset;

  // Return the id
  return product;
};

// Get all the categories
export const getAllCategories = function (products) {
  // Set the categories array
  const categories = products.reduce(
    function (acc, cur, i, arr) {
      if (!acc.includes(cur.category)) acc.push(cur.category);
      return acc;
    },
    ['all']
  );

  // Return the categories
  return categories;
};

// Get the items based on the selected category
export const getProductsInCategory = async function (category) {
  try {
    // API request for all the products
    const products = await fetchProducts();

    // Get the category
    if (category === 'all' || category === '') return products;

    // Filter the array
    const categoryArr = products.filter(product => product.category === category);

    // Return the products
    return categoryArr;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Show and hide shopping list modal
export const showShoppingListModal = function (overflowContainer, shoppingListContainer) {
  // Manipulate classes
  overflowContainer.classList.toggle('overflow-modal-hidden');
  shoppingListContainer.classList.toggle('overflow-modal-hidden');
};
