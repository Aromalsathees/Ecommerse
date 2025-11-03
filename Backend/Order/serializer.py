from rest_framework import serializers
from Admin .serializer import *
from .models import *


class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = '__all__'