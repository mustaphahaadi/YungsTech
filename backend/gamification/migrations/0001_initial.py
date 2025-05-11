from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Achievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('icon', models.CharField(max_length=50)),
                ('criteria', models.JSONField()),
                ('xp_reward', models.IntegerField()),
            ],
            options={
                'db_table': 'achievements',
            },
        ),
        migrations.CreateModel(
            name='DailyChallenge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('difficulty', models.CharField(choices=[('easy', 'Easy'), ('medium', 'Medium'), ('hard', 'Hard')], max_length=10)),
                ('type', models.CharField(choices=[('quiz', 'Quiz'), ('code', 'Code'), ('reading', 'Reading'), ('practice', 'Practice')], max_length=20)),
                ('content', models.JSONField()),
                ('xp_reward', models.IntegerField()),
                ('available_until', models.DateTimeField()),
            ],
            options={
                'db_table': 'daily_challenges',
            },
        ),
        migrations.CreateModel(
            name='Streak',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current', models.IntegerField(default=0)),
                ('longest', models.IntegerField(default=0)),
                ('last_activity_date', models.DateField()),
                ('protection_available', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
            options={
                'db_table': 'streaks',
            },
        ),
        migrations.CreateModel(
            name='UserAchievement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unlocked_at', models.DateTimeField(auto_now_add=True)),
                ('achievement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gamification.achievement')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
            options={
                'db_table': 'user_achievements',
                'unique_together': {('user', 'achievement')},
            },
        ),
    ]