from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import CPUUtilizeCreate,CPUUtilizeDetail,CPUUtilizeList,StatView

urlpatterns =[
    path('list/', CPUUtilizeList.as_view()),
    path('<int:pk>', CPUUtilizeDetail.as_view()),
    path('add/', CPUUtilizeCreate.as_view()),
    path('',StatView.as_view())
]