from django.urls import path
from .views import *


urlpatterns = [
    
    path('get_products/<int:pk>/',Get_products.as_view(),name='products'),
    path('admin_product_search/<str:q>/',Admin_product_search.as_view(),name='searchproduct'),

    path('admin_create_product/',Admin_product_create.as_view(),name='admin_product'),
    path('admin_list_product/',Admin_product_list.as_view(),name='admin_product_list'),
    path('admin_product_update/<int:pk>/',Admin_product_update.as_view(),name='update'),
    path('Admin_delete/<int:pk>/',Admin_product_delete.as_view(),name='delete'),
    
]
