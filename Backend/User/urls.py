from .views import *
from django.urls import path


urlpatterns = [

    path('login/',Login.as_view(),name='login'),
    path('logout/',Logout.as_view(),name='logout'),
    path('signup/',Signup.as_view(),name='signup'),
    path('refresh_token/',get_refresh_token,name='token'),
    path('get_user_data/',GetUserData.as_view(),name='userdata'),
    path('Admin_signup/', AdminSignup.as_view(),name='adminsignup'),
    path('admin-only/', AdminOnlyView.as_view(), name='admin-only'),
]
