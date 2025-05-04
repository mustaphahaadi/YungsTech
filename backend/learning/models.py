from django.db import models
from users.models import User

class LearningPath(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    level = models.CharField(
        max_length=20,
        choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')]
    )
    age_range = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'learning_paths'

class Module(models.Model):
    learning_path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50)
    order = models.IntegerField()

    class Meta:
        db_table = 'modules'
        ordering = ['order']

class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(
        max_length=20,
        choices=[
            ('video', 'Video'),
            ('interactive', 'Interactive'),
            ('quiz', 'Quiz'),
            ('project', 'Project')
        ]
    )
    content = models.JSONField()
    duration = models.IntegerField()  # minutes
    xp_reward = models.IntegerField()
    difficulty = models.FloatField(default=1.0)
    order = models.IntegerField()

    class Meta:
        db_table = 'lessons'
        ordering = ['order']

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    score = models.FloatField(null=True)
    time_spent = models.IntegerField(default=0)  # seconds
    completed_at = models.DateTimeField(null=True)

    class Meta:
        db_table = 'user_progress'
        unique_together = ['user', 'lesson']