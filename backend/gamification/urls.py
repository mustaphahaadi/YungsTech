from django.urls import path
from .views import (
    AchievementViewSet, StreakViewSet,
    DailyChallengeViewSet
)

urlpatterns = [
    path('achievements/', 
        AchievementViewSet.as_view({'get': 'list'}),
        name='achievements'
    ),
    path('achievements/user/', 
        AchievementViewSet.as_view({'get': 'user_achievements'}),
        name='user_achievements'
    ),
    path('streak/check-in/',
        StreakViewSet.as_view({'post': 'check_in'}),
        name='streak_check_in'
    ),
    path('challenges/',
        DailyChallengeViewSet.as_view({'get': 'list'}),
        name='daily_challenges'
    ),
    path('challenges/<uuid:pk>/complete/',
        DailyChallengeViewSet.as_view({'post': 'complete'}),
        name='complete_challenge'
    ),
]