// cookies stuff



function getToken(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            };
        };
    };
    return cookieValue;
}
var csrftoken = getToken('csrftoken');

function getCookie(name){
    var cookieArr = document.cookie.split(";");

    for (var i =0;i<cookieArr.length;i++){
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()){
            return decodeURIComponent(cookiePair[1]);

        }
    }
    return null
}

var cart = JSON.parse(getCookie('cart'))

if (cart==undefined){
    cart = {}
    console.log("cart was created")
    document.cookie = 'cart='+JSON.stringify(cart)+";domain=;path=/"

}

console.log("cart:", cart)

// everything else

function searchRedirect(searchVal) {
    if (window.location.hostname == "127.0.0.1") {
        window.location.href = "http://127.0.0.1:8000/search/?result=" + searchVal // for development only
    } else {
        window.location.href = "https://" + window.location.hostname + "/search/?result=" + searchVal
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
            searchRedirect($(this).val());
        };
    });

    $(".submit-button").click(function() {
        searchRedirect($(this).siblings("input").val());
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

    if ($(".cart-items-counter").html() == "0") {
        $(".cart-items-counter").hide(0);
    };

});