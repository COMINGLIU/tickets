(function(document){
    var doc = document;
    var ele = {
        oPersonalCenter: doc.querySelector(".personal-center"),
        aActivities: doc.querySelectorAll("ul.activities li"),
        aInfoImgs: doc.querySelectorAll("li img"),
        aInfoName: doc.querySelectorAll("li h3"),
        aInfoTime: doc.querySelectorAll("li p ")
    };
    // 首页活动数据
    var infoData = {
        one: {
            img: "./images/main/u4.png",
            name: "活动名称",
            time: "2018年04月29日 14:00~16:00"
        },
        two:  {
            img: "./images/main/u4.png",
            name: "活动名称",
            time: "2018年04月29日 14:00~16:00"
        },
        three: {
            img: "./images/main/u4.png",
            name: "活动名称",
            time: "2018年04月29日 14:00~16:00"
        }
    };
    ele.oPersonalCenter.ontouchstart = function() {
        window.location.href = "info/info.html";
    }
    console.log(ele.aActivities);
    for(var i=0,len=ele.aActivities.length;i<len;i++) {
        (function(i){
            ele.aActivities[i].ontouchstart = function() {
                window.location.href = "detail/detail.html";
            }
        })(i);
    }
})(document);