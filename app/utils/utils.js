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
    console.log('请求path：',url+params)
    var request = http.request(options,function(res){
        res.on('data',(chunk)=>{

            console.log('外部接口返回值',chunk)
            callback(JSON.parse(chunk));
        });
        res.on('end',()=>{
            console.log('响应中已无数据');
        })
    });
    //发送这个请求
    request.end();
};
outPut.http_post = function(ip,port,url,reqData,callback){
    const postData = querystring.stringify(reqData);
    console.log('ip,port,url,reqData',ip,port,url,reqData)
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
        res.on('data', (chunk) => {
            callback(chunk);
        });
        res.on('end', () => {
            console.log('响应中已无数据');
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



