const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'node_udemy',
    'root',
    '736852',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;