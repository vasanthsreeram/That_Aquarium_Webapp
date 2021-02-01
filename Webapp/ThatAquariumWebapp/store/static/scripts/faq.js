$(document).ready(function() {
    $(".faq-question-content").click(function() {
        if ($(this).siblings(".hideable-content").attr("class").includes("hidden") == false) {
            $(this).addClass("padding-auto-short")
            $(this).siblings(".hideable-content").addClass("hidden");
            $(this).siblings(".hideable-content").stop().fadeOut(250);
        } else {
            $(this).removeClass("padding-auto-short")
            $(this).siblings(".hideable-content").removeClass("hidden");
            $(this).siblings(".hideable-content").stop().fadeIn(250);
        };
    });
});