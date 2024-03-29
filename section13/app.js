require('dotenv').config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { name } = require('ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('645020a8ad647a7f84750405').then(user => {
        req.user = user;
        next();
    })
    .catch(error => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongose
.connect(`mongodb+srv://${process.env.MONGO_USER_ID}:${process.env.MONGO_USER_KEY}@cluster0k.9ykabat.mongodb.net/shop?retryWrites=true&w=majority`)
.then(result => {
    User.findOne().then(user =>{
        if(!user) {
            const user = new User({
                name: 'Kanji',
                email: 'kanjih@ciandt.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
   
    app.listen(3000);
})
.catch(error => console.log(error));


