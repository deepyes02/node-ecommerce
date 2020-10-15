const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

    addToCart(product) {
      let newQuantity = 1;
      let updatedCartItems, updatedCart;
      //for absolutely empty cart, push the first product
      if (!this.cart){
        updatedCartItems = []
        updatedCartItems.push({
          productId: new ObjectId(product._id),
          quantity: newQuantity
        })
        //for at least one product in the cart do this,
        updatedCart = {
          items: updatedCartItems
        };
      } 
      
      else {
          //cartProductIndex returns 0 or above for non-empty products, and -1 if the product is not in the list
          const cartProductIndex = this.cart.items.findIndex(cp=>{
            return cp.productId.toString() === product._id.toString();
          });
          newQuantity = 1;
          updatedCartItems = [...this.cart.items];

          if(cartProductIndex >= 0) { //meaning the product is already in the cart, increase the quantity
                newQuantity = this.cart.items[cartProductIndex].quantity + 1;
                updatedCartItems[cartProductIndex].quantity = newQuantity;
          } else { //meaning the product isn't in the cart and needs to be pushed
              updatedCartItems.push({
                productId: new ObjectId(product._id),
                quantity: newQuantity
              })
          }
          updatedCart = {
            items: updatedCartItems
          };
      }
    

      
      //insert the result into the database
      const db = getDb();
      return db.collection('users').updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => console.log(err));
  }
}


module.exports = User;