const connect = require('mysql');
const connection = connect.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'webim'
});
connection.connect();

module.exports = connection;