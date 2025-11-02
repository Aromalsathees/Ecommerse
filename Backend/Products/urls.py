from .views import *
from django.urls import path


urlpatterns = [
    path('Get_all_products/',Get_products.as_view(),name='getproducts'),
]

