"use strict";

(function (document) {
    var doc = document;
    var ele = {
        oBack: doc.querySelector("em.back"),
        oRobbe: doc.querySelector(".right h3"),
        oPop: doc.querySelector(".pop"),
        oConfirm: doc.querySelector("button"),
        oName: doc.querySelector("section .bottom h4"),
        oPicture: doc.querySelectorAll("header img"),
        oTime: doc.querySelector("p.time"),
        oDescrib: doc.querySelector(".describ"),
        oRobbed: doc.querySelector("span.yes"),
        oNotRobbed: doc.querySelector("span.no"),
        oDay: doc.querySelector(".day"),
        oHour: doc.querySelector(".hour"),
        oMin: doc.querySelector(".min"),
        oSec: doc.querySelector(".second"),
        aPoints: doc.querySelectorAll("header p i"),
        oSwiperWrapper: doc.querySelector(".swiper-wrapper")
    };
    function Detail() {
        // 初始化，请求数据
        this.init();
        // 回到上一个页面
        this.backTouch(ele.oBack);
        // 点击抢票按钮
        this.robbeClick(ele.oRobbe);
        // 确认抢票信息
        this.confirmClick(ele.oConfirm);
        // 三个小点
        this.checkPoint(ele.oSwiperWrapper, "translate3d");
    }
    Object.defineProperty(Detail.prototype, 'constructor', {
        enumerable: false,
        value: Detail
    });
    Detail.prototype = {
        init: function init() {
            //拉取数据
            var sentData = window.location.search.split("=")[1];
            ajax({
                url: 'xxx',
                data: { value: 'sentData' },
                method: 'get',
                success: function success(data) {
                    // 渲染数据
                    data = JSON.parse(data);
                    console.log(data);
                    ele.oName.innerHTML = data["name"];
                    ele.oTime.innerHTML = data["time"];
                    ele.oDescrib.innerHTML = data["describ"];
                    ele.oRobbed.innerHTML = data["robbed"];
                    ele.oNotRobbed.innerHTML = data["notrobbed"];
                    var deadline = {};
                    //将日期去0转换为十进制
                    deadline.year = parseInt(data["time"].split("年")[0]);
                    deadline.month = parseInt(data["time"].split("月")[0].split("年")[1]);
                    deadline.date = parseInt(data["time"].split("日")[0].split("月")[1]);
                    deadline.hour = parseInt(data["time"].split("日")[1].split("~")[1].split(":")[0]);
                    deadline.min = parseInt(data["time"].split("日")[1].split("~")[1].split(":")[1]);

                    (function () {
                        var time = setInterval(function () {
                            var timeSpan = {};
                            timeSpan.step = new Date(deadline.year, deadline.month - 1, deadline.date, deadline.hour, deadline.min, 0).getTime() - new Date().getTime();
                            timeSpan.dayStep = timeSpan.step / (1000 * 60 * 60 * 24);
                            timeSpan.day = parseInt(timeSpan.dayStep);
                            timeSpan.hourStep = (timeSpan.dayStep - timeSpan.day) * 24;
                            timeSpan.hour = parseInt(timeSpan.hourStep);
                            timeSpan.minStep = (timeSpan.hourStep - timeSpan.hour) * 60;
                            timeSpan.min = parseInt(timeSpan.minStep);
                            timeSpan.sec = parseInt((timeSpan.minStep - timeSpan.min) * 60);
                            if (timeSpan.day < 0 || timeSpan.hour < 0 || timeSpan.min < 0 || timeSpan.sec < 0) {
                                var time = doc.querySelector(".left>p");
                                time.innerHTML = "已过期";
                            }
                            ele.oDay.innerHTML = timeSpan.day;
                            ele.oHour.innerHTML = timeSpan.hour;
                            ele.oMin.innerHTML = timeSpan.min;
                            ele.oSec.innerHTML = timeSpan.sec;
                        }, 1000);
                        document.onunload = function () {
                            clearInterval(time);
                        };
                    })();
                },
                error: function error(status) {
                    alert('fail to require' + status);
                }
            });
            // this.ajaxGet("../Servlet?value="+sentData,function(data) {
            //     data = JSON.parse(data);
            //     console.log(data);
            //     ele.oName.innerHTML = data["name"];
            //     ele.oTime.innerHTML = data["time"];
            //     ele.oDescrib.innerHTML = data["describ"];
            //     ele.oRobbed.innerHTML = data["robbed"];
            //     ele.oNotRobbed.innerHTML = data["notrobbed"];
            //     var deadline = {};
            //     //将日期去0转换为十进制
            //     deadline.year = parseInt(data["time"].split("年")[0]);
            //     deadline.month = parseInt(data["time"].split("月")[0].split("年")[1]);
            //     deadline.date = parseInt(data["time"].split("日")[0].split("月")[1]);
            //     deadline.hour = parseInt(data["time"].split("日")[1].split("~")[1].split(":")[0]);
            //     deadline.min = parseInt(data["time"].split("日")[1].split("~")[1].split(":")[1]);

            //     (function() {
            //         var time = setInterval(function(){
            //             var timeSpan = {};
            //             timeSpan.step = new Date(deadline.year,deadline.month-1,deadline.date,deadline.hour,deadline.min,0).getTime()-new Date().getTime();
            //             timeSpan.dayStep = timeSpan.step/(1000*60*60*24);
            //             timeSpan.day = parseInt(timeSpan.dayStep);
            //             timeSpan.hourStep = (timeSpan.dayStep-timeSpan.day)*24;
            //             timeSpan.hour = parseInt(timeSpan.hourStep);
            //             timeSpan.minStep = ((timeSpan.hourStep-timeSpan.hour)*60);
            //             timeSpan.min = parseInt(timeSpan.minStep);
            //             timeSpan.sec = parseInt((timeSpan.minStep-timeSpan.min)*60);
            //             if(timeSpan.day<0||timeSpan.hour<0||timeSpan.min<0||timeSpan.sec<0) {
            //                 var time = doc.querySelector(".left>p");
            //                 time.innerHTML = "已过期";
            //             }
            //             ele.oDay.innerHTML = timeSpan.day;
            //             ele.oHour.innerHTML = timeSpan.hour;
            //             ele.oMin.innerHTML = timeSpan.min;
            //             ele.oSec.innerHTML = timeSpan.sec;
            //         },1000);
            //         document.onunload = function() {
            //             clearInterval(time);
            //         }
            //     })();
            // });
        },

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
            moveHandle: function moveHandle() {
                if (ele.removeEventListener) {
                    ele.removeEventListener(type, fn);
                } else if (ele.dettachEvent) {
                    ele.dettachEvent(ele, "on" + type, fn);
                } else {
                    ele['on' + type] = null;
                }
            }
        },
        // 回到上一个页面
        backTouch: function backTouch(obj) {
            this.eleUtil.addHandle(obj, 'touchstart', function () {
                window.location.href = "index.html";
            });
        },
        // 点击抢票
        robbeClick: function robbeClick(obj) {
            var msg = document.querySelector(".pop p");
            this.eleUtil.addHandle(obj, 'touchstart', function () {
                // console.log(1);
                ele.oPop.style.display = "flex";
                /*
                data={
                    剩余票数：xxx,
                    是否抢过票:是/否
                }
                */
                ajax({
                    url: "xxx",
                    data: {},
                    method: 'get',
                    success: function success(data) {
                        if (xxx) {
                            //已经抢过票
                            msg.innerHTML = "对不起，不能重复抢票";
                        } else {
                            // 查看是否还有票
                            if (xxx) {
                                // 有票
                                msg.innerHTML = "恭喜你,抢票成功";
                            } else if (xxx) {
                                // 没票
                                msg.innerHTML = "很遗憾，票已抢空";
                            }
                        }
                    }
                });
            });
        },
        //确认抢票信息
        confirmClick: function confirmClick(obj) {
            var msg = document.querySelector(".pop p");
            this.eleUtil.addHandle(obj, "touchstart", function () {
                if (msg.innerHTML = "恭喜你,抢票成功") {
                    ajax({
                        url: 'xxx',
                        data: {},
                        method: 'post',
                        error: function error(status) {},
                        success: function success(data) {
                            console.log(data);
                        }
                    });
                }
                this.style.backgroundColr = "#ff0";
                ele.oPop.style.display = "none";
            });
        },
        // 获取css样式
        getStyle: function getStyle(obj, attr) {
            return getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
        },
        //3个小点
        checkPoint: function checkPoint(obj, attr) {
            function getTransform(obj, attr) {
                if (!obj.transform) {
                    obj.transform = {};
                }
                value = obj.transform[attr];
                if (typeof value === "undefined") {
                    if (attr === "scale" || attr === "scaleX" || attr === "scaleY") {
                        value = 1;
                    } else {
                        value = 0;
                    }
                }
                return value;
            }
        }
    };
    var detail = new Detail();
})(document);
