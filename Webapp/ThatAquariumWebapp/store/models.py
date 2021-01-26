from django.db import models
from django.contrib.auth.models import User



class Product(models.Model):

    display = [
        ('H', 'Hot deals'),
        ('F', 'Featured'),
        ('N', 'New Arrivals'),
        ('B', 'Blocked'), #hidden from every where but exists in the database
        ('D', 'Database'),#this means it will be avaliable in the search but not in the other fields
    ]
    product_name = models.CharField(max_length=150,default="product")
    product_type = models.CharField(max_length=100,default="accessory")
    product_class = models.CharField(max_length=100,default="class")
    product_category = models.CharField(max_length=100,default="parts")
    price = models.DecimalField(decimal_places=2,max_digits=9)
    image = models.ImageField(null=True,blank=True)
    quantity = models.IntegerField(default=0)
    description = models.TextField(default="Description")
    display_type = models.CharField(max_length=1,choices=display,default='D')


    def __str__(self):
        return self.product_name

    @property
    def imageURL(self):
            try:
                url = self.image.url
            except:
                url = ''
            return url


class Order(models.Model):
    customer = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)

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

class Wishlist(models.Model):
    customer = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)

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

class WishlistItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True,blank=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True,blank=True)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total

    def __str__(self):
        return self.product.__str__()


class Orderitem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True,blank=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True,blank=True)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)


    @property
    def get_total(self):
        total = self.product.price * self.quantity
        return total

    def __str__(self):
        return self.product.__str__()


class Address(models.Model):
    customer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    fullname = models.CharField(blank=True,null=True,max_length=150)
    phone = models.IntegerField(blank=True,null=True,)
    address = models.TextField(blank=True)
    postcode = models.IntegerField(blank=True)

    def __str__(self):
        return self.id.__str__()


class Shipping(models.Model):
    customer =  models.ForeignKey(User,on_delete=models.SET_NULL,null=True,blank=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL,null=True,blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    address = models.ForeignKey(Address,on_delete=models.SET_NULL,null=True,blank=True)
    def __str__(self):
        return self.id.__str__()


