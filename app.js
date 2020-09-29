const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const db = require('./util/database');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// db.execute(`SELECT * FROM products`)
// .then(([rows,fieldData])=>{
//     console.log(rows)
// }).catch(err=>{console.log(err)})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const port = 8000;
app.listen(port, () => {
    console.info(`Server listening on port: ${port}`)
});