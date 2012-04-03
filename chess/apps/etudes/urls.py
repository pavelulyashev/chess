from django.conf.urls import patterns, url

from chess.apps.etudes.views import EtudesListView


urlpatterns = patterns('chess.apps.etudes.views',
    url(r'^$', EtudesListView.as_view(), name="etudes_list"),
)
