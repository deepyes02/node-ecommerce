const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_udemy',
    password: '736852'
});

//upload the pool as promises
module.exports = pool.promise(); 