const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended:true}));

//importing proper routes in proper order is necessary.
app.use(adminRoutes);
app.use(shopRoutes);

app.listen(8000);