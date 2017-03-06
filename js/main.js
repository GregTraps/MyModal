/**
 * Created by Greg on 2017/3/6.
 */
require.config({
    paths : {
        jquery : ["jquery-3.1.1.min"]
    }
});
require(["jquery","modal"],function ($, m) {
    $("#btn-alert").click(function () {
        return new m.Modal().alert({
            width : 200,
            height : 250,
            content : "Welcome!",
            handler : function () {
                alert("clicked");
            }
        });
    });
});
