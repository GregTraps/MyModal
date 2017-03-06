/**
 * Created by Greg on 2017/3/6.
 */
define(['jquery','jqueryUI','widget'],function ($,$UI,widget) {
    function Modal() {
        this.cfg = {
            width : 500,  //窗体宽度和高度，还有cfg.x和cfg.y确定样式里left和top
            height : 300,
            hasMask : true,
            content : "",  //modal_body中的内容
           // alertHandler : function (){}, //单机确定后的事件函数
            winType : "alert",//默认事件类型
            alertBtnText : "OK",
            confirmBtnText : "确定",
            cancelBtnText : "取消",
            title : "提示", //modal_header中的提示
            hasCloseBtn : false,
            //  closeHandler : function () {},
            skinClassName : null, //在窗口上添加一个类名，在css添加选择器实现定制某个窗口样式
            isDraggable : true //是否可以拖动
        };
    }
    Modal.prototype = $.extend({},new widget.Widget(),{
        renderUI : function () {
            var config = this.cfg;
            var footerContent = '';
            switch (this.cfg.winType){
                case "alert":
                    footerContent = '<input class="modal_alertBtn" type="button" value="'+
                        config.alertBtnText+'">'+'</div>';
                    break;
                case "confirm":
                    footerContent = '<input class="modal_confirmBtn" type="button" value="'+
                        config.confirmBtnText+'">'+'<input class="modal_cancelBtn" type="button" value="'+
                        config.cancelBtnText+'">'+'</div>';
                    break;
            }
            this.boundingBox = $('<div class="modal_boundingBox">'+
                '<div class="modal_header">'+config.title+'</div>'+
                '<div class="modal_body">'+config.content+'</div>'+
                '<div class="modal_footer">'+footerContent+ '</div>');
            if (config.hasMask){
                this.mask = $('<div class="modal_mask"></div>');
                this.mask.appendTo("body");
            }
            if (config.isDraggable){
                this.boundingBox.draggable({
                    handle : this.boundingBox.find(".modal_header")
                });
            }
            if (config.hasCloseBtn) {
                var closeBtn = $('<span class="modal_closeBtn">X</span>');
                closeBtn.appendTo(this.boundingBox)
            }
            this.boundingBox.appendTo(document.body);
           // boundingBox.appendTo("body");
        },
        bindUI : function () {
            var that = this;
            this.boundingBox.delegate(".modal_alertBtn","click",function(){
                that.fire("alert");
                that.destroy();
            });
            this.boundingBox.delegate(".modal_closeBtn","click",function(){
                that.fire("close");
                that.destroy();
            });
            this.boundingBox.delegate(".modal_confirmBtn","click",function(){
                that.fire("confirm");
                that.destroy();
            });
            this.boundingBox.delegate(".modal_cancelBtn","click",function(){
                that.fire("cancel");
                that.destroy();
            })
        },
        syncUI : function () {
            var config = this.cfg;
            this.boundingBox.css({
                width : config.width+"px",
                height : config.height+"px",
                left : (config.x || (window.innerWidth - config.width) / 2) + "px",
                top : (config.y || (window.innerHeight - config.height) / 2) + "px"
            });
            if (config.skinClassName) {
               this.boundingBox.addClass(config.skinClassName)
            }
        },
        destructor : function () {
            this.mask && this.mask.remove();
        },
        alert : function (cfg){
            $.extend(this.cfg,cfg,{winType : "alert"});
            this.render();
            return this;
        },
        confirm:function (cfg) {
            $.extend(this.cfg,cfg,{winType : "confirm"});
            this.render();
            return this;
        },
        prompt:function () {}
    });
    return {
        Modal:Modal
    }
});