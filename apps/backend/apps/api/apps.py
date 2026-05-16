"""API app configuration."""

from django.apps import AppConfig


class ApiConfig(AppConfig):
    """Configuration for the api app."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.api"
    verbose_name = "API"
