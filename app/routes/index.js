var express = require('express');
var fs = require('fs');
var router = express.Router();
var request = require('../utils/utils');
var multer  = require('multer');
var baiduAiImg = require('../utils/baiduAiImg');


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
  var des_file = "./upload/" + req.files[0].originalname;
  var base64Str = '';
  var imgSize = 0
  // fs.statAsync(req.files[0].path+'/'+req.files[0].originalname,function(err,stats){
  //   imgSize = stats.size;
  //   console.log('文件大小in',imgSize);
  // });
  // console.log('文件大小out',imgSize);
  fs.readFile( req.files[0].path, 'base64', function (err, data) {
      //将文件写入文件夹
      // fs.writeFile(des_file, data, function (err) {
      //     if( err ){
      //         console.log( err );
      //     }else{
      //       // console.log('new reader');
      //       // var reader = new FileReader();
      //       // reader.readAsDataURL(req.files[0]);
            
      //       // reader.onload = function(e){
      //       //   base64Str = this.result
      //       // }

      //       // console.log(base64Str);
      //       res.end(
      //         JSON.stringify({
      //             message:'File uploaded successfully',
      //             filename:req.files[0].originalname,
      //             src:''
      //         })
      //       );
      //     }
      // });
      
      //给百度ai发请求
      baiduAiImg(data,function(result){
        res.end(result);
      },function(err){
        console.log('请求百度接口发生错误',err);
      })
  });
  

  //res.json({code:1,msg:'success'})
})

module.exports = router;
