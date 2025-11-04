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
