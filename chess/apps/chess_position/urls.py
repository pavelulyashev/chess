from django.conf.urls import patterns, url
from chess.apps.chess_position.views import GetEtudePositionImage


urlpatterns = patterns('chess.apps.chess_position.views',
    url(r'^(?P<etude_id>\d+)/(?P<square_size>\d+)/$',
        GetEtudePositionImage.as_view(), name='etude_random'),
)
