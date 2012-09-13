from django.conf import settings as project_settings


def settings(request):
    return dict(settings=project_settings)
