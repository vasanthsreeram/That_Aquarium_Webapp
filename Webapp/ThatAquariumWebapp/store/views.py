from django.shortcuts import render
from django.http import HttpResponse


from .models import *
def home(request):
    products = Product.objects.all()
    context = {"products": products}
    return render(request,'home_page/front_page.html',context)
# Create your views here.
def cart(request):
    context = {}
    return render(request,'home_page/cart.html',context)

def checkout(request):
    context = {}
    return render(request,'home_page/checkout.html',context)

def account(request):
    context ={}
    return render(request,'home_page/account.html')

def terms(request):
    context ={}
    return render(request,'home_page/terms.html')
def FAQ(request):
    context ={}
    return render(request,'home_page/FAQ.html')

def About(request):
    context ={}
    return render(request,'home_page/about.html')

def account(request):
    context ={}
    return render(request,'home_page/account.html')

def new_arrival(request):
    context ={}
    return render(request,'home_page/new_arrival.html')

def featured(request):
    context ={}
    return render(request,'home_page/featured.html')

def hot_deals(request):
    context ={}
    return render(request,'home_page/hot.html')

