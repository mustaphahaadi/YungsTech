from django.urls import path
from .views import LearningPathViewSet, ModuleViewSet, LessonViewSet

urlpatterns = [
    path('paths/', LearningPathViewSet.as_view({'get': 'list'}), name='learning_paths'),
    path('paths/<uuid:pk>/', LearningPathViewSet.as_view({
        'get': 'retrieve',
    }), name='learning_path_detail'),
    path('paths/<uuid:pk>/progress/', 
        LearningPathViewSet.as_view({'get': 'user_progress'}),
        name='learning_path_progress'
    ),
    path('lessons/<uuid:pk>/complete/',
        LessonViewSet.as_view({'post': 'complete'}),
        name='complete_lesson'
    ),
]