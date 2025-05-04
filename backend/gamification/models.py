from django.db import models
from users.models import User

class Achievement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    criteria = models.JSONField()
    xp_reward = models.IntegerField()

    class Meta:
        db_table = 'achievements'

class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_achievements'
        unique_together = ['user', 'achievement']

class Streak(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    current = models.IntegerField(default=0)
    longest = models.IntegerField(default=0)
    last_activity_date = models.DateField()
    protection_available = models.BooleanField(default=False)

    class Meta:
        db_table = 'streaks'

class DailyChallenge(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    difficulty = models.CharField(
        max_length=10,
        choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')]
    )
    type = models.CharField(
        max_length=20,
        choices=[
            ('quiz', 'Quiz'),
            ('code', 'Code'),
            ('reading', 'Reading'),
            ('practice', 'Practice')
        ]
    )
    content = models.JSONField()
    xp_reward = models.IntegerField()
    available_until = models.DateTimeField()

    class Meta:
        db_table = 'daily_challenges'