$(document).ready(function() {

    $(".expandable").click(function() {
        if ($(this).parent().siblings(".specific-sub-categories-for-hiding").css("display") == "none") {
            $(this).css({
                transform: "rotate(-90deg) translateX(4px)",
            });
            $(this).parent().siblings(".specific-sub-categories-for-hiding").stop().show(250, "linear");
        } else {
            $(this).css({
                transform: "rotate(0deg) translateX(2px)",
            });
            $(this).parent().siblings(".specific-sub-categories-for-hiding").stop().hide(250, "linear");
        };
    });

    $(".categories-filter").click(function() {
        if ($(this).parent().attr("class") == "specific-main-categories") {
            if ($(this).parent().parent().attr("class").includes("specific-categories-0")) {
                if ($(this).prop('checked') == false) {
                    $(this).parent().parent().siblings(".all-categories-box").children().children().children("input").prop('checked', false);
                    $(this).parent().parent().siblings(".all-categories-box").children().children().children().children("input").prop('checked', false);
                } else {
                    $(this).parent().parent().siblings(".all-categories-box").children().children().children("input").prop('checked', true);
                    $(this).parent().parent().siblings(".all-categories-box").children().children().children().children("input").prop('checked', true);
                };
            } else {
                if ($(this).prop('checked') == false) {
                    $(this).parent().siblings(".specific-sub-categories-for-hiding").children().children("input").prop('checked', false);
                } else {
                    $(this).parent().siblings(".specific-sub-categories-for-hiding").children().children("input").prop('checked', true);
                };
            };
            // console.log($(this).parent().parent().attr("class"))
        };
    });

});