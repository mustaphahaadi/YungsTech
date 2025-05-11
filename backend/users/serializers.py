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
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'learning_speed', 
                 'preferred_learning_style', 'daily_goal')
        extra_kwargs = {
            'learning_speed': {'required': False},
            'preferred_learning_style': {'required': False},
            'daily_goal': {'required': False},
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def create(self, validated_data):
        # Set default values if not provided
        if 'learning_speed' not in validated_data:
            validated_data['learning_speed'] = 'medium'
        if 'preferred_learning_style' not in validated_data:
            validated_data['preferred_learning_style'] = 'visual'
        if 'daily_goal' not in validated_data:
            validated_data['daily_goal'] = 30
            
        user = User.objects.create_user(**validated_data)
        return user