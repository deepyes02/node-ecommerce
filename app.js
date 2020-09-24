const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _404Controller = require('./controllers/404');

// app.set("view engine", 'pug');
app.set("view engine", "ejs"); //ejs also works out of the box;
app.set("views", 'views') //not necessary this line because pug
    //automatically finds views in views folder by default.
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

//serving static files
app.use(express.static(path.join(__dirname, 'public')));

//admin routes appear as follows
app.use("/admin", adminRoutes);
//shop route, default
app.use(shopRoutes);

//404 handling
app.use("/", _404Controller.get404);

let port = 8000;
app.listen(port, () => {
    console.info(`Server listening on ${port}`)
});