/**
 * Created by Greg on 2017/3/6.
 */
require.config({
    paths : {
        jquery : ["jquery-3.1.1.min"]
    }
});
require(["jquery","modal"],function ($, m) {
    $("#btn").click(function () {
        return new m.Modal().alert("welcome!");
    })
});
