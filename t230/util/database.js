require('dotenv').config();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const  mongoConnect = (callback) => {
    const uri = `mongodb+srv://${process.env.MONGO_USER_ID}:${process.env.MONGO_USER_KEY}@cluster0k.9ykabat.mongodb.net/shop?retryWrites=true&w=majority`;

    MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
        console.log('connected')
        _db = client.db();
        callback();
    }).catch(err => console.log(err));
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found';
}

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;