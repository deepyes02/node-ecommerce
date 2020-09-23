const express = require('express');
const router = express.Router();

//404 handler
router.use("/", (req,res)=> {
    res.send("<h2>Hello from Express</h2>");
});

module.exports = router;