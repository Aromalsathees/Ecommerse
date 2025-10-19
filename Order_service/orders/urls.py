from django.urls import path


urlpatterns = [

    path('add_to_cart/<int:pk>/',Add_to_Cart.as_view(),name='addtocart'),
    path('view_cart/',View_Cart.as_view(),name='viewcart'),
    path('update_cart/<int:pk>/',Update_Cart.as_view(),name='updatecart'),
    path('delete_cart/<int:pk>/',Delete_Cart.as_view(),name='deletecart'),
    
]
