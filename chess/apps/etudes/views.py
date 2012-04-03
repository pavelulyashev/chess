from django.views.generic import ListView

from chess.apps.etudes.models import Etude


class EtudesListView(ListView):
    template_name = 'index.html'
    queryset = Etude.objects.all()
    paginate_by = 10
    context_object_name = 'etudes_list'
