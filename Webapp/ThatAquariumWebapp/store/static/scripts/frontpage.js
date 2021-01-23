//I am gonna add a js for the add to cart function you can modify it if it suits you btr just make sure everything works in the end
var updatebtns = document.getElementsByClassName('update-cart')

for (var i = 0; i < updatebtns.length; i++) {
    updatebtns[i].addEventListener('click', function () {
        var productID = this.dataset.product
        var action = this.dataset.action
        console.log('ProductID:', productID, "action:", action)

        console.log("user", user)
        if (user === 'AnonymousUser') {
            addCookieItem(productID,action)
        } else {
            console.log("yep logged in ")
            updateUserOrder(productID, action)
        }
    })
}

function addCookieItem(productID, action) {
    console.log("hi")
    if (action == 'add') {
        if (cart[productID] == undefined) {
            cart[productID] = {'quantity': 1}
        } else {
            cart[productID]['quantity'] += 1

        }
    }
    if (action == "remove") {
        cart[productID]['quantity'] -= 1
        if (cart[productID]['quantity'] <= 0) {
            console.log("removing the item")
            delete cart[productID]
        }

    }
    console.log(cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
}

function updateUserOrder(productID,action) {
    console.log(csrftoken)
    var url = 'update_item/'
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
            console.log(data)
            location.reload()
        })
}