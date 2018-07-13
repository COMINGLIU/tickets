function cors(method,url,callback) {
    var request = createCorsRequest(method,url);
    if(request) {
        request.onload = function(){
            var data = request.responseText;
            // 进行操作
            callback&&callback(data);
        };
        request.timeout=1000;
        request.ontimeout = function(){
            alert("超时");
        };
        request.onerror =function(){
            alert('通信失败');
        };
        request.send();
    }
    function createCorsRequest(method,url){
        var xhr = new XMLHttpRequest();
        //判断XHR是否支持CORS
        if('WithCredentials' in xhr){
            xhr.open(method,url,true);
        // 兼顾IE浏览器
        }else if(typeof XDomainRequest!='undefined'){
            xhr = new XDomainRequest();
            xhr.open(method,url);
        }else {
            xhr = null;
        }
        return xhr;
    }
}
