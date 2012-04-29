import re

from random import randrange

from django.views.generic import ListView, DetailView, View
from django.views.generic.edit import FormView
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect, Http404
from django.core.urlresolvers import reverse
from django.db.models import Q

from chess.apps.etudes.models import Etude, Composer
from chess.apps.etudes.forms import SearchEtudeForm


class EtudesByAuthor(ListView):
    context_object_name = 'etudes_list'
    template_name = 'etudes/list.html'
    # paginate_by = 6

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


class SearchAuthor(FormView):
    def post(self, request):
        query = request.POST.get('query', '')
        author = Composer.objects.filter(last_name__icontains=query)
        if not author:
            raise Http404
        return HttpResponseRedirect(reverse('etudes_by_composer',
                                            args=[author[0].slug]))


class SearchEtudes(FormView):
    template_name = 'etudes/search.html'

    def get(self, request):
        form = SearchEtudeForm()
        return self.render_to_response(dict(form=form, etudes_list=None))

    def post(self, request):
        form = SearchEtudeForm(request.POST)
        etudes = self.search_etudes(form) if form.is_valid() else []

        if form.is_valid():
            pieces = self.board_from_fen(form.cleaned_data.get('fen_regexp', None))
        else:
            pieces = None

        if etudes:
            self.template_name = 'etudes/list.html'
            return self.render_to_response(dict(etudes_list=etudes))

        return self.render_to_response(dict(form=form,
                                            pieces_on_board=pieces,
                                            etudes_list=etudes,
                                            post=True))

    def search_etudes(self, form):
        query = Q()
        query.add(self.build_meta_query(form), Q.AND)
        query.add(self.build_pieces_query(form), Q.AND)
        query.add(self.build_fen_query(form), Q.AND)
        return Etude.objects.filter(query) if query else []

    def build_meta_query(self, form):
        data = form.cleaned_data
        query = Q()

        author = data.get('author', None)
        if author:
            query.add(Q(authors__last_name__icontains=author) |
                      Q(authors__first_name__icontains=author), Q.AND)

        result = data.get('result', None)
        if result:
            query.add(Q(result__in=result), Q.AND)

        start_year, end_year = data.get('start_year', None), data.get('end_year', None)
        if start_year is not None:
            year_q = Q(year=start_year) if end_year is None else\
                     Q(year__gte=start_year, year__lte=end_year)
            query.add(year_q, Q.AND)

        notation = data.get('notation', None)
        if notation:
            query.add(self.build_notation_query(notation), Q.AND)

        return query

    def build_fen_query(self, form):
        data = form.cleaned_data
        fen = data.get('fen', None)
        fen_regexp = data.get('fen_regexp', None)

        query = Q()
        if fen and not fen_regexp:
            query = Q(fen__contains=fen)
        elif fen_regexp:
            query = Q(board__fen__regex=self.modify_fen_regexp(fen_regexp))

        return query

    def build_pieces_query(self, form):
        data = form.cleaned_data
        query = Q()
        query.add(self.build_color_pieces_query(data, 'white'), Q.AND)
        query.add(self.build_color_pieces_query(data, 'black'), Q.AND)
        return query

    def build_color_pieces_query(self, data, color):
        keyword = color + '_count'
        count = data.get(keyword, None)
        cmp_operator = data.get(keyword + '_cmp', None)
        query = Q()

        if count and cmp_operator:
            cmp_operator = '' if cmp_operator == 'eq' else '__' + cmp_operator
            query_keyword = 'board__%s%s' % (keyword, cmp_operator)
            query.add(Q(**{query_keyword: count}), Q.AND)
            print {query_keyword: count}

        regexp = data.get('%s_pieces_regexp' % (color,), None)
        if regexp:
            query_keyword = 'board__%s_pieces__regex' % (color,)
            query.add(Q(**{query_keyword: self.modify_pieces_regexp(regexp)}), Q.AND)
            print {query_keyword: self.modify_pieces_regexp(regexp)}
        return query

    def build_notation_query(self, notation):
        moves = notation.split(',')
        query = Q()
        for move in moves:
            query.add(Q(moves__contains=move.strip()), Q.AND)
        return query

    def modify_fen_regexp(self, fen_regexp):
        return fen_regexp.replace('A', '[KQRBNP]')\
                         .replace('a', '[kqrbnp]')\
                         .replace('e', '[KQRBNPkqrbnp]')

    def board_from_fen(self, fen_regexp):
        if not fen_regexp:
            return None
        return fen_regexp.split('/')

    def modify_pieces_regexp(self, pieces_regexp):
        parted = re.sub('(\d-\d)', '[\\1]', pieces_regexp).split(',')
        return ','.join(part or '.' for part in parted)
