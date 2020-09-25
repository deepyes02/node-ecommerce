exports.get404 = (req, res) => {
    res.render('custom/404', { pageTitle: '404 Not Found' });
};