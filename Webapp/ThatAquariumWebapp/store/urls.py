from django.contrib import admin
from django.urls import path
from . import views
from django.conf import settings

from django.conf.urls.static import static

urlpatterns = [
    path('', views.home,name= 'front_page'),
    path('cart/', views.cart,name= 'cart'),
    path('account/', views.account,name= 'account'),
    path('terms/', views.terms,name= 'terms'),
    path('FAQ/', views.FAQ,name= 'FAQ'),
    path('about/', views.About,name= 'about'),
    path('hot/', views.hot_deals, name='hot'),
    path('featured/', views.featured, name='featured'),
    path('new/', views.new_arrival, name='new'),
    path('search/', views.search, name='search'),
    path('orders/', views.orders, name="orders"),
    path('wishlist/', views.wishlist, name="wishlist"),
    path('membership/', views.membership, name="membership"),
    path('address/', views.address, name="address"),
    path('payment/', views.payment, name="payment"),
    path('settings/', views.settings, name="settings"),
    path('login/', views.login, name="login"),
]