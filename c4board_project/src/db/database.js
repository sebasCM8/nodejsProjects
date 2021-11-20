const mysql = require('mysql');
const { database } = require('./dbconfig');

const { promisify } = require('util');

const pool = mysql.createPool(database);
pool.getConnection((err, conn) => {
    if (err) {
        if (errr.code == 'PROTOCOL_CONNECTION_LOST')
            console.error('DATABASE CONNECTION WAS CLOSED');
        if (err.code == 'ER_CON_COUNT_ERROR')
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        if (err.code == 'ECONNREFUSED')
            console.error('DATABASE CONNECTION WAS REFUSED');
    }
    if (conn) {
        conn.release();
        console.log('DB is conected');
    }
    return;
});

pool.query = promisify(pool.query);
module.exports = pool;