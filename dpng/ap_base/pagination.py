from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'


class LargePagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'

class MediumPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'

class MediumLargePagination(PageNumberPagination):
    page_size = 250
    page_size_query_param = 'page_size'


class AppMovilPagination(PageNumberPagination):
    page_size = 500
    page_size_query_param = 'page_size'

