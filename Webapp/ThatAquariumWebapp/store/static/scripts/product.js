var inWishlist = false;
var reviewContent = "";
var reviewStars = 0;

$(document).ready(function() {

    function setPrevSiblingsFilledStars(thisObject) {
        if (thisObject.length != 0) {
            thisObject.attr("src", "/static/images/Item%20Listing/star_rate-24px.png");
            thisObject.removeClass("review-stars-empty");
            thisObject.addClass("review-stars-filled");
            setPrevSiblingsFilledStars(thisObject.prev());
        };
    };

    function setNextSiblingsEmptyStars(thisObject) {
        if (thisObject.length != 0) {
            thisObject.attr("src", "/static/images/Item%20Listing/star_border-24px.png");
            thisObject.removeClass("review-stars-filled");
            thisObject.addClass("review-stars-empty");
            setNextSiblingsEmptyStars(thisObject.next());
        };
    };

    $(".wishlist-icon").click(function() {
        if (inWishlist == false) {
            $(".wishlist-icon").attr("src", "/static/images/Item%20Listing/favorite-24px.png");
            $(".wishlist-text").html("In Wishlist")
            inWishlist = true;
        } else {
            $(".wishlist-icon").attr("src", "/static/images/Item%20Listing/favorite_border-24px.png");
            $(".wishlist-text").html("Add to Wishlist")
            inWishlist = false;
        };
    });

    $(".review-overlay-clickable, .overlay-back").click(function() {
        $(".review-overlay-bg").fadeOut(250);
        $(".review").val(reviewContent);
        var reviewStarsCounter = reviewStars;
        $(".personal-review-stars").children().each(function() {
            if (reviewStarsCounter > 0) {
                $(this).attr("src", "/static/images/Item%20Listing/star_rate-24px.png");
                $(this).removeClass("review-stars-empty");
                $(this).addClass("review-stars-filled");
                reviewStarsCounter--;
            } else {
                $(this).attr("src", "/static/images/Item%20Listing/star_border-24px.png");
                $(this).removeClass("review-stars-filled");
                $(this).addClass("review-stars-empty");
            };
        });
    }); 

    $(".review-button").click(function() {
        $(".review-overlay-bg").fadeIn(250);
        reviewContent = $(".review").val();
        reviewStars = 0;
        $(".personal-review-stars").children().each(function() {
            if ($(this).attr("class").includes("review-stars-filled")) {
                reviewStars++;
            };
        });
    });

    $(".review-stars-overlay").click(function() {
        setPrevSiblingsFilledStars($(this));
        setNextSiblingsEmptyStars($(this).next());
    });

    if ($(".wishlist-text").html() == "In Wishlist") {
        inWishlist = true;
    };

});