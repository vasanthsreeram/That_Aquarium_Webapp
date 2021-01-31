//I am gonna add a js for the add to cart function you can modify it if it suits you btr just make sure everything works in the end
var updatebtns = document.getElementsByClassName('update-cart')
var loopAnimationTime = 350; // time in ms

for (var i = 0; i < updatebtns.length; i++) {
    updatebtns[i].addEventListener('click', function () {
        var productID = this.dataset.product
        var action = this.dataset.action
        var qty = parseInt($(this).parent().siblings(".item-right-side-bottom-elements").children(".quantities").children(".item-quantity").html());
        console.log(user)
        console.log("qty :" , qty.toString())

        if (action.length == 1) {
            if (action == "w") {
                updateUserOrder(productID, "deletec")
                updateUserOrdermanytimes(productID, "addwm",qty)
                for (var i = 0; i < qty; i++) {
                    setTimeout(function () {
                        deductCartValue();
                    }, (i + i + 1) * loopAnimationTime/qty);
                }   
            } else {
                if (action == "c") {
                    updateUserOrder(productID, "deletew")
                    updateUserOrdermanytimes(productID, "addcm",qty)
                    for (var i = 0; i < qty; i++) {
                        setTimeout(function () {
                            addCartValue();
                        }, (i + i + 1) * loopAnimationTime/qty);
                    }
                }
            }
        }
        else{
            if (user === 'AnonymousUser') {
                action = action.slice(0, action.length -1);
                addCookieItem(productID, action);
            }
            else {
                updateUserOrder(productID, action)
                if (action == "addc") {
                    addCartValue();
                } else if (action == "removec") {
                    deductCartValue();
                };
            }
        }
    })
}

function addCookieItem(productID, action) {

    if (action === 'add') {
        if (cart[productID] === undefined) {
            cart[productID] = {'quantity': 1}
        } else {
            cart[productID]['quantity'] += 1
        }
        addCartValue();
    }
    if (action === "remove") {
        if (cart[productID]['quantity'] > 1) {
            deductCartValue();
            cart[productID]['quantity'] -=1
        }
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
            // window.location.reload() // to be removed cause no need refresh upon change in qty
        })
};

function addCartValue() {
    if ($(".cart-items-counter").html() === "0") {
        $(".cart-items-counter").show(0);
    };
    $(".cart-items-counter").html(parseInt($(".cart-items-counter").html()) + 1);
};

function deductCartValue() {
    $(".cart-items-counter").html(parseInt($(".cart-items-counter").html()) - 1);
    if ($(".cart-items-counter").html() === "0") {
        $(".cart-items-counter").hide(0);
    };
};

function updateUserOrdermanytimes(productID,action,qty) {
    console.log("productID",productID)
    console.log("action", action)
    console.log("qty",qty)
    var url = '/update_item/'
    fetch(url, { //this is a way to send data as a json to another link using an api
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'Content-Type':'application/json',
            
        },
        body: JSON.stringify({'productID': productID, 'action': action,"qty":qty}),
    })
    .then((response) => {
        return response.json()
        })
        .then((data) => {
            // window.location.reload() // to be removed cause no need refresh upon change in qty
        })
};
    

$(document).ready(function() {
    $(".remove-from-cart").click(function() {
        qty = parseInt($(this).parent().siblings(".item-right-side-bottom-elements").children(".quantities").children(".item-quantity").html());
        for (var i = 0; i < qty; i++) {
            setTimeout(function () {
                deductCartValue();
            }, (i + i + 1) * 40);
        }
    });
});