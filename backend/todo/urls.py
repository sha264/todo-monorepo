from django.urls import path
from todo import views

from . import views

urlpatterns = [
    # path('test/', views.test),
    # path("add/", TodoAddView.as_view()),
    # path("delete/<int:id>", TodoDeleteView.as_view()),
    # path("update/<int:id>", TodoUpdateView.as_view()),
    # path("list/<int:id>", TodoListView.as_view()),
    # path("list/", AllTodoListView.as_view()),


    # GET, POST, PUT, DELETE
    # axios.get, axios.post, axios.put, axios.deleteと一致する
    path("", views.TodoListView.as_view()),  # GETしたら一覧取れる、POSTしたら追加できる
    # GETしたら詳細取れる、PUTしたら更新できる、DELETEしたら削除できる
    path("<int:id>", views.TodoDetailView.as_view()),
]
