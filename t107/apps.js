const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouters = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const systemController = require('./controllers/system');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',adminRouters);
app.use(shopRoutes);


app.use(systemController.pageNotFound);

app.listen(3000);