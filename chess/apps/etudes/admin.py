from django.contrib import admin

from chess.apps.etudes.models import Etude, EtudeAuthor


class EtudeAuthorAdmin(admin.ModelAdmin):
    model = EtudeAuthor

    fieldsets = (
        (None, {
            'fields': (
                ('first_name', 'last_name'),
                'rus_name', 'life_years', 'regexp',
            ),
        }),
    )

    ordering = ['last_name', 'first_name']
    list_display = ('__unicode__', 'first_name', 'last_name',
                    'rus_name', 'regexp')
    list_editable = ('first_name', 'last_name', 'rus_name', 'regexp')


class EtudeAdmin(admin.ModelAdmin):
    model = Etude

    list_display = ('__unicode__', 'fen', 'result')

admin.site.register(Etude, EtudeAdmin)
admin.site.register(EtudeAuthor, EtudeAuthorAdmin)
