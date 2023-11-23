const express = require('express');
const {getProducts} = require('../data/products');
const router = express.Router();

router.get('/products', async (req, res, next) => {
  try {
    const products = await getProducts();

    res.json(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
