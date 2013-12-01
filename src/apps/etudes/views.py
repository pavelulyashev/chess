from random import randrange

from django.views.generic import ListView, DetailView, View, TemplateView
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse

from src.apps.etudes.models import Etude, Composer


class Index(TemplateView):
    template_name = 'index.html'


class EtudesByAuthor(ListView):
    context_object_name = 'etudes_list'
    paginate_by = 12

    def get_queryset(self):
        author_slug = self.kwargs['author_slug']
        self.author = get_object_or_404(Composer, slug=author_slug)
        return self.author.etudes.all()

    def get_context_data(self, **kwargs):
        context = super(EtudesByAuthor, self).get_context_data(**kwargs)
        context['author'] = self.author
        return context

    def get_template_names(self):
        return ['etudes/ajax_etudes_list.html'] if self.request.is_ajax()\
                else ['etudes/etudes_list.html']


class EtudeDetail(DetailView):
    model = Etude
    context_object_name = 'etude'
    template_name = 'etudes/detail.html'

    def get_object(self):
        author_slug = self.kwargs['author_slug']
        etude_id = int(self.kwargs['etude_id'])
        author = get_object_or_404(Composer, slug=author_slug)
        return get_object_or_404(Etude, id=etude_id, authors__in=[author])


class RandomEtude(View):
    def get(self, request):
        count_all = Etude.objects.all().count()
        etude = None
        while not etude:
            try:
                etude = Etude.objects.get(id=randrange(count_all) + 1)
            except Etude.DoesNotExist:
                pass
        author = etude.authors.all()[0]
        return HttpResponseRedirect(reverse('etude_detail',
                                            args=[author.slug, etude.id]))
