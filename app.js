const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
//import models
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//define a req.user model to user in the applicaiton
app.use((req,res,next) => {
  User.findByPk(1)
    .then(user=>{
      req.user = user;
      next();
    })
    .catch(err=>console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//relationship
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize.sync()
.then(result=>{
  return User.findByPk(1);
})
.then(user=>{
  if(!user){
    return User.create({name: 'deepyes02', email: 'deepyes@outlook.com'})
  }
  return user;
})
.then(user=>{
  return user.createCart();
})
.then(() => {
  const port = 8000;
  app.listen(port, () => {
    console.info(`${port}`)
  });
}).catch(err => console.log(err))
