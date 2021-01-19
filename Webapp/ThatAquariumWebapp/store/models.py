from django.db import models
from django.contrib.auth.models import User

class Customer(models.Model):

    # memberships = [
    #     ("m","member"),
    #     ("g","gold")
    # ]
    user = models.OneToOneField(User,on_delete=models.CASCADE, null=True, blank=True)
    full_name = models.CharField(max_length=100, null=True)
    email = models.CharField(max_length=250,null=True)
    # membership = models.CharField(max_length=1,choices=memberships,null=True)
    def __str__(self):
        if self.full_name == None:
            return "name"
        return self.full_name


class Product(models.Model):
    product_name = models.CharField(max_length=150,default="product")
    product_type = models.CharField(max_length=100,default="accessory")
    product_class = models.CharField(max_length=100,default="class")
    product_category = models.CharField(max_length=100,default="parts")
    price = models.FloatField()
    pictures = models.ImageField(null=True,blank=True)
    stock = models.IntegerField(default=0)
    def __str__(self):
        return self.product_name

    @property
    def imageURL(self):
            try:
                url = self.image.url
            except:
                url = ''
            return url


class order(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.SET_NULL,null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=200,null=True)

    def __str__(self):
        return str(self.id)

    @property
    def get_cart_total(self):
        orderitem = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitem])
        return total

    @property
    def get_cart_items(self):
        orderitem = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitem])
        return total


class orderitem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True,blank=True)
    order = models.ForeignKey(order,on_delete=models.SET_NULL,null=True,blank=True)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total


class address(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.TextField(blank=True)
    postcode = models.IntegerField(blank=True)

    def __str__(self):
        return self.address


class shipping(models.Model):
    customer =  models.ForeignKey(Customer,on_delete=models.SET_NULL,null=True,blank=True)
    order = models.ForeignKey(order, on_delete=models.SET_NULL,null=True,blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    address = models.ForeignKey(address,on_delete=models.SET_NULL,null=True,blank=True)
    def __str__(self):
        return self.address


