"use strict";

(function (document) {
    var doc = document;
    var ele = {
        aBtns: doc.querySelectorAll("section > ul li"),
        aTitle: doc.querySelectorAll("ul.title li"),
        oUl_yes: doc.querySelector("ul.ticket-yes"),
        aUl_yes_lis: doc.querySelectorAll("ul.ticket-yes li"),
        oUl_no: doc.querySelector("ul.ticket-no"),
        aUl_no_lis: doc.querySelectorAll("ul.ticket-no li"),
        aDelBtns: doc.querySelectorAll("i.delete"),
        frag1: doc.createDocumentFragment(),
        frag2: doc.createDocumentFragment()
    };
    function Info() {
        this.init();
        this.delBtnOn(ele.aDelBtns, ele.oUl_yes, ele.aUl_yes_lis);
        this.documentClick();
    }
    Info.prototype = {
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
            },
            stopBubble: function stopBubble(e) {
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            },
            getEventTarget: function getEventTarget(e) {
                return e.target || e.srcElement;
            }
        },
        // 获取用户数据
        init: function init() {
            if (window.sessionStorage.getItem('voted')) {
                // 渲染数据
            } else {
                ajax({
                    url: "xxx",
                    data: {},
                    method: 'get',
                    success: function success(data) {
                        window.sessionStorage.setItem('voted');
                        console.log(data);
                        // 渲染数据
                    },
                    error: function error(status) {
                        alert("fail to request" + status);
                    }
                });
            }
        },
        documentClick: function documentClick() {
            this.eleUtil.addHandle(document, 'touchstart', function (e) {
                e = e || window.e;
                var target = this.eleUtil.getEventTarget(e);
                switch (target.className) {
                    case "back":
                        window.location.href = "index.html";
                        break;
                    case "tYes":
                        e = e || window.e;
                        this.eleUtil.stopBubble(e);
                        if (window.sessionStorage.getItem('voted')) {
                            // 直接渲染数据
                        } else {
                            ajax({
                                url: "xxx",
                                data: {},
                                method: 'get',
                                success: function success(data) {
                                    window.sessionStorage.setItem('voted');
                                    console.log(data);
                                    // 渲染数据
                                },
                                error: function error(status) {
                                    alert("fail to request" + status);
                                }
                            });
                        }
                        ele.oUl_no.style.cssText = "display: none";
                        ele.aTitle[0].style.cssText = "background-color: rgb(230,242,247);";
                        ele.oUl_yes.style.cssText = "display: block";
                        ele.aTitle[1].style.cssText = "background-color: #fff;color: rgb(123,123,123)";
                        break;
                    case "tNo":
                        e = e || window.e;
                        this.eleUtil.stopBubble(e);
                        if (window.sessionStorage.getItem('noVoted')) {
                            // 直接渲染数据
                        } else {
                            ajax({
                                url: "xxx",
                                data: {},
                                method: 'get',
                                success: function success(data) {
                                    window.sessionStorage.setItem('noVoted');
                                    console.log(data);
                                    // 渲染数据
                                },
                                error: function error(status) {
                                    alert("fail to request" + status);
                                }
                            });
                        }
                        ele.oUl_yes.style.cssText = "display: none";
                        ele.aTitle[1].style.cssText = "background-color: rgb(230,242,247);";
                        ele.oUl_no.style.cssText = "display: block";
                        ele.aTitle[0].style.cssText = "background-color: #fff;color: rgb(123,123,123);";
                        break;
                }
            }.bind(Info.prototype));
        },
        delBtnOn: function delBtnOn(objs, delParent, delItems) {
            for (var i = 0, len = delItems.length; i < len; i++) {
                (function (i) {
                    this.eleUtil.addHandle(objs[i], 'touchstart', function () {
                        var res = confirm("确认退订吗？");
                        if (res) {
                            this.ontouchstart = null;
                            delParent.children[i].innerHTML = "";
                        }
                    });
                }).call(Info.prototype, i);
            }
        }
    };
    var info = new Info();
})(document);;
