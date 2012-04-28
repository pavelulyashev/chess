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


class SearchEtudeForm(forms.Form):
    author = forms.CharField(max_length=250, required=False)
    result = forms.MultipleChoiceField(choices=RESULT_CHOICES, required=False,
                                       widget=forms.CheckboxSelectMultiple())
    start_year = forms.CharField(max_length=4, label='Year', required=False,
                                 widget=forms.TextInput(attrs={'class': 'span1'}))
    end_year = forms.CharField(max_length=4, required=False,
                               widget=forms.TextInput(attrs={'class': 'span1'}))

    fen = forms.CharField(max_length=100, required=False)
    fen_regexp = forms.CharField(max_length=75, required=False)

    white_count = forms.IntegerField(required=False)
    black_count = forms.IntegerField(required=False)

    white_count_cmp = forms.ChoiceField(choices=COMPARE_METHOD, initial='eq')
    black_count_cmp = forms.ChoiceField(choices=COMPARE_METHOD, initial='eq')

    white_pieces_regexp = forms.CharField(max_length=25,
                                          required=False,
                                          widget=forms.HiddenInput())
    black_pieces_regexp = forms.CharField(max_length=25,
                                          required=False,
                                          widget=forms.HiddenInput())
