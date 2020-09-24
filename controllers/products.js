exports.getAddProduct = (req, res) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};
const products = [];
exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    console.log(products);
    res.redirect("/");
};

exports.getProducts = (req, res) => {
    res.render('shop', {
        prods: products,
        pageTitle: "My Shop",
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCss: true
    });
};