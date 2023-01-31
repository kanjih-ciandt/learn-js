const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users',(req, res, next) => {
    res.send('<h1>Users</h1>');
});

app.get('/',(req, res, next) => {
    res.sendFile(path.join(__dirname,'views', 'home.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views', '404.html'));
});

app.listen(3000);