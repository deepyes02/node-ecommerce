const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

//import the products so they can display here from admin
const adminData = require('./admin');

//exact matching
router.get("/", (req, res) => {
    console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html')); //for connecting html
    const products = adminData.products;
    res.render('shop', { prods: products, pageTitle: "My Shop" }); //shortcut that connects to pug easily
});

module.exports = router;