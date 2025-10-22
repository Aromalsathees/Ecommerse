from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.


class Get_products(APIView):

    def get(self,request,pk):
        data = get_object_or_404(Products,pk=pk)
        serializer = ProductSerializer(data)
        return Response({'message':'succefully fetched Data','DATA':serializer.data},status=status.HTTP_200_OK)


class Admin_product_search(APIView):

    def get(self,request,q):
        try:
            if not q or len(q.strip()) == 0:
                return Response({'message':'The query is empty'},status=status.HTTP_400_BAD_REQUEST)
            get_data = Products.objects.filter(name__icontains=q)
            
            if not get_data.exists():
                return Response({'message':'The product Doesnot Exists'}, status=status.HTTP_404_NOT_FOUND)
            serializer = ProductSerializer(get_data, many=True)
            return Response({'mesage':'found the product' ,'data':serializer.data},status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        

class Admin_product_create(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Product added successfully", "Data": serializer.data})
        return Response(serializer.errors, status=400)



class Admin_product_list(APIView):
    
    def get(self, request):
        try:
            products = Products.objects.all()
            serializer = ProductSerializer(products, many=True)
            return Response({'message':'The product is Added to Database','Data':serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Admin_product_update(APIView):

    def put(self,request,pk):
        get_id = get_object_or_404(Products,pk=pk)
        serializer = ProductSerializer(instance=get_id,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'The Data is updated','Data':serializer.data},status=status.HTTP_200_OK)
        return Response({'message':'Not valid','error':serializer.errors},status=status.HTTP_400_BAD_REQUEST)


class Admin_product_delete(APIView):

    def delete(self,request,pk):
        get_id = get_object_or_404(Products,pk=pk)
        get_id.delete()
        return Response({'message':'Succefully Deleted Product'},status=status.HTTP_200_OK)



