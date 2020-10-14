# Django
from django.urls import path, re_path
from django.conf.urls import include, url

# JWT
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token

# Local
from ap_api.v1.views import *

urlpatterns = [
    ##################################### AUTH #################################################

    url(r'^api/v1/auth-jwt/', obtain_jwt_token),
    url(r'^api/v1/auth-jwt-refresh/', refresh_jwt_token),
    url(r'^api/v1/auth-jwt-verify/', verify_jwt_token),
    # JWT Personalizado
    path(r'api/v1/api-token-auth-jwt/', vw_auth.LoginViewUserDpng.as_view()),
    # Log Out
    url(r'^api/v1/logout-jwt/', vw_auth.LogoutUserDpng.as_view()),

]