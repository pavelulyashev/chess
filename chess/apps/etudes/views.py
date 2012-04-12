from django.views.generic import ListView, DetailView
from django.shortcuts import get_object_or_404

from chess.apps.etudes.models import Etude, Composer


class EtudesListView(ListView):
    template_name = 'index.html'
    queryset = Etude.objects.all()
    paginate_by = 12
    context_object_name = 'etudes_list'


class EtudesByAuthor(ListView):
    context_object_name = 'etudes_list'
    template_name = 'etudes/list.html'

    def get_queryset(self):
        author_slug = self.kwargs['author_slug']
        self.author = get_object_or_404(Composer, slug=author_slug)
        return self.author.etudes.all()

    def get_context_data(self, **kwargs):
        context = super(EtudesByAuthor, self).get_context_data(**kwargs)
        context['author'] = self.author
        return context


class EtudeDetail(DetailView):
    model = Etude
    context_object_name = 'etude'
    template_name = 'etudes/detail.html'

    def get_object(self):
        author_slug = self.kwargs['author_slug']
        etude_id = int(self.kwargs['etude_id'])
        author = get_object_or_404(Composer, slug=author_slug)
        return get_object_or_404(Etude, id=etude_id, authors__in=[author])
