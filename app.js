const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

//serving static files
app.use(express.static(path.join(__dirname, 'public')));

//importing proper routes in proper order is necessary.
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.listen(8000);