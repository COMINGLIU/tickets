(function(document) {
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
        frag2: doc.createDocumentFragment(),
        aImg_yes: doc.querySelectorAll("ul.ticket-yes img"),
        aName_yes: doc.querySelectorAll("ul.ticket-yes h2"),
        aTime_yes: doc.querySelectorAll("ul.ticket-yes span"),
        aImg_no: doc.querySelectorAll("ul.ticket-no img"),
        aName_no: doc.querySelectorAll("ul.ticket-no h2"),
        aTime_no: doc.querySelectorAll("ul.ticket-no span"),
    };
    function Info() {
        this.init();
        this.delBtnOn(ele.aDelBtns,ele.oUl_yes,ele.aUl_yes_lis);
        this.documentClick();
    }
    Info.prototype = {
        eleUtil: {
            addHandle: function(ele,type,fn) {
                if(ele.addEventListener) {
                    ele.addEventListener(type,fn);
                }else if(ele.attachEvent) {
                    ele.attachEvent(ele,"on"+type,fn);
                }else {
                    ele['on'+type] = fn;
                }
            },
            moveHandle: function() {
                if(ele.removeEventListener) {
                    ele.removeEventListener(type,fn);
                }else if(ele.dettachEvent) {
                    ele.dettachEvent(ele,"on"+type,fn);
                }else {
                    ele['on'+type] = null;
                }
            },
            stopBubble: function(e) {
                e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
            },
            getEventTarget: function(e) {
                return e.target||e.srcElement;
            }
        },
        // 获取用户数据
        init: function(){
            if(window.sessionStorage.getItem('voted')){
                // 渲染数据
            }else {
                ajax({
                    url:"xxx",
                    data:{},
                    method: 'get',
                    success: function(data){
                        window.sessionStorage.setItem('voted');
                        console.log(data);
                        // 渲染数据
                        // ele.aImg_yes.src=;
                        // ele.aName_yes.innerHTML=
                        // ele.aTime_yes.innerHTML=
                    },
                    error: function(status){
                        alert("fail to request"+status);
                    }
                })
            }
        },
        documentClick: function() {
            this.eleUtil.addHandle(document,'touchstart',function(e) {
                e = e||window.e;
                var target = this.eleUtil.getEventTarget(e);
                switch(target.className) {
                    case "back":
                        window.location.href = "index.html";
                        break;
                    case "tYes":
                        e = e||window.e;
                        this.eleUtil.stopBubble(e);
                        if(window.sessionStorage.getItem('voted')){
                            // 直接渲染数据
                        }else {
                            ajax({
                                url:"xxx",
                                data:{},
                                method: 'get',
                                success: function(data){
                                    window.sessionStorage.setItem('voted');
                                    console.log(data);
                                    // 渲染数据
                                    // ele.aImg_yes.src=;
                                    // ele.aName_yes.innerHTML=
                                    // ele.aTime_yes.innerHTML=
                                },
                                error: function(status){
                                    alert("fail to request"+status);
                                }
                            })
                        }
                        ele.oUl_no.style.cssText = "display: none";
                        ele.aTitle[0].style.cssText = "background-color: rgb(230,242,247);";
                        ele.oUl_yes.style.cssText = "display: block";
                        ele.aTitle[1].style.cssText = "background-color: #fff;color: rgb(123,123,123)";
                        break;
                    case "tNo":
                        e = e||window.e;
                        this.eleUtil.stopBubble(e);
                        if(window.sessionStorage.getItem('noVoted')){
                            // 直接渲染数据
                        }else {
                            ajax({
                                url:"xxx",
                                data:{},
                                method: 'get',
                                success: function(data){
                                    window.sessionStorage.setItem('noVoted');
                                    console.log(data);
                                    // 渲染数据
                                    // ele.aImg_no.src=;
                                    // ele.aName_no.innerHTML=
                                    // ele.aTime_no.innerHTML=
                                },
                                error: function(status){
                                    alert("fail to request"+status);
                                }
                            })
                        }
                        ele.oUl_yes.style.cssText = "display: none";
                        ele.aTitle[1].style.cssText = "background-color: rgb(230,242,247);";
                        ele.oUl_no.style.cssText = "display: block";
                        ele.aTitle[0].style.cssText = "background-color: #fff;color: rgb(123,123,123);";
                        break;
                }
            }.bind(Info.prototype));
        },
        delBtnOn: function(objs,delParent,delItems) {
            var info = doc.getElementById("info");
            for(var i=0,len=delItems.length;i<len;i++) {
                (function(i) {
                    this.eleUtil.addHandle(objs[i],'touchstart',function() {
                        var res = confirm("确认退订吗？");
                        if(res){
                            ajax({
                                url:'xxx',
                                data:{},
                                method:'get',
                                error: function(status){
                                    // 
                                },
                                success: function(data){
                                    // 
                                }
                            })
                            this.ontouchstart = null;
                            delParent.children[i].innerHTML="";
                            change(info);
                        }
                    })
                }).call(Info.prototype,i);
            }
            // 出现又逐渐消失
            function change(item) {
                item.style.opacity = "1";
                var timer = setTimeout(function(){
                    item.style.opacity = "0";
                },2000)
                return function(){
                    clearTimeout(timer);
                }
            }
        }
    }
    var info = new Info();
})(document);;