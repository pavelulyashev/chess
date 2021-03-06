#-*- coding: utf-8 -*-

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
    1: '!',
    2: '?',
    # 3: '‼',
    # 4: '⁇',
    # 5: '⁉',
    # 6: '⁈',
    # 7: '□',
    # 10: '=',
    # 13: '∞',
    # 16: '±',
    # 17: '∓',
    # 18: '+-',
    # 19: '-+',
    # 22: '⨀',
    # 23: '⨀',
    # 36: '→',
    # 37: '→',
    # 40: '↑',
    # 41: '↑',
    # 132: '⇆',
    # 133: '⇆',
    # 140: '∆',
    # 142: '⌓',
    # 145: 'RR',
    # 146: 'N',
    # 239: '⇔',
    # 240: '⇗',
}


def replace_hanler(match):
    return nag_dict.get(int(match.group('nag')), '')


@register.filter
def humanize_nag(pgn):
    pgn = unicode(pgn)
    return nag_regexp.sub(replace_hanler, pgn)
