from rest_framework import serializers
from Admin .serializer import *
from .models import *


class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrdersSerializer(serializers.ModelSerializer):
    items = OrderSerializer(read_only=True ,many=True)
    class Meta:
        model = Order
        fields = '__all__'