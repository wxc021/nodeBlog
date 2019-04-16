/*
 Author 王叙淳
 Date 	2015-7-3 13:43:09
 功能：实现页面切换动态效果
 */

$(function () {
    // 页面切换效果
    $(".list_img").find("li").click(function () {
        var src = $(this).find("img").attr("src");
        $(this).parents(".img_show").find(".show_big_img").attr("src", src);
    });
    // 回到顶部
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".backTop").fadeIn();
        } else {
            $(".backTop").fadeOut();
        }
    });
    $(".backTop").click(function () {
        $("html,body").animate({scrollTop: 0}, 300);
    });
    //有评论模块则调用评论效果
    if ($(".comment").is(":visible")){
        window.onload = function () {
            document.ondragstart = function () {
                return false;
            };
            function $1(id) {
                return document.getElementById(id);
            }
            var numDom = $1("number").innerHTML;
            $("#count").bind('keydown change', function (event) {
                var str = $.trim(this.value);
                var len = str.length;
                var num1 = numDom - len;
                $("#text").html("还可以输入");
                if (num1 < 0) {
                    $("#number").addClass('col');
                    $("#text").html("已超出");
                    num1 = num1.toString();
                    num1 = num1.replace("-", "");
                    $("#number").html(num1);
                    return;
                } else {
                    $("#number").removeClass('col');
                }
                $("#number").html(num1);
                if ($("#count").val() != "") {
                    localStorage.setItem("text", $("#count").val());
                } else {
                    localStorage.removeItem("text");
                }
            });
            $(".Expression").bind("click", function () {
                $(".gif").show();
            });
            $(".gif li").bind('click', function (e) {
                var title = $(this).attr("title");
                var $val = $("#count").val();
                $("#count").val($val + "[" + title + "]");
                $(".gif").hide();
            });
            //保存输入内容
            if (window.localStorage) {
                $("#count").val(localStorage.getItem("text"));
            }
            ;
        }
    }
});















