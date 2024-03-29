const mongodb = require('mongodb');
const getDB = require('../util/database').getDb;


class Product {
  constructor(title, imageUrl, description, price, id, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId ? new mongodb.ObjectId(userId) : null;
  }

  save(){
    const db = getDB();
    let dbOp;
    if(this._id) {
      dbOp = db.collection('products')
      .updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db.collection('products').insertOne(this);
      
    }
    return dbOp.then(result => {
      console.log(result);
    }).catch(err => console.log(err));
    

  }

  static fetchAll(){
    const db = getDB();
    return db.collection('products').find().toArray().then(products => {
      console.log(products);
      return products;
    }).catch(error => console.log(error));
  }

  static findById(prodId){
    const db = getDB();
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next().then(product => {
      console.log(product);
      return product;
    }).catch(error => console.log(error));
  }

  static deleteById(prodId){
    const db = getDB();
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)}).then(result => {
      console.log('Deleted');
    }).catch(error => console.log(error));
  }
}

module.exports = Product;