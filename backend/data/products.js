const fs = require("node:fs/promises");

async function getProducts() {
  const products = await fs.readFile('store/products.json', 'utf8');

  return JSON.parse(products);
}

exports.getProducts = getProducts;
