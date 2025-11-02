from .models import Products
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Products
        fields = '__all__'
