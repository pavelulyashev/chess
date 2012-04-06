from django.db import models

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
    fen = models.CharField(max_length=250, unique=True)
    moves = models.TextField()

    def __unicode__(self):
        authors = [author.last_name for author in self.authors.all()]
        authors.append(str(self.year))
        return u', '.join(authors)

    def get_authors(self):
        authors_list = self.authors.all()
        return ', '.join(author.__unicode__() for author in authors_list)

    def get_result(self):
        return dict(RESULT_CHOICES)[self.result]
