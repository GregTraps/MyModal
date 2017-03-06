/**
 * Created by Greg on 2017/3/6.
 */
define(["jquery"],function ($) {
    function Modal() {}
    Modal.prototype = {
        alert:function (content){
            var boundingBox = $('<div class="modal_boundingBox"></div>>');
            boundingBox.appendTo("body");
            boundingBox.html(content);
        },
        confirm:function () {},
        prompt:function () {}
    };
    return {
        Modal:Modal
    }
});