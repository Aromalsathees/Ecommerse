from .views import *    
from django.urls import path

urlpatterns = [
    path('add_to_cart/<int:pk>/',Add_to_Cart.as_view(),name='addtocart'),
    path('get_cart/',Get_Cart.as_view(),name='addtocart'),
    path('create_order/',create_order.as_view(),name='payments')

]
