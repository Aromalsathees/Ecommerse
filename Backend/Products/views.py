from Admin.models import *
from Admin.serializer import *
from rest_framework import status
from rest_framework .views import APIView
from rest_framework .response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import AllowAny



class Get_products(APIView):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [AllowAny]

    def get(self, request):
        product = Products.objects.all()
        serializer = ProductSerializer(product, many=True)
        return Response({'message': 'Successfully fetched the Products', 'Data': serializer.data})


class Get_product_details(APIView):
    permission_classses = [IsAuthenticated]

    def get(self,request,pk):
        get_data = Products.objects.get(pk=pk)
        serializer = ProductSerializer(get_data)
        return Response({'message':'fetched product details', 'Data':serializer.data}, status=status.HTTP_200_OK)