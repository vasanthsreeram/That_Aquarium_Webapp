from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Products(models.Model):
    product_name = models.CharField(max_length=150,default="product")
    product_type = models.CharField(max_length=50,default="accessory")
    product_class = models.CharField(max_length=50,default="class")
    product_cat = models.CharField(max_length=50,default="parts")
    price = models.FloatField()
    pictures = models.ImageField()
    stock = models.IntegerField()
    def __str__(self):
        return self.product_name

class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)

class cart_item(models.Model):
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE)
    product = models.ForeignKey(Products,on_delete=models.CASCADE)
    qty = models.IntegerField()

class order(models.Model):
    payments = [
        ("p","paynow"),
        ("c","credit/debit"),
        ("h","cash")
    ]
    user = models.ForeignKey(User,on_delete=models.DO_NOTHING)
    address = models.TextField() #gonna need it even if its a collection point because the collection
    postal_code = models.IntegerField()# point also has an address
    paid = models.BooleanField()
    order_time = models.DateTimeField(default=timezone.now)
    payment_method = models.CharField(max_length=1,choices=payments)

class order_item(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    qty = models.IntegerField()
    order_tx = models.ForeignKey(order,on_delete=models.CASCADE)