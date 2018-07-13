"use strict";

(function (document) {
    var doc = document;
    var oPersonalCenter = doc.querySelector(".personal-center"),
        oWrapper = doc.getElementsByClassName("activities")[0],
        aActivities = oWrapper.getElementsByTagName("li");
    function Main() {
        // 获取主页活动信息
        this.init();
        // 获取用户信息
        this.getUserInfo();
        //点击个人中心
        this.perClick(oPersonalCenter);
    }
    Object.defineProperty(Main.prototype, "constructor", {
        enumerable: false,
        value: Main
    });
    Main.prototype = {
        eleUtil: {
            addHandle: function addHandle(ele, type, fn) {
                if (ele.addEventListener) {
                    ele.addEventListener(type, fn);
                } else if (ele.attachEvent) {
                    ele.attachEvent(ele, "on" + type, fn);
                } else {
                    ele['on' + type] = fn;
                }
            },
            moveHandle: function moveHandle(ele, type, fn) {
                if (ele.removeEventListener) {
                    ele.removeEventListener(type, fn);
                } else if (ele.dettachEvent) {
                    ele.dettachEvent(ele, "on" + type, fn);
                } else {
                    ele['on' + type] = null;
                }
            }
        },
        init: function init() {
            ajax({
                url: "api/index.php/client/activity?page=2&row=3",
                data: { value: "getMain" },
                method: "get",
                error: function error() {
                    alert('通信失败');
                },
                success: function success(data) {
                    console.log(data);
                }
            });
        },
        getUserInfo: function getUserInfo() {
            // main.corsGet('https://openapi.yiban.cn/user/me?access_token=c725e400638ca0e1ecbfa5b3b844d043f2fb3ab0');
            cors("get", 'https://openapi.yiban.cn/oauth/authorize?client_id=test&redirect_uri=http://localhost:8080/sqlBig2.1&state=STATE', function (data) {
                console.log(data);
            });
        },

        perClick: function perClick(obj) {
            this.eleUtil.addHandle(obj, 'touchstart', function () {
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
        Cors: function Cors(methods, url, callback) {
            function createRequest(methods, url) {
                var xhr = new XMLHttpRequest();
                if ("withCredentials" in xhr) {
                    xhr.open(methods, url, true);
                } else if (typeof XDomainRequest != "undefined") {
                    xhr = new XDomainRequest();
                    xhr.open(methods, url);
                } else {
                    xhr = null;
                }
                return xhr;
            }
            var request = createRequest(methods, url);
            if (request) {
                request.onload = function () {
                    var data = request.responseText;
                    callback && callback();
                };
                request.send();
            }
        }
    };
    var main = new Main();
})(document);
