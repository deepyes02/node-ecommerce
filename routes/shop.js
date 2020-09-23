const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

//import the products so they can display here from admin
const adminData = require('./admin');

//exact matching
router.get("/", (req, res) => {
    console.log(adminData.products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});
//404 handling
router.use("/", (req, res) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'));
})

module.exports = router;