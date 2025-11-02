from .views import *
from django.urls import path

urlpatterns = [
    path('admin_created_products/',Admin_Create_products.as_view(),name='adminproductscreate'),
    path('admin_list_products/',Admin_list_products.as_view(),name='adminlistproducts'),
    path('admin_delete_product/<int:pk>/',Admin_delete_product.as_view(),name='delete'),
    path('admin_update_product/<int:pk>/',Admin_update_product.as_view(),name='update'),
]


