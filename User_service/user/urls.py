from django.urls import path

urlpatterns = [

    path('tokens/',get_refresh_access_token,as_view(),name='refresh'),
    path('signup/',Signup.as_view(),name='signup'),
    path('login/',Login.as_view(),name='login'),
    path('logout/',Logout.as_view(),name='logout')
]
