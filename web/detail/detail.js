(function(document) {
    var doc = document;
    var ele = {
        oBack: doc.querySelector("em.back")
    }
    ele.oBack.ontouchstart = function() {
        window.location.href = "../index.html";
    }
})(document);