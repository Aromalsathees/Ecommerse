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


class Delete_cart(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self,request,cart_id):
        try:
            get_cart = CartItem.objects.get(id = cart_id , cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({'message':'The cart Does not exists'}, status=status.HTTP_200_OK)

        get_cart.delete()
        return Response({'message':'The cart has succefully Deleted'})



class Get_Cart(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        get_products = CartItem.objects.all()
        if not get_products.exists():
            return Response({'message':'No Cart items till NOw' , 'Data':[]},status=status.HTTP_200_OK)
        serializer = CartSerializer(get_products , many=True)
        return Response({'message':'succefully fetched Datas' , 'Data':serializer.data}, status=status.HTTP_200_OK)
        

class Get_all_orders(APIView):
    permission_classes = [AllowAny]

    def get(self,request):
        get_orders = OrderItem.objects.all()
        if not get_orders.exists():
            return Response({'message':'No orders', 'Data':[]}, status=status.HTTP_200_OK)
        serializer = OrderSerializer(get_orders , many=True)
        return Response({'message':'succefully fetched products' ,'Data':serializer.data}, status=status.HTTP_200_OK)


class Get_user_Orders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        order = Order.objects.filter(user=request.user)
        if not order.exists():
            return Response({'message':'The user has no Orders'}, status=status.HTTP_200_OK)
        
        serializer = OrdersSerializer(order ,many=True)
        return Response({'message':'succefully fetched the Order', 'Data':serializer.data}, status=status.HTTP_200_OK)



class create_order(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        payment_method = request.data.get('payment_method')
        product_id = request.data.get('product_id')
        cart_id = request.data.get('cart_id')
        quantity = int(request.data.get('quantity', 1))

        total_amount = 0

        # ✅ 1. Direct "Buy Now" for single product
        if product_id:
            try:
                product = Products.objects.get(id=product_id)
            except Products.DoesNotExist:
                return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

            total_amount = product.price * quantity
            order = Order.objects.create(user=user, total_money=total_amount, payment_method=payment_method)
            OrderItem.objects.create(order=order, product=product, price=product.price, quantity=quantity)

        # ✅ 2. Buy single cart item
        elif cart_id:
            try:
                cart_item = CartItem.objects.get(id=cart_id, cart__user=user)
            except CartItem.DoesNotExist:
                return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

            total_amount = cart_item.product.price * cart_item.quantity
            order = Order.objects.create(user=user, total_money=total_amount, payment_method=payment_method)
            OrderItem.objects.create(order=order, product=cart_item.product, price=cart_item.product.price, quantity=cart_item.quantity)
            cart_item.delete()
        # ✅ 3. Buy entire cart
        else:
            cart_items = CartItem.objects.filter(cart__user=user)
            if not cart_items.exists():
                return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)

            total_amount = sum(item.product.price * item.quantity for item in cart_items)
            order = Order.objects.create(user=user, total_money=total_amount, payment_method=payment_method)

            for item in cart_items:
                OrderItem.objects.create(order=order, product=item.product, price=item.product.price, quantity=item.quantity)
            cart_items.delete()

        # ✅ Payment handling
        if payment_method.lower() == 'cod':
            order.payment_status = 'Pending'
            order.save()
            return Response({
                'message': 'Order placed successfully (COD)',
                'Data': {'order_id': order.id, 'total': order.total_money}
            }, status=status.HTTP_201_CREATED)

        elif payment_method.lower() == 'razorpay':
            razorpay_order = razorpay_client.order.create({
                "amount": int(total_amount * 100),  # Amount in paise
                "currency": "INR",
                "payment_capture": 1
            })
            order.razorpay_order_id = razorpay_order["id"]
            order.payment_status = "Pending"
            order.save()

            return Response({
                "message": "Razorpay order created",
                "Data": {
                    "order_id": order.id,
                    "razorpay_order_id": razorpay_order["id"],
                    "amount": total_amount,
                    "currency": "INR",
                    "key": settings.RAZORPAY_KEY_ID
                }
            }, status=status.HTTP_201_CREATED)

        else:
            return Response({'error': 'Invalid payment method'}, status=status.HTTP_400_BAD_REQUEST)



