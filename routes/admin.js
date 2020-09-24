const path = require('path');
const express = require("express");
const router = express.Router();
const rootDir = require('../util/path');

const products = [];

router.get("/add-product", (req, res) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
});

router.post("/add-product", (req, res, next) => {
    products.push({ title: req.body.title });
    console.log(products);
    res.redirect("/");
});

// module.exports = router;
exports.routes = router;
exports.products = products;