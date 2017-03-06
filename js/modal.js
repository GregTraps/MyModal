/**
 * Created by Greg on 2017/3/6.
 */
define(['jquery'],function ($) {
    function Modal() {
        this.cfg = {
            width : 500,
            height : 300,
            content : "",
            handler : function (){}
        };
    }
    Modal.prototype = {
        alert : function (cfg){
            var config = $.extend(this.cfg,cfg);
            var boundingBox = $('<div class="modal_boundingBox"></div>');
            boundingBox.appendTo("body");
            boundingBox.html(config.content);
            var btn = $('<input type="button" value="确定">');
            btn.appendTo(boundingBox);
            btn.click(function(){
                config.handler && config.handler();
                boundingBox.remove();
                return false;
            });
            boundingBox.css({
                width : config.width+"px",
                height : config.height+"px",
                left : (config.x || (window.innerWidth - config.width) / 2) + "px",
                top : (config.y || (window.innerHeight - config.height) / 2) + "px"
            })
        },
        confirm:function () {},
        prompt:function () {}
    };
    return {
        Modal:Modal
    }
});