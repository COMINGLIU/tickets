(function(document){
    var doc = document;
    var oPersonalCenter= doc.querySelector(".personal-center");
    function Main() {
        // 获取主页活动信息
        // this.init();
        // 获取用户信息
        // this.getUserInfo();
        //点击个人中心
        this.perClick(oPersonalCenter);
    }
    // 引入module.js模块中的ajax方法config={ajax:f,cors:f}
    seajs.use('./commonJs/module.js',function(config){
        console.log(config);
        var oWrapper = doc.getElementsByClassName("activities")[0],
            aActivities = oWrapper.getElementsByTagName("li"),
            aActImgs = oWrapper.getElementsByTagName("img"),
            aTitles = oWrapper.getElementsByTagName("h3"),
            aTime = oWrapper.getElementsByTagName("span");
        // 直接渲染缓存的数据
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
            config.ajax({
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
                        // 缓存数据
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
    })
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
            /*
            *client_id:应用appkey    ————(必填)
            *redirect_uri:应用回调地址（站内应用填写站内地址）————（必填）
            *state：防跨站伪造参数，重定向回应用端时会带上此参数。也可用于记录应用端自定义的功能标示（避免使用“? = &”等特殊字符）——选填
            *eg: https://openapi.yiban.cn/oauth/authorize?client_id=test&redirect_uri=http://back&state=STATE
            *打开授权页面
            *同意授权后重定向
            *http://back?code=CODE&state=STATE  非站内应用、轻应用
            *站内应用、轻应用则直接重定向至站内地址或回调地址，接收state参数与其应用类型特有的verify_request参数方式一致
            */ 
            cors({
                url: 'https://openapi.yiban.cn/oauth/authorize',
                method:'get',
                data: {
                    client_id: 'sdc',
                    redirect_uri: "http://localhost/sqlBig2Web/web/index.html",
                    state:'sdc'
                },
                error: function(){
                    alert('请求失败');
                },
                success: function(res){
                    console.log(res);
                }
            })
            // main.corsGet('https://openapi.yiban.cn/user/me?access_token=c725e400638ca0e1ecbfa5b3b844d043f2fb3ab0');
            // cors("get",'https://openapi.yiban.cn/oauth/authorize?client_id=test&redirect_uri=http://localhost:8080/sqlBig2.1&state=STATE',function(data){
                // console.log(data);
            // });
        },
        perClick: function(obj) {
            this.eleUtil.addHandle(obj,'touchstart',function() {
                window.location.href = "info.html";
            });
        }
    };
    var main = new Main();
})(document);