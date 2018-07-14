define(function(require,exports,module){
	function ajax(config){
	    var xhr=createXHR();
	    xhr.onreadystatechange = function(){
	        if(xhr.readyState==4){
	            if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
	                var data=xhr.responseText;
	                // 成功
	                config.success&&config.success(data);
	            }else {
	                // 失败
	                config.error&&config.error(xhr.status);
	            }
	        }
	    };
	    // 传送的数据串
	    var sendData;
	    // 存放数据的数组
	    var arr=[];
	    if(config.data!=undefined){
	        for(var key in config.data){
	            arr.push(key+"="+config.data[key]);
	        }
	    }
	    if(arr.length>1){
	        sendData=arr.join("&");
	    }else {
	        sendData=arr[0];
	    }
	    if(config.method.toLowerCase()=="get"){
	        xhr.open('get',config.url+'?'+sendData,true);
	        // 解决超时问题
	        xhr.timeout=1000;
	        xhr.ontimeout = function(){
	            alert("超时");
	        }
	        xhr.send(null);
	    }else if(config.method.toUpperCase()=='post'){
	        xhr.open('post',config.url);
	        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	        xhr.timeout=1000;
	        xhr.ontimeout = function(){
	            alert("超时");
	        }
	        console.log(sendData);
	        xhr.send(sendData);
	    }

	    // 拿到ajax的对象
	    function createXHR(){
	        if(typeof XMLHttpRequest!="undefined"){
	            return new XMLHttpRequest();
	        }else if(typeof ActiveXObject!="undefined"){
	            if(typeof arguments.callee.activeXString!="string"){
	                // 兼容到IE7之前的版本
	                var versions=['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'];
	                for(var i=0,len=versions.length;i<len;i++) {
	                    try{
	                        new ActiveXObject(versions[i]);
	                        arguments.callee.activeXString=versions[i];
	                        break;
	                    }catch(ex){
	                        throw new Error();
	                    }
	                }
	            }
	            // 兼容IE
	            return new ActiveXObject(arguments.callee.activeXString);
	        }else {
	            throw new Error("No XHR object available");
	        }
	    }
	}
	//cors解决跨域
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
	module.exports = {
		ajax: ajax,
		cors: cors
	};
})