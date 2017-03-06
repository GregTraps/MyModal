/**
 * Created by Greg on 2017/3/6.
 */
define(['jquery'],function ($) {
    function Modal() {
        this.cfg = {
            width : 500,
            height : 300
        };
    }
    Modal.prototype = {
        alert : function (content,handler,cfg){
            var boundingBox = $('<div class="modal_boundingBox"></div>');
            boundingBox.appendTo("body");
            boundingBox.html(content);
            var btn = $('<input type="button" value="确定">');
            btn.appendTo(boundingBox);
            btn.click(function(){
                handler && handler();
                boundingBox.remove();
                return false;
            });
            $.extend(this.cfg,cfg);
            boundingBox.css({
                width : this.cfg.width+"px",
                height : this.cfg.height+"px",
                left : (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + "px",
                top : (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + "px"
            })
        },
        confirm:function () {},
        prompt:function () {}
    };
    return {
        Modal:Modal
    }
});