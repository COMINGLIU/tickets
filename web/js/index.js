(function(document){
    var doc = document;
    var oPersonalCenter= doc.querySelector(".personal-center");
    function Main() {
        // 获取主页活动信息
        this.init(1);
        // 获取用户信息
        // this.getUserInfo();
        // 上拉刷新
        // this.upFresh();
        // 上移
        this.clickAddMore();      
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
        init: function(pageN){
            var oSection = doc.getElementsByTagName("section")[0],
                aWrappers = doc.getElementsByClassName("activities"), 
                oWrapper = doc.getElementsByClassName("activities")[0],
                aActivities = oWrapper.getElementsByTagName("li"),
                aActImgs = oWrapper.getElementsByTagName("img"),
                aTitles = oWrapper.getElementsByTagName("h3"),
                aTime = oWrapper.getElementsByTagName("span"),
                freshInfo = doc.getElementById("fresh"),
                frag = doc.createDocumentFragment();
            // if(window.sessionStorage.getItem('act'+pageN)){
            //     console.log('有缓存');
            //     var res = JSON.parse(window.sessionStorage.getItem('act'+pageN));
            //     console.log(res);
            //     // 执行渲染数据
            //     renderData(res);
            // }else {
                ajax({
                    url:"../api/index.php/client/activity",
                    data:{"page":pageN},
                    method: "get",
                    error: function(status){
                        alert('通信失败'+status);
                    },
                    success: function (res){
                        var res = JSON.parse(res);
                        console.log(res);
                        // 执行渲染数据
                        renderData(res);
                    }
                });
            // }
            // 渲染数据的函数
            function renderData(res){
                if(res["status"]=="success"){
                    var data = res["data"];
                    console.log(data);
                    if(data.toString()=="") {
                        console.log('没有了');
                        confirm('暂无其他活动啦，感谢关注哦!');                                
                    }else {
                        // 缓存每一项的数据
                        window.sessionStorage.setItem('act'+pageN,JSON.stringify(data));
                        // 缓存当前页数
                        window.sessionStorage.setItem('page',pageN);
                        // 渲染数据
                        console.log("data.length="+data.length);
                        if (pageN==1){
                            for(var j=0,len=data.length;j<len;j++) {
                                // aActImgs[j].src=data[j].imageName[0];
                                aTitles[j].innerHTML = data[j].actName;
                                aTime[j].innerHTML = data[j].actStart+"——"+data[j].actEnd;
                                (function(j){
                                    aActivities[j].onclick = function(e){
                                        e.stopPropagation();
                                        window.location.href="detail.html?id="+data[j].id;
                                    }
                                    // 用封装的tap模拟click事件
                                    // TouchSim(aActivities[j]).tap(function(e){
                                    //     window.location.href="detail.html?id="+data[j].id;
                                    // })
                                })(j)
                            }
                        }else {
                            var oUl = document.createElement('ul');
                            oUl.className = "activities";
                            for(var d=0,lenData=data.length;d<lenData;d++) {
                                var item = document.createElement('li');
                                item.innerHTML = '<img src="" alt="" width="100%" height="100%"><h3></h3><p><em></em><span></span></p>';
                                frag.appendChild(item);
                            }
                            oUl.appendChild(frag);
                            oSection.appendChild(oUl);
                            var topNode = document.createElement("p");
                            topNode.id = "addMore";
                            topNode.innerHTML = "点击加载更多";
                            oSection.appendChild(topNode);
                            topNode.ontouchstart = function(e){
                                console.log('加载更多');
                                e.stopPropagation();
                                Main.prototype.init(parseInt(window.sessionStorage.getItem("page"))+1);
                                topNode.ontouchstart = null;
                                // 删除上一个‘加载更多’节点
                                oSection.removeChild(document.getElementById("addMore"));
                            };
                            // 渲染新数据
                            aActImgs = aWrappers[pageN-1].getElementsByTagName("img");
                            aTitles = aWrappers[pageN-1].getElementsByTagName("h3");
                            aTime = aWrappers[pageN-1].getElementsByTagName("span");
                            for(var j=0,len=data.length;j<len;j++) {
                                // aActImgs[j].src=data[j].imageName[0];
                                aTitles[j].innerHTML = data[j].actName;
                                aTime[j].innerHTML = data[j].actStart+"——"+data[j].actEnd;
                                aActivities[j].id=data[j].id;
                                // 给新节点绑定点击事件
                                (function(j){
                                    console.log(aActivities[j]);
                                    aActivities[j].ontouchstart = function(){
                                        console.log('click'+this);
                                        window.location.href="detail.html?id="+this.id;
                                    }
                                    // 用封装的tap模拟click事件
                                    // TouchSim(aActivities[j]).tap(function(e){
                                    //     window.location.href="detail.html?id="+data[j].id;
                                    // })
                                })(j)
                            }
                        }
                        // 把更新消息去掉
                        if(freshInfo){
                            freshInfo.innerHTML = "";
                        }
                        window.sessionStorage.setItem("page",pageN);
                    }
                }else{
                    alert(res['message']+res['status']);
                }
            }
        },
        upFresh: function(){
            var startPos = 0,
                transitionHeight =0,
                freshInfo = doc.getElementById("fresh"),
                item = doc.getElementsByTagName("section")[0];
            item.addEventListener('touchstart',function(e){
                e.stopPropagation();
                console.log('start');
                startPos = e.touches[0].pageY;
                item.style.position = "relative";
                item.style.transition = 'transform 0s';
            },false);
            item.addEventListener('touchmove',function(e){
                e.stopPropagation();
                transitionHeight = e.touches[0].pageY - startPos;
                // console.log(transitionHeight);
                if(transitionHeight>1&&transitionHeight<60){
                    freshInfo.innerHTML = "下拉刷新";
                    item.style.transform = 'translateY('+transitionHeight+'px)';
                    if(transitionHeight>55){
                        freshInfo.innerHTML = "释放更新";
                    }
                }
            },false);
            item.addEventListener('touchend',function(e){
                e.stopPropagation();
                var obj = document.getElementById("addMore");
                var oSection = doc.getElementsByTagName("section")[0];
                item.style.transform = "transform 0.5s ease 1s";
                item.style.transform = 'translateY(0px)';
                freshInfo.innerHTML = '更新中';
                // 发送亲求拉数据
                var pageN = parseInt(window.sessionStorage.getItem("page"));
                console.log(pageN);
                this.init(pageN+1);
                if(obj){
                    oSection.removeChild(obj);    
                }
            }.bind(this))
        },
        clickAddMore: function(){
            var obj = document.getElementById("addMore");
            var oSection = doc.getElementsByTagName("section")[0];
            obj.ontouchstart = function(e){
                e.preventDefault();
                this.toTop();
                this.init(parseInt(window.sessionStorage.getItem("page"))+1);
                oSection.removeChild(obj);
            }.bind(this);
        },
        toTop: function(distance){
            console.log('上移');
            var main = document.documentElement;
            if(main.scrollTop>0) {
                main.scrollTop-=distance;
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