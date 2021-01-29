import json
from .models import *

def CookieCart(request):
    try:
        cart = json.loads(request.COOKIES['cart'])
    except:
        cart = {}
    items = []
    cartItem = 0
    for productid in cart:
        try:
            cartItem += cart[productid]["quantity"]
            product_obj = Product.objects.get(id=productid)
            total = (product_obj.price * cart[productid]["quantity"])
            item = {
                'product': {
                    'id': product_obj.id,
                    'name': product_obj.product_name,
                    'price': product_obj.price,
                    'imageURL': product_obj.imageURL
                },
                'quantity': cart[productid]['quantity'],
                'get_total': total,
            }
            items.append(item)
        except:
            pass
    return [cartItem,items]

def cartData(request):
    if request.user.is_authenticated:
        customer = request.user
        order,created = Order.objects.get_or_create(customer=customer)
        items = order.orderitem_set.all()
        cartItem = order.get_cart_items
        CartTotal = 0
        for item in items:
            CartTotal += item.get_total
    else:
        cartItem,items = CookieCart(request)
        CartTotal = 0
        for item in items:
            CartTotal+=item["get_total"]

    return [cartItem,items,CartTotal]

def WishlistData(request):
    if request.user.is_authenticated:
        customer = request.user
        wishlist,created = Wishlist.objects.get_or_create(customer=customer)
        items = wishlist.wishlistitem_set.all()

        order, created = Order.objects.get_or_create(customer=customer)


        cartItem = order.get_cart_items
        CartTotal = 0
        for item in items:
            CartTotal += item.get_total

    return [cartItem, items, CartTotal]