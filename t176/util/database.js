const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'my-super-pw', {dialect: 'mysql', host: '127.0.0.1'});

module.exports = sequelize;