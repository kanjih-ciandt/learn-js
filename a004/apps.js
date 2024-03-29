const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const home = require('./routes/home');
const user = require('./routes/user');


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(home.routes);
app.use(user);


app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found', path: ''});
});

app.listen(3000);