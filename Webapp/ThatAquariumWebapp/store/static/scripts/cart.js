var currentCartPos = 0;
var tempData = [];
var overlayPos = 0;

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
        if (parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) == 0.0) {
            $(".order-summary-inner-text-row-2-right").html("S$0.00")
        } else {
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
            $(".order-summary-inner-text-row-1-right").html("S$0.00");
            return true;
        } else {
            backCollection();
            return false;
        };
    };

    function closeOverlay() {
        $(".add-stuff-overlay").fadeOut(250);
        $(".add-card-overlay, .add-address-overlay, .add-billing-overlay").hide(0);
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
            $(".edit-payment-address, .payment-address-preview-address").show(0);
        } else {
            $(".edit-payment-address, .payment-address-preview-address").hide(0);
        }; 
    });

    $(".delivery-options").click(function() {
        addressCheck();
        updateDeliveryCost();
    });

    $(".add-stuff-overlay-clickable, .overlay-back").click(function() {
        closeOverlay();
        if (overlayPos == 1) {
            $(".card-number").val(tempData[0]);
            $(".expiry-date").val(tempData[1]);
            $(".cvv").val(tempData[2]);
        } else if (overlayPos == 2) {
            $(".address-full-name").val(tempData[0]);
            $(".address-phone-number").val(tempData[1]);
            $(".address-address-line-1").val(tempData[2]);
            $(".address-address-line-2").val(tempData[3]);
            $(".address-post-code").val(tempData[4]);
        } else if (overlayPos == 3) {
            $(".billing-full-name").val(tempData[0]);
            $(".billing-phone-number").val(tempData[1]);
            $(".billing-address-line-1").val(tempData[2]);
            $(".billing-address-line-2").val(tempData[3]);
            $(".billing-post-code").val(tempData[4]);
        };
    }); 

    $(".add-card").click(function() {
        $(".add-stuff-overlay").fadeIn(250);
        $(".add-card-overlay").show(0);
        overlayPos = 1;
        tempData = [$(".card-number").val(), $(".expiry-date").val(), $(".cvv").val()];
    });

    $(".edit-address").click(function() {
        $(".add-stuff-overlay-clickable").parent().fadeIn(250);
        $(".add-address-overlay").show(0);
        overlayPos = 2;
        tempData = [$(".address-full-name").val(), $(".address-phone-number").val(), $(".address-address-line-1").val(), $(".address-address-line-2").val(), $(".address-post-code").val()]
    });

    $(".edit-payment-address").click(function() {
        $(".add-stuff-overlay-clickable").parent().fadeIn(250);
        $(".add-billing-overlay").show(0);
        overlayPos = 3;
        tempData = [$(".billing-full-name").val(), $(".billing-phone-number").val(), $(".billing-address-line-1").val(), $(".billing-address-line-2").val(), $(".billing-post-code").val()]
    });

    $(".save-card").click(function() {
        var valid = true;
        $(".card-number, .expiry-date, .cvv").css({
            border: "0px solid red"
        });
        if ($(".card-number").val().length < 13) {
            valid = false;
            $(".card-number").css({
                border: "1px solid red"
            });
        };
        if ($(".expiry-date").val().length != 4) {
            valid = false;
            $(".expiry-date").css({
                border: "1px solid red"
            });
        };
        if ($(".cvv").val().length != 3) {
            valid = false;
            $(".cvv").css({
                border: "1px solid red"
            });
        };
        if (valid == true) {
            if ($(".temp-card-detail").length == 0) {
                $(".payment-inner").prepend(`
                <div class = "payment-method-type">
                    <input type = "radio" id = "payment-1" name = "payment-address" value = "payment-choice-1" class = "radio-options">
                    <label for = "payment-1" class = "labels">
                        <div class = "label-text label-text-1">
                            <p class = "label-actual-text label-actual-text-1">Debit/Credit Card</p>
                            <p class = "label-actual-text label-actual-text-2 temp-card-detail">Card Ending with ` + $(".card-number").val().slice($(".card-number").val().length - 4, $(".card-number").val().length) + `</p>
                        </div>
                    </label>
                </div>
                `)
            } else {
                $(".temp-card-detail").html("Card Ending with " + $(".card-number").val().slice($(".card-number").val().length - 4, $(".card-number").val().length));
            };
            $(".card-number, .expiry-date, .cvv").css({
                border: "0px solid red"
            });
            closeOverlay();
            tempData = [];
            $(".add-card").html("Edit Temporary Card");
        };
    });

    $(".save-address").click(function() {
        var valid = true;
        $(".address-full-name, .address-phone-number, .address-address-line-1, .address-post-code").css({
            border: "0px solid red"
        });
        if ($(".address-full-name").val() == "") {
            valid = false;
            $(".address-full-name").css({
                border: "1px solid red"
            });
        };
        if ($(".address-phone-number").val() == "") {
            valid = false;
            $(".address-phone-number").css({
                border: "1px solid red"
            });
        };
        if ($(".address-address-line-1").val() == "") {
            valid = false;
            $(".address-address-line-1").css({
                border: "1px solid red"
            });
        };
        if ($(".address-post-code").val() == "") {
            valid = false;
            $(".address-post-code").css({
                border: "1px solid red"
            });
        };
        if (valid == true) {
            if ($(".temp-address-detail").length == 0) {
                if ($(".address-address-line-2").val() == "") {
                    $(".delivery-choice").prepend(`
                    <div class = "delivery-method-type">
                        <input type = "radio" id = "delivery-address-1" name = "delivery-address" value = "address-choice-1" class = "radio-options" checked="checked">
                        <label for = "delivery-address-1" class = "labels">
                            <div class = "label-text label-text-1">
                                <p class = "label-actual-text label-actual-text-1 temp-address-name">` + $(".address-full-name").val() + `</p>
                                <p class = "label-actual-text label-actual-text-2 temp-address-detail">` + $(".address-address-line-1").val() + ", " + $(".address-post-code").val() + `</p>
                            </div>
                        </label>
                    </div>
                    `)
                } else {
                    $(".delivery-choice").prepend(`
                    <div class = "delivery-method-type">
                        <input type = "radio" id = "delivery-address-1" name = "delivery-address" value = "address-choice-1" class = "radio-options" checked="checked">
                        <label for = "delivery-address-1" class = "labels">
                            <div class = "label-text label-text-1">
                                <p class = "label-actual-text label-actual-text-1 temp-address-name">` + $(".address-full-name").val() + `</p>
                                <p class = "label-actual-text label-actual-text-2 temp-address-detail">` + $(".address-address-line-1").val() + " " + $(".address-address-line-2").val() + ", " + $(".address-post-code").val() + `</p>
                            </div>
                        </label>
                    </div>
                    `)
                };
                $(".delivery-choice").css({
                    height: "auto"
                });
            } else {
                $(".temp-address-name").html($(".address-full-name").val());
                if ($(".address-address-line-2").val() == "") {
                    $(".temp-address-detail").html($(".address-address-line-1").val() + ", " + $(".address-post-code").val());
                } else {
                    $(".temp-address-detail").html($(".address-address-line-1").val() + " " + $(".address-address-line-2").val() + ", " + $(".address-post-code").val());
                };
            };
            $(".address-full-name, .address-phone-number, .address-address-line-1, .address-post-code").css({
                border: "0px solid red"
            });
            closeOverlay();
            tempData = [];
            $(".edit-address").html("Edit Temporary Address");
            $(".no-addresses").hide(0);
        }; 
    });

    $(".save-billing").click(function() {
        var valid = true;
        $(".billing-full-name, .billing-phone-number, .billing-address-line-1, .billing-post-code").css({
            border: "0px solid red"
        });
        if ($(".billing-full-name").val() == "") {
            valid = false;
            $(".billing-full-name").css({
                border: "1px solid red"
            });
        };
        if ($(".billing-phone-number").val() == "") {
            valid = false;
            $(".billing-phone-number").css({
                border: "1px solid red"
            });
        };
        if ($(".billing-address-line-1").val() == "") {
            valid = false;
            $(".billing-address-line-1").css({
                border: "1px solid red"
            });
        };
        if ($(".billing-post-code").val() == "") {
            valid = false;
            $(".billing-post-code").css({
                border: "1px solid red"
            });
        };
        if (valid == true) {
            if ($(".billing-address-line-2").val() == "") {
                $(".payment-address-preview-address").html($(".billing-full-name").val() + ", " + $(".billing-phone-number").val() + ", " + $(".billing-address-line-1").val() + ", " + $(".billing-post-code").val());
            } else {
                $(".payment-address-preview-address").html($(".billing-full-name").val() + ", " + $(".billing-phone-number").val() + ", " + $(".billing-address-line-1").val() + " " + $(".billing-address-line-2").val() + ", " + $(".billing-post-code").val());
            };
            $(".billing-full-name, .billing-phone-number, .billing-address-line-1, .billing-post-code").css({
                border: "0px solid red"
            });
            closeOverlay();
            tempData = [];
            $(".edit-payment-address").html("Edit");
        }; 
    });

    $(".change-quantity-add").click(function() {
        $(".order-summary-inner-text-row-1-right").html("S$" + String(parseFloat(parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) + parseFloat($(this).parent().siblings(".item-total").html().split("S$")[1]) * 1 / parseInt($(this).parent().children(".item-quantity").html())).toFixed(2)));
        $(this).parent().siblings(".item-total").html("S$" + String(parseFloat(parseFloat($(this).parent().siblings(".item-total").html().split("S$")[1]) * (parseInt($(this).parent().children(".item-quantity").html()) + 1) / parseInt($(this).parent().children(".item-quantity").html())).toFixed(2)));
        $(this).parent().children(".item-quantity").html(parseInt($(this).parent().children(".item-quantity").html()) + 1);
        updateDeliveryCost();
        calculateTax();
        updateTotalCost();
        if (checkEmptyCart() == true) {
            hideAll();
        };
    });

    $(".change-quantity-minus").click(function() {
        if ($(this).parent().children(".item-quantity").html() > 1) {            
            $(".order-summary-inner-text-row-1-right").html("S$" + String(parseFloat(parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) - parseFloat($(this).parent().siblings(".item-total").html().split("S$")[1]) * 1 / parseInt($(this).parent().children(".item-quantity").html())).toFixed(2)));
            $(this).parent().siblings(".item-total").html("S$" + String(parseFloat(parseFloat($(this).parent().siblings(".item-total").html().split("S$")[1]) * (parseInt($(this).parent().children(".item-quantity").html()) - 1) / parseInt($(this).parent().children(".item-quantity").html())).toFixed(2)));
            $(this).parent().children(".item-quantity").html(parseInt($(this).parent().children(".item-quantity").html()) - 1);
            updateDeliveryCost();
            calculateTax();
            updateTotalCost();
            if (checkEmptyCart() == true) {
                hideAll();
            };
        };
    });

    $(".remove-from-cart, .save-later").click(function() {
        // $(".cart-items-counter").html(parseInt($(".cart-items-counter").html()) - parseInt($(this).parent().siblings(".item-right-side-bottom-elements").children(".quantities").children(".item-quantity").html()));
        $(".order-summary-inner-text-row-1-right").html("S$" + String(parseFloat(parseFloat($(".order-summary-inner-text-row-1-right").html().split("S$")[1]) - parseFloat($(this).parent().siblings(".item-right-side-bottom-elements").children(".item-total").html().split("S$")[1])).toFixed(2)));
        $(this).parent().parent().parent().remove();
        if ($(".cart-items-counter").html() == "0") {
            $(".cart-items-counter").hide(0);
        };
        updateDeliveryCost();
        calculateTax();
        updateTotalCost();
        if (checkEmptyCart() == true) {
            hideAll();
        };
    });

    $(".go-to-checkout-overlay").click(function() {
        $("html, body").animate({scrollTop: $(".summary-region").offset().top}, 400);
    });

    $(".checkout").click(function() {
        deliveryOption = [$('input[name="delivery"]:checked').val(), $('input[name="delivery"]:checked').attr("id")];
        if (deliveryOption[1] == "delivery-1") {
            addressOption = [$('input[name="delivery-address"]:checked').val(), $('input[name="delivery-address"]:checked').siblings().children().children(".label-actual-text-1").html(), $('input[name="delivery-address"]:checked').siblings().children().children(".label-actual-text-2").html()];
        } else if (deliveryOption[1] == "delivery-2") {
            addressOption = [$('input[name="collection"]:checked').val(), $('input[name="collection"]:checked').siblings().children().children(".label-actual-text-1").html(), $('input[name="collection"]:checked').siblings().children().children(".label-actual-text-2").html()];
        };
        paymentOption = $('input[name="payment-address"]:checked').val();
        if (paymentOption.endsWith("--1") == true) {
            paymentOption = [paymentOption, "Cash On Delivery"];
        } else if (paymentOption.endsWith("-1") == true) {
            paymentOption = [paymentOption, $('.card-number').val(), $('.expiry-date').val(), $('.cvv').val()];
        };
        if ($(".payment-address-same").prop('checked') == true) {
            billingAddress = [true, ...addressOption];
        } else {
            billingAddress = [false, $(".billing-full-name").val(), $(".billing-phone-number").val(), $(".billing-address-line-1").val(), $(".billing-address-line-2").val(), $(".billing-post-code").val()];
        };
        console.log(deliveryOption, addressOption, paymentOption, billingAddress); // Your 4 vars to use (Click checkout to see how it looks like as guest (Logged in works as well except for payment method as card))
        // I will update payment ui for logged in users after they decide whether they want to keep the user cards or not
        // Insert checkout backend here (Also, pls validate in backend all values to double check that they were not modified and are legit)
        
        // End of Insert
        // window.location.reload(); // might change to redirect to orders
    });

    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (currentScrollPos > $(".summary-region").offset().top - window.innerHeight * 0.75) {
          $(".go-to-checkout-overlay").stop().fadeOut(250);
        } else {
            $(".go-to-checkout-overlay").stop().fadeIn(250);
        }
    }

    backCollection();
    // if value of items is zero, delivery methods, addresses and payment won't be clickable
    //$(".order-summary-inner-text-row-1-right").html("S$50.00") // For testing for custom values (Does not affect final payment value)
    if (checkEmptyCart() == false) {
        updateDeliveryCost();
        calculateTax();
    };
    
});
