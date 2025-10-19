from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
# Create your views here.

PRODUCT_URL = 'http://Admin_service:8000'



class ProductListView(APIView):
    
    def get(self,request):
        try:
            res = requests.get(f"{PRODUCT_URL}/admin_list_product/")
            data = res.json()
            return Response({'message':'succefully fetched Data','data':data} ,status=res.status_code)
        except Exception as e:
            return Response({'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class SearchProducts(APIView):

    def get(self,request,q):
        try:
            if not q or len(q.strip()) == 0:
                return Response({'message':'The queery is Empty'}, status=status.HTTP_400_BAD_REQUEST)
            
            get_data = requests.get(f"{PRODUCT_URL}/admin_product_search/{q}/")

            if get_data.status_code != 200:
                return Response({'message':'The product is not fount'}, status=status.HTTP_404_NOT_FOUND)

            data = get_data.json()
            return Response({'message':'succefully fetched data','data':data}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

