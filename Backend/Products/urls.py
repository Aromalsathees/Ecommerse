from .views import *
from django.urls import path


urlpatterns = [
    path('Get_all_products/',Get_products.as_view(),name='getproducts'),
    path('Get_product_details/<int:pk>/',Get_product_details.as_view(),name='get_productdetails')
]

