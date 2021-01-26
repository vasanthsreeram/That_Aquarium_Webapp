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
    cartItem,items,CartTotal =cartData(request)
    if request.method =="POST":
        id = int(request.POST.get("view")[0])
        display_product = None
        for product in products:
            if product.id == id:
                display_product = product
                break
        context = {"product":display_product}
        return render(request,'home_page/product.html',context)
    context = {"items": items,"products": products,"cartItems": cartItem}
    return render(request,'home_page/front_page.html',context)

def cart(request):
    cartItem,items,CartTotal =cartData(request)

    context = {'cartItems':cartItem,"items":items,"CartTotal":CartTotal}
    return render(request,'home_page/cart.html',context)

def product(request):

    context = {}
    return render(request,"home_page/product.html",context)


def checkout(request):


    context = {}
    return render(request,'home_page/checkout.html',context)



@login_required(login_url="login")
def account(request):
    context = {}
    return render(request,'home_page/account.html')

def new_arrival(request):
    products = Product.objects.filter(display_type="N")
    cartItem,items,CartTotal =cartData(request)
    if request.method =="POST":
        id = int(request.POST.get("view")[0])
        display_product = None
        for product in products:
            if product.id == id:
                display_product = product
                break
        context = {"product":display_product}
        return render(request,'home_page/product.html',context)
    context = {"items": items,"products": products,"cartItems": cartItem}
    return render(request,'home_page/new_arrival.html',context)

def featured(request):
    context = {}
    return render(request,'home_page/featured.html')

def hot_deals(request):
    context = {}
    return render(request,'home_page/hot.html')

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
    context = {}
    return render(request,'home_page/orders.html')

@login_required(login_url="login")
def wishlist(request):
    context = {}
    return render(request,'home_page/wishlist.html')

@login_required(login_url="login")
def membership(request):
    context = {}
    return render(request,'home_page/membership.html')

def address(request):
    context = {}
    return render(request,'home_page/address.html')

def payment(request):
    context = {}
    return render(request,'home_page/payment.html')

@login_required(login_url="login")
def settings(request):
    context = {}
    return render(request,'home_page/settings.html')

def loginpage(request):
    if request.user.is_authenticated:
        return redirect('front_page')
    if request.method == 'POST':
        username = request.POST.get("username")
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
    return render(request, 'home_page/privacy_policy.html')

def forget(request):
    return render(request, 'home_page/forget_password.html')


def updateItem(request):

    data = json.loads(request.body)
    productID = data['productID']
    action = data['action']
    #print(f'this is the product ID {productID} and this is the action that should be carried out {action}')

    customer= request.user
    product = Product.objects.get(id=productID)
    order,created = Order.objects.get_or_create(customer=customer,)

    orderItem,created = Orderitem.objects.get_or_create(order=order,product=product)

    if action == 'add':
        orderItem.quantity +=1
    elif action == 'remove':
        orderItem.quantity -=1
    orderItem.save()

    if orderItem.quantity <= 0:
        orderItem.delete()

    return JsonResponse('Item was added',safe=False)

def terms(request):
    context = {}
    return render(request,'home_page/terms.html')

def FAQ(request):
    context = {}
    return render(request,'home_page/FAQ.html')

def about(request):
    context = {}
    return render(request,'home_page/about.html')

def contact(request):
    context = {}
    return render(request,'home_page/contact.html')