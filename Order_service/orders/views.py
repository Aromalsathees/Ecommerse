from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framewrok import status
from .serializer import *
from .models import *
import requests
# Create your views here.


PRODUCT_URL = 'http://Admin_service:8000'


class Add_to_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request,pk):
        get_product_id = requests.get(f"{PRODUCT_URL}/get_products/{pk}/",timeout=5)
        if get_products_id.status_code != 200:
            return Response({'message':'The product Invalid'}, status=status.HTTP_400_BAD_REQUEST)
        
        cart , _ = Cart.objects.get_or_create(user=request.user)

        Cart_items , create_new = CartItems.objects.get_or_create(cart=cart ,product_id=pk)

        if not create_new:

            Cart_items.quantity += 1
            Cart_items.save()
            return Response({'message':'The product has updated'}, status=status.HTTP_200_OK)
        
        Cart_items.quantity = 1
        Cart_items.save()
        return Response({'message':'The item is ADded to cart'}, status=status.HTTP_201_CREATED)



class View_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):

        try:
            data = Cart.objects.filter(user=request.user).first()
            if not data:
                return Response({'message':'The cart is Empty'}, status=status.HTTP_200_OK)

            get_cart = CartItem.objects.filter(cart=data)
            if not get_cart.exists():
                return Response({'message':'your cart has no items'}, status=status.HTTP_200_OK)
            
            serializer = CartItemSerializer(get_cart,many=True)
            return Response({'message':'Heres the cartitems' ,'data':serializer.data}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class Update_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self,request,pk):
        cart = get_object_or_404(Cart,user=request.user)
        get_cart_items = CartItems.objects.filter(cart=cart ,product_id=pk)


class Delete_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self,request,pk):

        try:
            get_user = get_object_or_404(Cart,user=request.user)
            get_data = get_object_or_404(CartItem,product_id=pk ,cart=get_user)
            get_data.delete()
            return Response({'message':'The items has Deleted'}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


        