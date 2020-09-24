const Product = require('../models/products');
exports.getAddProduct = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res) => {
    const products = Product.fetchAll();
    res.render('shop', {
        prods: products,
        pageTitle: "My Shop",
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCss: true
    });
};