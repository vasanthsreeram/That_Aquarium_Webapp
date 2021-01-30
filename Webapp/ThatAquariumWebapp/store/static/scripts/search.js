$(document).ready(function() {

    $(".expandable").click(function() {
        if ($(this).parent().siblings(".specific-sub-categories-for-hiding").css("display") == "none") {
            $(this).css({
                transform: "rotate(-180deg)",
            });
            $(".specific-sub-categories-for-hiding").css({
                transition: "0s ease"
            });
            $(this).parent().siblings(".specific-sub-categories-for-hiding").stop().show(250, "linear");
            setTimeout(function() {
                $(".specific-sub-categories-for-hiding").css({
                    transition: "0.2s ease"
                });
            }, 250);
        } else {
            $(this).css({
                transform: "rotate(0deg) translateX(0px) translateY(0px)",
            });
            $(".specific-sub-categories-for-hiding").css({
                transition: "0s ease"
            });
            $(this).parent().siblings(".specific-sub-categories-for-hiding").stop().hide(250, "linear");
            setTimeout(function() {
                $(".specific-sub-categories-for-hiding").css({
                    transition: "0.2s ease"
                });
            }, 250);
        };
    });

    $(".categories-filter").click(function() {
        if ($(this).parent().attr("class") == "specific-main-categories") {
            if ($(this).parent().parent().attr("class").includes("specific-categories-0")) { // All categories click
                if ($(this).prop('checked') == false) {
                    $(".categories-filter").prop('checked', false);
                    $(".specific-main-categories, .specific-sub-categories-for-hiding").css({
                        color: "black",
                    });
                    $(".expandable").css({
                        fill: "black"
                    });
                } else {
                    $(".categories-filter").prop('checked', true);
                    $(".specific-main-categories, .specific-sub-categories-for-hiding").css({
                        color: "#ff854f",
                        fontWeight: "500"
                    });
                    $(".expandable").css({
                        fill: "#ff854f"
                    });
                };
            } else { // Categories with subcategories click
                if ($(this).prop('checked') == false) {
                    $(this).parent().siblings(".specific-sub-categories-for-hiding").children().children("input").prop('checked', false);
                    $(this).parent().css({
                        color: "black",
                    });
                    $(this).parent().siblings(".specific-sub-categories-for-hiding").css({
                        color: "black",
                    });
                    $(this).siblings("svg").css({
                        fill: "black"
                    });
                    $(".categories-filter-0").prop('checked', false);
                    $(".specific-categories-0").children(".specific-main-categories").css({
                        color: "black",
                    });
                } else {
                    $(this).parent().siblings(".specific-sub-categories-for-hiding").children().children("input").prop('checked', true);
                    $(this).parent().css({
                        color: "#ff854f",
                        fontWeight: "500"
                    });
                    $(this).parent().siblings(".specific-sub-categories-for-hiding").css({
                        color: "#ff854f",
                        fontWeight: "500"
                    });
                    $(this).siblings("svg").css({
                        fill: "#ff854f"
                    });
                };
            };
        } else { // Categories with NO subcategories click
            if ($(this).prop('checked') == false) {
                $(this).parent().parent().css({
                    color: "black",
                });
                $(".categories-filter-0").prop('checked', false);
                $(".specific-categories-0").children(".specific-main-categories").css({
                    color: "black",
                });
                $(this).parent().parent().siblings(".specific-main-categories").css({
                    color: "black",
                }).children("input").prop('checked', false);
            } else {
                $(this).parent().parent().css({
                    color: "#ff854f",
                    fontWeight: "500"
                });
            };
        };
    });

});