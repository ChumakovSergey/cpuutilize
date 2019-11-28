from rest_framework.views import View
from rest_framework import generics
from .serializers import CPUUtilizeSerializer
from .models import CPUUtilizeData
from django.views import View
from django.http import HttpResponse
from django.shortcuts import render


class CPUUtilizeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CPUUtilizeSerializer
    queryset = CPUUtilizeData.objects.all()


class CPUUtilizeCreate(generics.CreateAPIView):
    serializer_class = CPUUtilizeSerializer
    queryset = CPUUtilizeData.objects.all()


class CPUUtilizeList(generics.ListAPIView):
    serializer_class = CPUUtilizeSerializer
    queryset = CPUUtilizeData.objects.get_100()

    # def get(self, request, *args, **kwargs):
    #     after = request.GET.get('after')
    #     print(after)
    #     if after:
    #         self.queryset = CPUUtilizeData.objects.filter(id__gt=after)
    #     return self.list(request, *args, **kwargs)


class StatView(View):
    def get(self, request):
        stat_all = CPUUtilizeData.objects.get_stat_all()
        stat_100 = CPUUtilizeData.objects.get_stat_100()
        data = CPUUtilizeData.objects.get_100()
        return render(
            request,
            'cpuutilize/index.html',
            context={'data': data, 'stat_all': stat_all, 'stat_100': stat_100}
        )
