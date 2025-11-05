from .views import *    
from django.urls import path

urlpatterns = [
    path('add_to_cart/<int:pk>/',Add_to_Cart.as_view(),name='addtocart'),
    path('get_cart/',Get_Cart.as_view(),name='addtocart'),
    path('create_order/',create_order.as_view(),name='payments'),
    path('Get_all_orders/',Get_all_orders.as_view(),name='getorders'),
    path('Get_user_Orders/',Get_user_Orders.as_view(),name='orders'),
    path('delete_cart_item/<int:cart_id>/',Delete_cart.as_view(),name='delete_cart')

]

