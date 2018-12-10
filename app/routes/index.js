var express = require('express');
var router = express.Router();
var request = require('../utils/utils');
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log('get request',req.url);
  //res.json({header:req.headers});
  request.http_get('127.0.0.1','3000','/users',req.url,function(a){
    console.log('a',a);
    res.json(a);
  });
});

router.get('/getTodayEvent',function(req,res,next){
  request.http_get('http://api.juheapi.com','80','/japi/toh','/?v=1&month='+req.query.month+'&day='+ req.query.day +'&key=b0cd572a71f616b066ba189cb5fc3954',function(data){
    console.log('其他接口取回来的数据 data',data);
    res.json(data);
  });
})

module.exports = router;
