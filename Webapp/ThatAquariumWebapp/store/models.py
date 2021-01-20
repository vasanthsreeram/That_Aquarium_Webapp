from django.db import models
from django.contrib.auth.models import User



class Product(models.Model):
    product_name = models.CharField(max_length=150,default="product")
    product_type = models.CharField(max_length=100,default="accessory")
    product_class = models.CharField(max_length=100,default="class")
    product_category = models.CharField(max_length=100,default="parts")
    price = models.FloatField()
    image = models.ImageField(null=True,blank=True)
    quantity = models.IntegerField(default=0)
    description = models.TextField(default="Description")

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
    customer = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
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
    is_wishlist = models.BooleanField(default=False)

    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total

    def __str__(self):
        return self.product.__str__()


class address(models.Model):
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    address = models.TextField(blank=True)
    postcode = models.IntegerField(blank=True)

    def __str__(self):
        return self.postcode.__str__()


class shipping(models.Model):
    customer =  models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True)
    order = models.ForeignKey(order, on_delete=models.SET_NULL,null=True,blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    address = models.ForeignKey(address,on_delete=models.SET_NULL,null=True,blank=True)
    def __str__(self):
        return self.address.__str__()


