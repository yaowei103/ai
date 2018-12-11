var http = require("http");
var outPut = {};
outPut.http_get = function(ip, port, url, params, callback){
    //创建一个http.ClientRequest对象
    var options = {
        host : ip,
        port : port,
        path : url+params,
        method : "GET",
    };
    var request = http.request(options,function(res){
        var buffStr = '';
        res.on('data',(chunk)=>{
            console.log('外部接口返回值',chunk)
            buffStr+=chunk
        });
        res.on('end',()=>{
            console.log('get请求响应中已无数据');
            callback(JSON.parse(buffStr));
        })
    });
    //发送这个请求
    request.end();
};
outPut.http_post = function(ip,port,url,reqData,callback){
    const postData = querystring.stringify(reqData);
    const options = {
        hostname: ip,
        port: port,
        path: url,
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
        }
    };
  
    const req = http.request(options, (res) => {
        console.log(`状态码: ${res.statusCode}`);
        console.log(`响应头: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        var buffStr = ''
        res.on('data', (chunk) => {
            buffStr+=chunk;
        });
        res.on('end', () => {
            console.log('post请求响应中已无数据');
            callback(JSON.parse(buffStr))
        });
    });
    
    req.on('error', (e) => {
        console.error(`请求遇到问题: ${e.message}`);
    });
    
    // 将数据写入到请求主体。
    req.write(postData);
    req.end();
}
module.exports = outPut;



