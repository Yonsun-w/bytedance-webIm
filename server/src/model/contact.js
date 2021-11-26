import {
    conn
} from '../db/config.js';

let contact = {
    find: (username, callback) => {
        let sql = `select * from contact where username1 = '${username}';`

        conn.query(sql, (err, res) => {
            if (err) {
                callback(err)
            } else {
                if (!res[0]) {
                    callback(null)
                }
                //console.log(res)
                let len = res.length
                let arr = new Array(len)
                let i = 0
                for (var index in res) {
                    let username2 = res[index].username2
                    console.log(username2)
                    let sql2 = `select * from user where username = '${username2}';`
                    conn.query(sql2, (err, result2) => {
                        if (err) throw err;
                        arr[i] = result2[0]
                        i++
                        if (i == len) {
                            callback(arr)
                        }
                    })
                }
            }
        })
    },

    insert: (username1, username2, createtime, callback) => {
        let sql = `insert into contact(username1, username2,createtime) values ('${username1}', '${username2}','${createtime}')`;
        conn.query(sql, (err, res) => {
            if (err) {
                callback(err)
            } else {
                let sql2 = `select * from contact where username1 = '${username1}';`
                conn.query(sql2, (err, res) => {
                    if (err) {
                        callback(err)
                    } else {
                        if (!res[0]) {
                            callback(null)
                        }
                        console.log(res)
                        let len = res.length
                        let arr = new Array(len)
                        let i = 0
                        for (var index in res) {
                            let username = res[index].username2
                            console.log(username)
                            let sql4 = `select * from user where username = '${username}';`
                            conn.query(sql4, (err, result2) => {
                                if (err) throw err;
                                arr[i] = result2[0]
                                i++
                                if (i == len) {
                                    callback(arr)
                                }
                            })
                        }
                    }
                })




            }
        })
    },
}



export {
    contact
}
