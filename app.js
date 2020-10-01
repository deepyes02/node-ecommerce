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



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//define a req.user model to user in the applicaiton
app.use((req,res,next) => {
  User.findByPk(1)
    .then(user=>{
      req.user = user;
    })
    .catch(err=>console.log(err))
    next();
})

//relationship
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize.sync({force:true})
.then(result=>{
  return User.findByPk(1);
})
.then(user=>{
  if(!user){
    return User.create({name: 'deepyes02', email: 'deepyes@outlook.com'})
  }
  return user;
})
.then(() => {
  const port = 8000;
  app.listen(port, () => {
    console.info(`${port}`)
  });
}).catch(err => console.log(err))

