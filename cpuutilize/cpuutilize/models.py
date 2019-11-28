from django.db import models


class CPUUtilizeDataManger(models.Manager):
    def get_stat(self, data):
        max = 0
        if len(data) > 0:
            min = data[0].value
        else:
            min = 0
        count = 0
        sum = 0
        for el in data:
            if el.value > max:
                max = el.value
            elif el.value < min:
                min = el.value
            sum += el.value
            count += 1
        if count > 0:
            avg = round(sum / count, 2)
        else:
            avg = 0
        return {'min': min, 'max': max, 'avg': avg}

    def get_stat_all(self):
        data = super().get_queryset().all()
        return self.get_stat(data)

    def get_stat_100(self):
        data = super().get_queryset().order_by("-id")[0:100]
        return self.get_stat(data)

    def get_100(self):
        return super().get_queryset().order_by("-id")[0:100]


class CPUUtilizeData(models.Model):
    value = models.DecimalField(max_digits=10, decimal_places=1)
    datetime = models.DateTimeField()
    receipt_datetime = models.DateTimeField(auto_now=True)
    objects = CPUUtilizeDataManger()
