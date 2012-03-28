from django.contrib import admin

from chess.apps.etudes.models import Etude, EtudeAuthor


class EtudeAuthorAdmin(admin.ModelAdmin):
    model = EtudeAuthor


class EtudeAdmin(admin.ModelAdmin):
    model = Etude

admin.site.register(Etude, EtudeAdmin)
admin.site.register(EtudeAuthor, EtudeAuthorAdmin)
