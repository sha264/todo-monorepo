from django.db import models

# Create your models here.
# todoモデルを作成


class Todo(models.Model):
    title = models.CharField(max_length=100)
    memo = models.TextField(max_length=100, null=True, blank=True)
    priority = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
