let categories = {};
let brands = {};
let colors = {};

function createMappings(products) {
  let categoryIndex = 1;
  let brandIndex = 1;
  let colorIndex = 1;

  products.forEach((product) => {
    if (!(product.categoryId in categories)) {
      categories[product.categoryId] = categoryIndex++;
    }
    if (!(product.brandName in brands)) {
      brands[product.brandName] = brandIndex++;
    }
    if (!(product.colour in colors)) {
      colors[product.colour] = colorIndex++;
    }
  });
}

export function initializeMappings(products) {
  createMappings(products);
}

export function getFeatureVector(product) {
  return [
    // categories[product.categoryId],
    brands[product.brandName],
    // product.price.current.value,
    colors[product.colour],
  ];
}
