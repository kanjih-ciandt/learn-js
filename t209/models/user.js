// const mongodb = require('mongodb');
// const getDB = require('../util/database').getDb;

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email; 
//     this.cart = cart; // {items: []};
//     this._id = id;
//   }

//   save() {
//     const db = getDB();
//     let dbOp;
//     if(this._id) {
//       dbOp = db.collection('users')
//       .updateOne({_id: this._id}, {$set: this});
//     } else {
//       dbOp = db.collection('users').insertOne(this);
      
//     }
//     return dbOp.then(result => {
//       console.log(result);
//     }).catch(err => console.log(err));
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     let newQuantity = 1;
//     const updatedCartItems =  [...this.cart.items];

//     if(cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity: newQuantity});
//     }
//     const updatedCart = {items: updatedCartItems};

//     const db = getDB();
//     return db
//       .collection('users')
//       .updateOne(
//         {_id: new mongodb.ObjectId(this._id)}, 
//         {$set: {cart: updatedCart}}
//       );
    
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(item => {
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDB();
//     return db
//       .collection('users')
//       .updateOne(
//         {_id: new mongodb.ObjectId(this._id)},
//         {$set: {cart: {items: updatedCartItems}}}
//       );
//   }

//   getCart() {
//     const db = getDB();

//     return db
//       .collection('products')
//       .find({_id: {$in: this.cart.items.map(i => i.productId)}}).toArray()
//       .then( products => {
//         return products.map(p => {
//           return {
//             ...p, 
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//           }).quantity
//           };
//         });
//       }).catch(error => console.log(error));
//   }

//   addOrder() {
//     const db = getDB();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name,
//             email: this.email
//           }
//         }
//         return db.collection('orders').insertOne(order);
//       }).then(result => {
//         this.cart = {items: []};
//         return db.collection('users')
//         .updateOne(
//           {_id: new mongodb.ObjectId(this._id)},
//           {$set: {cart: {items: []}}}
//         );
//       }).catch(error => console.log(error));
//   }

//   getOrders() {
//     const db = getDB();
//     return db.collection('orders').find({'user._id': new mongodb.ObjectId(this._id)}).toArray();
//   }

//   static findById(userId) {
//     const db = getDB();
//     return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)}).then(user => { 
//       console.log(user);
//       return user
//     }).catch(error => console.log(error));
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db.collection('users').find().toArray().then(users => {
//       console.log(users);
//       return users;
//     }).catch(error => console.log(error));
//   }
// }

// module.exports = User;