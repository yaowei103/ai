var baiduAipSdk = require('baidu-aip-sdk');

var AipImageClassifyClient = baiduAipSdk.imageClassify;

// 设置APPID/AK/SK
var APP_ID = "15122342";
var API_KEY = "11RgLBtHv4nt2dxL5b0HewFz";
var SECRET_KEY = "cE7Kn6i9Vr49B6ZzCpQLTM0NH5QqlDis";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);


//设置全局参数
// var HttpClient = baiduAipSdk.HttpClient;

// // 设置request库的一些参数，例如代理服务地址，超时时间等
// // request参数请参考 https://github.com/request/request#requestoptions-callback
// HttpClient.setRequestOptions({timeout: 5000});

// // 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// // 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// // request参数请参考 https://github.com/request/request#requestoptions-callback
// HttpClient.setRequestInterceptor(function(requestOptions) {
//     // 查看参数
//     console.log(requestOptions)
//     // 修改参数
//     requestOptions.timeout = 5000;
//     // 返回参数
//     return requestOptions;
// });

var baiduAiImg = function(image,success,error){
    // 如果有可选参数，没有option就可以在下边方法中直接去掉option
    var options = {};
    options["baike_num"] = "5";

    // 带参数调用通用物体识别
    client.advancedGeneral(image, options).then(function(result) {
        success(JSON.stringify(result));
    }).catch(function(err) {
        // 如果发生网络错误
        error(err);
    });
}

module.exports = baiduAiImg;
