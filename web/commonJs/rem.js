(function(){
    // 获取html
    var html = document.querySelector("html");
    // 获取可视窗口宽度
    var width = html.getBoundingClientRect().width;
    // 设置html的fontsize
    if(width<800) {
        html.style.fontSize = width/10 +"px";
    }else {
        html.style.fontSize = 50 +"px";
    }
    window.onresize = function() {
        var html = document.querySelector("html");
        var width = html.getBoundingClientRect().width;
        if(width<800) {
            html.style.fontSize = width/10 +"px";
        }else {
            html.style.fontSize = 50 +"px";
        }
        // html.style.fontSize = width/10 +"px";
    }
})();