from django.contrib import admin

# Register your models here.
from .models import *


admin.site.register(Product)
admin.site.register(order)
admin.site.register(orderitem)
admin.site.register(shipping)
admin.site.register(address)
