var express = require('express');
var router = express.Router();

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

module.exports = router;
