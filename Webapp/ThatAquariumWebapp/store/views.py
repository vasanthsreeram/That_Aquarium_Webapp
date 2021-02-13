from django.shortcuts import render,redirect
from django.core.mail import EmailMessage
from django.http import HttpResponse,JsonResponse
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from .forms import CreateUserForm
from django.template.loader import render_to_string
from .utils import *
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

def get_product(request, products, cartItem):
    id = int(request.POST.get("view")[0])   
    display_product = None
    for product in products:
        if product.id == id:
            display_product = product
            break
    context = {"product":display_product,"cartItems": cartItem}
    return render(request,'home_page/product.html',context)


def home(request):
    products = Product.objects.filter(display_type="H")
    items,CartTotal =cartData(request)
    cartItem = cartItemData(request)
    if request.method =="POST":
        return get_product(request, products, cartItem)
    context = {"items": items,"products": products,"cartItems": cartItem, "carousel": [["Christmas Carousel Test.png", 0], ["Christmas Carousel Test.png", 1], ["Christmas Carousel Test.png", 2]]}
    return render(request,'home_page/front_page.html', context)

def cart(request):
    items, CartTotal = cartData(request)
    print(items)
    cartItem = cartItemData(request)
    addresses = None
    if request.user.is_authenticated:
        addresses = addressData(request)

    context = {'cartItems':cartItem,"items":items,"CartTotal":CartTotal,"addresses":addresses}
    return render(request,'home_page/cart.html',context)

@login_required(login_url="login")
def wishlist(request):
    items, CartTotal = WishlistData(request)
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem,"items":items,"CartTotal":CartTotal}
    return render(request,'home_page/wishlist.html',context)

def product(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,"home_page/product.html",context)


def checkout(request):
    cartItem = cartItemData(request)

    context = {"cartItems": cartItem}
    return render(request,'home_page/checkout.html',context)



@login_required(login_url="login")
def account(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/account.html',context)

def new_arrival(request):
    cartItem = cartItemData(request)
    products = Product.objects.filter(display_type="N")
    items,CartTotal =cartData(request)
    if request.method =="POST" and request.POST.get("view") != None:
        id = int(request.POST.get("view")[0])
        display_product = None
        for product in products:
            if product.id == id:
                display_product = product
                break
        context = {"product":display_product,"cartItems": cartItem}
        return render(request,'home_page/product.html',context)
    context = {"items": items,"products": products,"cartItems": cartItem}
    return render(request,'home_page/new_arrival.html',context)

def featured(request):
    cartItem = cartItemData(request)
    products = Product.objects.filter(display_type="H")
    context = {"cartItems": cartItem, "products": products}
    if request.method =="POST" and request.POST.get("view") != None:
        return get_product(request, products, cartItem)
    return render(request,'home_page/featured.html',context)

def hot_deals(request):
    products = Product.objects.filter(display_type="H")
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem, "products": products}
    if request.method =="POST" and request.POST.get("view") != None:
        return get_product(request, products, cartItem)
    return render(request,'home_page/hot.html',context)

def search(request):

    try:
        is_member = request.user.groups.filter(name="Member").exists()
        query = request.get_full_path().split("/search/?result=")[1]
        print(query)
        result = Product.objects.filter(product_name__contains=query)
        if result.exists():
            results = []

            for item in result:
                print("things",item)
                results.append(item)
            return render(request, 'home_page/search.html', {"results": results,"membership":is_member})
        else:
            print("nothing found")

    except:
        return render(request,'home_page/search.html', {"results": []})
    else:


        results = ["lol", "wut"]


        categories = [
            ["Accessories", 
                []
            ], 
            ["Aeration", 
                ["Aeration Accessories", "Air Pump", "Air Stone"]
            ],
            ["Cleaning", 
                ["Battery Cleaner Device", "Cleaning Set", "Dropper/Siphon", "Hand Pump/Gravel Cleaner", "Hose Brush", "Magnet Cleaner", "Others-Cleaning", "Tank Scraper", "Tank Brush"]
            ]
        ] 
        # list of list with first element as category item, second as a counter because django cannot do range and third as subcategories with each list having the second element as counter
        # the counter is added in the following for loop
        for x, i in enumerate(categories):
            i.append(x + 1)
            if len(i[1]) != 0:
                for y, j in enumerate(i[1]):
                    categories[x][1][y] = [j, y + 1]
                    # print(j)

        if len(results) == 0:
            results = ["No Search Results Found"]
        return render(request,'home_page/search.html', {"results": results, "categories": categories}) #results is a list of results to return


@login_required(login_url="login")
def orders(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/orders.html',context)



@login_required(login_url="login")
def membership(request):
    cartItem = cartItemData(request)

    member = request.user.groups.get()
    print(member)

    context = {"cartItems": cartItem,"member":member}

    return render(request,'home_page/membership.html',context)



# def payment(request):
#     cartItem = cartItemData(request)
#     context = {"cartItems": cartItem}
#     return render(request,'home_page/payment.html',context)

@login_required(login_url="login")
def settings(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/settings.html',context)

@login_required(login_url="login")
def address(request):
    cartItem = cartItemData(request)
    addresses = addressData(request)

    context = {"cartItems": cartItem,"addresses":addresses}
    return render(request,'home_page/address.html',context)

def loginpage(request):
    if request.user.is_authenticated:
        return redirect('front_page')
    if request.method == 'POST':
        username = request.POST.get("username"  )
        password = request.POST.get("password")

        user = authenticate(request,username= username,password= password)

        if user is not None:
            login(request,user)
            return redirect("front_page")
        elif User.objects.get(username=username).is_active == False:
            messages.info(request,"Activate your account using the link sent to your email")
        else:
            messages.info(request,"Invalid Email or Password")
    context = {}
    return render(request,'home_page/login.html')

def logoutUser(request):

    logout(request)
    return redirect("login")

def registerpage(request):


    if request.user.is_authenticated:# this basically checks if the user is logged in
        #you can put a message if you want
        return redirect('front_page')

    if request.method == 'POST':
        return registeruser(request)
    form = CreateUserForm()

    context = {'form': form}
    return render(request,'home_page/register.html',context)

def verificationview(request,uidb64,token):
    try:
        id = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=id)

        if not TokenGenerator.check_token(user, token):
            return redirect('login' + '?message=' + 'User already activated')

        if user.is_active:
            return redirect('login')
        user.is_active = True
        user.save()

        messages.success(request, 'Account activated successfully')
        return redirect('login')

    except Exception as ex:
        pass

    return redirect('login')

def privacy(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request, 'home_page/privacy_policy.html',context)

def updateAddress(request):
    data = json.loads(request.body)

    action = data["action"]

    customer = request.user
    adddress_ids = []
    for address_inset in Address.objects.filter(customer=customer):
        adddress_ids.append(address_inset.id)
    id = int(data["id"])
    print("client id:",id)
    print(adddress_ids)
    if action == "add":
        name = data["name"]
        phone = data["phone"]
        address1 = data["address1"]
        address2 = data["address2"]
        postcode = data["postcode"]
        addr = Address.objects.create(customer=customer, fullname=name, phone=phone, address1=address1, address2=address2, postcode=postcode)
        addr.save()

        return JsonResponse('Address was added', safe=False)
    elif action == "remove" and id in adddress_ids:

        addr = Address.objects.get(id=id)
        addr.delete()
        return JsonResponse('Address was removed', safe=False)
    elif action == "edit" and id in adddress_ids:

        name = data["name"]
        phone = data["phone"]
        address1 = data["address1"]
        address2 = data["address2"]
        postcode = data["postcode"]
        addr = Address.objects.get(id=id)

        addr.fullname = name
        addr.phone = phone
        addr.address1 = address1
        addr.address2 = address2
        addr.postcode = postcode
        addr.save()
        return JsonResponse('Address was modified', safe=False)

    return JsonResponse('Error',safe=False)


def updateItem(request):
    data = json.loads(request.body)
    productID = data['productID']
    action = data['action']
    loc = action[-1]
    action = action[0:-1]

    #print(f'this is the product ID {productID} and this is the action that should be carried out {action}')
    if loc=="c":
        customer= request.user
        product = Product.objects.get(id=productID)
        order,created = Order.objects.get_or_create(customer=customer,)

        orderItem,created = Orderitem.objects.get_or_create(order=order,product=product)

        if action == 'add':
            orderItem.quantity +=1
        elif action == 'remove':
            if orderItem.quantity > 1:
                orderItem.quantity -=1
        elif action == "delete":
            orderItem.quantity = 0
        orderItem.save()

        if orderItem.quantity <= 0:
            orderItem.delete()
    elif loc == "w":
        customer = request.user
        product = Product.objects.get(id=productID)
        order, created = Wishlist.objects.get_or_create(customer=customer)

        orderItem, created = WishlistItem.objects.get_or_create(order=order, product=product)

        if action == 'add':
            orderItem.quantity += 1
        elif action == 'remove':
            if orderItem.quantity > 1:
                orderItem.quantity -= 1
        elif action == "delete":
            orderItem.quantity = 0
        orderItem.save()

        if orderItem.quantity <= 0:
            orderItem.delete()
    elif loc == "m":
        customer = request.user
        product = Product.objects.get(id=productID)
        qty = int(data["qty"])
        loc = action[-1]
        if loc=="c":
            order, created = Order.objects.get_or_create(customer=customer)
            orderItem, created = Orderitem.objects.get_or_create(order=order, product=product)
            orderItem.quantity+=qty
            orderItem.save()
        elif loc=="w":
            order, created = Wishlist.objects.get_or_create(customer=customer)
            orderItem, created = WishlistItem.objects.get_or_create(order=order, product=product)
            orderItem.quantity+=qty
            orderItem.save()


    return JsonResponse('Item was added',safe=False)

def terms(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/terms.html',context)

def FAQ(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/FAQ.html',context)

def about(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/about.html',context)

def contact(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/contact.html',context)