//I am gonna add a js for the add to cart function you can modify it if it suits you btr just make sure everything works in the end
var updatebtns = document.getElementsByClassName('update-cart')

for (var i = 0; i < updatebtns.length; i++) {
    updatebtns[i].addEventListener('click', function () {
        var productID = this.dataset.product
        var action = this.dataset.action
        console.log('ProductID:', productID, "action:", action)

        console.log("user", user)
        if (user === 'AnonymousUser') {
            console.log('not looged in bro')
        } else {
            console.log("yep logged in ")
            updateUserOrder(productID, action)
        }
    })
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