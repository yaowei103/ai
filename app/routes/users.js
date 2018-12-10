var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    resId:111,
    users:[
      {id:11,name:'John',age:12},
      {id:22,name:'Tom',age:13},
    ]
  });
});

router.get('/getTodayEvent',function(req,res,next){
  
})

module.exports = router;
