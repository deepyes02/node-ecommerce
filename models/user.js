const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, id){
    this.name = username;
    this.email = email;
    this._id = id ? new mongodb.ObjectID(id):null;
  }

  save(){
    return null;
  }

  static findById(userId) {
    const db = getdb();
    return db.collection('users').find({_id: new mongodb.ObjectId(id)})
    .next()
    .then(user=>{
      return user
    })
    .catch(err=>console.log(err));
  }
}


module.exports = User;