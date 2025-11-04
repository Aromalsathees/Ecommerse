from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .models import CustomUser
from .serializer import SignupSerializer, UserSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from utils.permissions import IsAdminUserCustom



class AdminOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUserCustom]
    def get(self, request):
        return Response({"message": "Welcome Admin"})


# ✅ Generate refresh & access tokens
def get_refresh_token(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }


# 🟢 USER SIGNUP
class Signup(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            # Mark user as normal user (not admin)
            user = serializer.save(is_admin=False)
            token = get_refresh_token(user)
            return Response(
                {
                    'message': 'Successfully registered account',
                    'user': serializer.data,
                    'token': token
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🔵 ADMIN SIGNUP
class AdminSignup(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            # Mark user as admin
            user = serializer.save(is_admin=True)
            token = get_refresh_token(user)
            return Response(
                {
                    'message': 'Successfully registered admin account',
                    'user': serializer.data,
                    'token': token
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🟣 LOGIN (shared for user + admin)
class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'message': 'Email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ✅ Authenticate using email (assuming USERNAME_FIELD = 'email' in model)
        user = authenticate(request, email=email, password=password)

        if not user:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        token = get_refresh_token(user)
        serializer = SignupSerializer(user)

        return Response(
            {
                'message': 'Login successful',
                'token': token,
                'user': serializer.data,
                'is_admin': user.is_admin,  # ✅ send role info to frontend
            },
            status=status.HTTP_200_OK
        )


# 🔴 LOGOUT
class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'message': 'No refresh token provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


# 🟠 GET USER DETAILS
class GetUserData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(
            {'message': 'Successfully fetched user details', 'Data': serializer.data},
            status=status.HTTP_200_OK
        )
