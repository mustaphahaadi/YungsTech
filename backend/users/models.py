from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    level = models.IntegerField(default=1)
    xp = models.IntegerField(default=0)
    learning_speed = models.CharField(
        max_length=10,
        choices=[('slow', 'Slow'), ('medium', 'Medium'), ('fast', 'Fast')],
        default='medium'
    )
    preferred_learning_style = models.CharField(
        max_length=20,
        choices=[('visual', 'Visual'), ('practical', 'Practical'), ('theoretical', 'Theoretical')],
        default='visual'
    )
    daily_goal = models.IntegerField(default=30)  # minutes
    
    class Meta:
        db_table = 'users'