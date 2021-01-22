var currentCartPos = 0;
$(document).ready(function() {
    
    function hideAll() {
        $(".summary-region-items-subheader, .delivery-inner, .edit-address, .map, .address-inner, .delivery-choice, .collection-choice, .edit-card, .payment-inner").stop().hide(300);
        $(".delivery-method, .address, .payment").css({
            "cursor": "auto"
        });
    };

    function deliveryCheck() {
        if ($("#delivery-1").is(":checked")) {
            $(".delivery-subheader").html("Custom Delievery");
        } else {
            $(".delivery-subheader").html("Self Collection");
        };
    };

    function addressCheck() {
        if ($("#delivery-1").is(":checked")) {
            $(".address-header-text").html("Delivery Address")
            for (let i = 1; i <= $(".delivery-choice").children().length; i++) {
                if ($("#delivery-address-" + String(i)).is(":checked")) {
                    $(".address-subheader").html($("#delivery-address-" + String(i)).siblings(".labels").children().children(".label-actual-text-1").html() + ", " + $("#delivery-address-" + String(i)).siblings(".labels").children().children(".label-actual-text-2").html());
                    return;
                };
            };
            $(".address-subheader").html("");
        } else {
            $(".address-header-text").html("Collection Address")
            for (let i = 1; i <= $(".collection-choice").children().length; i++) {
                if ($("#address-" + String(i)).is(":checked")) {
                    $(".address-subheader").html($("#address-" + String(i)).siblings(".labels").children().children(".label-actual-text-1").html());
                };
            };
        };
    };

    function paymentCheck() {
        for (let i = -1; i <= $(".payment-choice").children().length - 2; i++) {
            if ($("#payment-" + String(i)).is(":checked")) {
                $(".payment-subheader").html($("#payment-" + String(i)).siblings(".labels").children().children(".label-actual-text-1").html());
            };
        };
    };

    function backCollection() {
        setTimeout(function() {
            currentCartPos = 1;
        }, 300);
        hideAll();
        addressCheck();
        paymentCheck();
        $(".address, .payment").css({
            "cursor": "pointer"
        });
        $(".delivery-inner, .address-subheader, .payment-subheader").stop().show(300);
        $(".delivery-inner").css({
            "display":"inline"
        })
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
        deliveryCheck();
        paymentCheck();
        if ($("#cart-form input[type='radio']:checked").val() == "custom") {
            $(".edit-address, .address-inner, .delivery-choice, .delivery-subheader, .payment-subheader").stop().show(300);
            $(".address-inner").css({
                "display":"inline"
            });
            $(".address-header-text").html("Delivery Address");
        } else {
            $(".map, .address-inner, .collection-choice, .delivery-subheader, .payment-subheader").stop().show(300);
            $(".address-header-text").html("Collection Address");
        };
    };
    
    function collectionContinue() {
        setTimeout(function() {
            currentCartPos = 3;
        }, 300);
        hideAll();
        deliveryCheck();
        addressCheck();
        $(".delivery-method, .address").css({
            "cursor": "pointer"
        });
        $(".edit-card, .payment-inner, .delivery-subheader, .address-subheader").stop().show(300);
        $(".payment-inner").css({
            "display":"inline"
        });
    };

    function calculateTax() {
        $(".order-summary-inner-text-row-3-right").html("S$" + String((parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) * 0.07).toFixed(2)));
    };
    
    function updateDeliveryCost() {
        if ($("#delivery-1").is(":checked") && parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) <= 80.00) {
            $(".order-summary-inner-text-row-2-right").html("S$5.00")
            $("#delivery-1").siblings(".extra-costs").html("S$5.00")
        } else if ($("#delivery-2").is(":checked") && parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) <= 80.00) {
            $(".order-summary-inner-text-row-2-right").html("S$0.00")
            $("#delivery-1").siblings(".extra-costs").html("S$5.00")
        } else {
            $(".order-summary-inner-text-row-2-right").html("S$0.00")
            $("#delivery-1").siblings(".extra-costs").html("FREE")
        };
        updateTotalCost();
    };
    
    function updateTotalCost() {
        items = parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]);
        delivery = parseFloat($(".order-summary-inner-text-row-2-right").html().split("S$")[1]);
        discounts = parseFloat($(".order-summary-inner-text-row-4-right").html().split("S$")[1]);
        couponCode = parseFloat($(".order-summary-inner-text-row-5-right").html().split("S$")[1]);
        finalVal = String((items + delivery - discounts - couponCode).toFixed(2)).split(".")
        while (true) {
            if (finalVal[1].length < 2) {
                finalVal = finalVal[0] + "." + finalVal[1] + "0";
            } else {
                finalVal = finalVal[0] + "." + finalVal[1];
                break;
            };
        };
        $(".order-summary-inner-text-row-7-right").html("S$" + finalVal);
    };

    function checkEmptyCart() { // This assumes there are no free items in the shop
        if (parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) == 0.0) {
            setTimeout(function() {
                currentCartPos = 0;
            }, 301);
            hideAll();
            return true;
        } else {
            backCollection();
            return false;
        };
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
        if (currentCartPos != 1 && currentCartPos != 0) {
            backCollection();
        };
    });

    $(".address").click(function() {
        if (currentCartPos != 2 && currentCartPos != 0) {
            deliveryContinue();
        };
    });

    $(".payment").click(function() {
        if (currentCartPos != 3 && currentCartPos != 0) {
            collectionContinue();
        };
    });

    $(".payment-address-same").click(function() {
        if ($(this).is(":checked") == false) {
            $(".edit-payment-address").show(0);
        } else {
            $(".edit-payment-address").hide(0);
        }; 
    });

    $(".delivery-options").click(function() {
        addressCheck();
        updateDeliveryCost();
    });

    $(".add-stuff-overlay-clickable, .overlay-back").click(function() {
        $(".add-stuff-overlay").fadeOut(250);
        $(".add-card-overlay, .add-address-overlay, .add-billing-overlay").hide(0);
    }); 

    $(".add-card").click(function() {
        $(".add-stuff-overlay").fadeIn(250);
        $(".add-card-overlay").show(0);
    });

    $(".edit-address").click(function() {
        $(".add-stuff-overlay-clickable").parent().fadeIn(250);
        $(".add-address-overlay").show(0);
    });

    $(".edit-payment-address").click(function() {
        $(".add-stuff-overlay-clickable").parent().fadeIn(250);
        $(".add-billing-overlay").show(0);
    });

    backCollection();
    $(".edit-payment-address, .add-card-overlay, .add-address-overlay, .add-billing-overlay").hide(0);
    $(".add-stuff-overlay").fadeOut(0);
    // if value of items is zero, delivery methods, addresses and payment won't be clickable
    $(".order-summary-inner-text-row-1-right").html("S$50.00")
    if (checkEmptyCart() == false) {
        updateDeliveryCost();
        calculateTax();
    };
    
});