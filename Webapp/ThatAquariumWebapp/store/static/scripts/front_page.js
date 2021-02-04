const CAROUSEL_DEFAULT_TIMER = 5000;
var carouselTimer = CAROUSEL_DEFAULT_TIMER;

$(document).ready(function() {

    // carousel
    var carouselPosition = 0; // 0 based index
    $(".item-0").addClass("active");
    $(".indicator-0").addClass("active");

    function nextCarousel() {
        $(`.item-${carouselPosition}, .indicator-${carouselPosition}`).removeClass("active");
        if (carouselPosition + 1 == $(".carousel-inner").children().length) {
            carouselPosition = -1;
        };
        carouselPosition++;
        $(".item-0").animate({
            "marginLeft": `${-80 * (carouselPosition)}vw`
        }, 750);
        $(`.item-${carouselPosition}, .indicator-${carouselPosition}`).addClass("active");
        resetCarouselTimer();
    };

    function backCarousel() {
        $(`.item-${carouselPosition}, .indicator-${carouselPosition}`).removeClass("active");
        if (carouselPosition - 1 == -1) {
            carouselPosition = $(".carousel-inner").children().length;
        };
        carouselPosition--;
        $(".item-0").animate({
            "marginLeft": `${-80 * (carouselPosition)}vw`
        }, 750);
        $(`.item-${carouselPosition}, .indicator-${carouselPosition}`).addClass("active");
        resetCarouselTimer();
    };
    
    function reduceCarouselTimer() {
        setTimeout(function() {
            carouselTimer -= 500;
            reduceCarouselTimer();
        }, 500);
    };
    
    function checkNextCarousel() {
        setTimeout(function() {
            if (carouselTimer <= 0) {
                nextCarousel();
            };
            checkNextCarousel();
        }, 1000)
    };

    function resetCarouselTimer() {
        carouselTimer = CAROUSEL_DEFAULT_TIMER;
    };

    $(".next").click(function() {
        nextCarousel();
    });

    $(".back").click(function() {
        backCarousel();
    });

    $(".indicators").click(function() {
        $(`.item-${carouselPosition}, .indicator-${carouselPosition}`).removeClass("active");
        carouselPosition = parseInt($(this).attr("class").split("-")[1]);
        $(".item-0").animate({
            "marginLeft": `${-80 * (carouselPosition)}vw`
        }, 750);
        $(`.item-${carouselPosition}, .indicator-${carouselPosition}`).addClass("active");
        resetCarouselTimer();
    });

    reduceCarouselTimer();
    checkNextCarousel();

});