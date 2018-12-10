var express = require('express');
var router = express.Router();
var request = require('../utils/utils');

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

module.exports = router;
