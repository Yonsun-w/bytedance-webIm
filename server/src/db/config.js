import mysql from 'mysql2';
import { config } from '../config';

const conn = mysql.createConnection({
    host: config.host,
    user: config.username,
    database: config.database,
    password: config.password,
    port: config.port
});

export { conn }