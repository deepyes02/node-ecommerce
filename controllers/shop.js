const Product = require('../models/products');


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: "All Products",
            path: '/product-list',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true
        })
    })
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: "Home",
            path: '/shop',
            hasProducts: products.length > 0,
            activeShop: true,
            productCss: true
        })
    })
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: "Your Cart"
    });
}
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: "Your Cart"
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: "Checkout"
    });
}