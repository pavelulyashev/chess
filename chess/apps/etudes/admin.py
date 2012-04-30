from django.contrib import admin

from chess.apps.etudes.models import Etude, Composer, Board


def merge_composers(modeladmin, request, queryset):
    primary_composer = queryset[0]
    for composer in queryset[1:]:
        etudes = composer.etudes.all()
        for etude in etudes:
            etude.authors.remove(composer)
            etude.authors.add(primary_composer)
        composer.delete()


def count_etudes(composer):
    return composer.etudes.count()


class ComposerAdmin(admin.ModelAdmin):
    model = Composer

    fieldsets = (
        (None, {
            'fields': (
                ('first_name', 'last_name'),
                'rus_name', 'life_years',
            ),
        }),
    )

    ordering = ['last_name', 'first_name']
    list_display = ('__unicode__', 'last_name', 'first_name',
                    count_etudes, 'rus_name', 'slug')
    list_editable = ('first_name', 'last_name', 'rus_name')

    search_fields = ('last_name',)
    actions = [merge_composers]

    alphabet_filter = 'last_name'
    DEFAULT_ALPHABET = u'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


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
