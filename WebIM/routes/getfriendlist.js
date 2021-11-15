var express = require('express');
var router = express.Router();
const stringRandom = require('string-random');

var connection = require('../database/connect');

/* GET getfriendlist listing. */
router.post('/', function (req, res, next) {

    let reqData = req.body;
    console.log(reqData);

    let sql = 'select uid from user where token = ?';
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

            sql = 'select * from friend where uid1 = ? or uid2 = ?';
            para = [result[0].uid, result[0].uid];
            connection.query(sql, para, function (err, result2) {
                if (err) {
                    res.send(err.message);
                    return;
                }
                res.send({
                    code: 200,
                    msg: 'get friend list success',
                    data: result2
                });
            });
        }
    });

});

module.exports = router;
