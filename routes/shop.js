const express = require('express');
const router = express.Router();

//import the products so they can display here from admin
const shopController = require('../controllers/shop');

//exact matching
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);
router.get("/cart", shopController.getCart);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);

module.exports = router;