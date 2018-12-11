var express = require('express');
var fs = require('fs');
var router = express.Router();
var request = require('../utils/utils');
var multer  = require('multer');


var upload = multer({dest: 'upload_tmp/'});
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
  request.http_get('api.juheapi.com','','/japi/toh','?v=1&key=b0cd572a71f616b066ba189cb5fc3954&month='+req.query.month+'&day='+ req.query.day,function(data){
    console.log('其他接口取回来的数据 data',data);
    res.json(data);
  });
})

//接受上传的文件
router.post('/clientImg', upload.any(),function(req,res,next){
  console.log('get file upload,host',req.hostname);
  var des_file = "./upload/" + req.files[0].originalname;
  fs.readFile( req.files[0].path, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
          if( err ){
              console.log( err );
          }else{
            response = {
                message:'File uploaded successfully',
                filename:req.files[0].originalname,
                src:''
            };
            console.log( response );
            res.end( JSON.stringify( response ) );
          }
      });
  });

  //res.json({code:1,msg:'success'})
})

module.exports = router;
