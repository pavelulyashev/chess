from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View

from apps.chess_position.draw import ChessPositionDrawer
from apps.etudes.models import Etude


class GetEtudePositionImage(View):

    drawer = ChessPositionDrawer(pieces_directory=settings.PIECES_DIRECTORY)

    def get(self, request, *args, **kwargs):
        etude_id = int(kwargs.get('etude_id'))
        square_size = int(kwargs.get('square_size'))

        etude = Etude.objects.get(id=etude_id)
        image = self.drawer.draw_fen(etude.fen, square_size)
        name = '%s (%d) - %s.png' % (etude.get_authors_short(),
                                         etude.get_year(),
                                         etude.get_result())

        response = HttpResponse(image, content_type='image/png')
        response['Content-Disposition'] = 'attachment; filename="%s"' % name

        return response
