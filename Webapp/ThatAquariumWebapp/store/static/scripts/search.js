var filterHidden = false;

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

        function makeItBlack(thisObjects) {
            for (let index = 0; index < thisObjects.length; index++) {
                thisObjects[index].css({
                    color: "black",
                    fill: "black"
                });
            };
        };

        function makeItOrange(thisObjects) {
            for (let index = 0; index < thisObjects.length; index++) {
                thisObjects[index].css({
                    color: "#ff854f",
                    fill: "#ff854f"
                });
            };
        };

        function checkNonExpandableSiblings(thisObject) {
            toCheck = thisObject.parent().parent().siblings(".specific-sub-categories-for-hiding");
            var output = true;
            toCheck.each(function() {
                if ($(this).children().children("input").prop('checked') == false) {
                    output = false;
                    return false;
                };
            });
            return output;
        };

        function checkExpandableSiblings(thisObject) {
            toCheck = thisObject.parent().parent().siblings(".specific-categories");
            var output = true;
            toCheck.each(function() {
                if ($(this).children(".specific-main-categories").children("input").prop('checked') == false) {
                    output = false;
                    return false;
                };
            });
            return output;
        };

        if ($(this).parent().attr("class") == "specific-main-categories") {

            if ($(this).parent().parent().attr("class").includes("specific-categories-0")) { // All categories click

                if ($(this).prop('checked') == false) {

                    $(".categories-filter").prop('checked', false);
                    makeItBlack([$(".specific-main-categories, .specific-sub-categories-for-hiding"), $(".expandable")]);

                } else {

                    $(".categories-filter").prop('checked', true);
                    makeItOrange([$(".specific-main-categories, .specific-sub-categories-for-hiding"), $(".expandable")]);

                };

            } else { // Categories with subcategories click

                if ($(this).prop('checked') == false) {
                    
                    $(this).parent().siblings(".specific-sub-categories-for-hiding").children().children("input").prop('checked', false);
                    $(".categories-filter-0").prop('checked', false);
                    makeItBlack([$(this).parent(), $(this).parent().siblings(".specific-sub-categories-for-hiding"),  $(this).siblings("svg"), $(".specific-categories-0").children(".specific-main-categories")]);

                } else {

                    $(this).parent().siblings(".specific-sub-categories-for-hiding").children().children("input").prop('checked', true);
                    makeItOrange([$(this).parent(), $(this).parent().siblings(".specific-sub-categories-for-hiding"), $(this).siblings("svg")]);
                    if (checkExpandableSiblings($(this)) == true) {
                        $(".categories-filter").prop('checked', true);
                        makeItOrange([$(".specific-main-categories, .specific-sub-categories-for-hiding"), $(".expandable")]);
                    };

                };

            };

        } else { // Categories with NO subcategories click

            if ($(this).prop('checked') == false) {

                makeItBlack([$(this).parent().parent(), $(".specific-categories-0").children(".specific-main-categories"), $(this).parent().parent().siblings(".specific-main-categories")]);
                $(".categories-filter-0").prop('checked', false);
                $(this).parent().parent().siblings(".specific-main-categories").children("input").prop('checked', false);

            } else {

                makeItOrange([$(this).parent().parent()]);

                if (checkNonExpandableSiblings($(this)) == true) {

                    if (checkExpandableSiblings($(this).parent()) == true) {

                        $(".categories-filter").prop('checked', true);
                        makeItOrange([$(".specific-main-categories, .specific-sub-categories-for-hiding"), $(".expandable")]);

                    } else {

                        $(this).parent().parent().siblings(".specific-sub-categories-for-hiding").children().children("input").prop('checked', true);
                        $(this).parent().parent().siblings(".specific-main-categories").children("input").prop('checked', true);
                        makeItOrange([$(this).parent().parent().siblings(), $(this).parent().parent().siblings().children("svg")]);
                        
                    };
                };

            };

        };
    });

    function getUrlVars() {
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }

    $(".search-bar-search-page").val(getUrlVars()["result"]);

    $(".categories-header").click(function() {
        if (window.innerWidth <= 1250) {
            if (filterHidden) {
                $(".filter-inner").stop().show(200);
                filterHidden = false;
            } else {
                $(".filter-inner").stop().hide(200);
                filterHidden = true;
            };
        };
    });

    if (window.innerWidth <= 1250) {
        $(".filter-inner").stop().hide(0);
        filterHidden = true;
    };

});