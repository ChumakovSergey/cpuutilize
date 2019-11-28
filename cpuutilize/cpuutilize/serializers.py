from rest_framework import serializers
from .models import CPUUtilizeData


class CPUUtilizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CPUUtilizeData
        fields = "__all__"
