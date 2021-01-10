from django.shortcuts import render
from django.http import HttpResponse

def home(request):
    context = {}
    return render(request,'home_page/front_page.html',context)
# Create your views here.
def cart(request):
    context = {}
    return render(request,'home_page/cart.html',context)

def checkout(request):
    context = {}
    return render(request,'home_page/checkout.html',context)