var keyPresses = 0;

$(document).ready(function() {

    function saveOptions() {

        var valid = true;
        clearBorder();

        if (checkNotificationValid() == false) {
            valid = false;
            $(".notifications-background").children().children().addClass("error-text");
        };

        if (checkEmailValid() == false) {
            console.log("email-invalid")
            valid = false;
            $(".email").addClass("error-text-input");
            $(".email").siblings().addClass("error-text");
        };

        if (checkNameValid() == false) {
            valid = false;
            $(".full-name").addClass("error-text-input");
            $(".full-name").siblings().addClass("error-text");
        };

        if (valid == true) {

            var email = $(".email").val();
            var name = $(".full-name").val();
            var sendEmail = $(".email-check").prop('checked'); //bool
            var sendSMS = $(".sms").prop('checked') //bool
            var hideReviews = $(".hide-review").prop('checked') //bool
    
            // Add save to backend here


        };

    };

    function checkNotificationValid() {
        return $(".email-check").prop('checked') == true || $(".sms").prop('checked') == true;
    };

    function checkEmailValid() {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String($(".email").val()).toLowerCase());
    };

    function checkNameValid() {
        return $(".full-name").val().length != 0;
    };

    function clearBorder() {
        $(".settings-category-background").children().children().removeClass("error-text");
        $(".email, .full-name").removeClass("error-text-input");
        $(".email, .full-name").siblings().removeClass("error-text");
    };

    $(document).click(function() {
        saveOptions();
    });

    $(".input-with-placeholder").keyup(function() {
        keyPresses++; // For multiple key presses at once
        setTimeout(function() {
            keyPresses--;
            if (keyPresses == 0) {
                saveOptions();
            };
        }, 1500)
    });

    $(".input-with-label").click(function() {
        if ($(this).children("div").children("input").prop('checked') == true) {
            $(this).children("div").children("input").prop('checked', false);
            $(this).children("div").css({
                backgroundColor: "rgba(100, 100, 100, 0.75)"
            });
            $(this).removeClass("input-with-label-checked");
        } else {
            $(this).children("div").children("input").prop('checked', true);
            $(this).children("div").css({
                backgroundColor: "rgba(163, 63, 20, 0.75)"
            });
            $(this).addClass("input-with-label-checked");
        };
    });

    $(".custom-check-field").click(function() { // Somehow the above function doesn't work for .custom-check-field so this is needed
        if ($(this).prop('checked') == true) {
            $(this).prop('checked', false);
            $(this).parent().css({
                backgroundColor: "rgba(100, 100, 100, 0.75)"
            });
            $(this).parent().parent().removeClass("input-with-label-checked");
        } else {
            $(this).prop('checked', true);
            $(this).parent().css({
                backgroundColor: "rgba(163, 63, 20, 0.75)"
            });
            $(this).parent().parent().addClass("input-with-label-checked");
        };
    });

    $(".input-with-label").children("div").children().each(function() {
        if ($(this).prop("checked") == true) {
            $(this).parent().parent().addClass("input-with-label-checked");
            $(this).parent().css({
                backgroundColor: "rgba(163, 63, 20, 0.75)"
            });
        };
    });

});