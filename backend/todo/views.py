from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Todo

# ModelSerializerをインポート


class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = "__all__"


class TodoListView(APIView):
    def get(self, request):
        # ここでTodoのデータを一覧を返す
        todos = Todo.objects.all()  # todosはオブジェクトの配列→[{},{},{}]
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        # postメソッドを作成
        serializer = TodoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()  # Todo.objects.create(title的な)
        return Response(serializer.data)


class TodoDetailView(APIView):
    def get(self, request, id):
        # ここでid番のTodoのデータを取得する
        todo = get_object_or_404(Todo, id=id)  # {}
        serializer = TodoSerializer(todo)
        return Response(serializer.data)

    def put(self, request, id):
        todo = get_object_or_404(Todo, id=id)
        todo = Todo.objects.get(id=id)
        data = request.data

        serializer = TodoSerializer(todo, data=data)  # id番のデータをdataで上書き。
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response("putで更新に成功")

    def delete(self, request, id):
        # ここでid番のTodoのデータを削除する
        todo = get_object_or_404(Todo, id=id)
        todo.delete()
        return Response("", status=200)


"""
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Todo, User


def test(request):
    return HttpResponse("hello world")


class TodoAddView(APIView):
    def post(self, request):
        user_id = request.data["author"]
        user = User.objects.get(id=user_id)
        Todo.objects.create(
            title=request.data["title"],
            memo=request.data["memo"],
            author=user,
            priority=request.data["priority"],
        )
        return Response(status=201)


class TodoDeleteView(APIView):
    def delete(self, request, id):
        todo = Todo.objects.get(id=id)
        todo.delete()
        return Response(status=204)


class TodoListView(APIView):
    def get(self, request, id):
        user = User.objects.get(id=id)
        todos = user.todos.all()
        return JsonResponse({
            "todos": [
                {
                    "id": todo.id,
                    "title": todo.title,
                    "memo": todo.memo,
                    "priority": todo.priority,
                    "author": todo.author.name,
                } for todo in todos
            ]
        })

    def post(self, request, id):
        user = User.objects.get(id=id)
        Todo.objects.create(
            title=request.data["title"],
            memo=request.data["memo"],
            author=user,
            priority=request.data["priority"],
        )
        return Response(status=201)


class TodoUpdateView(APIView):
    def put(self, request, id):
        todo = Todo.objects.get(id=id)
        todo.title = request.data["title"]
        todo.memo = request.data["memo"]
        todo.priority = request.data["priority"]
        todo.save()
        return Response(status=200)


class AllTodoListView(APIView):
    def get(self, request):
        todos = Todo.objects.all()
        return JsonResponse({
            "todos": [
                {
                    "id": todo.id,
                    "title": todo.title,
                    "memo": todo.memo,
                    "priority": todo.priority,
                    "author": todo.author.name,
                } for todo in todos
            ]
        })
"""
