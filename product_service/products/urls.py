from django.urls import path
from .views import *

urlpatterns = [
    path('listproducts/',ProductListView.as_view(),name='products'),
    path('search_product/<str:q>/',SearchProducts.as_view(),name='search'),
]
