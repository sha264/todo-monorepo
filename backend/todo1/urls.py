from django.urls import path

from . import views

urlpatterns = [
    path("", views.TodoListView.as_view()),
    path("<int:id>", views.TodoDetailView.as_view()),
]
