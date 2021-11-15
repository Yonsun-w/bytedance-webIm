var express = require('express');
var router = express.Router();

var connection = require('../database/connect');

/* GET addfriend listing. */
router.post('/', function(req, res, next) {

    let reqData = req.body;
    console.log(reqData);

    let sql = 'select * from user where token = ?';
    let para = [reqData.token];

    connection.query(sql, para, function (err, result) {
        if (err) {
            res.send(err.message);
            return;
        }
        if (result == '') {
            res.send({
                code: 201,
                msg: 'token does not exists',
            });
        } else {
            //console.log(result[0]);

            if (result[0].uid == reqData.uid1) {
                sql = 'insert into friend values(?, ?)';
                para = [reqData.uid1, reqData.uid2];
                connection.query(sql, para, function (err, result) {
                    if (err) {
                        res.send(err.message);
                        return;
                    } else {
                        res.send({
                            code: '200',
                            msg: 'add friend success'
                        });
                    }
                });

            }else {
                res.send({
                    code: '201',
                    msg: 'token does not match uid1'
                });
            }
        }
    });



});

module.exports = router;
