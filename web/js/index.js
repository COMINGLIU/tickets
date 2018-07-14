(function(document){
    var doc = document;
    var oPersonalCenter= doc.querySelector(".personal-center");
    function Main() {
        // 获取主页活动信息
        this.init();
        // 获取用户信息
        // this.getUserInfo();
        //点击个人中心
        this.perClick(oPersonalCenter);
    }
    Object.defineProperty(Main.prototype,"constructor",{
        enumerable: false,
        value: Main
    });
    Main.prototype = {  
        eleUtil:{
            addHandle: function(ele,type,fn) {
                if(ele.addEventListener) {
                    ele.addEventListener(type,fn);
                }else if(ele.attachEvent) {
                    ele.attachEvent(ele,"on"+type,fn);
                }else {
                    ele['on'+type] = fn;
                }
            },
            moveHandle: function(ele,type,fn){
                if(ele.removeEventListener) {
                    ele.removeEventListener(type,fn);
                }else if(ele.dettachEvent) {
                    ele.dettachEvent(ele,"on"+type,fn);
                }else {
                    ele['on'+type] = null;
                }
            }
        },
        init: function(){
            oWrapper = doc.getElementsByClassName("activities")[0];
            aActivities = oWrapper.getElementsByTagName("li");
            aActImgs = oWrapper.getElementsByTagName("img");
            aTitles = oWrapper.getElementsByTagName("h3");
            aTime = oWrapper.getElementsByTagName("span");
            if(window.sessionStorage.getItem('actAll')){
                console.log('有缓存');
                var data = JSON.parse(window.sessionStorage.getItem('actAll'));
                // 渲染数据
                if(data.length<aActivities.length){
                    for(var i=data.length,len=aActivities.length;i<len;i++) {
                        oWrapper.removeChild(aActivities[i]);
                    }
                }
                for(var j=0,len=aActivities.length;j<len;j++) {
                    // aActImgs[j].src=data[j].imageName[0];
                    aTitles[j].innerHTML = data[j].actName;
                    aTime[j].innerHTML = data[j].actStart+"——"+data[j].actEnd;
                    (function(j){
                        aActivities[j].onclick = function(){
                            window.location.href="detail.html?id="+data[j].id;
                        }
                        // TouchSim(aActivities[j]).tap(function(e){
                        //     window.location.href="detail.html?id="+data[j].id;
                        // })
                    })(j)
                }
            }else {
                ajax({
                    url:"../api/index.php/client/activity",
                    data:{"page":"1"},
                    method: "get",
                    error: function(status){
                        alert('通信失败'+status);
                    },
                    success: function (res){
                        var res = JSON.parse(res);
                        if(res["status"]=="success"){
                            var data = res["data"];
                            window.sessionStorage.setItem('actAll',JSON.stringify(data));
                            // 渲染数据
                            if(data.length<aActivities.length){
                                for(var i=data.length,len=aActivities.length;i<len;i++) {
                                    oWrapper.removeChild(aActivities[i]);
                                }
                            }
                            for(var j=0,len=aActivities.length;j<len;j++) {
                                // aActImgs[j].src=data[j].imageName[0];
                                aTitles[j].innerHTML = data[j].actName;
                                aTime[j].innerHTML = data[j].actStart+"——"+data[j].actEnd;
                                (function(j){
                                    aActivities[j].onclick = function(){
                                        window.location.href="detail.html?id="+data[j].id;
                                    }
                                    // 用封装的tap模拟click事件
                                    // TouchSim(aActivities[j]).tap(function(e){
                                    //     window.location.href="detail.html?id="+data[j].id;
                                    // })
                                })(j)
                            }
                        }else{
                            alert(res['message']+res['status']);
                        }
                    }
                });
            }
        },
        getUserInfo:function(){
            // main.corsGet('https://openapi.yiban.cn/user/me?access_token=c725e400638ca0e1ecbfa5b3b844d043f2fb3ab0');
            cors("get",'https://openapi.yiban.cn/oauth/authorize?client_id=test&redirect_uri=http://localhost:8080/sqlBig2.1&state=STATE',function(data){
                console.log(data);
            });
        },
        perClick: function(obj) {
            this.eleUtil.addHandle(obj,'touchstart',function() {
                window.location.href = "info.html";
            });
        },
        // actClick: function(obj,actName) {
        //     for(var i=0,len=obj.length;i<len;i++) {
        //         (function(i){
        //             this.eleUtil.addHandle(obj[i],'click',function() {
        //                 window.location.href = "detail/detail.html?value="+actName;
        //             });
        //         }).call(Main.prototype,i);
        //     }
        // },
        Cors: function(methods,url,callback){
            function createRequest(methods,url){
                var xhr = new XMLHttpRequest();
                if("withCredentials" in xhr){
                    xhr.open(methods,url,true);
                }else if(typeof XDomainRequest !="undefined"){
                    xhr = new XDomainRequest();
                    xhr.open(methods,url);
                }else {
                    xhr=null;
                }
                return xhr;
            }
            var request = createRequest(methods,url);
            if(request) {
                request.onload = function() {
                    var data = request.responseText;
                    callback&&callback();
                };
                request.send();
            }
        }
    };
    var main = new Main();
})(document);