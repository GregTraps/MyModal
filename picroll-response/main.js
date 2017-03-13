/**
 * Created by Greg on 2017/3/13.
 */
require.config({
    //配置jquery路径，注意不带.js结尾，在html中设置了data-main之后，
    //会以data-main指定的文件目录为根目录，所以这里的jquery路径没有加js/
    paths : {
        jquery : ["../js/jquery-3.1.1.min"],
        jqueryUI : ["../js/jquery-ui.min"],
        widget : ["../js/widget"]
    }
});
require(["jquery","picroll"],function ($,picroll) {
    var con =  $(".picroll-container-res");
    var createRoll = new picroll.Picroll().createRoll(con,{
        interval : 1500,
        speed : 2000
    });
});
