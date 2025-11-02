from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, email=None, **kwargs):
        try:
            # Try finding the user by email
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None

        # Check password validity
        if user and user.check_password(password):
            return user

        return None
