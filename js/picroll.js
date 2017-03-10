/**
 * Created by Greg on 2017/3/10.
 */
define(['jquery','widget'],function ($, widget) {
    //HTML结构div.container>(div.picroll_window>div.picroll_box)+div.picroll_nav
    function Picroll() {
        this.cfg = {
            width : 300,
            height : 200,
            skinClassName : null,
            boxNumber : 5,
            repeat : true,
            interval : 2000,
            speed : 1000
        }
    }
    Picroll.prototype = $.extend({},new widget.Widget(),{
        renderUI : function (container) {
            this.boundingBox = container;
            container.children("div:first").addClass("picroll_window");
            container.find(".picroll_window > div").addClass("picroll_box");
            this.cfg.boxNumber = container.find(".picroll_box").length;
            container.find(".picroll_box:first").clone().appendTo(container.find(".picroll_window"))
                .css("margin-right","-"+this.cfg.width+"px");
            var navLi = "";
            for (var j = 0 ;j<this.cfg.boxNumber;j++){
                navLi += '<li></li>'
            }
            container.append($('<div class="picroll_nav">' + '<ul>'+navLi+'</ul>' + '</div>'));
        },
        bindUI : function () {
            var that = this;
            this.boundingBox.mouseover(function () {
                clearInterval(that.move);
            }).mouseleave(function () {
                clearInterval(that.move);
                that.moveWindow();
            });
            this.boundingBox.find(".picroll_nav ul").delegate("li","mouseenter",function () {
                var index = $(this).index();
                var xpos = - index * that.cfg.width;
                var window = that.boundingBox.find(".picroll_window");
                window.stop(true,false).animate({left : xpos+"px"},that.cfg.speed,"swing");
            })
        },
        syncUI : function () {
            var container = this.boundingBox;
            container.css({
                "width" : this.cfg.width + "px",
                "height" : this.cfg.height + "px",
                "overflow" : "hidden",
                "position" : "relative"
            });
            container.find(".picroll_window").css({
                "width" : this.cfg.boxNumber*this.cfg.width + "px",
                "height" : this.cfg.height + "px"
            });
            container.find(".picroll_box").css({
                "width" : this.cfg.width + "px",
                "height" : this.cfg.height + "px"
            });
            container.find(".picroll_nav").css("margin-left",(-this.cfg.boxNumber*10)+"px");
            if (this.cfg.skinClassName){
                container.addClass(this.cfg.skinClassName);
            }
        },
        moveWindow : function () {
            var cfg = this.cfg;
            var that = this;
            var window = this.boundingBox.find(".picroll_window");
            function moveWindow() {
                window.animate({left : "-="+cfg.width+"px"},cfg.speed,"swing",function () {
                    var xpos = window.css("left");
                    var threshold = (-cfg.boxNumber*cfg.width) + "px";
                    if (xpos == threshold){
                        if (cfg.repeat){
                            window.css("left","0");
                        }else {
                            clearInterval(that.move);
                        }
                    }
                })
            }
            this.move = setInterval(moveWindow,cfg.interval+cfg.speed);
        },
        destructor : function () {

        },
        render : function (container) {

        },
        createRoll : function (container, cfg) {
            $.extend(this.cfg,cfg);
            this.renderUI(container);
            this.syncUI();
            this.moveWindow();
            this.bindUI();
        }
    });
    return {
        Picroll : Picroll
    }
});