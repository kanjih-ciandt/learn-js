const mongodb = require('mongodb');
const getDB = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email; 
    this.cart = cart; // {items: []};
    this.__id = id;
  }

  save() {
    const db = getDB();
    let dbOp;
    if(this._id) {
      dbOp = db.collection('users')
      .updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db.collection('users').insertOne(this);
      
    }
    return dbOp.then(result => {
      console.log(result);
    }).catch(err => console.log(err));
  }

  addToCart(product) {
    // const cartProductIndex = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id;
    // });
    product.quantity = 1;
    const updatedCartItems = {items: [{... product, quantity: 1}]};
    const db = getDB();
    return db
      .collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)}, 
        {$set: {cart: updatedCartItems}}
      );
    
  }

  static findById(userId) {
    const db = getDB();
    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)}).then(user => { 
      console.log(user);
      return user
    }).catch(error => console.log(error));
  }

  static fetchAll() {
    const db = getDB();
    return db.collection('users').find().toArray().then(users => {
      console.log(users);
      return users;
    }).catch(error => console.log(error));
  }
}

module.exports = User;