from django.db import models

# Create your models here.

class Products(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    category = models.CharField(max_length=50)
    stock = models.IntegerField()
    images = models.ImageField(upload_to='Images/')
    
    def __str__(self):
        return self.name
    