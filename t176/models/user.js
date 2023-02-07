const mongodb = require('mongodb');
const getDB = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email; 
    this.cart = cart; // {items: []};
    this._id = id;
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
    const cartProductIndex = this.cart ? this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    }) : -1;
    let newQuantity = 1;
    const updatedCartItems = cartProductIndex == -1 ? [] : [...this.cart.items];

    if(cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity});
    }
    const updatedCart = {items: updatedCartItems};

    const db = getDB();
    return db
      .collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)}, 
        {$set: {cart: updatedCart}}
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