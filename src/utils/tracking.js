/**
 * Track product visit, most recent visited product should be at the beginning of the array
 * No duplicate visits should be allowed, if product has been visited, remove it from the array and add it to the beginning
 * @param {string} productId - The id of the product
 * @returns {void}
 */
export const trackProductVisit = (productId) => {
  let visitedProducts =
    JSON.parse(localStorage.getItem("visitedProducts")) || [];

  const productIndex = visitedProducts.indexOf(productId);

  // add product to the beginning of the array
  if (productIndex === -1) {
    visitedProducts.unshift(productId);
  } else {
    visitedProducts.splice(productIndex, 1);
    visitedProducts.unshift(productId);
  }

  console.log(visitedProducts);

  localStorage.setItem("visitedProducts", JSON.stringify(visitedProducts));
};

/**
 * Get the visited products
 * @returns {string[]} - The visited products
 */
export const getVisitedProducts = () => {
  return JSON.parse(localStorage.getItem("visitedProducts")) || [];
};
