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

});