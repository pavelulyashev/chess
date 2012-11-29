from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View, TemplateView

from chess.apps.chess_position.draw import ChessPositionDrawer
from chess.apps.etudes.models import Etude


class GetEtudePositionImage(View):

    drawer = ChessPositionDrawer(pieces_directory=settings.PIECES_DIRECTORY)

    def get(self, request, *args, **kwargs):
        etude_id = 23  # int(kwargs.get('etude_id'))
        square_size = int(kwargs.get('square_size'))

#        etude = Etude.objects.get(id=etude_id)
        etude = Etude(fen='8/8/2p5/4rN2/k1P5/NbP5/rP6/2K3R1 w - - 0 1',
                      result='d',
                      year=2008)
        image = self.drawer.draw_fen(etude.fen, square_size)
        name = '%s (%d) - %s.png' % ('Afek, Y.',
                                     etude.get_year(),
                                     etude.get_result())

        response = HttpResponse(content_type='image/png')
        response['Content-Disposition'] = 'inline; filename="%s"' % name
        image.save(response, 'png')

        return response

class ChessPositionBuilder(TemplateView):
    template_name = 'chess_position/position_builder.html'