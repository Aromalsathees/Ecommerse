
from django.contrib import admin
from django.urls import path,include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  
  path('',include('Products.urls')),
  path('User/',include('User.urls')),
  path('Admin/',include('Admin.urls')),
  path('Order/',include('Order.urls')),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)