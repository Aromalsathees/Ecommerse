from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
# Create your views here.

PRODUCT_URL = 'http://admin_service:8000'



class ProductListView(APIView):

    def get(self, request):
        try:
            res = requests.get(f"{PRODUCT_URL}/admin_list_product/")

            if res.status_code != 200:
                return Response(
                    {'error': 'Admin service returned an error', 'status': res.status_code},
                    status=res.status_code
                )
            try:
                data = res.json()
            except ValueError:
                return Response(
                    {'error': 'Admin service returned invalid JSON or empty response'},
                    status=500
                )
            return Response(
                {'message': 'Successfully fetched data', 'data': data},
                status=200
            )

        except requests.exceptions.RequestException as e:
            
            return Response(
                {'error': f'Error connecting to admin service: {str(e)}'},
                status=500
            )



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
            

