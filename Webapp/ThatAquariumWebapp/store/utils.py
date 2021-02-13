from django.shortcuts import redirect
from django.core.mail import EmailMessage
from django.contrib import messages
from django.contrib.auth.models import Group
from .forms import CreateUserForm
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import json
from .models import *
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from six import text_type



class AppTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (text_type(user.is_active)+text_type(user.pk)+text_type(timestamp))
TokenGenerator = AppTokenGenerator()

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
                    'product_name': product_obj.product_name,
                    'price': product_obj.price,
                    'imageURL': product_obj.imageURL,
                    'description': product_obj.description
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
        CartTotal = 0
        for item in items:
            CartTotal += item.get_total
    else:
        cartItem,items = CookieCart(request)
        CartTotal = 0
        for item in items:
            CartTotal+=item["get_total"]

    return [items,CartTotal]

def WishlistData(request):
    if request.user.is_authenticated:
        customer = request.user
        wishlist,created = Wishlist.objects.get_or_create(customer=customer)
        items = wishlist.wishlistitem_set.all()
        CartTotal = 0
        for item in items:
            CartTotal += item.get_total

    return [ items, CartTotal]

def cartItemData(request):
    if request.user.is_authenticated:

        customer = request.user
        order, created = Order.objects.get_or_create(customer=customer)
        cartItem = order.get_cart_items
    else:
        cartItem,items = CookieCart(request)
    return cartItem

def addressData(request):
    if request.user.is_authenticated:
        customer = request.user

        address = customer.address_set.all()
        print(address)

    return address


def registeruser(request):
    form = CreateUserForm(request.POST)
    if form.is_valid():
        saved_user = form.save()
        # group = Group.objects.get(name='Member')
        # saved_user.groups.add(group)
        pending_user = User.objects.get(username=form.data["username"])
        pending_user.is_active = False
        pending_user.email = form.data["username"]
        pending_user.save()


        uidb64 = urlsafe_base64_encode(force_bytes(pending_user.pk))

        domain = get_current_site(request).domain
        link = reverse('activate',kwargs={"uidb64":uidb64,"token":TokenGenerator.make_token(pending_user)})

        activate_url = "http://"+domain+link

        email_variables = {
            "name": form.data["first_name"],
            "link": activate_url,

        }
        template = render_to_string('home_page/EmailActivation.html', email_variables)
        email = EmailMessage(
            "subject test",
            template,
            "vasanthsreeramcode@gmail.com",
            [form.data['username']]

        )
        email.send(fail_silently=False)

        messages.success(request,"Successfully created your account. Please activate your email and login again.")
        return redirect('login')