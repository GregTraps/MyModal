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
require(["jquery","modal","picroll"],function ($, modal,picroll) {
   // var modalAlert = new m.Modal();
    $("#btn-alert").click(function () {
        return new modal.Modal().alert({
            width : 200,
            height : 250,
            content : "Welcome!",
            title : "Notice",
            hasCloseBtn : true
        }).on("close",function () {
            console.log("close");
        }).on("alert",function () {
            console.log("alert");
        }).on("confirm",function () {
            console.log("confirm");
        }).on("cancel",function () {
            console.log("cancel");
        });
    });
    $("#btn-confirm").click(function () {
        return new modal.Modal().confirm({
            width : 200,
            height : 250,
            content : "Welcome!",
            title : "Notice",
            hasCloseBtn : false
        }).on("close",function () {
            console.log("close");
        }).on("alert",function () {
            console.log("alert");
        }).on("confirm",function () {
            console.log("confirm");
        }).on("cancel",function () {
            console.log("cancel");
        });
    });
    var con =  $(".picroll-container");
    var createRoll = new picroll.Picroll().createRoll(con,{
        width : 350,
        interval : 1500,
        speed : 700
    });
});
