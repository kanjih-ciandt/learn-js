const path = require('path');
const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./user');

const router = express.Router();

const users = [];

router.get('/',(req, res, next) => {
    res.render('home', {users: users, pageTitle: 'Home', path: '/'});
});

router.post('/',(req, res, next) => {
    users.push({name: req.body.name});
    res.redirect('/users');
});


exports.routes = router;
exports.users = users;