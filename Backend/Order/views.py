from django.shortcuts import render
from .models import *
from Admin.serializer import *
from Admin.models import *
from rest_framework import status
from rest_framework .views import APIView
from rest_framework .response import Response
from rest_framework .permissions import IsAuthenticated
# Create your views here.


class Add_to_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response({'message':'The product Does not exits'}, status=status.HTTP_200_OK)

        cart , create_cart = Cart.object.get_or_create(user=request.user)
        cartitem , create_cartitem = CartItem.objects.get_or_create(cart=cart ,product=product)

        if not cartitem:
            cartitem.quantity += 1
            cartitem.save()
            return Response({'message':'The Quantity increases'}, status=status.HTTP_200_OK)
        cartitem.quantity = 1
        cartitem.save()
        return Response({'message':'The product Added to cart'}, status=status.HTTP_201_CREATED)
            
            
class Get_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        try:
            cart_user = Cart.objects.get(user=request.user)
        except cart_user.DoesNotExist:
            return Response({'message':'The user has No cart'}, status=status.HTTP_404_NOT_FOUND)
        
        cart_products = CartItem.objects.get(cart=cart_user)
        serializer = ProductSerializer(cart_products, many=True)
        return Response({'message':'succefully fetched cart'}, status=status.HTTP_200_OK)

        