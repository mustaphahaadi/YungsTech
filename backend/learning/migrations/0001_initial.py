from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LearningPath',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('icon', models.CharField(max_length=50)),
                ('level', models.CharField(choices=[('beginner', 'Beginner'), ('intermediate', 'Intermediate'), ('advanced', 'Advanced')], max_length=20)),
                ('age_range', models.CharField(max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'learning_paths',
            },
        ),
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('icon', models.CharField(max_length=50)),
                ('order', models.IntegerField()),
                ('learning_path', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='modules', to='learning.learningpath')),
            ],
            options={
                'db_table': 'modules',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Lesson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('type', models.CharField(choices=[('video', 'Video'), ('interactive', 'Interactive'), ('quiz', 'Quiz'), ('project', 'Project')], max_length=20)),
                ('content', models.JSONField()),
                ('duration', models.IntegerField()),
                ('xp_reward', models.IntegerField()),
                ('difficulty', models.FloatField(default=1.0)),
                ('order', models.IntegerField()),
                ('module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lessons', to='learning.module')),
            ],
            options={
                'db_table': 'lessons',
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='UserProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('completed', models.BooleanField(default=False)),
                ('score', models.FloatField(null=True)),
                ('time_spent', models.IntegerField(default=0)),
                ('completed_at', models.DateTimeField(null=True)),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='learning.lesson')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.user')),
            ],
            options={
                'db_table': 'user_progress',
                'unique_together': {('user', 'lesson')},
            },
        ),
    ]