const mongodb = require('mongodb');
const getDB = require('../util/database').getDb;


class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(){
    const db = getDB();
    return db.collection('products').insertOne(this).then(result => {
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
}

module.exports = Product;