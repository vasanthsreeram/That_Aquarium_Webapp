var overlayState = -1 // -1 for none, 0 for edit, 1 for new

$(document).ready(function() {

    function hideAll() {
        $(".content-overlay, .new-address-overlay, .edit-address-overlay").fadeOut(200);
    };

    $(".cancel-address").click(function() {
        if (overlayState == 0) {
            $("#full-name, #phone-number, #address-line-1, #address-line-2, #post-code").val("");
            overlayState = -1;
        } else if (overlayState == 1) {
            $("#full-name-new, #phone-number-new, #address-line-1-new, #address-line-2-new, #post-code-new").val("");
            overlayState = -1;
        };
        hideAll();
    });

    $(".new-address").click(function() {
        overlayState = 1;
        $(".content-overlay, .new-address-overlay").fadeIn(200);
    });

    $(".edit").click(function() {
        overlayState = 0;
        $(".content-overlay, .edit-address-overlay").fadeIn(200);
        var name = $(this).siblings(".details").children(".details-specific-1").children(".details-name-value").html();
        var addr1 = $(this).siblings(".details").children(".details-specific-2").children(".details-address-value-1").html();
        var addr2 = $(this).siblings(".details").children(".details-specific-2").children(".details-address-value-2").html();
        var post = $(this).siblings(".details").children(".details-specific-2").children(".details-address-value-3").html();
        var phone = $(this).siblings(".details").children(".details-specific-3").children(".details-number-value").html();
        addr1 = addr1.slice(0, addr1.length - 1)
        addr2 = addr2.slice(0, addr2.length - 1)
        $("#full-name").val(name);
        $("#phone-number").val(phone);
        $("#address-line-1").val(addr1);
        $("#address-line-2").val(addr2);
        $("#post-code").val(post);
    });

    $(".remove").click(function() {
        //Insert informing backend of removal of address here

        //end of insert
        $(this).parent().remove();
    });

    $(".new-address-final").click(function() {
        // all the necessary details are stored here
        var name = $(".full-name-new").val();
        var addr1 = $(".address-line-1-new").val();
        var addr2 = $(".address-line-2-new").val();
        var post = $(".post-code-new").val();
        var phone = $(".phone-number-new").val();
        var action = "add"

        console.log(name,addr1,addr2,post,phone,action)

        //Insert informing backend of new address here 
        updateAddress(name,addr1,addr2,post,phone,action)
        //end of insert

        //window.location.reload();
    });

    $(".save-address-final").click(function() {
        // all the necessary details are stored here
        var name = $(".full-name").val();
        var addr1 = $(".address-line-1").val();
        var addr2 = $(".address-line-2").val();
        var post = $(".post-code").val();
        var phone = $(".phone-number").val();
        var action = "add"
        console.log(name,addr1,addr2,post,phone,action)
        updateAddress(name,addr1,addr2,post,phone,action)
        //Insert informing backend of edited address here 

        //end of insert

        //window.location.reload();
    });

    $(".content-overlay-clickable").click(function() {
        hideAll();
        if (overlayState == 0) {
            $("#full-name, #phone-number, #address-line-1, #address-line-2, #post-code").val("");
            overlayState = -1;
        } else if (overlayState == 1) {
            $("#full-name-new, #phone-number-new, #address-line-1-new, #address-line-2-new, #post-code-new").val("");
            overlayState = -1;
        };
    }); 

});

function updateAddress(name,addr1,addr2,post,phone,action){
    console.log("token")
    console.log(csrftoken)
    console.log("loaction being added")
    console.log(name,addr1,addr2,post,phone,action)
    var url = '/update_address/'
    fetch(url, { //this is a way to send data as a json to another link using an api
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type':'application/json',
        },
        body: JSON.stringify({"name":name,"phone":phone,"address1":addr1,"address2":addr2,"postcode":post,"action":action}),
    })


}