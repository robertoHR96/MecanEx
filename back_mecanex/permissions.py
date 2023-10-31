from rest_framework.permissions import BasePermission

class is_Admin(BasePermission):
    def has_permission(self, request, view):
        """
        If the user is a superuser, then they have permission to access the view
        
        :param request: The request object
        :param view: The view being accessed
        :return: The return value is a boolean.
        """
        return request.user.is_superuser