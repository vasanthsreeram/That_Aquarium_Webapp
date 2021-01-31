//I am gonna add a js for the add to cart function you can modify it if it suits you btr just make sure everything works in the end
var updatebtns = document.getElementsByClassName('update-cart')

for (var i = 0; i < updatebtns.length; i++) {
    updatebtns[i].addEventListener('click', function () {
        var productID = this.dataset.product
        var action = this.dataset.action
        var qty = Number(this.dataset.qty)
        console.log(user)
        console.log("qty :" , qty.toString())
        if (action.length == 1) {
            if (action == "w") {

                updateUserOrder(productID, "deletec")
                for (var i = 0; i < qty; i++) {
                    setTimeout(function () {
                        updateUserOrder(productID, "addw")
                    }, (i + i + 1) * 400);
                }

            } else {
                if (action == "c") {
                    updateUserOrder(productID, "deletew")
                    for (var i = 0; i < qty; i++) {
                        setTimeout(function () {
                            updateUserOrder(productID, "addc")
                        }, (i + i + 1) * 400);
                    }
                }
            }
        }
        else{
            if (user === 'AnonymousUser') {
                addCookieItem(productID, action)
            }
            else {
                updateUserOrder(productID, action)
            }
        }

    })
}

function addCookieItem(productID, action) {

    if (action == 'add') {
        if (cart[productID] == undefined) {
            cart[productID] = {'quantity': 1}
            if ($(".cart-items-counter").html() == "0") {
                $(".cart-items-counter").show(0);
            };
            $(".cart-items-counter").html(parseInt($(".cart-items-counter").html()) + 1);
        } else {
            cart[productID]['quantity'] += 1
            $(".cart-items-counter").html(parseInt($(".cart-items-counter").html()) + 1);
        }
    }
    if (action == "remove") {
        cart[productID]['quantity'] -= 1
        $(".cart-items-counter").html(parseInt($(".cart-items-counter").html()) - 1);
        // if (cart[productID]['quantity'] <= 0) {
        //     delete cart[productID]
        // }
    }
    if (action == "delete") {
        delete cart[productID];
    };
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
}

function updateUserOrder(productID,action) {
    console.log("productID",productID)
    console.log("action", action)
    var url = '/update_item/'
    fetch(url, { //this is a way to send data as a json to another link using an api
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type':'application/json',

        },
        body: JSON.stringify({'productID': productID, 'action': action}),
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            window.location.reload()
        })
}