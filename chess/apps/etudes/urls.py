from django.conf.urls import patterns, url

from chess.apps.etudes.views import EtudesByAuthor, EtudeDetail, \
                                    RandomEtude, SearchAuthor, SearchEtudes


urlpatterns = patterns('chess.apps.etudes.views',
    url(r'^random/$', RandomEtude.as_view(), name='etude_random'),
    url(r'^search_author/$', SearchAuthor.as_view(),
        name='etudes_search_author'),
    url(r'^search_etudes/$', SearchEtudes.as_view(),
        name='etudes_search'),
    url(r'^(?P<author_slug>\w*)/$', EtudesByAuthor.as_view(),
        name='etudes_by_composer'),
    url(r'^(?P<author_slug>\w*)/(?P<etude_id>\d+)/$', EtudeDetail.as_view(),
        name='etude_detail'),
)
