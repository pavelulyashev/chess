import re

from django.views.generic.edit import FormView
from django.views.generic import ListView
from django.db.models import Q, Count

from src.apps.etudes.forms import SearchEtudeForm
from src.apps.etudes.models import Etude, Composer


class ComposersList(ListView):
    context_object_name = 'composers_list'
    paginate_by = 80

    def get_queryset(self):
        query_value = self.request.GET.get('q', None)
        self.sorting = self.request.GET.get('sorting', '')
        queryset = Composer.objects
        if query_value:
            tokens = re.split('\s+', query_value)
            query = Q()
            for token in tokens:
                query.add(Q(last_name__icontains=token) |
                          Q(first_name__icontains=token) |
                          Q(rus_name__icontains=token), Q.AND)
            queryset = queryset.filter(query)

        self.query_value = query_value

        if self.sorting == 'count':
            queryset = queryset.annotate(count_etudes=Count('etudes'))\
                    .order_by('-count_etudes', 'last_name', 'first_name')
        else:
            queryset = queryset.order_by('last_name', 'first_name')
        return queryset

    def get_context_data(self, **kwargs):
        context = super(ComposersList, self).get_context_data(**kwargs)
        context['query_value'] = self.query_value
        context['sorting'] = self.sorting
        return context

    def get_template_names(self):
        return ['etudes/ajax_composers_list.html'] if self.request.is_ajax()\
                else ['etudes/composers_list.html']


class SearchEtudes(FormView, ListView):
    form_class = SearchEtudeForm
    context_object_name = 'etudes_list'
    paginate_by = 12

    def get(self, request):
        form = self.get_form(self.form_class)
        self.object_list = []
        return self.render_to_response(dict(form=form, etudes_list=None))

    def post(self, request):
        self.form = self.get_form(self.form_class)
        queryset = self.get_queryset()

        self.kwargs['page'] = request.POST.get('page', 1)
        pagination_data = self.paginate_queryset(queryset,
                                                 self.paginate_by)
        context = self.get_context_data(*pagination_data)
        return self.render_to_response(context)

    def get_template_names(self):
        return ['etudes/ajax_etudes_list.html'] if self.request.is_ajax()\
                else ['etudes/search.html']

    def get_queryset(self):
        return self.search_etudes(self.form) if self.form.is_valid() else []

    def get_context_data(self, *args, **kwargs):
        form = self.form

        if form.is_valid():
            pieces = self.board_from_fen(form.cleaned_data.get('fen_regexp', None))
        else:
            pieces = None
        paginator, page, object_list, is_paginated = args
        print object_list
        return dict(etudes_list=object_list,
                    paginator=paginator,
                    page_obj=page,
                    is_paginated=is_paginated,
                    pieces_on_board=pieces,
                    form=self.form,
                    post=True)

    #
    # search methods
    #

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
            query.add(self.build_authors_query(author), Q.AND)

        result = data.get('result', None)
        if result:
            query.add(Q(result__in=result), Q.AND)

        query.add(self.build_year_query(data), Q.AND)

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

        regexp = data.get('%s_pieces_regexp' % (color,), None)
        if regexp:
            query_keyword = 'board__%s_pieces__regex' % (color,)
            query.add(Q(**{query_keyword: self.modify_pieces_regexp(regexp)}), Q.AND)
        return query

    def build_year_query(self, data):
        year, end_year = data.get('start_year', None), data.get('end_year', None)
        if year is not None:
            try:
                year = int(year)
                query = Q(year=year) | Q(possible_year=year) if end_year is None\
                        else Q(year__gte=year, year__lte=end_year)
            except ValueError:
                query = Q(possible_year=year)
        else:
            query = Q()

        return query

    def build_authors_query(self, author):
        tokens = re.split('\s+', author)
        query = Q()
        for token in tokens:
            query.add(Q(authors__last_name__icontains=token) |
                      Q(authors__first_name__icontains=token) |
                      Q(authors__rus_name__icontains=token), Q.AND)
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
