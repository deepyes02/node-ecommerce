const express = require("express");

const router = express.Router();

router.get("/add-product", (req,res)=> {
    res.send(`<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></input></form>`);
});

router.post("/product", (req,res,next)=> {
    console.log(req.body);
    res.redirect("thank-you");
});

module.exports = router;