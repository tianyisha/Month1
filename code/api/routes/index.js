var express = require('express');
var router = express.Router();
var Mongo = require('mongodb-curd');
var db = "Monthready1";
var col = "content";
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.post('/api/getdata', function(req, res, next) {
    let page = req.body.page;
    let pageSize = req.body.pageSize;
    let style = req.body.style;
    let name = new RegExp(req.body.name);
    let key = req.body.key;
    var obj = {};

    if (key == 0) {
        obj = {
            "money": 1
        }

    } else {
        obj = {
            "host": -1
        }

    }

    Mongo.find(db, col, { "style": style }, function(result) {

        if (!result) {
            res.json({
                code: 0,
                msg: "查询失败!"
            })
        } else {
            res.json({
                code: 1,
                msg: "查询成功!",
                data: result
            })
        }
    }, {
        skip: (page - 1) * pageSize,
        limit: pageSize,
        sort: obj
    })



});

module.exports = router;