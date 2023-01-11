const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const userData = require('./home');

const router = express.Router();



router.get('/users',(req, res, next) => {
    const users = userData.users;
    res.render('users', {users: users, pageTitle: 'User', path: '/users'});
});


module.exports = router;

