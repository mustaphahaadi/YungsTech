from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import LearningPath, Module, Lesson, UserProgress
from .serializers import (
    LearningPathSerializer, ModuleSerializer,
    LessonSerializer, UserProgressSerializer
)

class LearningPathViewSet(viewsets.ModelViewSet):
    queryset = LearningPath.objects.all()
    serializer_class = LearningPathSerializer

    @action(detail=True, methods=['get'])
    def user_progress(self, request, pk=None):
        path = self.get_object()
        lessons = Lesson.objects.filter(module__learning_path=path)
        progress = UserProgress.objects.filter(
            user=request.user,
            lesson__in=lessons
        )
        
        total_lessons = lessons.count()
        completed_lessons = progress.filter(completed=True).count()
        completion_percentage = (completed_lessons / total_lessons * 100) if total_lessons > 0 else 0
        
        return Response({
            'total_lessons': total_lessons,
            'completed_lessons': completed_lessons,
            'completion_percentage': completion_percentage
        })

class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        lesson = self.get_object()
        progress, created = UserProgress.objects.get_or_create(
            user=request.user,
            lesson=lesson
        )
        
        if not progress.completed:
            progress.completed = True
            progress.score = request.data.get('score')
            progress.time_spent = request.data.get('time_spent', 0)
            progress.save()
            
            # Update user XP
            user = request.user
            user.xp += lesson.xp_reward
            user.save()
            
            return Response({'status': 'lesson completed', 'xp_gained': lesson.xp_reward})
        return Response({'status': 'lesson already completed'})