const express = require('express');
const router = express.Router();
// const path = require('path');
// const rootDir = require('../util/path');

//import the products so they can display here from admin
const productController = require('../controllers/products');

//exact matching
router.get("/", productController.getProducts);

module.exports = router;