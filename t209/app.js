require('dotenv').config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongose = require('mongoose');

const errorController = require('./controllers/error');

// const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findById('63e2982e654c2b70a8f8648a').then(user => {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//     })
//     .catch(error => console.log(error));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongose
.connect(`mongodb+srv://${process.env.MONGO_USER_ID}:${process.env.MONGO_USER_KEY}@cluster0k.9ykabat.mongodb.net/shop?retryWrites=true&w=majority`)
.then(result => {
    console.log('Connected to MongoDB');
    app.listen(3000);
})
.catch(error => console.log(error));


