import re

from src.apps.etudes.models import Board


_rank_dict = dict(K=0, Q=1, R=2, B=3, N=4, P=5,
                  k=0, q=1, r=2, b=3, n=4, p=5)


def reduce_numbers(fen):
    return re.sub('\d', lambda match: '-' * int(match.group()), fen)


def count_pieces(fen, regexp):
    pieces_iter = re.finditer(regexp, fen)
    count, pieces = 0, [0] * 6
    for piece in pieces_iter:
        pieces[_rank_dict[piece.group()]] += 1
        count += 1
    return count, pieces


def create_board_from_fen(fen):
    reduced_fen = reduce_numbers(fen.split(' ')[0])
    white_count, white_pieces = count_pieces(fen, '[KQRBNP]')
    black_count, black_pieces = count_pieces(fen, '[kqrbnp]')

    return Board(fen=reduced_fen,
                 white_count=white_count,
                 black_count=black_count,
                 white_pieces=','.join(str(p) for p in white_pieces),
                 black_pieces=','.join(str(p) for p in black_pieces)
              )
