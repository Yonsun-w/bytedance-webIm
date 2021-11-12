const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");
const stringRandom = require('string-random');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'webim'
});

connection.connect();

/*

mysql -u root -p

show databases;

create database webim;

use webim;

show tables;

create table user
(
uid varchar(20) not null primary key,
pwd varchar(20) not null,
uname varchar(20) not null,
ustate varchar(20) not null,
token varchar(64),
tokenend varchar(10)
);

desc user;

select * from user;

insert into user values('louis', '123456', 'myname', '0', '987891341234', '2021-11-11 20:00:00');

create table friend
(
uid1 varchar(20) not null references user(id),
uid2 varchar(20) not null references user(id)
);

 */

//console.log(stringRandom(16));

console.log(Math.floor(Date.now() / 1000)); // ok, second
console.log(Math.floor(Date.now() / 1000 + 3600 * 24)); // ok, second

app.post('/', function (req, res) {
    console.log(req);
});

app.post('/register', function (req, res) {
    let reqData = req.body;
    console.log(reqData);
    let sql = 'insert into user values(?,?,?,?,?,?)';
    let para = [reqData.uid, reqData.pwd, reqData.uname, '0', null, null];

    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send({
                code: 1,
                msg: 'regiser error'
            })
        } else {
            res.send({
                code: 200,
                msg: 'register success'
            })
        }
    });

});

app.post('/login', function (req, res) {
    //res.send('login page');
    let reqData = req.body;
    console.log(reqData);
    //console.log(reqData.uid, reqData.pwd);

    let sql = 'select * from user where uid = ?';
    let para = [reqData.uid];

    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result == '') {
            res.send({
                code: 101,
                msg: 'user does not exists',
            });
        } else {
            //console.log(result[0]);

            if (result[0].pwd == reqData.pwd) {

                sql = 'update user set ustate = ?, token = ?, tokenend = ? where uid = ?';
                para = ['1', stringRandom(64), Math.floor(Date.now() / 1000 + 3600 * 24).toString(), reqData.uid];
                connection.query(sql, para, function (err, result) {

                    sql = 'select * from user where uid = ?';
                    para = [reqData.uid];
                    connection.query(sql, para, function (err, result) {
                        res.send({
                            code: 200,
                            msg: 'login success',
                            data: result[0]
                        });

                    });

                })

            } else {
                res.send({
                    code: 201,
                    msg: 'psw does not match'
                });
            }
        }

    });
});

app.post('/logout', function (req, res) {
    let reqData = req.body;
    console.log(reqData);

    let sql = 'update user set ustate = ?, token = ?, tokenend = ? where uid = ?';
    let para = ['0', null, null, reqData.uid];
    connection.query(sql, para, function (err, result) {

        sql = 'select * from user where uid = ?';
        para = [reqData.uid];
        connection.query(sql, para, function (err, result) {
            res.send({
                code: 200,
                msg: 'logout success',
                data: result[0]
            });

        });

    })
});


app.post('/addfriend', function (req, res) {
    let reqData = req.body;
    console.log(reqData);
    let sql = 'insert into friend values(?, ?)';
    let para = [reqData.uid1, reqData.uid2];
    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        } else {
            res.send({
                code: 200,
                msg: 'add friend success'
            });
        }
    });

});

app.post('/getfriendlist', function (req, res) {
    let reqData = req.body;
    console.log(reqData);
    let sql = 'select * from friend where uid1 = ? or uid2 = ?';
    let para = [reqData.uid, reqData.uid];
    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
        } else {
            res.send({
                code: 200,
                msg: 'get friend list success',
                data: result
            });
        }
    });
})


app.listen(3000);
console.log('app listening: http://localhost:3000/');
