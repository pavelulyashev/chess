from django.db import models


class EtudeAuthor(models.Model):
    name = models.CharField(max_length=250)


class Etude(models.Model):
    author = models.ManyToManyField(EtudeAuthor, related_name='etudes_related')
    year = models.DateField()

    fen = models.CharField(max_length=250)
    moves = models.TextField()
