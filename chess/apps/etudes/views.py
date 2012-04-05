from django.views.generic import ListView
from django.shortcuts import get_object_or_404

from chess.apps.etudes.models import Etude, Composer


class EtudesListView(ListView):
    template_name = 'index.html'
    queryset = Etude.objects.all()
    paginate_by = 12
    context_object_name = 'etudes_list'


class EtudesByAuthor(ListView):
    template_name = 'index.html'
    # paginate_by = 12
    context_object_name = 'etudes_list'

    def get_queryset(self):
        author_slug = self.kwargs['author_slug']
        author = get_object_or_404(Composer, slug=author_slug)
        return author.etudes.all()
