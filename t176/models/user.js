const mongodb = require('mongodb');
const getDB = require('../util/database').getDb;

class User {
  constructor(username, email) {
    this.name = username;
    this.email = email; 
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

  static findById(userId) {
    const db = getDB();
    return db.collection('users').findOne({_id: new mongodb.ObjectId(userId)});
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