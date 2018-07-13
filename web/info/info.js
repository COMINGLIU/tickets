(function(document) {
    var doc = document;
    var ele = {
        oBack: doc.querySelector("header em"),
        oUl: doc.querySelectorAll("section > ul li ul"),
        aTitle: doc.querySelectorAll("ul.title li"),
        oUl_yes: doc.querySelector("ul.ticket-yes"),
        oUl_no: doc.querySelector("ul.ticket-no"),
        frag1: doc.createDocumentFragment(),
        frag2: doc.createDocumentFragment()
    };
    var oUlYes = ele.oUl[0],
        oUlNo = ele.oUl[1];
    // 测试数据
    var data_yes = {
        one: ["img","项目名称","time"],
        two: ["img","项目名称","time"],
        three: ["img","项目名称","time"]
    };
    var data_no = {
        one: ["img","项目名称","time"],
        two: ["img","项目名称","time"],
        three: ["img","项目名称","time"]
    }
    ele.aTitle[0].ontouchstart = function() {
        ele.oUl_no.style.cssText = "display: none";
        ele.aTitle[0].style.color = " rgb(22,155,213)";
        ele.oUl_yes.style.cssText = "display: block";
        ele.aTitle[1].style.color = " rgb(123,123,123)";
    }
    ele.aTitle[1].ontouchstart = function() {
        ele.oUl_yes.style.cssText = "display: none";
        ele.aTitle[1].style.color = " rgb(22,155,213)";
        ele.oUl_no.style.cssText = "display: block";
        ele.aTitle[0].style.color = " rgb(123,123,123)";
    }
    ele.oBack.ontouchstart = function() {
        window.location.href = "../index.html";
    }
})(document);