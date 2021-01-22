



function searchRedirect() {
    if (window.location.hostname == "127.0.0.1") {
        window.location.href = "http://127.0.0.1:8000/search/?=" + $(".search-bar").val() // for development only
    } else {
        window.location.href = "https://" + window.location.hostname + "/search/?=" + $(".search-bar").val()
    };
};

$(document).ready(function() {

    lastKeyUpSearch = 0

    $(".account-back").hover(function() {
        $(".back-shadow").animate({
            "width": "100%",
            "height": "100%"
        }, 0);
    }, function() {
        $(".back-shadow").animate({
            "width": "0%",
            "height": "0%"
        }, 0);
    });


    $(".search-bar").keyup(function(e) {
        if (e.keyCode == 13) {
            searchRedirect();
        };
    });

    $(".submit-button").click(function() {
        searchRedirect();
    });
    
    currentPage = window.location.pathname;
    // this part is hardcoded. Key is path name, value is unique class name of the underline object
    names = {
        "/hot/": ".hover-underline-1",
        "/featured/": ".hover-underline-2",
        "/new/": ".hover-underline-3",
        "/search/": ".hover-underline-4", // This one is kinda unused but is there for categories
        "/terms-and-conditions/": ".hover-underline-5",
        "/privacy-policy/": ".hover-underline-5",
        "/FAQ/": ".hover-underline-6",
        "/about/": ".hover-underline-7",
        "/search/": ".hover-underline-8",
        "/cart/": ".hover-underline-9",
    };
    if (names[currentPage] != undefined) {
        $(names[currentPage]).addClass("hover-underline-current");
        $(names[currentPage]).parent().removeClass("navbar-text-item-normal");
        $(names[currentPage]).parent().addClass("navbar-text-item-current");
    };

});