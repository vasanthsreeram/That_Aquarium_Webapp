from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
from .forms import CreateUserForm
from .utils import *



def home(request):
    products = Product.objects.filter(display_type="H")
    items,CartTotal =cartData(request)
    cartItem = cartItemData(request)
    if request.method =="POST":
        id = int(request.POST.get("view")[0])
        display_product = None
        for product in products:
            if product.id == id:
                display_product = product
                break
        context = {"product":display_product,"cartItems": cartItem}
        return render(request,'home_page/product.html',context)
    context = {"items": items,"products": products,"cartItems": cartItem}
    return render(request,'home_page/front_page.html',context)

def cart(request):
    items,CartTotal =cartData(request)
    cartItem = cartItemData(request)
    context = {'cartItems':cartItem,"items":items,"CartTotal":CartTotal}
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

    if request.method =="POST":
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
    context = {"cartItems": cartItem}
    return render(request,'home_page/featured.html',context)

def hot_deals(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/hot.html',context)

def search(request):
    try:
        query = request.get_full_path().split("/search/?=")[1]
    except:
        return render(request,'home_page/search.html', {"results": []})
    else:
        results = ["lol"]
        print(query)
        return render(request,'home_page/search.html', {"results": results}) #results is a list of results to return

def orders(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/orders.html',context)



@login_required(login_url="login")
def membership(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/membership.html',context)



def payment(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/payment.html',context)

@login_required(login_url="login")
def settings(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request,'home_page/settings.html',context)

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
    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        #for the email validation there is a built feature in every browser
        if form.is_valid():
            saved_user = form.save()
            group = Group.objects.get(name='Member')
            saved_user.groups.add(group)

            messages.success(request,"Successfully created your account. Please confirm your email and login again.")
            return redirect('login')
    context = {'form': form}
    return render(request,'home_page/register.html',context)

def privacy(request):
    cartItem = cartItemData(request)
    context = {"cartItems": cartItem}
    return render(request, 'home_page/privacy_policy.html',context)

def forget(request):
    cartItem = cartItemData(request)
    return render(request, 'home_page/forget_password.html')

def updateAddress(request):
    data = json.loads(request.body)
    # name = data["name"]
    # phone = data["phone"]
    # address1 = data["address1"]
    # address2 = data["address2"]
    # postcode = data["postcode"]
    # action = data["action"]
    print(data)
    # if action== "add":
    #     pass
    # elif action == "":
    #     pass


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