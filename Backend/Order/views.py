from django.shortcuts import render
from .models import *
from .serializer import *
from Admin.serializer import *
from Admin.models import *
from rest_framework import status
from rest_framework .views import APIView
from rest_framework .response import Response
from rest_framework .permissions import IsAuthenticated,AllowAny
# Create your views here.


class Add_to_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response({'message': 'The product does not exist'}, status=status.HTTP_404_NOT_FOUND)

        # ✅ 1. Typo: should be Cart.objects, not Cart.object
        cart, created_cart = Cart.objects.get_or_create(user=request.user)

        # ✅ 2. Get or create the item in that cart
        cartitem, created_cartitem = CartItem.objects.get_or_create(cart=cart, product=product)

        # ✅ 3. If already exists, increase quantity
        if not created_cartitem:
            cartitem.quantity += 1
            cartitem.save()
            return Response({'message': 'The quantity increased'}, status=status.HTTP_200_OK)

        # ✅ 4. If new item added, set quantity = 1
        cartitem.quantity = 1
        cartitem.save()
        return Response({'message': 'The product added to cart'}, status=status.HTTP_201_CREATED)

            
            


class Get_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Step 1: Get the user's cart
        cart_user = Cart.objects.filter(user=request.user).first()  # ✅ Get single cart (first one)

        if not cart_user:
            return Response({'message': 'The user has no cart'}, status=status.HTTP_404_NOT_FOUND)

        # Step 2: Get all items inside that cart
        cart_products = CartItem.objects.filter(cart=cart_user)  # ✅ use filter, not get()

        # Step 3: Serialize all items (not products directly)
        serializer = CartSerializer(cart_products, many=True)  # ✅ Use CartItemSerializer

        return Response(
            {'message': 'Successfully fetched cart', 'Data': serializer.data},
            status=status.HTTP_200_OK
        )

class Payment(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,):
        