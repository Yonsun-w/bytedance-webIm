import { conn } from '../db/config.js';

let user = {
    select: (username, callback) => {
        let sql = `select * from user where username = '${username}';`
        conn.query(sql, (err, res) => {
            if (err) {
                callback(err)
            } else {
                callback(res)
            }
        })
    },

    insert: (username, passwd, create_time, callback) => {
        let uuid = 'u' + new Date().getTime();
        let sql = `insert into user(username, passwd, UUID, create_time) values ('${username}', '${passwd}', '${uuid}', '${create_time}')`;
        conn.query(sql, (err, res) => {
            callback(err, res);
        })
    }
}

export {user}