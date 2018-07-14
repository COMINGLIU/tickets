// function cors(method,url,callback) {
//     var request = createCorsRequest(method,url);
//     if(request) {
//         request.onload = function(){
//             var data = request.responseText;
//             // 进行操作
//             callback&&callback(data);
//         };
//         request.timeout=1000;
//         request.ontimeout = function(){
//             alert("超时");
//         };
//         request.onerror =function(){
//             alert('通信失败');
//         };
//         request.send();
//     }
//     function createCorsRequest(method,url){
//         var xhr = new XMLHttpRequest();
//         //判断XHR是否支持CORS
//         if('WithCredentials' in xhr){
//             xhr.open(method,url,true);
//         // 兼顾IE浏览器
//         }else if(typeof XDomainRequest!='undefined'){
//             xhr = new XDomainRequest();
//             xhr.open(method,url);
//         }else {
//             xhr = null;
//         }
//         return xhr;
//     }
// }
/*
config={
    url:
    data:
    method:
    error:
    success:
}
*/
function cors(config){
    var dataArr = [];
    var urlReq;
    for(var key in config.data){
        dataArr.push(key+"="+config.data[key]);
    }
    if(dataArr.length>1){
        urlReq=config.url+"?"+dataArr.join("&");
    }else {
        urlReq=config.url+"?"+dataArr[0];
    }
    console.log(urlReq);
    var request = createCorsRequest(config.method,urlReq);
    console.log(request);
    if(request){
        request.onload = function(){
            var res = request.responseText;
            config.success&&config.success(res);
        };
        request.ontimeout = 2000;
        request.ontimeout = function(){
            config.error&&config.error();
        }
        request.send();
    }
    function createCorsRequest(method,urlReq){
        var xhr = new XMLHttpRequest();
        console.log(xhr);
        //判断XHR是否支持CORS
        if('WithCredentials' in xhr){
            xhr.open(method,urlReq,true);
            console.log("111");
        // 兼顾IE浏览器
        }else if(typeof XDomainRequest!='undefined'){
            console.log(222);
            xhr = new XDomainRequest();
            xhr.open(method,urlReq);
        }else {
            xhr = null;
        }
        return xhr;
    }
}
