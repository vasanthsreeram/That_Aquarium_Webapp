var keyPresses = 0;

$(document).ready(function() {

    function saveOptions() {

        var valid = true;
        clearBorder();

        if (checkNotificationValid() == false) {
            valid = false;
            $(".notifications-background").css({
                borderColor: "red"
            });
        };

        if (checkEmailValid() == false) {
            console.log("email-invalid")
            valid = false;
            $(".email").css({
                backgroundColor: "rgba(255, 0, 0, 0.25)"
            });
        };

        if (checkNameValid() == false) {
            valid = false;
            $(".full-name").css({
                backgroundColor: "rgba(255, 0, 0, 0.25)"
            });
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
        $(".settings-category-background").css({
            borderColor: "rgba(255, 0, 0, 0)"
        });
        $(".email, .full-name").css({
            backgroundColor: "rgba(255, 0, 0, 0)"
        });
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
        if ($(this).children().prop('checked') == true) {
            $(this).children().prop('checked', false);
            $(this).removeClass("input-with-label-checked");
        } else {
            $(this).children().prop('checked', true);
            $(this).addClass("input-with-label-checked");
        };
    });

    $(".input-with-label").children().each(function() {
        if ($(this).prop("checked") == true) {
            $(this).parent().addClass("input-with-label-checked");
        };
    });

});