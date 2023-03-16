from django.shortcuts import get_object_or_404, render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"


class TodoListView(APIView):
    def get(self, request):
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TodoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("", status=201)


class TodoDetailView(APIView):
    def get(self, request, id):
        todo = get_object_or_404(Todo, id=id)
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, id):
        todo = get_object_or_404(Todo, id=id)
        todo = Todo.objects.get(id=id)
        data = request.data

        serializer = TodoSerializer(todo, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("", status=200)

    def delete(self, request, id):
        todo = get_object_or_404(Todo, id=id)
        todo.delete()
        return Response("", status=200)
