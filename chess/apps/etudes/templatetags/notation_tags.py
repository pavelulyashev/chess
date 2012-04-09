import re

from django.template import Library

register = Library()

#
# Insert human readable signs instead of numeric annotaion glyphs
# For more information see
# http://en.wikipedia.org/wiki/Numeric_Annotation_Glyphs
#
nag_regexp = re.compile(' \$(?P<nag>\d*)')
nag_dict = {
    '1': '!',
    '2': '?',
    '3': '!!',
    '4': '??',
    '5': '!?',
    '6': '?!',
}


def replace_hanler(match):
    print match.group('nag')
    return nag_dict.get(match.group('nag'), '')


@register.filter
def humanize_nag(pgn):
    return nag_regexp.sub(replace_hanler, pgn)
