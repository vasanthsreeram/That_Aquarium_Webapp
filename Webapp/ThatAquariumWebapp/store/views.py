from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from .models import *
from .forms import CreateUserForm


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

def account(request):
    context = {}
    return render(request,'home_page/account.html')

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

def wishlist(request):
    context = {}
    return render(request,'home_page/cart.html')

def membership(request):
    context = {}
    return render(request,'home_page/membership.html')

def address(request):
    context = {}
    return render(request,'home_page/address.html')

def payment(request):
    context = {}
    return render(request,'home_page/payment.html')

def settings(request):
    context = {}
    return render(request,'home_page/settings.html')

def login(request):
    context = {}
    return render(request,'home_page/login.html')

def register(request):
    form = CreateUserForm()
    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')

    context = {'form':form}
    return render(request,'home_page/register.html',context)