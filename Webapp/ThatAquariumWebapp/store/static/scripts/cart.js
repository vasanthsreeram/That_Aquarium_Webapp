$(document).ready(function() {
    
    function hideAll() {
        $(".delivery-inner, .edit-address, .map, .address-inner, .delivery-choice, .collection-choice, .edit-card, .payment-inner").stop().hide(300);
        $(".delivery-method, .address, .payment").css({
            "cursor": "auto"
        });
    };

    function backCollection() {
        setTimeout(function() {
            currentCartPos = 1;
        }, 300);
        hideAll();
        $(".address, .payment").css({
            "cursor": "pointer"
        });
        $(".delivery-inner").stop().show(300).css({
            "display":"inline"
        });
        $(".delivery-method-type").css({
            "display": "flex"
        });
    };
    
    function deliveryContinue() {
        setTimeout(function() {
            currentCartPos = 2;
        }, 300);
        hideAll();
        $(".delivery-method, .payment").css({
            "cursor": "pointer"
        });
        if ($("#cart-form input[type='radio']:checked").val() == "custom") {
            $(".edit-address, .address-inner, .delivery-choice").stop().show(300);
            $(".address-inner").css({
                "display":"inline"
            });
            $(".address-header-text").html("Delivery Address");
        } else {
            $(".map, .address-inner, .collection-choice").stop().show(300);
            $(".address-header-text").html("Collection Address");
        };
    };
    
    function collectionContinue() {
        setTimeout(function() {
            currentCartPos = 3;
        }, 300);
        hideAll();
        $(".delivery-method, .address").css({
            "cursor": "pointer"
        });
        $(".edit-card, .payment-inner").stop().show(300);
        $(".payment-inner").css({
            "display":"inline"
        });
    };

    $(".continue-delivery, .back-payment").click(function() {
        deliveryContinue();
    });

    $(".continue-collection").click(function() {
        collectionContinue();
    });

    $(".back-collection").click(function() {
        backCollection();
    });

    $(".delivery-method").click(function() {
        if (currentCartPos != 1) {
            backCollection();
        };
    });

    $(".address").click(function() {
        if (currentCartPos != 2) {
            deliveryContinue();
        };
    });

    $(".payment").click(function() {
        if (currentCartPos != 3) {
            collectionContinue();
        };
    });

    backCollection();
    currentCartPos = 1;
    // Tax Calculator
    $(".order-summary-inner-text-row-3-right").html("S$" + String(parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) * 0.07).toFixed(2));

});