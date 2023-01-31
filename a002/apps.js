const express = require('express');

const app = express();

// app.use('/',(req, res, next) => {
//     console.log('First middleware!');
//     next();
// });


// app.use('/',(req, res, next) => {
//     console.log('Second middleware!');
//     res.send('<h1>Hello from Express!</h1>');
// });

app.use('/users',(req, res, next) => {
    res.send('<h1>Users</h1>');
});


app.use('/',(req, res, next) => {
    res.send('<h1>Home</h1>');
});

app.listen(3000);