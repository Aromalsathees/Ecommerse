from Admin.models import *
from Admin.serializer import *
from rest_framework import status
from rest_framework .views import APIView
from rest_framework .response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny


class Get_products(APIView):
    permission_classes = [AllowAny]

    def get(self,request):
        product = Products.objects.all()
        serializer = ProductSerializer(product,many=True)
        return Response({'message':'Succefully fetched the Products','Data':serializer.data} ,status=status.HTTP_200_OK)

