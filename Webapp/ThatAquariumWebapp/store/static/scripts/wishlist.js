$(document).ready(function() {

    $(".change-quantity-add").click(function() {
        $(this).parent().siblings(".item-total").html("S$" + String(parseFloat(parseFloat($(this).parent().siblings(".item-total").html().split("S$")[1]) * (parseInt($(this).parent().children(".item-quantity").html()) + 1) / parseInt($(this).parent().children(".item-quantity").html())).toFixed(2)));
        $(this).parent().children(".item-quantity").html(parseInt($(this).parent().children(".item-quantity").html()) + 1);
    });

    $(".change-quantity-minus").click(function() {
        if ($(this).parent().children(".item-quantity").html() > 1) {            
            $(this).parent().siblings(".item-total").html("S$" + String(parseFloat(parseFloat($(this).parent().siblings(".item-total").html().split("S$")[1]) * (parseInt($(this).parent().children(".item-quantity").html()) - 1) / parseInt($(this).parent().children(".item-quantity").html())).toFixed(2)));
            $(this).parent().children(".item-quantity").html(parseInt($(this).parent().children(".item-quantity").html()) - 1);
        };
    });

    $(".remove-from-cart").click(function() {
        $(this).parent().parent().parent().remove();
    });

});
