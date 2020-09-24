const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", 'pug');
app.set("views", 'views') //not necessary this line because pug
    //automatically finds views in views folder by default.
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

//serving static files
app.use(express.static(path.join(__dirname, 'public')));

//importing proper routes in proper order is necessary.
app.use("/admin", adminData.routes);
app.use(shopRoutes);

//404 handling
app.use("/", (req, res) => {
    // res.sendFile(path.join(rootDir, 'views', '404.html'));
    res.render('404', { pageTitle: '404 Not Found' });
})

app.listen(8000);