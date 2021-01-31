from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.home,name='front_page'),
    path('cart/', views.cart,name='cart'),
    path('account/', views.account,name='account'),
    path('terms-and-conditions/', views.terms,name='terms'),
    path('FAQ/', views.FAQ,name='FAQ'),
    path('about-us/', views.about,name='about'),
    path('contact-us/', views.contact,name='contact'),
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
    path('login/', views.loginpage, name="login"),
    path('register/', views.registerpage, name="register"),
    path('logout/', views.logoutUser, name="logout"),
    path('privacy-policy/', views.privacy, name='privacy_policy'),
    path('product/', views.product, name='product_view'),
    path('update_item/',views.updateItem,name='update_item'),
    path('update_address/',views.updateAddress,name='update_address'),


    path('reset_password/',auth_views.PasswordResetView.as_view(template_name='home_page/forget_password.html'),name='reset_password'),
    path('reset_password_sent/',auth_views.PasswordResetDoneView.as_view(template_name='home_page/password_reset_sent.html'),name='password_reset_done'),
    path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name='home_page/password_reset_form.html'),name="password_reset_confirm"),
    path('reset_password_complete/',auth_views.PasswordResetCompleteView.as_view(template_name='home_page/password_reset_done.html'),name='password_reset_complete'),



]