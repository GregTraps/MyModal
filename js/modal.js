/**
 * Created by Greg on 2017/3/6.
 */
define(['jquery','jqueryUI'],function ($,$UI) {
    function Modal() {
        this.cfg = {
            width : 500,  //窗体宽度和高度，还有cfg.x和cfg.y确定样式里left和top
            height : 300,
            hasMask : true,
            content : "",  //modal_body中的内容
            alertHandler : function (){}, //单机确定后的事件函数
            alertBtnText : "OK",
            title : "提示", //modal_header中的提示
            hasCloseBtn : false,
            closeHandler : function () {},
            skinClassName : null, //在窗口上添加一个类名，在css添加选择器实现定制某个窗口样式
            isDraggable : true //是否可以拖动
        };
    }
    Modal.prototype = {
        alert : function (cfg){
            var config = $.extend(this.cfg,cfg);
            var boundingBox = $('<div class="modal_boundingBox">'+
                '<div class="modal_header">'+config.title+'</div>'+
                '<div class="modal_body">'+config.content+'</div>'+
                '<div class="modal_footer">'+'<input type="button" value="'+config.alertBtnText+'">'+'</div>'+
                                    '</div>');
            if (config.hasMask){
                var mask = $('<div class="modal_mask"></div>');
                mask.appendTo("body");
            }
            boundingBox.appendTo("body");
            if (config.isDraggable){
                boundingBox.draggable({
                    handle : boundingBox.find(".modal_header")
                });
            }
            var btn = boundingBox.find(".modal_footer input");
            btn.click(function(){
                config.alertHandler && config.alertHandler();
                boundingBox.remove();
                mask && mask.remove();
                return false;
            });
            boundingBox.css({
                width : config.width+"px",
                height : config.height+"px",
                left : (config.x || (window.innerWidth - config.width) / 2) + "px",
                top : (config.y || (window.innerHeight - config.height) / 2) + "px"
            });
            if (config.hasCloseBtn){
                var closeBtn = $('<span class="modal_closeBtn">X</span>');
                closeBtn.appendTo(boundingBox);
                closeBtn.click(function () {
                    boundingBox.remove();
                    mask && mask.remove();
                    config.closeHandler && config.closeHandler();
                });
            }
            if (config.skinClassName) {
                boundingBox.addClass(config.skinClassName)
            }
        },
        confirm:function () {},
        prompt:function () {}
    };
    return {
        Modal:Modal
    }
});