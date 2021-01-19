from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from .models import *
from .forms import CreateUserForm
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required

def home(request):
    products = Product.objects.all()
    context = {"products": products}
    return render(request,'home_page/front_page.html',context)

def cart(request):
    context = {}
    return render(request,'home_page/cart.html',context)

def checkout(request):
    context = {}
    return render(request,'home_page/checkout.html',context)

@login_required(login_url="login")
def account(request):
    context = {}
    return render(request,'home_page/account.html')

def terms(request):
    context = {}
    return render(request,'home_page/terms.html')

def FAQ(request):
    context = {}
    return render(request,'home_page/FAQ.html')

def About(request):
    context = {}
    return render(request,'home_page/about.html')

def new_arrival(request):
    context = {}
    return render(request,'home_page/new_arrival.html')

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
    return render(request,'home_page/cart.html')

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
            messages.info(request,"incorrect pass or username")
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
        if form.is_valid():
            form.save()

            messages.success(request,f"account has been created for {form.cleaned_data.get('username')}")
            return redirect('login')

    context = {'form':form}
    return render(request,'home_page/register.html',context)