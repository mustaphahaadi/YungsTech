from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Achievement, UserAchievement, Streak, DailyChallenge
from .serializers import (
    AchievementSerializer, UserAchievementSerializer,
    StreakSerializer, DailyChallengeSerializer
)

class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

    @action(detail=False, methods=['get'])
    def user_achievements(self, request):
        user_achievements = UserAchievement.objects.filter(user=request.user)
        serializer = UserAchievementSerializer(user_achievements, many=True)
        return Response(serializer.data)

class StreakViewSet(viewsets.ModelViewSet):
    serializer_class = StreakSerializer

    def get_queryset(self):
        return Streak.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def check_in(self, request):
        streak, created = Streak.objects.get_or_create(
            user=request.user,
            defaults={'last_activity_date': timezone.now().date()}
        )
        
        if not created:
            today = timezone.now().date()
            days_diff = (today - streak.last_activity_date).days
            
            if days_diff == 1:
                streak.current += 1
                streak.longest = max(streak.longest, streak.current)
            elif days_diff > 1:
                if streak.protection_available:
                    streak.protection_available = False
                else:
                    streak.current = 1
            
            streak.last_activity_date = today
            streak.save()
        
        return Response(StreakSerializer(streak).data)

class DailyChallengeViewSet(viewsets.ModelViewSet):
    queryset = DailyChallenge.objects.all()
    serializer_class = DailyChallengeSerializer

    def get_queryset(self):
        return DailyChallenge.objects.filter(
            available_until__gte=timezone.now()
        ).order_by('available_until')

    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        challenge = self.get_object()
        user = request.user
        
        # Add XP reward to user
        user.xp += challenge.xp_reward
        user.save()
        
        return Response({
            'status': 'challenge completed',
            'xp_gained': challenge.xp_reward
        })