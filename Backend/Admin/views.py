from django.shortcuts import render
from .models import *
from .serializer import *
from rest_framework .response import Response
from rest_framework .views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.


class Admin_Create_products(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny] 

    def post(self,request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'product Added to Database', 'Data':serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'error':'unvalid Fields', 'error':serializer.errors} ,status=status.HTTP_400_BAD_REQUEST)


class Admin_list_products(APIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny] 

    def get(self,request):
        product = Products.objects.all()
        serializer = ProductSerializer(product ,many=True)
        return Response({'message':'fetched Datas succefully', 'Data':serializer.data}, status=status.HTTP_200_OK)



class Admin_delete_product(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
            product.delete()
            return Response({'message': 'The product is deleted'}, status=status.HTTP_200_OK)
        except Products.DoesNotExist:
            return Response({'message': 'The product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class Admin_update_product(APIView):
    permission_classes = [AllowAny]

    def put(self,request,pk):
        try:
            product = Products.objects.get(pk=pk)
            serializer = ProductSerializer(instance=pk ,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'message':'The product is Updated', 'Data':serializer.data}, status=status.HTTP_200_OK)
        except Products.DoesNotExist:
            return Response({'message':'The product does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)