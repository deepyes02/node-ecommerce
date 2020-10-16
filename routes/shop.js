const express = require('express');
const shopController = require('../controllers/shop');
const router = express.Router();

//dynamic router comes below the main router. for eg:
// router.get(product/all);
// router.get(product/:id);

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts); //static route comes before

router.get('/products/:productId', shopController.getSingleProduct); //dynamic routes come after

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post("/delete-cart-item", shopController.postCartDeleteProduct);


router.get('/orders', shopController.getOrders);
router.post('/create-order', shopController.postOrder);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;