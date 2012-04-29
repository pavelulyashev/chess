from django.db import models
from django.db.models.signals import post_save
from django.core.urlresolvers import reverse

from autoslug import AutoSlugField

RESULT_CHOICES = (
    ('w', '1-0'),
    ('b', '0-1'),
    ('d', '1/2-1/2'),
)
RESULTS_RECOGNIZER = {
    '1-0': 'w',
    '0-1': 'b',
    '1/2-1/2': 'd',
}


class Composer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    rus_name = models.CharField(max_length=250, blank=True)
    life_years = models.CharField(max_length=30, blank=True)

    slug = AutoSlugField(populate_from='last_name')
    regexp = models.CharField(max_length=100,
                              help_text='using when parse author from pgn')

    def __unicode__(self):
        return u'%s, %s' % (self.last_name, self.first_name)

    def short(self):
        return u'%s, %s' % (self.last_name, self.first_name[0])


class Etude(models.Model):
    authors = models.ManyToManyField(Composer, related_name='etudes')
    year = models.IntegerField(max_length=4)

    result = models.CharField(max_length=1, choices=RESULT_CHOICES)
    fen = models.CharField(max_length=100, unique=True)
    moves = models.TextField()

    def __unicode__(self):
        authors = [author.last_name for author in self.authors.all()]
        authors.append(str(self.year))
        return u', '.join(authors)

    def get_authors(self):
        authors_list = self.authors.all()
        return ', '.join(author.__unicode__() for author in authors_list)

    def get_authors_short(self):
        authors_list = self.authors.all()
        return ', '.join(author.short() for author in authors_list)

    def get_result(self):
        return dict(RESULT_CHOICES)[self.result]

    def get_absolute_url(self, author_slug=None):
        author_slug = author_slug or self.authors.all()[0].slug
        return reverse('etude_detail', args=[author_slug, self.id])


class Board(models.Model):
    fen = models.CharField(max_length=75)
    white_count = models.IntegerField()
    black_count = models.IntegerField()

    white_pieces = models.CommaSeparatedIntegerField(max_length=25)  # K,Q,R,B,N,P
    black_pieces = models.CommaSeparatedIntegerField(max_length=25)  # k,q,r,b,n,p

    etude = models.OneToOneField(Etude, related_name='board')


def handler(instance, **kwargs):
    if instance and kwargs.get('created', False):
        from chess.apps.etudes.fen_to_board import create_board_from_fen
        board = create_board_from_fen(instance.fen)
        board.etude = instance
        board.save()

post_save.connect(handler, sender=Etude)
