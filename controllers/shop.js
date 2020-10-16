const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/products'
        });
    }).catch(err => console.log(err));
};

exports.getSingleProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render("shop/product-detail", {
                product: product,
                pageTitle: product.title,
                path: '/singleProduct'
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("/");
        });
}

exports.getCart = (req, res, next) => {
    req.user.getCart()
        .then(products=>{
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
            console.log(products)
        })
        .catch(err => console.log(err))

};

exports.postCart = (req, res, next) => { 
    const prodId = req.body.productId;

    Product.findById(prodId)
    .then(product=>{
        return req.user.addToCart(product);
    })
    .then(result=>{
        res.redirect('/cart')
        console.log(result)
    }).catch(err=>console.log(err));
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user.deleteItemFromCart(prodId)
        .then(result=>{
            res.redirect('/cart')
        }).catch(err=>console.log(err))
    }

exports.getOrders = (req, res, next) => {
    req.user
        .getOrder()
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders
            });
           
        })
   
};

exports.postOrder = (req, res, next) => {
    req.user.postOrder()
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err => console.log(err))
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};
