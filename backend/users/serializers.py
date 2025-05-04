from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'avatar', 'level', 'xp', 
                 'learning_speed', 'preferred_learning_style', 'daily_goal')
        read_only_fields = ('id', 'level', 'xp')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = UserSerializer(self.user).data
        data['user'] = user
        return data

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'learning_speed', 
                 'preferred_learning_style', 'daily_goal')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user