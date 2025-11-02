from .views import *    
from django.urls import path

urlpatterns = [
    path('add_to_cart/',Add_to_Cart.as_view(),name='addtocart'),
    path('get_cart/',Get_Cart.as_view(),name='addtocart'),

]
