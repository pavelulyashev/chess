from django.conf.urls import patterns, include, url

from chess.apps.etudes.views import Index

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'chess_etudes.views.home', name='home'),
    # url(r'^chess_etudes/', include('chess.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', Index.as_view(), name='home'),
    url(r'^etudes/', include('chess.apps.etudes.urls')),
)
