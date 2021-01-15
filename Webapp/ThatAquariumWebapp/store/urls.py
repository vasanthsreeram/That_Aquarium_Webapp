from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name= 'front_page'),
    path('cart/', views.cart,name= 'cart'),
    path('checkout/', views.checkout,name= 'checkout'),
    path('account/', views.account,name= 'account'),
]