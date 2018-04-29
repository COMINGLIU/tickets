(function(){
    // 获取html
    var html = document.querySelector("html");
    // 获取可视窗口宽度
    var width = html.getBoundingClientRect().width;
    // 设置html的fontsize
    html.style.fontSize = width/10 +"px";
    window.onresize = function() {
        var html = document.querySelector("html");
        var width = html.getBoundingClientRect().width;
        html.style.fontSize = width/10 +"px";
    }
})();