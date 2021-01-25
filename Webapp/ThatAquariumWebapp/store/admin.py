from django.contrib import admin

# Register your models here.
from .models import *


admin.site.register(Product)
admin.site.register(Order)
admin.site.register(Orderitem)
admin.site.register(Wishlist)
admin.site.register(WishlistItem)
admin.site.register(Shipping)
admin.site.register(Address)
