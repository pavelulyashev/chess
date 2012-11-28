"""
This is modification of script was got here
http://wordaligned.org/articles/drawing-chess-positions

Code to draw chess board and pieces.

FEN notation to describe the arrangement of peices on a chess board.

White pieces are coded: K, Q, B, N, R, P, for king, queen, bishop,
rook knight, pawn. Black pieces use lowercase k, q, b, n, r, p. Blank
squares are noted with digits, and the "/" separates ranks.

As an example, the game starts at:

rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR

See: http://en.wikipedia.org/wiki/Forsyth-Edwards_Notation
"""

import re
from PIL import Image, ImageDraw


class InvalidFen(ValueError):
    pass

def expand_blanks(fen):
    """Expand the digits in an FEN string into spaces

    >>> expand_blanks("rk2q3")
    'rk--q---'
    """
    def expand(match):
        return '-' * int(match.group(0))
    return re.compile(r'\d').sub(expand, fen)

def check_valid(expanded_fen):
    """Asserts an expanded FEN string is valid"""
    match = re.compile(r'([KQBNRPkqbnrp\-]{8}/){8}$').match
    if not match(expanded_fen + '/'):
        raise InvalidFen()

def expand_fen(fen):
    """Preprocesses a fen string into an internal format.

    Each square on the chessboard is represented by a single
    character in the output string. The rank separator characters
    are removed. Invalid inputs raise a InvalidFen error.
    """
    expanded = expand_blanks(fen.split()[0])
    check_valid(expanded)
    return expanded.split('/')


class ChessPositionDrawer(object):
    """Chess position renderer.

    Create an instance of this class, then call
    """
    n = 8
    white = (255, 255)
    black = (192, 255)
    pieces_literals = 'KQRBNPkqrbnp'
    sprites = {}
    pieces = {}
    boards = {}

    def __init__(self, white=None, black=None, pieces_directory=None):
        """Initialise colors and pieces directory"""
        self.white = white or self.white
        self.black = black or self.black
        self.pieces_directory = pieces_directory or self.pieces_directory

    def get_piece(self, size, piece_literal):
        return self.pieces[size][piece_literal]

    def _square(self, i, j, s):
        return s * i, s * j, s * (i + 1) - 1, s * (j + 1) - 1

    def _load_piece(self, sprite, size, piece_literal):
        left = self.pieces_literals.index(piece_literal)
        return sprite.crop(self._square(left, 0, size))

    def _load_sprite(self, square_size):
        return Image.open('%s/%d.png' % (self.pieces_directory, square_size))

    def _create_pieces(self, size):
        """Load chess pieces from disk."""
        if size not in self.sprites:
            sprite = self.sprites[size] = self._load_sprite(size)
            self.pieces[size] = dict(zip(self.pieces_literals,
                                         [self._load_piece(sprite, size, p)
                                          for p in self.pieces_literals]))

    def draw_fen(self, fen, square_size):
        """
        Return an image depicting the input position.

        fen - the first record of a FEN chess position.
        Clients are responsible for resizing this image and saving it,
        if required.
        """
        self.create_pieces(square_size)
        board = self.get_board(square_size)
        position = expand_fen(fen)
        print position

        for y in range(self.n):
            for x in range(self.n):
                piece_literal = position[y][x]
                if piece_literal != '-':
                    piece_image = self.get_piece(square_size, piece_literal)
                    board.paste(piece_image,
                                self._square(x, y, square_size),
                                mask=piece_image)

        return board

    def get_board(self, square_size):
        if square_size in self.boards:
            return self.boards[square_size]

        board = self.boards[square_size] = self._draw_board(square_size)
        return board

    def _draw_board(self, square_size):
        """
        Return an image of a chessboard.
        The board has n x n squares each of the supplied size.
        """
        n = self.n
        board = Image.new('LA', (n * square_size, n * square_size), self.black)
        draw_square = ImageDraw.Draw(board).rectangle

        for i in range(n):
            for j in range(n):
                if (i + j) % 2 == 0:
                    draw_square(self._square(i, j, square_size),
                                fill=self.white,
                                outline=None)
        return board
