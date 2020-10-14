# Django


# DRF
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter

# Django Filters
from django_filters import rest_framework as filters
from url_filter.integrations.drf import DjangoFilterBackend


# Local
from ap_base.models import GeoProvincia,GeoCiudad,PerPersona
from ap_base.pagination import CustomPagination, LargePagination
from ap_base.permissions import IsOwnerOrReadOnly, IsAuthenticated
from ap_api.v1.serializers.sz_base import CommonFieldsSerializer

# GetPost
class Get_post_base(ListCreateAPIView):
	serializer_class = CommonFieldsSerializer
	permission_classes = (IsAuthenticated,)
	pagination_class = CustomPagination

	def get_queryset(self, ObjModel):
		print("get_queryset "+str(ObjModel))

		obj = ObjModel.objects.all().filter(eliminado='f').order_by('-fecha_ingreso')
		return obj

	# Get all perfuncionario
	def get(self, request, ObjModel):
		print("Getting "+str(ObjModel))

		obj = self.get_queryset(ObjModel)
		paginate_queryset = self.paginate_queryset(obj)
		serializer = self.serializer_class(paginate_queryset, many=True,context={'request': request})
		return self.get_paginated_response(serializer.data)


	# Create a new perfuncionario
	def post(self, request, CommonFieldsSerializer):
		serializer = CommonFieldsSerializer(
			data=request.data,
			context={
				'request': request
			},
			many = True
		)
		if serializer.is_valid():
			serializer.save()

			# TOTAL DE REGISTROS
			i = 0
			for item in serializer.data:
				i = i + 1

			context = { 
				"count": i,
				"results": serializer.data
			}

			return Response(context, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# GetDeleteUpdate
class Get_delete_update_base(RetrieveUpdateDestroyAPIView):
	serializer_class = CommonFieldsSerializer
	permission_classes = (IsAuthenticated,)
	#authentication_classes = (authentication.JWTAuthentication,)

	def get_queryset(self, pk,ObjModel):
		try:
			obj = ObjModel.objects.get(pk=pk)
		except ObjModel.DoesNotExist:
			content = {
				'status': 'Not Found Query'
			}
			return Response(content, status=status.HTTP_404_NOT_FOUND)
		return obj

	# Get a Model
	def get(self, request, pk, ObjModel, ObjSerializer):

		obj = self.get_queryset(pk,ObjModel)
		serializer = ObjSerializer(obj)
		return Response(serializer.data, status=status.HTTP_200_OK)

	# Update a Model
	def put(self, request, pk, ObjModel, ObjSerializer):
		obj = self.get_queryset(pk,ObjModel)
		serializer = ObjSerializer(
			obj, 
			data=request.data, 
			context={
				'request': request
			}
		)

		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	# Delete a Model
	def delete(self, request, pk, ObjModel):
		try:
			obj = self.get_queryset(pk, ObjModel)
			obj.delete()
			content = {
				'status_response': 'OK'

			}
		except:
			content = {
				'status_response': 'BAD'

			}	
		return Response(content)



class CommonFilterViewSet(ListAPIView):

	__basic_fields = ('id',)
	#queryset = GeoProvincia.objects.all()
	serializer_class = CommonFieldsSerializer
	#filter_backends = (filters.DjangoFilterBackend, SearchFilter, OrderingFilter)
	filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
	filter_fields = __basic_fields
	search_fields = __basic_fields
	ordering_fields = __basic_fields
	pagination_class = CustomPagination



