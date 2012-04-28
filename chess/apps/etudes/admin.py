from django.contrib import admin

from chess.apps.etudes.models import Etude, Composer, Board


class ComposerAdmin(admin.ModelAdmin):
    model = Composer

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


class ComposersInline(admin.TabularInline):
    model = Etude.authors.through
    extra = 0
    verbose_name_plural = 'Etude composers'


class BoardInline(admin.StackedInline):
    model = Board
    can_delete = False
    verbose_name_plural = 'Board'


class EtudeAdmin(admin.ModelAdmin):
    model = Etude

    list_display = ('__unicode__', 'fen', 'result')
    filter_vertical = ('authors',)

    exclude = ('authors',)
    inlines = (
            ComposersInline,
            BoardInline,
        )

admin.site.register(Etude, EtudeAdmin)
admin.site.register(Composer, ComposerAdmin)
