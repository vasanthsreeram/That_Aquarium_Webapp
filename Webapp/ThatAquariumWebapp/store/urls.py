from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name= 'front_page'),
    path('cart/', views.cart,name= 'cart'),
    path('checkout/', views.checkout,name= 'checkout'),
    path('account/', views.account,name= 'account'),
    path('terms/', views.terms,name= 'terms'),
    path('FAQ/', views.FAQ,name= 'FAQ'),
    path('About/', views.About,name= 'about'),
    path('hot/', views.hot_deals, name='hot'),
    path('featured/', views.featured, name='featured'),
    path('new/', views.new_arrival, name='new'),

]