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