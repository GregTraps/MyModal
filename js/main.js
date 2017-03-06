/**
 * Created by Greg on 2017/3/6.
 */
require.config({
    //配置jquery路径，注意不带.js结尾，在html中设置了data-main之后，
    //会以data-main指定的文件目录为根目录，所以这里的jquery路径没有加js/
    paths : {
        jquery : ["jquery-3.1.1.min"],
        jqueryUI : ["jquery-ui.min"]
    }
});
require(["jquery","modal"],function ($, m) {
    $("#btn-alert").click(function () {
        return new m.Modal().alert({
            width : 200,
            height : 250,
            content : "Welcome!",
            alertHandler : function () {
                alert("clicked");
            },
            closeHandler : function () {
                alert("close");
            },
            title : "Notice",
            hasCloseBtn : true
        });
    });
});
