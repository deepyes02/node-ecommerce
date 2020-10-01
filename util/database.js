const Sequelize = require('sequelize').Sequelize
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