from django.shortcuts import render
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from .models import *
from .serializer import *
from rest_framework import status
from rest_framework .views import APIView
from rest_framework .response import Response
from rest_framework .permissions import IsAuthenticated,AllowAny
from django.contrib.auth import authenticate
# Create your views here.



def get_refresh_token(user):
    refresh = RefreshToken.for_user(user)
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh)
    }


class Signup(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_refresh_token(user)
            return Response({'message':'succesfully Registered Accound', 'user':serializer.data,'token':token} , status.HTTP_200_OK)
        
        return Response({'message':'unvalid field'}, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response(
                {'message': 'Email and password are needed'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, email=email, password=password)

        if user:
            token = get_refresh_token(user)
            serializer = SignupSerializer(user)
            return Response(
                {
                    'message': 'Successfully Login',
                    'token': token,
                    'user': serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            {'message': 'The user not found, please Login'},
            status=status.HTTP_404_NOT_FOUND
        )



class Logout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'message':'No refresh Tokens'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message':'Succesfuly Logout'}, status=status.HTTP_200_OK)

        except Exception:
            return Response({'error':'InvaiLD Token'}, status=status.HTTP_404_NOT_FOUND) 

