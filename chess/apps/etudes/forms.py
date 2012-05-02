#-*- coding: utf-8 -*-

from django import forms

from chess.apps.etudes.models import RESULT_CHOICES


COMPARE_METHOD = (
        ('lt', '<'),
        ('lte', '≤'),
        ('eq', '='),
        ('gte', '≥'),
        ('gt', '>'),
    )

OPERATOR_CHOICES = (
        ('and', 'And'),
        ('or', 'Or'),
    )


class SearchEtudeForm(forms.Form):
    #
    # Meta information fields
    #
    author = forms.CharField(max_length=250, required=False)
    result = forms.MultipleChoiceField(choices=RESULT_CHOICES, required=False,
                                       widget=forms.CheckboxSelectMultiple())
    start_year = forms.CharField(label='Year', required=False,
                                 help_text='Specify year (first input) or year range',
                                 widget=forms.TextInput(attrs={'class': 'span1'}))
    end_year = forms.IntegerField(required=False,
                                  widget=forms.TextInput(attrs={'class': 'span1'}))
    notation = forms.CharField(max_length=256, required=False,
                               help_text='e.g. Kf3, O-O axb6, b8=Q')
    # meta_operator = forms.ChoiceField(choices=OPERATOR_CHOICES, initial='and')

    #
    # Position
    #
    fen = forms.CharField(max_length=100, required=False,
                          help_text='You can specify exact FEN or build part of position')
    fen_regexp = forms.CharField(max_length=75, required=False,
                                 widget=forms.HiddenInput())
    # fen_operator = forms.ChoiceField(choices=OPERATOR_CHOICES, initial='and')

    #
    # Pieces amounts
    #
    white_count = forms.IntegerField(required=False)
    black_count = forms.IntegerField(required=False)

    white_count_cmp = forms.ChoiceField(choices=COMPARE_METHOD, initial='eq')
    black_count_cmp = forms.ChoiceField(choices=COMPARE_METHOD, initial='eq')

    white_pieces_regexp = forms.CharField(max_length=30, required=False,
                                          widget=forms.HiddenInput())
    black_pieces_regexp = forms.CharField(max_length=30, required=False,
                                          widget=forms.HiddenInput())
    # pieces_operator = forms.ChoiceField(choices=OPERATOR_CHOICES, initial='and')

    def clean(self):
        data = self.cleaned_data
        fen = data.get('fen', None) or data.get('fen_regexp', None)
        meta = data.get('author', None) or data.get('notation', None) or\
                data.get('start_year', None) or data.get('result', None)
        pieces = data.get('white_count', None) or data.get('black_count', None)\
                or data.get('white_pieces_regexp')\
                or data.get('black_pieces_regexp')

        if not (fen or meta or pieces):
            raise forms.ValidationError('Please, specify search parameters')

        return data

    # def clean_fen(self):
    # def clean_fen_regexp(self):
    # def clean_white_pieces_regexp(self):
    # def clean_black_pieces_regexp(self):
