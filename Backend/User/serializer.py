from .models import CustomUser
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username']


class SignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)

    
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password2' ,'is_admin']
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ['is_admin']

    def validate(self, data):
        # Password match
        if data.get('password') != data.get('password2'):
            raise serializers.ValidationError('Passwords do not match')

        # Username length
        username = data.get('username')
        if len(username) < 3:
            raise serializers.ValidationError('Username must be at least 3 characters')

        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')

        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user
